<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Inertia\Inertia;

class ProductController extends Controller
{


    public function showDetails($id)
    {

        $product = Product::findOrFail($id);

        return inertia('Customer/ProductDetailsPage', [
            'product' => $product,
        ]);
    }

    public function showCart()
    {
        // For simplicity, we'll just return an empty cart for now
        return Inertia::render('Customer/Cart');
    }
}
