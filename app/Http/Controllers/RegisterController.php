<?php

namespace App\Http\Controllers; //Laravel tahu file ini ada di folder App\Http\Controllers
use Illuminate\Support\Facades\Hash; //pakai class Hash buat ngecek apakah password cocok dengan yang ada di database
use Illuminate\Http\Request; //pakai class Request buat ambil data dari user
use App\Models\Customer; //pakai model Customer buat ambil data user dari tabel Customers

public function register(Request $request)
{
    $validated = $request->validate([
        'name' => 'required|string',
        'email' => 'required|email|unique:customers',
        'phone' => 'required|string',
        'password' => 'required|string|min:6',
    ]);

    $user = Customer::create([
        'name' => $validated['name'],
        'email' => $validated['email'],
        'phone' => $validated['phone'],
        'password' => Hash::make($validated['password']),
    ]);

    return response()->json(['message' => 'User registered successfully'], 201);
}