<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class UserController extends Controller
{
    public function index()
    {
        $users = User::select('id', 'firstname', 'lastname', 'telephone', 'email')->get();

        return response()->json(['success' => true, 'data' => $users], 200);
    }

    // Uzima novog korisnika i skladisti ga u bazu podataka
    public function signup(Request $request)
    {
        $validated = $request->validate([
            'firstname' => 'required|min:2|max:20',
            'lastname' => 'required|min:2|max:20',
            'telephone' => 'required|string|min:9|max:30|regex:/^\+?[0-9]+$/',
            'email' => 'required|email|unique:users|regex:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/',
        ]);
        if ($validated) {
            DB::table('users')->insert([
                'firstname' => $request->input('firstname'),
                'lastname' => $request->input('lastname'),
                'telephone' => $request->input('telephone'),
                'email' => $request->input('email'),
                'password' => $request->input('password')
            ]);
        }
    }

    // Metoda za priajvljivanje korisnika
    public function login(Request $request)
    {

        $email = $request->input('email');
        $user = User::where('email', $email)->first();

        
        if (!$user) {
            return response()->json(['success' => false, 'message' => 'Login failed. Email not found.'], 404);
        }
    
        $password = $user->password;

        if (Auth::check()) {
            $user = Auth::user();

            session(['id' => $user->id, 'firstname' => $user->firstname, 'lastname' => $user->lastname, 'telephone' => $user->telephone, 'email' => $user->email]);
        } else {
            //return response()->json(['error' => 'Authentication failed'], 401);
        }

        return response()->json(['success' => true, 'message' => 'We\'ve found a match', 'data' => $user, 'pass' => $password], 200);
    }

    // Metoda za odjavljivanje korisnika
    public function logout()
    {
        session()->flush();
        Auth::logout();
        return response()->json(['message' => 'Logout successful']);
    }

    // Azuriranje korisnikovih podataka od strane korisnika
    public function updateProfile(Request $request, $user_id)
    {
        $user = User::find($user_id);
        
        $validated = $request->validate([
            'firstname' => 'required|min:2|max:20',
            'lastname' => 'required|min:2|max:20',
            'telephone' => 'required|string|min:9|max:30|regex:/^\+?[0-9]+$/',
        ]);
        DB::table('users')->where('id', $user_id)->update([
            'firstname' => $request->firstname,
            'lastname' => $request->lastname,
            'telephone' => $request->telephone,
        ]);
        $user = User::find($user_id);
        return response()->json(['success' => true, 'message' => 'Profile updated successfully', 'data' => $user]);
        
    }

    // Azuriranje korisnikovih podataka
    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);

        $validatedData = $request->validate([
            'firstname' => 'required',
            'lastname' => 'required',
            'telephone' => 'required',
            'email' => 'required',
        ]);

        DB::table('users')->where('id', $id)->update([
            'firstname' => $request->firstname,
            'lastname' => $request->lastname,
            'telephone' => $request->telephone,
            'email' => $request->email,
        ]);

        return response()->json([
            'data' => $user,
            'message' => 'User updated successfully',
        ]);
    }

    // Brisanje korisnika
    public function destroy($id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json(['success' => false, 'message' => 'User not found'], 404);
        }

        $user->delete();

        return response()->json(['success' => true, 'message' => 'User deleted successfully']);
    }

}
