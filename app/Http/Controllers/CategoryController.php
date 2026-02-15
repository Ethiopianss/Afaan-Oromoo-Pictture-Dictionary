<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Inertia\Inertia;

class CategoryController extends Controller
{
    public function index()
    {
        $categories = Category::withCount(['words' => function($query) {
            $query->whereNotNull('audio_path')
                  ->where('audio_path', '!=', '');
        }])->orderBy('name')->get();
        
        return Inertia::render('Category/Index', [
            'categories' => $categories
        ]);
    }

    public function show($id)
    {
        $category = Category::with(['words' => function($query) {
            $query->whereNotNull('audio_path')
                  ->where('audio_path', '!=', '')
                  ->orderByRaw("CASE WHEN image_path IS NOT NULL AND image_path != '' THEN 0 ELSE 1 END")
                  ->orderBy('word_oromo');
        }])->findOrFail($id);
        
        return Inertia::render('Category/Show', [
            'category' => $category
        ]);
    }
}
