<?php


use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LeadController;
use App\Http\Controllers\LeadStatusController;

Route::get('/leads', [LeadController::class, 'index']);
Route::post('/leads', [LeadController::class, 'store']);
Route::get('/leads/{lead}', [LeadController::class, 'show']);
Route::put('/leads/{lead}', [LeadController::class, 'update']);
Route::delete('/leads/{lead}', [LeadController::class, 'destroy']);

Route::get('/lead-statuses', [LeadStatusController::class, 'index']);
