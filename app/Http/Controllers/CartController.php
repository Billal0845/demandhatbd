<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class CartController extends Controller
{
    // Display the Cart Page
    public function index()
    {
        $cartItems = [];
        $subtotal = 0;

        if (Auth::check()) {
            // --- Logged In Logic (Database) ---
            $dbCart = Cart::with('product')->where('user_id', Auth::id())->get();

            foreach ($dbCart as $item) {
                if ($item->product) {
                    // 1. Get Values
                    $originalPrice = (float) $item->product->price;
                    $discountPercent = $item->product->discount ? (float) $item->product->discount : 0;

                    // 2. Calculate Discounted Price
                    // Formula: Price - (Price * Discount / 100)
                    $discountedPrice = $originalPrice - ($originalPrice * ($discountPercent / 100));
                    $discountedPrice = round($discountedPrice); // Round to avoid decimals (e.g. 99.99 -> 100)

                    $cartItems[] = [
                        'id' => $item->product_id,
                        'name' => $item->product->name,
                        'image' => '/storage/' . $item->product->image,

                        // Pass the DISCOUNTED price as the main price
                        'price' => $discountedPrice,

                        // Pass original data for UI (Strikethrough / Badges)
                        'original_price' => $originalPrice,
                        'discount_percent' => $discountPercent,

                        'quantity' => $item->quantity,
                        'description' => $item->product->short_description ?? '',
                    ];

                    // 3. Add to Subtotal (Discounted Price * Qty)
                    $subtotal += $discountedPrice * $item->quantity;
                }
            }

        } else {
            // --- Guest Logic (Session) ---
            $sessionCart = session()->get('cart', []);

            if (!empty($sessionCart)) {
                $products = Product::whereIn('id', array_keys($sessionCart))->get();

                foreach ($products as $product) {
                    $qty = $sessionCart[$product->id];

                    // 1. Get Values
                    $originalPrice = (float) $product->price;
                    $discountPercent = $product->discount ? (float) $product->discount : 0;

                    // 2. Calculate Discounted Price
                    $discountedPrice = $originalPrice - ($originalPrice * ($discountPercent / 100));
                    $discountedPrice = round($discountedPrice);

                    $cartItems[] = [
                        'id' => $product->id,
                        'name' => $product->name,
                        'image' => '/storage/' . $product->image,
                        'price' => $discountedPrice, // Main price is now the discounted one
                        'original_price' => $originalPrice,
                        'discount_percent' => $discountPercent,
                        'quantity' => $qty,
                        'description' => $product->short_description ?? '',
                    ];

                    // 3. Add to Subtotal
                    $subtotal += $discountedPrice * $qty;
                }
            }
        }

        // --- Totals Calculation ---
        $delivery = $subtotal > 0 ? 60 : 0; // Fixed delivery charge example

        // Placeholder for future Coupon Logic
        $couponDiscount = 0;

        $totals = [
            'itemTotal' => $subtotal, // Sum of Discounted Prices
            'delivery' => $delivery,
            'discount' => $couponDiscount, // Kept 0 for now (Frontend "Coupon" section)
            'grandTotal' => $subtotal + $delivery - $couponDiscount
        ];

        return Inertia::render('Customer/Cart', [
            'cartItems' => $cartItems,
            'totals' => $totals
        ]);
    }

    // Add Item to Cart
    public function store(Request $request)
    {
        $productId = $request->input('product_id');
        $quantity = $request->input('quantity', 1);

        $product = Product::find($productId);

        if (!$product) {
            return back()->withErrors(['error' => 'Product not found']);
        }

        if (Auth::check()) {
            // --- Database Logic ---
            $cartItem = Cart::where('user_id', Auth::id())
                ->where('product_id', $productId)
                ->first();

            if ($cartItem) {
                $cartItem->quantity += $quantity;
                $cartItem->save();
            } else {
                Cart::create([
                    'user_id' => Auth::id(),
                    'product_id' => $productId,
                    'quantity' => $quantity
                ]);
            }
        } else {
            // --- Session Logic ---
            $cart = session()->get('cart', []);

            if (isset($cart[$productId])) {
                $cart[$productId] += $quantity;
            } else {
                $cart[$productId] = $quantity;
            }

            session()->put('cart', $cart);
        }

        return redirect()->back()->with('success', 'Product added to cart!');
    }

    // Update Quantity
    public function update(Request $request, $id)
    {
        $quantity = max(1, $request->input('quantity')); // Prevent 0 or negative

        if (Auth::check()) {
            // --- Database ---
            Cart::where('user_id', Auth::id())
                ->where('product_id', $id)
                ->update(['quantity' => $quantity]);
        } else {
            // --- Session ---
            $cart = session()->get('cart', []);
            if (isset($cart[$id])) {
                $cart[$id] = $quantity;
                session()->put('cart', $cart);
            }
        }

        return redirect()->back();
    }

    // Remove Item
    public function destroy($id)
    {
        if (Auth::check()) {
            // --- Database ---
            Cart::where('user_id', Auth::id())
                ->where('product_id', $id)
                ->delete();
        } else {
            // --- Session ---
            $cart = session()->get('cart', []);
            if (isset($cart[$id])) {
                unset($cart[$id]);
                session()->put('cart', $cart);
            }
        }

        return redirect()->back();
    }
}