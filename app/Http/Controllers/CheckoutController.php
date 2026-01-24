<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use App\Services\BkashPaymentService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Stripe\Stripe;
use Stripe\Checkout\Session;

class CheckoutController extends Controller
{
    // 1. Show Checkout Page
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

    // 2. Place Order (UPDATED)
    public function store(Request $request)
    {

        // 1. Validate Input (Added delivery_area)
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => ['required', 'string', 'regex:/^(013|014|015|016|017|018|019)[0-9]{8}$/'],
            'address' => 'required|string|max:500',
            'delivery_area' => 'required|in:inside_dhaka,outside_dhaka', // <--- IMPORTANT
            'payment_method' => 'required|in:cod,stripe,bkash,nagad',
        ]);

        $cartData = $this->getCartData();
        $items = $cartData['items'];

        // --- LOGIC FIX START ---
        // Recalculate totals based on the selected Delivery Area
        $deliveryFee = $this->calculateDeliveryFee($items, $request->delivery_area);

        $totals = [
            'itemTotal' => $cartData['totals']['itemTotal'],
            'delivery' => $deliveryFee,
            'grandTotal' => $cartData['totals']['itemTotal'] + $deliveryFee
        ];
        // --- LOGIC FIX END ---

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
                    // Save the selected area to DB if you have a column for it, otherwise skip
                    // 'delivery_area' => $request->delivery_area, 
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

                if ($request->payment_method === 'cod') {
                    $this->clearCart();
                    session()->flash('last_order_id', $order->id);
                    return ['type' => 'cod', 'order_id' => $order->id];
                } else {
                    return ['type' => 'prepaid', 'order_id' => $order->id];
                }
            });

            // --- REDIRECTION LOGIC ---

            if ($result['type'] === 'cod') {
                return redirect()->route('checkout.success');
            }

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

                // Add the Calculated Delivery Fee
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

            if ($result['type'] === 'prepaid' && $request->payment_method === 'bkash') {
                $bkashService = new BkashPaymentService();
                $callbackUrl = route('checkout.bkash.callback') . '?order_id=' . $result['order_id'];

                $bkashResponse = $bkashService->createPayment(
                    $result['order_id'],
                    $totals['grandTotal'],
                    $callbackUrl
                );

                if (isset($bkashResponse['bkashURL'])) {
                    return Inertia::location($bkashResponse['bkashURL']);
                } else {
                    throw new \Exception('bKash Error: ' . ($bkashResponse['statusMessage'] ?? 'Unknown error'));
                }
            }

        } catch (\Exception $e) {
            return back()->withErrors(['error' => 'Order failed: ' . $e->getMessage()]);
        }
    }

    // --- NEW HELPER: Calculate Fee (Matches Frontend Logic) ---
    private function calculateDeliveryFee($items, $area)
    {
        $hasHigh = false;
        $highQty = 0;
        $hasMedium = false;
        $mediumQty = 0;
        $hasNormal = false;

        foreach ($items as $item) {
            // Ensure we handle null/empty class as 'normal'
            $class = strtolower($item['bussiness_class'] ?? 'normal');

            if ($class === 'high') {
                $hasHigh = true;
                $highQty += $item['quantity'];
            } elseif ($class === 'medium') {
                $hasMedium = true;
                $mediumQty += $item['quantity'];
            } elseif ($class === 'normal') {
                $hasNormal = true;
            }
        }

        // Priority 1: High
        if ($hasHigh) {
            return ($area === 'inside_dhaka') ? ($highQty * 300) : ($highQty * 500);
        }

        // Priority 2: Medium
        if ($hasMedium) {
            return ($area === 'inside_dhaka') ? ($mediumQty * 150) : ($mediumQty * 250);
        }

        // Priority 3: Normal
        if ($hasNormal) {
            return ($area === 'inside_dhaka') ? 60 : 120;
        }

        // Priority 4: Free
        return 0;
    }

    // 3. Stripe Success Callback (Unchanged)
    public function stripeSuccess(Request $request)
    {
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

    // 4. bKash Callback
    public function bkashCallback(Request $request)
    {
        $status = $request->input('status');
        $paymentId = $request->input('paymentID');
        $orderId = $request->input('order_id');

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
                    $this->cleanupFailedOrder($orderId);
                    return redirect()->route('checkout.index')
                        ->withErrors(['error' => 'bKash Verification Failed: ' . ($executeData['statusMessage'] ?? 'Unknown')]);
                }

            } catch (\Exception $e) {
                $this->cleanupFailedOrder($orderId);
                return redirect()->route('checkout.index')->withErrors(['error' => $e->getMessage()]);
            }
        }

        $this->cleanupFailedOrder($orderId);
        return redirect()->route('checkout.index')->withErrors(['error' => 'Payment Cancelled or Failed.']);
    }

    private function cleanupFailedOrder($orderId)
    {
        if ($orderId) {
            Order::where('id', $orderId)->where('payment_status', 'pending')->delete();
        }
    }

    // 5. Success Page
    public function success()
    {
        if (!session()->has('last_order_id')) {
            return redirect('/');
        }
        $order = Order::with('items')->findOrFail(session('last_order_id'));
        return Inertia::render('Customer/OrderSuccess', [
            'order_id' => session('last_order_id'),
            'order' => $order,
        ]);
    }

    private function clearCart()
    {
        if (Auth::check()) {
            Cart::where('user_id', Auth::id())->delete();
        } else {
            session()->forget('cart');
        }
    }

    private function getCartData()
    {
        $cartItems = [];
        $subtotal = 0;

        // Fetch Logic (Simplified for brevity, keep your existing fetch logic)
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
                        'bussiness_class' => $item->product->bussiness_class, // Keep existing typo if DB has it
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
                        'bussiness_class' => $product->bussiness_class,
                    ];
                    $subtotal += $product->price * $qty;
                }
            }
        }

        // Return 0 for initial delivery. The Frontend React calc handles the display,
        // and the Store method handles the final database value.
        return [
            'items' => $cartItems,
            'totals' => [
                'itemTotal' => round($subtotal, 2),
                'delivery' => 0,
                'grandTotal' => round($subtotal, 2)
            ]
        ];
    }
}