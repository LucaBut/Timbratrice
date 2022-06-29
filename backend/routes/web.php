<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Mail;
use App\Http\Controllers\API\RegisterController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Route::get('insert', 'userController@insertfom');
// Route::post('create', 'userController@insert');

// Route::get('/view', 'userController@getUser');

Auth::routes();

Route::get('/', [RegisterController::class, 'sendMail']);

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
