<?php

use App\Http\Controllers\AuthController;
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
  Route::post('/verify', [AuthController::class, 'me']);
});
