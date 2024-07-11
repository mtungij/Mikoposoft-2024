<?php

use App\Http\Controllers\BranchController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\Employee;
use App\Http\Controllers\InterestFormular;
use App\Http\Controllers\InterestFormularController;
use App\Http\Controllers\LoanCategoryController;
use App\Http\Controllers\LoanCategoryFeeController;
use App\Http\Controllers\LoanController;
use App\Http\Controllers\LoanFeeController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TransactionController;
use App\Http\Middleware\RemoveCommaFromInput;
use App\Models\LoanCategory;
use App\Models\TransactionAccountController;
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
    ->middleware(['auth','verified', RemoveCommaFromInput::class])
    ->only(['index','store','update']);

Route::resource('/loan-category-fees', LoanCategoryFeeController::class)
    ->only(['store', 'update', 'destroy'])
    ->middleware(['auth', 'verified', RemoveCommaFromInput::class]);

Route::resource('/formulas',InterestFormularController::class)
    ->middleware(['auth','verified'])
    ->only(['index','store','destroy']);

Route::resource('/transactions',TransactionController::class)
    ->middleware(['auth','verified'])
    ->only(['index','store','destroy']);

Route::resource('/branches',BranchController::class)
    ->middleware(['auth','verified'])
    ->only(['index','store','update']);

Route::resource('/customers',CustomerController::class)
    ->middleware(['auth','verified'])
    ->only(['index', 'create', 'edit', 'view', 'store','update','destroy']);

Route::controller(LoanController::class)->middleware(['auth', 'verified'])->group(function () {
    Route::get('/loans', 'index')->name('loans.index');
});


require __DIR__.'/auth.php';
