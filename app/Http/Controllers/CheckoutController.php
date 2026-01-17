<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use App\Services\BkashPaymentService; // <--- ADD THIS IMPORT
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Stripe\Stripe;
use Stripe\Checkout\Session;

class CheckoutController extends Controller
{
    // 1. Show Checkout Page (Unchanged)
    public function index()
    {
        $cartData = $this->getCartData();

        if (count($cartData['items']) === 0) {
            return redirect('/cart');
        }

        $user = Auth::user();
        $userData = $user ? [
            'name' => $user->name,
            'email' => $user->email,
            'phone' => $user->phone,
            'address' => $user->address,
        ] : null;

        return Inertia::render('Customer/Checkout', [
            'cartItems' => $cartData['items'],
            'totals' => $cartData['totals'],
            'auth' => ['user' => $userData]
        ]);
    }

    // 2. Place Order (UPDATED with bKash)
    public function store(Request $request)
    {
        // 1. Validate Input
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => ['required', 'string', 'regex:/^(013|014|015|016|017|018|019)[0-9]{8}$/'],
            'address' => 'required|string|max:500',
            'payment_method' => 'required|in:cod,stripe,bkash,nagad',
        ]);

        $cartData = $this->getCartData();
        $items = $cartData['items'];
        $totals = $cartData['totals'];

        if (count($items) === 0) {
            return redirect('/cart')->withErrors(['cart' => 'Cart is empty']);
        }

        try {
            $result = DB::transaction(function () use ($request, $items, $totals) {
                // A. Create Order
                $order = Order::create([
                    'user_id' => Auth::id() ?? null,
                    'name' => $request->name,
                    'email' => $request->email,
                    'phone' => $request->phone,
                    'address' => $request->address,
                    'subtotal' => $totals['itemTotal'],
                    'delivery_fee' => $totals['delivery'],
                    'grand_total' => $totals['grandTotal'],
                    'payment_method' => $request->payment_method,
                    'payment_status' => 'pending',
                    'transaction_id' => null,
                    'order_status' => 'pending',
                ]);

                // B. Create Order Items & Reserve Stock
                foreach ($items as $item) {
                    OrderItem::create([
                        'order_id' => $order->id,
                        'product_id' => $item['id'],
                        'product_name' => $item['name'],
                        'price' => $item['price'],
                        'quantity' => $item['quantity'],
                    ]);

                    $product = Product::find($item['id']);
                    if ($product) {
                        if ($product->stock < $item['quantity']) {
                            throw new \Exception("Product {$item['name']} is out of stock.");
                        }
                        $product->decrement('stock', $item['quantity']);
                    }
                }

                // C. Handle Logic
                if ($request->payment_method === 'cod') {
                    $this->clearCart();
                    session()->flash('last_order_id', $order->id);
                    return ['type' => 'cod', 'order_id' => $order->id];
                } else {
                    return ['type' => 'prepaid', 'order_id' => $order->id];
                }
            });

            // --- REDIRECTION LOGIC ---

            // 1. COD Redirect
            if ($result['type'] === 'cod') {
                return redirect()->route('checkout.success');
            }

            // 2. Stripe Redirect
            if ($result['type'] === 'prepaid' && $request->payment_method === 'stripe') {
                Stripe::setApiKey(env('STRIPE_SECRET'));

                $lineItems = [];
                foreach ($items as $item) {
                    $lineItems[] = [
                        'price_data' => [
                            'currency' => 'bdt',
                            'product_data' => ['name' => $item['name']],
                            'unit_amount' => (int) ($item['price'] * 100),
                        ],
                        'quantity' => $item['quantity'],
                    ];
                }

                if ($totals['delivery'] > 0) {
                    $lineItems[] = [
                        'price_data' => [
                            'currency' => 'bdt',
                            'product_data' => ['name' => 'Delivery Fee'],
                            'unit_amount' => (int) ($totals['delivery'] * 100),
                        ],
                        'quantity' => 1,
                    ];
                }

                $session = Session::create([
                    'payment_method_types' => ['card'],
                    'line_items' => $lineItems,
                    'mode' => 'payment',
                    'success_url' => route('checkout.stripe.success') . '?session_id={CHECKOUT_SESSION_ID}&order_id=' . $result['order_id'],
                    'cancel_url' => route('checkout.index'),
                ]);

                return Inertia::location($session->url);
            }

            // 3. bKash Redirect (NEW LOGIC)
            if ($result['type'] === 'prepaid' && $request->payment_method === 'bkash') {
                $bkashService = new BkashPaymentService();

                // We append the order_id here so we can retrieve it in the callback
                $callbackUrl = route('checkout.bkash.callback') . '?order_id=' . $result['order_id'];

                $bkashResponse = $bkashService->createPayment(
                    $result['order_id'],
                    $totals['grandTotal'],
                    $callbackUrl
                );

                if (isset($bkashResponse['bkashURL'])) {
                    // Force external redirect to bKash
                    return Inertia::location($bkashResponse['bkashURL']);
                } else {
                    throw new \Exception('bKash Error: ' . ($bkashResponse['statusMessage'] ?? 'Unknown error'));
                }
            }

        } catch (\Exception $e) {
            return back()->withErrors(['error' => 'Order failed: ' . $e->getMessage()]);
        }
    }

    // 3. Stripe Success Callback (Unchanged)
    public function stripeSuccess(Request $request)
    {
        // ... (Keep your exact existing stripeSuccess logic here) ...
        $sessionId = $request->get('session_id');
        $orderId = $request->get('order_id');

        if (!$sessionId || !$orderId) {
            return redirect()->route('checkout.index')->withErrors(['error' => 'Invalid payment session.']);
        }

        Stripe::setApiKey(env('STRIPE_SECRET'));

        try {
            $session = Session::retrieve($sessionId);
            if ($session->payment_status === 'paid') {
                $order = Order::find($orderId);
                if ($order && $order->payment_status === 'pending') {
                    $order->update([
                        'payment_status' => 'paid',
                        'transaction_id' => $session->payment_intent
                    ]);
                    $this->clearCart();
                    session()->flash('last_order_id', $order->id);
                }
                return redirect()->route('checkout.success');
            }
        } catch (\Exception $e) {
            return redirect()->route('checkout.index')->withErrors(['error' => 'Payment verification failed.']);
        }
        return redirect()->route('checkout.index')->withErrors(['error' => 'Payment not completed.']);
    }

    // 4. bKash Callback (NEW METHOD)
    public function bkashCallback(Request $request)
    {
        $status = $request->input('status');
        $paymentId = $request->input('paymentID');
        $orderId = $request->input('order_id');

        // 1. Handle SUCCESS case
        if ($status === 'success') {
            try {
                $bkashService = new BkashPaymentService();
                $executeData = $bkashService->executePayment($paymentId);

                if (isset($executeData['statusCode']) && $executeData['statusCode'] === '0000') {
                    $order = Order::find($orderId);

                    if ($order && $order->payment_status === 'pending') {
                        $order->update([
                            'payment_status' => 'paid',
                            'transaction_id' => $executeData['trxID']
                        ]);

                        $this->clearCart();
                        session()->flash('last_order_id', $order->id);
                        return redirect()->route('checkout.success');
                    }
                } else {
                    // Payment Execution Failed (Even if status was success)
                    $this->cleanupFailedOrder($orderId);
                    return redirect()->route('checkout.index')
                        ->withErrors(['error' => 'bKash Verification Failed: ' . ($executeData['statusMessage'] ?? 'Unknown')]);
                }

            } catch (\Exception $e) {
                $this->cleanupFailedOrder($orderId);
                return redirect()->route('checkout.index')->withErrors(['error' => $e->getMessage()]);
            }
        }

        // 2. Handle CANCEL/FAILURE case (Wrong PIN, User closed window)
        $this->cleanupFailedOrder($orderId);

        return redirect()->route('checkout.index')->withErrors(['error' => 'Payment Cancelled or Failed. Please try again.']);
    }

    // --- Add this Helper method at the bottom of your Controller ---
    private function cleanupFailedOrder($orderId)
    {
        if ($orderId) {
            // Delete the order so it doesn't stay as "Pending" in the database
            Order::where('id', $orderId)->where('payment_status', 'pending')->delete();
        }
    }

    // 5. Success Page (Unchanged)
    public function success()
    {
        if (!session()->has('last_order_id')) {
            return redirect('/');
        }
        return Inertia::render('Customer/OrderSuccess', [
            'order_id' => session('last_order_id')
        ]);
    }

    // Helper: Clear Cart (Refactored to avoid code duplication)
    private function clearCart()
    {
        if (Auth::check()) {
            Cart::where('user_id', Auth::id())->delete();
        } else {
            session()->forget('cart');
        }
    }

    // Helper: Get Cart Data (Unchanged)
    private function getCartData()
    {
        // ... (Keep your exact existing getCartData logic here) ...
        $cartItems = [];
        $subtotal = 0;

        if (Auth::check()) {
            $dbCart = Cart::with('product')->where('user_id', Auth::id())->get();
            foreach ($dbCart as $item) {
                if ($item->product) {
                    $price = $item->product->price;
                    $cartItems[] = [
                        'id' => $item->product_id,
                        'name' => $item->product->name,
                        'image' => '/storage/' . $item->product->image,
                        'price' => (float) $price,
                        'quantity' => $item->quantity,
                    ];
                    $subtotal += $price * $item->quantity;
                }
            }
        } else {
            $sessionCart = session()->get('cart', []);
            if (!empty($sessionCart)) {
                $products = Product::whereIn('id', array_keys($sessionCart))->get();
                foreach ($products as $product) {
                    $qty = $sessionCart[$product->id];
                    $cartItems[] = [
                        'id' => $product->id,
                        'name' => $product->name,
                        'image' => '/storage/' . $product->image,
                        'price' => (float) $product->price,
                        'quantity' => $qty,
                    ];
                    $subtotal += $product->price * $qty;
                }
            }
        }

        $delivery = $subtotal > 0 ? 60 : 0;
        return [
            'items' => $cartItems,
            'totals' => [
                'itemTotal' => round($subtotal, 2),
                'delivery' => $delivery,
                'grandTotal' => round($subtotal + $delivery, 2)
            ]
        ];
    }
}