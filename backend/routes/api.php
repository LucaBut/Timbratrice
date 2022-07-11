<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\RegisterController;

Route::options('/{path}', function(){ 
    return '';
})->where('path', '.*');

Route::get('utenti', [RegisterController::class, 'getUser']);

Route::post('reg', [RegisterController::class, 'store']);

Route::post('reg-admin', [RegisterController::class, 'storeAdmin']);

Route::post('change', [RegisterController::class, 'changePassword']);

Route::post('token', [RegisterController::class, 'token']);

Route::post('login', [RegisterController::class, 'login']);

Route::post('start', [RegisterController::class, 'start_day']);

Route::post('fine', [RegisterController::class, 'end_day']);

Route::post('logout', [RegisterController::class, 'logout']);

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
