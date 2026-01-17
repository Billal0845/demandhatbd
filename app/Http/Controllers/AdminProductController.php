<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class AdminProductController extends Controller
{
    public function index()
    {
        $products = Product::with('category')->latest()->paginate(5);

        return inertia('Admin/Product/Products', [
            'products' => $products,
        ]);
    }

    public function create()
    {
        $categories = Category::all();
        return inertia('Admin/Product/ProductForm', ['categories' => $categories]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'productName' => 'required|string|max:255',
            'category' => 'required|exists:categories,id',
            'brand' => 'nullable|string|max:100',
            'color' => 'nullable|string|max:50',
            'weight' => 'nullable|numeric',
            'length' => 'nullable|numeric',
            'width' => 'nullable|numeric',
            'price' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
            'productDetails' => 'required|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:3072',
            'quick_view' => 'nullable|string',
            'short_description' => 'nullable|string',
        ]);

        // 1. Handle Image Upload
        $imagePath = null;
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('products', 'public');
        }

        // 2. Advanced SKU Generation
        $categoryName = Category::find($validated['category'])->name ?? 'GEN';
        // Sanitize category name (keep only letters/numbers) and take first 3
        $prefix = strtoupper(substr(preg_replace('/[^A-Za-z0-9]/', '', $categoryName), 0, 3));
        $year = date('y');

        do {
            $random = strtoupper(Str::random(4));
            $sku = "{$prefix}-{$year}-{$random}";
        } while (Product::where('sku', $sku)->exists());

        // 3. Create Product
        Product::create([
            'name' => $validated['productName'],
            'slug' => Str::slug($validated['productName']) . '-' . Str::random(4),
            'category_id' => $validated['category'],
            'sku' => $sku,
            'brand' => $validated['brand'],
            'color' => $validated['color'],
            'weight' => $validated['weight'],
            'length' => $validated['length'],
            'width' => $validated['width'],
            'price' => $validated['price'],
            'stock' => $validated['stock'],
            'description' => $validated['productDetails'],
            'image' => $imagePath,
            'quick_view' => $validated['quick_view'],
            'short_description' => $validated['short_description'],
        ]);

        return redirect()->to('/admin/products')->with('success', 'Product created successfully!');
    }

    public function edit(string $id)
    {
        $categories = Category::all();
        $product = Product::with('category')->findOrFail($id);

        return inertia('Admin/Product/EditProduct', [
            'product' => $product,
            'categories' => $categories
        ]);
    }

    public function update(Request $request, string $id)
    {
        $product = Product::findOrFail($id);

        $validated = $request->validate([
            'productName' => 'required|string|max:255',
            'category' => 'required|exists:categories,id',
            'brand' => 'nullable|string|max:100',
            'color' => 'nullable|string|max:50',
            'weight' => 'nullable|numeric',
            'length' => 'nullable|numeric',
            'width' => 'nullable|numeric',
            'price' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
            'productDetails' => 'required|string',
            // FIXED: Standardized max size to 3072 to match store method
            'image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:3072',
            'quick_view' => 'nullable|string',
            'short_description' => 'nullable|string',
        ]);

        // 1. Handle Image
        if ($request->hasFile('image')) {
            if ($product->image && Storage::disk('public')->exists($product->image)) {
                Storage::disk('public')->delete($product->image);
            }
            $product->image = $request->file('image')->store('products', 'public');
        }

        // 2. Handle Slug Update (FIXED LOGIC)
        // Check if name changed BEFORE assigning the new name
        if ($product->name !== $validated['productName']) {
            $product->slug = Str::slug($validated['productName']) . '-' . Str::random(4);
        }

        // 3. Assign other fields
        $product->name = $validated['productName'];
        $product->category_id = $validated['category'];
        $product->brand = $validated['brand'];
        $product->color = $validated['color'];
        $product->weight = $validated['weight'];
        $product->length = $validated['length'];
        $product->width = $validated['width'];
        $product->price = $validated['price'];
        $product->stock = $validated['stock'];
        $product->description = $validated['productDetails'];
        $product->quick_view = $validated['quick_view'];
        $product->short_description = $validated['short_description'];

        $product->save();

        // Assuming you have a named route, otherwise use ->to('/admin/products')
        return redirect()->to('/admin/products')->with('success', 'Product updated successfully!');
    }

    public function destroy(string $id)
    {
        // FIXED: findOr -> findOrFail
        $product = Product::findOrFail($id);

        if ($product->image && Storage::disk('public')->exists($product->image)) {
            Storage::disk('public')->delete($product->image);
        }

        $product->delete();

        return redirect()->back()->with('success', 'Product deleted successfully!');
    }
}