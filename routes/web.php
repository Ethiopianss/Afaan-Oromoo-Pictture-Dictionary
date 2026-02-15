<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\QuizController;
use App\Http\Controllers\WordController;
use App\Http\Controllers\ContributorController;
use App\Http\Controllers\AdminController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Home');
})->name('home');

Route::get('/search', [WordController::class, 'search'])->name('words.search');
Route::get('/categories', [CategoryController::class, 'index'])->name('categories.index');
Route::get('/categories/{id}', [CategoryController::class, 'show'])->name('categories.show');

Route::middleware('auth')->group(function () {
    Route::get('/words/{id}', [WordController::class, 'show'])->name('words.show');
    Route::get('/quiz', [QuizController::class, 'index'])->name('quiz.index');
    Route::post('/quiz/start', [QuizController::class, 'start'])->name('quiz.start');
    Route::post('/quiz/submit', [QuizController::class, 'submit'])->name('quiz.submit');
    
    Route::get('/contributor/dashboard', [ContributorController::class, 'dashboard'])->name('contributor.dashboard');
    Route::get('/contributor/create', [ContributorController::class, 'create'])->name('contributor.create');
    Route::post('/contributor/store', [ContributorController::class, 'store'])->name('contributor.store');
    
    Route::get('/admin/dashboard', [AdminController::class, 'dashboard'])->name('admin.dashboard');
    Route::post('/admin/contributions/{id}/approve', [AdminController::class, 'approveContribution'])->name('admin.contributions.approve');
    Route::post('/admin/contributions/{id}/reject', [AdminController::class, 'rejectContribution'])->name('admin.contributions.reject');
    Route::post('/admin/users/{id}/role', [AdminController::class, 'updateUserRole'])->name('admin.users.role');
    Route::delete('/admin/users/{id}', [AdminController::class, 'deleteUser'])->name('admin.users.delete');
    Route::delete('/admin/words/{id}', [AdminController::class, 'deleteWord'])->name('admin.words.delete');
});

require __DIR__.'/auth.php';
