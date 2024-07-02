<?php

use App\Http\Controllers\Employee;
use App\Http\Controllers\LoanCategoryController;
use App\Http\Controllers\LoanFeeController;
use App\Http\Controllers\ProfileController;
use App\Http\Middleware\RemoveCommaFromInput;
use App\Models\LoanCategory;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::resource('/employees', Employee::class)  
    ->middleware(['auth','verified']);

Route::resource('/loan-products', LoanCategoryController::class)
    ->middleware(['auth','verified', RemoveCommaFromInput::class])
    ->only(['index','store','update']);

Route::resource('/loan-fees', LoanFeeController::class)
    ->middleware(['auth','verified'])
    ->only(['index','store','update']);


require __DIR__.'/auth.php';
