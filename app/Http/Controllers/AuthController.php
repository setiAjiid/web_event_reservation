<?php

namespace App\Http\Controllers; //Laravel tahu file ini ada di folder App\Http\Controllers
use Illuminate\Support\Facades\Hash; //pakai class Hash buat ngecek apakah password cocok dengan yang ada di database
use Illuminate\Http\Request; //pakai class Request buat ambil data dari user
use App\Models\Customer; //pakai model Customer buat ambil data user dari tabel Customers

class AuthController extends Controller //bikin class AuthController, dan dia turunan dari Controller utama Laravel yakni Controller.
{
    public function login(Request $request)
    {
        //validasi input
        //bikin function login yang nerima parameter request dari user
        $request->validate([
            //cek apakah input dari user valid:
            'email' => 'required|email', //validasi email harus diisi dan formatnya email (ini kayak mapping 'key' => 'rule1|rule2')
            'password' => 'required', //validasi password harus diisi
        ]);

        //cari user di database
        $user = Customer::where('email', $request->email)->first(); //cari user di tabel Customers berdasarkan email yang dikirim user (kayak struct query)

        //cek password sekaligus kasih response
        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json(['message' => 'Login gagal'], 401);
        }

        return response()->json(['message' => 'Login berhasil', 'user' => $user]);
    }

    public function register(Request $request)
    {
        $validated = $request->validate([
            'nik' => 'required|string|unique:customers,nik',
            'email' => 'required|email|unique:customers,email',
            'password' => 'required|string|min:6',
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'birth_of_date' => 'required|date',
            'phone_number' => 'required|string|max:20',
        ]);

        $user = Customer::create([
            'nik' => $validated['nik'],
            'email' => $validated['email'],
            'password' => \Hash::make($validated['password']),
            'first_name' => $validated['first_name'],
            'last_name' => $validated['last_name'],
            'birth_of_date' => $validated['birth_of_date'],
            'phone_number' => $validated['phone_number'],
        ]);

        return response()->json(['message' => 'Registrasi berhasil', 'user' => $user], 201);
    }
}
