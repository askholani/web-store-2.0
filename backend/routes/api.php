<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\ProductController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
  return $request->user();
})->middleware('auth:sanctum');

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('checkAuth')->group(function () {
  Route::get('/profile', [AuthController::class, 'profile']);
  Route::get('/resend', [AuthController::class, 'resend']);
  Route::post('/me', [AuthController::class, 'me']);
  Route::post('/verify', [AuthController::class, 'verify']);
  Route::post('/profile/complete', [AuthController::class, 'completeProfile']);
  Route::post('/products/wishlist', [ProductController::class, 'sendToWishlist']);

  Route::prefix('/cart')->group(function () {
    Route::post('/store', [CartController::class, 'store']);
    Route::get('/', [CartController::class, 'index']);
  });


  Route::get('/wishlist', [ProductController::class, 'getWishlist']);
});
Route::get('/products', [ProductController::class, 'index']);
Route::get('/products/detail', [ProductController::class, 'detail']);
Route::get('/images', [AuthController::class, 'getImages']);
Route::post('/images/store', [AuthController::class, 'storeNewProduct']);
