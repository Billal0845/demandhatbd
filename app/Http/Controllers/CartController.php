<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CartController extends Controller
{
    public function index()
    {
        $cartItems = [];
        $subtotal = 0;

        // Use ONLY Session Logic now
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
                    'original_price' => $originalPrice,
                    'discount_percent' => $discountPercent,
                    'quantity' => $qty,
                    'description' => $product->short_description ?? '',
                ];

                $subtotal += $discountedPrice * $qty;
            }
        }

        $totals = [
            'itemTotal' => $subtotal,
            'delivery' => $subtotal > 0 ? 60 : 0,
            'discount' => 0,
            'grandTotal' => $subtotal + ($subtotal > 0 ? 60 : 0)
        ];

        return Inertia::render('Customer/Cart', [
            'cartItems' => $cartItems,
            'totals' => $totals
        ]);
    }

    public function store(Request $request)
    {
        $productId = $request->input('product_id');
        $quantity = $request->input('quantity', 1);

        $cart = session()->get('cart', []);
        $cart[$productId] = isset($cart[$productId]) ? $cart[$productId] + $quantity : $quantity;

        session()->put('cart', $cart);
        return redirect()->back()->with('success', 'Product added to cart!');
    }

    public function update(Request $request, $id)
    {
        $cart = session()->get('cart', []);
        if (isset($cart[$id])) {
            $cart[$id] = max(1, $request->input('quantity'));
            session()->put('cart', $cart);
        }
        return redirect()->back();
    }

    public function destroy($id)
    {
        $cart = session()->get('cart', []);
        if (isset($cart[$id])) {
            unset($cart[$id]);
            session()->put('cart', $cart);
        }
        return redirect()->back();
    }
}