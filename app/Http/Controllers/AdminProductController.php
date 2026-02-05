<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Product;
use App\Models\ProductImage;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class AdminProductController extends Controller
{
    /**
     * Display a listing of the products.
     */
    public function index(Request $request)
    {
        $query = Product::query()->with(['category', 'images']);

        // Filter by Search
        if ($request->search) {
            $query->where('name', 'like', '%' . $request->search . '%');
        }

        // Filter by Category
        if ($request->category) {
            $query->where('category_id', $request->category);
        }

        // Filter by Status
        if ($request->status) {
            if ($request->status === 'instock')
                $query->where('stock', '>', 5);
            if ($request->status === 'lowstock')
                $query->whereBetween('stock', [1, 5]);
            if ($request->status === 'outofstock')
                $query->where('stock', '<=', 0);
        }

        return Inertia::render('Admin/Product/Products', [
            'products' => $query->latest()->paginate(10)->withQueryString(),
            'categories' => Category::all(),
            'filters' => $request->only(['search', 'category', 'status'])
        ]);
    }

    /**
     * Show the form for creating a new product.
     */
    public function create()
    {
        $categories = Category::all();
        return inertia('Admin/Product/ProductForm', ['categories' => $categories]);
    }

    /**
     * Store a newly created product in storage.
     */
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
            'bussiness_class' => 'required|in:free,normal,medium,high',
            'discount' => 'nullable|numeric',
            'gallery' => 'nullable|array',
            'gallery.*' => 'image|mimes:jpeg,png,jpg,webp|max:3072',
        ]);

        // 1. Handle Primary Image Upload
        $imagePath = null;
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('products', 'public');
        }

        // 2. Advanced SKU Generation
        $category = Category::find($validated['category']);
        $categoryName = $category ? $category->name : 'GEN';
        $prefix = strtoupper(substr(preg_replace('/[^A-Za-z0-9]/', '', $categoryName), 0, 3));
        $year = date('y');

        do {
            $random = strtoupper(Str::random(4));
            $sku = "{$prefix}-{$year}-{$random}";
        } while (Product::where('sku', $sku)->exists());

        // 3. Create Product
        $product = Product::create([
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
            'bussiness_class' => $validated['bussiness_class'],
            'discount' => $validated['discount'],
        ]);

        // 4. Handle Gallery Images Upload
        if ($request->hasFile('gallery')) {
            foreach ($request->file('gallery') as $file) {
                $path = $file->store('products/gallery', 'public');
                $product->images()->create([
                    'image_path' => $path
                ]);
            }
        }

        return redirect()->to('/admin/products')->with('success', 'Product created successfully!');
    }

    /**
     * Show the form for editing the specified product.
     */
    public function edit(string $id)
    {
        $categories = Category::all();
        $product = Product::with(['category', 'images'])->findOrFail($id);

        return inertia('Admin/Product/EditProduct', [
            'product' => $product,
            'categories' => $categories
        ]);
    }

    /**
     * Update the specified product in storage.
     */
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
            'image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:3072',
            'quick_view' => 'nullable|string',
            'short_description' => 'nullable|string',
            'bussiness_class' => 'required|in:free,normal,medium,high',
            'discount' => 'nullable|numeric',
            'gallery' => 'nullable|array',
            'gallery.*' => 'image|mimes:jpeg,png,jpg,webp|max:3072',
        ]);

        // 1. Handle Primary Image Update (Deletes old file if new one uploaded)
        if ($request->hasFile('image')) {
            if ($product->image && Storage::disk('public')->exists($product->image)) {
                Storage::disk('public')->delete($product->image);
            }
            $product->image = $request->file('image')->store('products', 'public');
        }

        // 2. Handle Gallery Update (Appends new images)
        if ($request->hasFile('gallery')) {
            foreach ($request->file('gallery') as $file) {
                $path = $file->store('products/gallery', 'public');
                $product->images()->create([
                    'image_path' => $path
                ]);
            }
        }

        // 3. Handle Slug Update
        if ($product->name !== $validated['productName']) {
            $product->slug = Str::slug($validated['productName']) . '-' . Str::random(4);
        }

        // 4. Update Other Fields
        $product->update([
            'name' => $validated['productName'],
            'category_id' => $validated['category'],
            'brand' => $validated['brand'],
            'color' => $validated['color'],
            'weight' => $validated['weight'],
            'length' => $validated['length'],
            'width' => $validated['width'],
            'price' => $validated['price'],
            'stock' => $validated['stock'],
            'description' => $validated['productDetails'],
            'quick_view' => $validated['quick_view'],
            'short_description' => $validated['short_description'],
            'bussiness_class' => $validated['bussiness_class'],
            'discount' => $validated['discount'],
        ]);

        return redirect()->to('/admin/products')->with('success', 'Product updated successfully!');
    }

    /**
     * Remove the specified product from storage.
     */
    public function destroy(string $id)
    {
        $product = Product::with('images')->findOrFail($id);

        // 1. Delete Primary Image from physical storage
        if ($product->image && Storage::disk('public')->exists($product->image)) {
            Storage::disk('public')->delete($product->image);
        }

        // 2. Delete all Gallery Images from physical storage
        foreach ($product->images as $img) {
            if (Storage::disk('public')->exists($img->image_path)) {
                Storage::disk('public')->delete($img->image_path);
            }
        }

        // 3. Delete record from Database
        // (Gallery records will be deleted if foreign key has onDelete('cascade'))
        $product->delete();

        return redirect()->back()->with('success', 'Product and associated images deleted successfully!');
    }

    /**
     * Helper to delete a single gallery image specifically from edit view.
     */
    public function deleteGalleryImage($imageId)
    {
        $image = ProductImage::findOrFail($imageId);

        // Delete physical file
        if (Storage::disk('public')->exists($image->image_path)) {
            Storage::disk('public')->delete($image->image_path);
        }

        // Delete database record
        $image->delete();

        return redirect()->back()->with('success', 'Gallery image removed.');
    }
}