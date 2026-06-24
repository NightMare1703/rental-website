<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Item;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $items = Item::with('images')->latest()->get();
        $categories = Category::all();
        return Inertia::render('admin/item', [
            'items' => $items,
            'categories' => $categories,
            'showCreateCategoryModal' => true,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:categories,slug',
        ], [
            'name' => 'Kategori wajib diisi.',
            'name.string' => 'Kategori harus berupa teks.',
            'name.max' => 'Kategori tidak boleh lebih dari 255 karakter.',
        ]);
        Category::create($validated);

        Inertia::flash('message', 'Kategori berhasil dibuat.');

        return redirect()->route('admin.item.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Category $category)
    {
        return Inertia::render('admin/item', [
            'category' => $category,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Category $category)
    {
        $category->findOrFail($category->id);

        $validated =  $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:categories,slug,' . $category->id,
        ], [
            'name' => 'Kategori wajib diisi.',
            'name.string' => 'Kategori harus berupa teks.',
            'name.max' => 'Kategori tidak boleh lebih dari 255 karakter.',
        ]);

        $category->update($validated);

        Inertia::flash('message', 'Kategori berhasil diubah.');

        return redirect()->back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Category $category)
    {
        $category->delete($category->id);

        Inertia::flash('message', 'Kategori berhasil dihapus.');

        return redirect()->route('admin.item.index');
    }
}
