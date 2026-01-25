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

        $product = Product::findOrFail($id);

        return inertia('Customer/ProductDetailsPage', [
            'product' => $product,
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
