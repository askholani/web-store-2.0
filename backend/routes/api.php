<?php

use App\Http\Controllers\AuthController;
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
});
Route::get('/products', [ProductController::class, 'index']);
Route::get('/images', [AuthController::class, 'getImages']);
Route::post('/images/store', [AuthController::class, 'storeNewProduct']);