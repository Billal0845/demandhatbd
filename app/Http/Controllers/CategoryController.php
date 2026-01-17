<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category;

class CategoryController extends Controller
{
    public function createCategory()
    {
        $categories = Category::all();
        return inertia('Admin/CategoryForm', compact('categories'));
    }

    public function storeCategory(Request $request)
    {
        $data = $request->validate([
            'name' => 'string|max:255|unique:categories,name',
        ]);

        Category::create([
            'name' => $request->name,
        ]);

        return redirect()->back()->with('success', 'Category created successfully!');
    }


    public function getAllCategory()
    {
        $categories = Category::paginate(8);

        return inertia('Admin/CategoriesList', ['categories' => $categories]);
    }


    public function destroyCategory($id)
    {
        Category::where('id', $id)->delete();

        return redirect()->back()->with('success', 'Category deleted successfully!');
    }

    public function editParentCategory($id)
    {
        $category = Category::findOrFail($id);
        return inertia('Admin/EditCategory', compact('category'));
    }

    public function updateCategory(Request $request, $id)
    {

        $request->validate([
            'name' => 'required|string|max:255|unique:categories',
        ]);

        $category = Category::findOrFail($id);
        $category->update(['name' => $request->name]);


        return redirect('/admin/categories')->with('success', 'Category updated successfully');
    }






}
