<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Customer;
use Illuminate\Http\Request;

class CustomerController extends Controller
{
    // Untuk membuat customer baru
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nik' => 'required|string|max:16|unique:customers,nik',
            'email' => 'required|email|unique:customers,email',
            'password' => 'required|string',
            'first_name' => 'required|string',
            'last_name' => 'nullable|string',
            'birth_of_date' => 'required|date',
            'phone_number' => 'required|string',
        ]);

        $customer = Customer::create($validated);

        return response()->json($customer, 201);
    }

    // Ubah profil
    public function update(Request $request, Customer $customer)
    {
        $validated = $request->validate([
            'nik' => 'string|size:16|unique:customers,nik,' . $customer->user_id . ',user_id',
            'email' => 'email|unique:customers,email,' . $customer->user_id . ',user_id',
            'first_name' => 'string',
            'last_name' => 'nullable|string',
            'birth_of_date' => 'date',
            'phone_number' => 'string',
        ]);

        $customer->update($validated);

        return response()->json($customer);
    }

    public function show(Customer $customer)
    {
        return response()->json($customer);
    }
}
