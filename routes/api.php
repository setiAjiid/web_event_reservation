<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\VenueController;
use App\Http\Controllers\FeedbackController;

// routes/api.php
Route::post('/feedback', [FeedbackController::class, 'store']);

// --- Event Filter Route ---
Route::get('/events/filter', [EventController::class, 'filter']);

// --- Venue Routes ---
Route::get('/venues-with-events', [VenueController::class, 'withEventCount']);

// --- Authentication Routes ---
Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);


// --- Event Routes ---
// GET /api/events 
Route::get('/events', [EventController::class, 'index']);
// GET /api/events/recommendations 
Route::get('/events/recommendations', [EventController::class, 'recommendations']);
// GET /api/events/{event} 
Route::get('/events/{event}', [EventController::class, 'show']);
Route::get('/events/search', [EventController::class, 'search']);


// --- Customer Routes ---
// POST /api/customers 
Route::post('/customers', [CustomerController::class, 'store']);
// GET /api/customers/{customer} -> Lihat profil
Route::get('/customers/{customer}', [CustomerController::class, 'show']);
// PUT /api/customers/{customer} -> Ubah profil
Route::put('/customers/{customer}', [CustomerController::class, 'update']);

    
// --- Booking & Transaction Routes ---
// POST /api/bookings -> Booking tiket
Route::post('/bookings', [BookingController::class, 'store']);
// GET /api/bookings/history/{userId} -> History tiket
Route::get('/bookings/history/{userId}', [BookingController::class, 'history']);
// POST /api/bookings/{booking}/refund -> Refund tiket
Route::post('/bookings/{booking}/refund', [BookingController::class, 'refund']);

Route::post('/bookings/{booking}/pay', [BookingController::class, 'pay']);