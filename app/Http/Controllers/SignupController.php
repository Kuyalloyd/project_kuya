<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Signup;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class SignupController extends Controller
{
    public function register(Request $request)
    {
        try {
            $validated = $request->validate([
                'name'     => 'required|string|max:255',
                'email'    => 'required|email|unique:signup,email',
                'password' => 'required|string|min:6',
            ]);

            $validated['password'] = Hash::make($validated['password']);

            $signup = Signup::create($validated);

            return response()->json([
                'message' => 'Signup saved successfully!',
                'data'    => $signup,
            ], 201);

        } catch (ValidationException $e) {
            return response()->json([
                'message' => 'Validation failed',
                'errors'  => $e->errors(),
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Server error',
                'error'   => $e->getMessage(),
            ], 500);
        }
    }
}
