<?php

use App\Http\Controllers\Admin\CategoryController as AdminCategoryController;
use App\Http\Controllers\Admin\DashboardController as AdminDashboardController;
use App\Http\Controllers\Admin\ItemController as AdminItemController;
use App\Http\Controllers\Admin\RentalController as AdminRentalController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;

Route::inertia('/', 'welcome', [
    'canRegister' => Features::enabled(Features::registration()),
])->name('home');

// Route khusus admin
Route::middleware(['auth', 'admin', 'verified'])->prefix('admin')->name('admin.')->group(function () {
    // ? Admin Dashboard
    Route::get('/dashboard', [AdminDashboardController::class, 'index'])->name('dashboard');

    // ? INVENTORY
    // ! Category
    Route::resource('category', AdminCategoryController::class);

    // ! Items
    Route::resource('item', AdminItemController::class);

    // ! Rental
    Route::resource('rental', AdminRentalController::class);
});


// Route khusus user
Route::middleware(['auth', 'verified', 'redirectAdmin'])->group(function () {

    // ? DASHBOARD
    Route::get('/dashboard', [UserController::class, 'indexDashboard'])->name('dashboard');
    // Route::inertia('/dashhboard', 'dashboard')->name('dashboard');
    // Route::inertia('customers', 'customers')->name('customers');


});

require __DIR__ . '/settings.php';
