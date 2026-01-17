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
                    $price = $item->product->price;
                    $cartItems[] = [
                        'id' => $item->product_id, // We use product_id as reference for actions
                        'name' => $item->product->name,
                        'image' => '/storage/' . $item->product->image, // Ensure correct path
                        'price' => (float) $price,
                        'quantity' => $item->quantity,
                        'description' => $item->product->short_description ?? '',
                    ];
                    $subtotal += $price * $item->quantity;
                }
            }

        } else {
            // --- Guest Logic (Session) ---
            $sessionCart = session()->get('cart', []);

            // $sessionCart is structured as [ product_id => quantity ]
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
                        'description' => $product->short_description ?? '',
                    ];
                    $subtotal += $product->price * $qty;
                }
            }
        }

        // Calculate Totals
        $delivery = $subtotal > 0 ? 60 : 0; // Example fixed delivery
        $totals = [
            'itemTotal' => round($subtotal, 2),
            'delivery' => $delivery,
            'discount' => 0,
            'grandTotal' => round($subtotal + $delivery, 2)
        ];

        return Inertia::render('Customer/Cart', [
            'cartItems' => $cartItems,
            'totals' => $totals
        ]);
    }

    // Add Item to Cart
    public function store(Request $request)
    {
        ;
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