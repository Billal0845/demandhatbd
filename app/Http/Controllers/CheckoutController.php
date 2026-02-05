<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class CheckoutController extends Controller
{
    public function index()
    {
        $cartData = $this->getCartData();

        if (count($cartData['items']) === 0) {
            return redirect('/cart');
        }

        // Guest data structure
        $userData = [
            'name' => '',
            'email' => '',
            'phone' => '',
            'address' => '',
        ];

        return Inertia::render('Customer/Checkout', [
            'cartItems' => $cartData['items'],
            'totals' => $cartData['totals'],
            'auth' => ['user' => $userData]
        ]);
    }

    public function store(Request $request)
    {


        // 1. Validate Input
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'nullable|email|max:255',
            'phone' => ['required', 'string', 'regex:/^(013|014|015|016|017|018|019)[0-9]{8}$/'],
            'address' => 'required|string|max:500',
            'delivery_area' => 'required|in:inside_dhaka,outside_dhaka',
        ], [
            'phone.regex' => 'অনুগ্রহ করে সঠিক 11 ডিজিটের মোবাইল নম্বর দিন (যেমন: 017xxxxxxxx)',
            'delivery_area.required' => 'ডেলিভারি এরিয়া সিলেক্ট করুন',
        ]);

        // 2. Get Fresh Cart Data from Session
        $cartData = $this->getCartData();
        $items = $cartData['items'];

        if (count($items) === 0) {
            return redirect('/')->withErrors(['error' => 'আপনার কার্ট খালি']);
        }

        // 3. Calculate Final Delivery Fee (Backend validation of frontend logic)
        $deliveryFee = $this->calculateDeliveryFee($items, $request->delivery_area);
        $subtotal = $cartData['totals']['itemTotal'];
        $grandTotal = $subtotal + $deliveryFee;

        try {
            // 4. Database Transaction
            $order = DB::transaction(function () use ($request, $items, $subtotal, $deliveryFee, $grandTotal) {

                // Create Order
                $order = Order::create([
                    'user_id' => null, // Guest checkout
                    'name' => $request->name,
                    'email' => $request->email,
                    'phone' => $request->phone,
                    'address' => $request->address,
                    'subtotal' => $subtotal,
                    'delivery_fee' => $deliveryFee,
                    'grand_total' => $grandTotal,
                    'payment_method' => 'cod',
                    'payment_status' => 'pending',
                    'order_status' => 'pending',
                ]);

                // Create Order Items and Update Stock
                foreach ($items as $item) {
                    $product = Product::lockForUpdate()->find($item['id']);

                    if (!$product || $product->stock < $item['quantity']) {
                        throw new \Exception("পণ্য '{$item['name']}' স্টক আউট হয়ে গেছে।");
                    }

                    OrderItem::create([
                        'order_id' => $order->id,
                        'product_id' => $item['id'],
                        'product_name' => $item['name'],
                        'price' => $item['price'],
                        'quantity' => $item['quantity'],
                    ]);

                    $product->decrement('stock', $item['quantity']);
                }

                return $order;
            });



            // 5. Clear Cart & Flash Success
            session()->forget('cart');
            session()->flash('last_order_id', $order->id);

            return redirect()->route('checkout.success');

        } catch (\Exception $e) {

            return back()->withErrors(['error' => $e->getMessage()]);

        }
    }

    private function getCartData()
    {
        $cartItems = [];
        $subtotal = 0;
        $sessionCart = session()->get('cart', []);

        if (!empty($sessionCart)) {
            $products = Product::whereIn('id', array_keys($sessionCart))->get();

            foreach ($products as $product) {
                $qty = $sessionCart[$product->id];
                $originalPrice = (float) $product->price;
                $discountPercent = $product->discount ? (float) $product->discount : 0;
                $discountedPrice = round($originalPrice - ($originalPrice * ($discountPercent / 100)));

                $cartItems[] = [
                    'id' => $product->id,
                    'name' => $product->name,
                    'image' => '/storage/' . $product->image,
                    'price' => $discountedPrice,
                    'quantity' => $qty,
                    'bussiness_class' => $product->bussiness_class,
                    'stock' => $product->stock,
                ];

                $subtotal += ($discountedPrice * $qty);
            }
        }

        return [
            'items' => $cartItems,
            'totals' => [
                'itemTotal' => $subtotal,
                'grandTotal' => $subtotal // Frontend will add delivery fee to this
            ]
        ];
    }

    private function calculateDeliveryFee($items, $area)
    {
        $highQty = 0;
        $mediumQty = 0;
        $hasHigh = false;
        $hasMedium = false;

        foreach ($items as $item) {
            $class = strtolower($item['bussiness_class'] ?? 'normal');
            if ($class === 'high') {
                $hasHigh = true;
                $highQty += $item['quantity'];
            } elseif ($class === 'medium') {
                $hasMedium = true;
                $mediumQty += $item['quantity'];
            }
        }

        if ($hasHigh) {
            return ($area === 'inside_dhaka') ? ($highQty * 300) : ($highQty * 500);
        }
        if ($hasMedium) {
            return ($area === 'inside_dhaka') ? ($mediumQty * 150) : ($mediumQty * 250);
        }

        return ($area === 'inside_dhaka') ? 60 : 120;
    }

    public function success()
    {
        if (!session()->has('last_order_id')) {
            return redirect('/');
        }
        $order = Order::with('items')->findOrFail(session('last_order_id'));
        return Inertia::render('Customer/OrderSuccess', ['order' => $order]);
    }
}