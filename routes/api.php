<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\SignupController;



Route::prefix('contacts')->group(function () {
    Route::get('/', [ContactController::class, 'index']);     
    Route::post('/', [ContactController::class, 'store']);    
    Route::put('/{id}', [ContactController::class, 'update']);  
    Route::delete('/{id}', [ContactController::class, 'destroy']); 
});


Route::post('/register', [SignupController::class, 'register']);
