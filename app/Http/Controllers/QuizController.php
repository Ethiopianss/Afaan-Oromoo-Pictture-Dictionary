<?php

namespace App\Http\Controllers;

use App\Models\QuizAttempt;
use App\Models\Word;
use Illuminate\Http\Request;
use Inertia\Inertia;

class QuizController extends Controller
{
    public function index()
    {
        $attempts = auth()->user()->quizAttempts()->with('category')->latest()->take(10)->get();
        
        return Inertia::render('Quiz/Index', [
            'attempts' => $attempts
        ]);
    }

    public function start(Request $request)
    {
        $categoryId = $request->input('category_id');
        
        $query = Word::with('category');
        if ($categoryId) {
            $query->where('category_id', $categoryId);
        }
        
        $words = $query->inRandomOrder()->take(10)->get();
        
        return response()->json($words);
    }

    public function submit(Request $request)
    {
        $validated = $request->validate([
            'category_id' => 'nullable|exists:categories,id',
            'score' => 'required|integer|min:0',
            'total_questions' => 'required|integer|min:1'
        ]);

        $attempt = QuizAttempt::create([
            'user_id' => auth()->id(),
            'category_id' => $validated['category_id'],
            'score' => $validated['score'],
            'total_questions' => $validated['total_questions']
        ]);

        return response()->json($attempt);
    }
}
