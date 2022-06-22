<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\RegisterController;

Route::options('/{path}', function(){ 
    return '';
})->where('path', '.*');

Route::get('utenti', [RegisterController::class, 'getUser']);

Route::post('reg', [RegisterController::class, 'store']);

Route::post('login', [RegisterController::class, 'login']);

Route::post('start', [RegisterController::class], 'start_day');

Route::middleware(['auth:sanctum'])->group(function() {
    Route::post('logout', [RegisterController::class, 'logout']);
});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Broadcast::routes(['middleware' => ['auth:sanctum']]);

