<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Item;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ItemController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $items = Item::with('images')->with('category')->latest()->get();
        $categories = Category::latest('id')->get();
        return Inertia::render('admin/item', [
            'items' => $items,
            'categories' => $categories,
            'showCreateCategoryModal' => false,
            'showCreateItemModal' => false,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $items = Item::with('images')->latest()->get();
        $categories = Category::all();
        return inertia(
            'admin/item',
            [
                'items' => $items,
                'categories' => $categories,
                'showCreateItemModal' => true,
            ]
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'category_id' => 'required|exists:categories,id',
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price_per_day' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
            'images' => 'nullable|array|max:5',
            'images.*' => 'image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ], [
            'category_id.required' => 'Kategori wajib dipilih.',
            'category_id.exists' => 'Kategori yang dipilih tidak valid.',
            'name.required' => 'Nama item wajib diisi.',
            'name.string' => 'Nama item harus berupa teks.',
            'name.max' => 'Nama item tidak boleh lebih dari 255 karakter.',
            'description.string' => 'Deskripsi item harus berupa teks.',
            'price_per_day.required' => 'Harga per hari wajib diisi.',
            'price_per_day.numeric' => 'Harga per hari harus berupa angka.',
            'price_per_day.min' => 'Harga per hari tidak boleh kurang dari 0.',
            'stock.required' => 'Stok wajib diisi.',
            'stock.integer' => 'Stok harus berupa angka bulat.',
            'stock.min' => 'Stok tidak boleh kurang dari 0.',
            'images.*.image' => 'File yang diunggah harus berupa gambar.',
            'images.*.mimes' => 'Format gambar yang diperbolehkan: jpeg, png, jpg, gif, svg.',
            'images.*.max' => 'Ukuran gambar tidak boleh lebih dari 2MB.',
        ]);

        $item = Item::create($validated);

        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $index => $image) {
                $path = $image->store('items/images/' . $request->name, 'public');
                $item->images()->create([
                    'path' => $path,
                    'order' => $index,
                ]);
            }
        }

        Inertia::flash('message', 'Item berhasil ditambahkan!');
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
    public function edit(Item $item)
    {
        $categories = Category::all();

        return Inertia::render('admin/item', [
            'item' => $item->load(['category', 'images']),
            'categories' => $categories,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Item $item)
    {
        $validated = $request->validate([
            'category_id' => 'required|exists:categories,id',
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price_per_day' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
            'images' => 'nullable|array|max:5',
            'images.*' => 'image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'deleted_image_ids' => 'nullable|array',
            'deleted_image_ids.*' => 'integer',
        ], [
            'category_id.required' => 'Kategori wajib dipilih.',
            'category_id.exists' => 'Kategori yang dipilih tidak valid.',
            'name.required' => 'Nama item wajib diisi.',
            'name.string' => 'Nama item harus berupa teks.',
            'name.max' => 'Nama item tidak boleh lebih dari 255 karakter.',
            'description.string' => 'Deskripsi item harus berupa teks.',
            'price_per_day.required' => 'Harga per hari wajib diisi.',
            'price_per_day.numeric' => 'Harga per hari harus berupa angka.',
            'price_per_day.min' => 'Harga per hari tidak boleh kurang dari 0.',
            'stock.required' => 'Stok wajib diisi.',
            'stock.integer' => 'Stok harus berupa angka bulat.',
            'stock.min' => 'Stok tidak boleh kurang dari 0.',
            'images.*.image' => 'File yang diunggah harus berupa gambar.',
            'images.*.mimes' => 'Format gambar yang diperbolehkan: jpeg, png, jpg, gif, svg.',
            'images.*.max' => 'Ukuran gambar tidak boleh lebih dari 2MB.',
            'deleted_image_ids.*.integer' => 'ID gambar yang dihapus harus berupa angka.',
            'deleted_image_ids.*.exists' => 'ID gambar yang dihapus tidak ditemukan.',
        ]);

        if ($request->has('deleted_image_ids')) {
            foreach ($request->deleted_image_ids as $imageId) {
                $image = $item->images()->find($imageId);
                if ($image) {
                    Storage::disk('public')->delete($image->path);
                    $image->delete();
                }
                // echo $image;
            }
        }

        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $index => $image) {
                $path = $image->store('items/images/' . $request->name, 'public');
                $item->images()->create([
                    'path' => $path,
                    'order' => $index,
                ]);
            }
        }

        $item->update($validated);

        Inertia::flash('message', 'Item berhasil diperbarui!');
        return redirect()->route('admin.item.index');
        // dd($request->deleted_image_ids);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Item $item)
    {
        foreach ($item->images as $image) {
            Storage::disk('public')->delete($image->path);
        }

        $item->delete();

        Inertia::flash('message', 'Item berhasil dihapus!');
        return redirect()->route('admin.item.index');
    }
}