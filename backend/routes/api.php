<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\TourController;
use App\Http\Controllers\BookingController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('signup', [UserController::class, 'signup']);
Route::post('login', [UserController::class, 'login']);

Route::get('users', [UserController::class, 'index']);
Route::get('tours', [TourController::class, 'index']);
Route::get('tours/{id}', [TourController::class, 'show']);
Route::get('logout', [UserController::class, 'logout']);
Route::get('bookings', [BookingController::class, 'index']);
Route::post('bookings', [BookingController::class, 'store']);
Route::post('tours', [TourController::class, 'store']);
Route::get('/users/{user_id}/bookings', [BookingController::class, 'getUserBookings']);
Route::put('/user/{user_id}', [UserController::class, 'updateProfile']);


Route::delete('/tours/{id}', [TourController::class, 'destroy']);
Route::delete('/bookings/{id}', [BookingController::class, 'destroy']);
Route::delete('/users/{id}', [UserController::class, 'destroy']);


Route::put('/tours/{id}', [TourController::class, 'update']);
Route::put('/bookings/{id}', [BookingController::class, 'update']);
Route::put('/users/{id}', [UserController::class, 'update']);

