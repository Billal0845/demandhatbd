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

        // Prepare User Data for Auto-fill
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

    // 2. Place Order
    public function store(Request $request)
    {
        // 1. Validate Input
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => ['required', 'string', 'regex:/^(013|014|015|016|017|018|019)[0-9]{8}$/'],
            'address' => 'required|string|max:500',
            'delivery_area' => 'required|in:inside_dhaka,outside_dhaka',
            'payment_method' => 'required|in:cod,stripe,bkash,nagad',
        ]);

        // 2. Get Fresh Cart Data (Secure Calculation)
        $cartData = $this->getCartData();
        $items = $cartData['items'];

        if (count($items) === 0) {
            return redirect('/cart')->withErrors(['cart' => 'Cart is empty']);
        }

        // 3. Calculate Fees
        $deliveryFee = $this->calculateDeliveryFee($items, $request->delivery_area);

        // 4. Prepare Totals
        $totals = [
            'itemTotal' => $cartData['totals']['itemTotal'], // This is the DISCOUNTED subtotal
            'delivery' => $deliveryFee,
            'grandTotal' => $cartData['totals']['itemTotal'] + $deliveryFee
        ];

        try {
            // 5. Database Transaction
            $result = DB::transaction(function () use ($request, $items, $totals) {

                // A. Create Order
                $order = Order::create([
                    'user_id' => Auth::id() ?? null,
                    'name' => $request->name,
                    'email' => $request->email,
                    'phone' => $request->phone,
                    'address' => $request->address,
                    // 'delivery_area' => $request->delivery_area, // Uncomment if you added this column to DB
                    'subtotal' => $totals['itemTotal'],
                    'delivery_fee' => $totals['delivery'],
                    'grand_total' => $totals['grandTotal'],
                    'payment_method' => $request->payment_method,
                    'payment_status' => 'pending',
                    'transaction_id' => null,
                    'order_status' => 'pending',
                ]);

                // B. Create Items & Reduce Stock
                foreach ($items as $item) {
                    // Check Stock
                    $product = Product::lockForUpdate()->find($item['id']);
                    if (!$product || $product->stock < $item['quantity']) {
                        throw new \Exception("Product '{$item['name']}' is out of stock.");
                    }

                    OrderItem::create([
                        'order_id' => $order->id,
                        'product_id' => $item['id'],
                        'product_name' => $item['name'],
                        'price' => $item['price'], // Saves the Discounted Price
                        'quantity' => $item['quantity'],
                    ]);

                    $product->decrement('stock', $item['quantity']);
                }

                if ($request->payment_method === 'cod') {
                    $this->clearCart();
                    session()->flash('last_order_id', $order->id);
                    return ['type' => 'cod', 'order_id' => $order->id];
                } else {
                    return ['type' => 'prepaid', 'order_id' => $order->id];
                }
            });

            // 6. Handle Payment Redirection

            // CASH ON DELIVERY
            if ($result['type'] === 'cod') {
                return redirect()->route('checkout.success');
            }

            // STRIPE
            if ($result['type'] === 'prepaid' && $request->payment_method === 'stripe') {
                Stripe::setApiKey(env('STRIPE_SECRET'));

                $lineItems = [];
                foreach ($items as $item) {
                    $lineItems[] = [
                        'price_data' => [
                            'currency' => 'bdt',
                            'product_data' => ['name' => $item['name']],
                            'unit_amount' => (int) ($item['price'] * 100), // Stripe expects cents/poisha
                        ],
                        'quantity' => $item['quantity'],
                    ];
                }

                // Add Delivery Fee Line Item
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

            // BKASH
            if ($result['type'] === 'prepaid' && $request->payment_method === 'bkash') {
                $bkashService = new BkashPaymentService();
                $callbackUrl = route('checkout.bkash.callback') . '?order_id=' . $result['order_id'];

                $bkashResponse = $bkashService->createPayment(
                    $result['order_id'],
                    $totals['grandTotal'], // Pass the exact calculated total
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

    // --- HELPER: Cart Data & Discount Calculation ---
    private function getCartData()
    {
        $cartItems = [];
        $subtotal = 0;

        // 1. Fetch Cart (DB or Session)
        if (Auth::check()) {
            $rawItems = Cart::with('product')->where('user_id', Auth::id())->get();
            $itemsToProcess = $rawItems;
        } else {
            $sessionCart = session()->get('cart', []);
            $itemsToProcess = [];
            if (!empty($sessionCart)) {
                $products = Product::whereIn('id', array_keys($sessionCart))->get();
                foreach ($products as $product) {
                    // Create a pseudo-object structure to match DB results
                    $obj = new \stdClass();
                    $obj->product_id = $product->id;
                    $obj->product = $product;
                    $obj->quantity = $sessionCart[$product->id];
                    $itemsToProcess[] = $obj;
                }
            }
        }

        // 2. Process Items (Calculate Discounts)
        foreach ($itemsToProcess as $item) {
            if ($item->product) {
                // Discount Logic
                $originalPrice = (float) $item->product->price;
                $discountPercent = $item->product->discount ? (float) $item->product->discount : 0;

                // Formula: Price - (Price * Discount / 100)
                $discountedPrice = $originalPrice - ($originalPrice * ($discountPercent / 100));
                $discountedPrice = round($discountedPrice);

                $cartItems[] = [
                    'id' => $item->product->id,
                    'name' => $item->product->name,
                    'image' => '/storage/' . $item->product->image,
                    'price' => $discountedPrice, // IMPORTANT: Use Discounted Price
                    'quantity' => $item->quantity,
                    'bussiness_class' => $item->product->bussiness_class,
                ];

                $subtotal += $discountedPrice * $item->quantity;
            }
        }

        return [
            'items' => $cartItems,
            'totals' => [
                'itemTotal' => round($subtotal, 2),
                'delivery' => 0, // Initial delivery is 0, calculated in store() or frontend
                'grandTotal' => round($subtotal, 2)
            ]
        ];
    }

    // --- HELPER: Delivery Fee Logic (Matches Frontend) ---
    private function calculateDeliveryFee($items, $area)
    {
        $hasHigh = false;
        $highQty = 0;
        $hasMedium = false;
        $mediumQty = 0;
        $hasNormal = false;

        foreach ($items as $item) {
            $class = strtolower($item['bussiness_class'] ?? 'normal');

            if ($class === 'high') {
                $hasHigh = true;
                $highQty += $item['quantity'];
            } elseif ($class === 'medium') {
                $hasMedium = true;
                $mediumQty += $item['quantity'];
            } else {
                // Catches 'normal' or null/empty
                $hasNormal = true;
            }
        }

        // Priority 1: High Class
        if ($hasHigh) {
            return ($area === 'inside_dhaka') ? ($highQty * 300) : ($highQty * 500);
        }

        // Priority 2: Medium Class
        if ($hasMedium) {
            return ($area === 'inside_dhaka') ? ($mediumQty * 150) : ($mediumQty * 250);
        }

        // Priority 3: Normal Class (Flat Rate)
        if ($hasNormal) {
            return ($area === 'inside_dhaka') ? 60 : 120;
        }

        // Fallback
        return 0;
    }

    // --- STRIPE CALLBACK ---
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

    // --- BKASH CALLBACK ---
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

    // --- UTILITIES ---
    private function cleanupFailedOrder($orderId)
    {
        if ($orderId) {
            // Only delete if it's still pending (prevent deleting paid orders by accident)
            Order::where('id', $orderId)->where('payment_status', 'pending')->delete();
        }
    }

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
}