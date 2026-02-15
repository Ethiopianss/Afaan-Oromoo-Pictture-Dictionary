<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Inertia\Inertia;

class CategoryController extends Controller
{
    public function index()
    {
        $categories = Category::withCount('words')->orderBy('name')->get();
        
        return Inertia::render('Category/Index', [
            'categories' => $categories
        ]);
    }

    public function show($id)
    {
        $category = Category::with('words')->findOrFail($id);
        
        return Inertia::render('Category/Show', [
            'category' => $category
        ]);
    }
}
