<?php

namespace App\Http\Controllers;

use App\Models\Word;
use Illuminate\Http\Request;
use Inertia\Inertia;

class WordController extends Controller
{
    public function search(Request $request)
    {
        $query = $request->input('q');
        
        $words = Word::with('category')
            ->whereNotNull('audio_path')
            ->where('audio_path', '!=', '')
            ->where(function($q) use ($query) {
                $q->where('word_oromo', 'like', "%{$query}%")
                  ->orWhere('word_english', 'like', "%{$query}%");
            })
            ->get()
            ->map(function ($word) use ($request) {
                return [
                    'id' => $word->id,
                    'word_oromo' => $word->word_oromo,
                    'word_english' => $word->word_english,
                    'definition' => $word->definition,
                    'category' => $word->category->name,
                    'image_path' => $request->user() ? $word->image_path : null,
                    'audio_path' => $request->user() ? $word->audio_path : null,
                ];
            });

        return response()->json($words);
    }

    public function show($id)
    {
        $word = Word::with('category')->findOrFail($id);
        
        return Inertia::render('Word/Show', [
            'word' => $word
        ]);
    }
}
