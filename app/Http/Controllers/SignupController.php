<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Signup; // ✅ use Signup model
use Illuminate\Support\Facades\Hash;

class SignupController extends Controller
{
    public function register(Request $request)
    {
        $validated = $request->validate([
            'name'     => 'required|string|max:255',
            'email'    => 'required|email|unique:signup', 
            'password' => 'required|string|min:6',
        ]);

        $validated['password'] = Hash::make($validated['password']);

        $signup = Signup::create($validated); 

        return response()->json([
            'message' => 'Signup saved successfully!',
            'data'    => $signup,
        ], 201);
    }
}
