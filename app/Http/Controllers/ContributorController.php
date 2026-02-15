<?php

namespace App\Http\Controllers;

use App\Models\Contribution;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ContributorController extends Controller
{
    public function dashboard()
    {
        if (!auth()->user()->isContributor() && !auth()->user()->isAdmin()) {
            abort(403, 'Unauthorized');
        }
        
        $contributions = auth()->user()->contributions()->with('category')->latest()->get();
        return Inertia::render('Contributor/Dashboard', [
            'contributions' => $contributions
        ]);
    }

    public function create()
    {
        if (!auth()->user()->isContributor() && !auth()->user()->isAdmin()) {
            abort(403, 'Unauthorized');
        }
        
        $categories = Category::all();
        return Inertia::render('Contributor/Create', [
            'categories' => $categories
        ]);
    }

    public function store(Request $request)
    {
        if (!auth()->user()->isContributor() && !auth()->user()->isAdmin()) {
            abort(403, 'Unauthorized');
        }
        
        $validated = $request->validate([
            'category_id' => 'required|exists:categories,id',
            'word_oromo' => 'required|string|max:255',
            'word_english' => 'required|string|max:255',
            'definition' => 'nullable|string',
            'image' => 'nullable|image|max:2048',
            'audio' => 'required|file|mimes:mp3,wav,ogg|max:5120',
        ]);

        $data = $validated;
        $data['user_id'] = auth()->id();

        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('contributions/images', 'public');
            $data['image_path'] = '/storage/' . $imagePath;
        }

        if ($request->hasFile('audio')) {
            $audioPath = $request->file('audio')->store('contributions/audio', 'public');
            $data['audio_path'] = '/storage/' . $audioPath;
        }

        Contribution::create($data);

        return redirect()->route('contributor.dashboard')->with('success', 'Contribution submitted successfully!');
    }
}
