<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\PostController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::group(["middleware" => "auth:api"], function(){
    Route::group(["prefix" => "user"], function(){
        Route::get("profile", [AuthController::class, "profile"]);
        Route::post("logout", [AuthController::class, "logout"]);
        Route::post("refresh", [AuthController::class, "refresh"]);
        Route::post("posts", [PostController::class, "getPosts"]);
        Route::post("create", [PostController::class, "store"]);
        Route::post('{id}/follow', [PostController::class, 'followUser']);
        Route::post('search', [PostController::class, 'searchUser']);
        Route::post('like/{id}', [PostController::class, 'likePost']);
    });


});

Route::group(["prefix" => "guest"], function(){
    Route::post("login", [AuthController::class, "login"]);
    Route::post("register", [AuthController::class, "register"]);
});