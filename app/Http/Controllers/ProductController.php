<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\Review;
use Illuminate\Support\Facades\Auth;

class ProductController extends Controller
{


    public function showDetails($id)
    {
        // 1. Fetch current product with images
        $product = Product::with('images')->findOrFail($id);

        // 2. Fetch related products (same category, excluding current product)
        $relatedProducts = Product::where('category_id', $product->category_id)
            ->where('id', '!=', $id)
            ->where('stock', '>', 0) // Optional: only show in-stock related items
            ->latest()
            ->take(7) // Show 4 products
            ->get();

        return inertia('Customer/ProductDetailsPage', [
            'product' => $product,
            'relatedProducts' => $relatedProducts,
        ]);
    }


    public function storeReview(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'rating' => 'required|integer|min:1|max:5',
            'review' => 'nullable|string'
        ]);

        Review::create([
            'product_id' => $request->product_id,
            'user_id' => Auth::id(),
            'rating' => $request->rating,
            'review' => $request->review,
            'is_approved' => false,
        ]);

        return back()->with('success', 'Review submitted for approval');
    }


    public function showCart()
    {
        // For simplicity, we'll just return an empty cart for now
        return Inertia::render('Customer/Cart');
    }
}
