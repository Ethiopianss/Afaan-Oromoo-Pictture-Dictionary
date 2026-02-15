<?php

namespace App\Http\Controllers;

use App\Models\Contribution;
use App\Models\User;
use App\Models\Word;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function dashboard()
    {
        if (!auth()->user()->isAdmin()) {
            abort(403, 'Unauthorized');
        }
        
        $contributions = Contribution::with(['user', 'category'])->latest()->get();
        $users = User::latest()->get();
        $words = Word::with('category')->latest()->get();
        
        return Inertia::render('Admin/Dashboard', [
            'contributions' => $contributions,
            'users' => $users,
            'words' => $words
        ]);
    }

    public function approveContribution($id)
    {
        if (!auth()->user()->isAdmin()) {
            abort(403, 'Unauthorized');
        }
        
        $contribution = Contribution::findOrFail($id);
        
        Word::create([
            'word_oromo' => $contribution->word_oromo,
            'word_english' => $contribution->word_english,
            'definition' => $contribution->definition,
            'image_path' => $contribution->image_path,
            'audio_path' => $contribution->audio_path,
            'category_id' => $contribution->category_id,
        ]);

        $contribution->update(['status' => 'approved']);

        return back()->with('success', 'Contribution approved!');
    }

    public function rejectContribution(Request $request, $id)
    {
        if (!auth()->user()->isAdmin()) {
            abort(403, 'Unauthorized');
        }
        
        $validated = $request->validate([
            'rejection_reason' => 'required|string'
        ]);

        $contribution = Contribution::findOrFail($id);
        $contribution->update([
            'status' => 'rejected',
            'rejection_reason' => $validated['rejection_reason']
        ]);

        return back()->with('success', 'Contribution rejected!');
    }

    public function updateUserRole(Request $request, $id)
    {
        if (!auth()->user()->isAdmin()) {
            abort(403, 'Unauthorized');
        }
        
        $validated = $request->validate([
            'role' => 'required|in:learner,contributor,admin'
        ]);

        $user = User::findOrFail($id);
        $user->update(['role' => $validated['role']]);

        return back()->with('success', 'User role updated!');
    }

    public function deleteUser($id)
    {
        if (!auth()->user()->isAdmin()) {
            abort(403, 'Unauthorized');
        }
        
        User::findOrFail($id)->delete();
        return back()->with('success', 'User deleted!');
    }

    public function deleteWord($id)
    {
        if (!auth()->user()->isAdmin()) {
            abort(403, 'Unauthorized');
        }
        
        Word::findOrFail($id)->delete();
        return back()->with('success', 'Word deleted!');
    }
}
