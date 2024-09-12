<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Booking;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class BookingController extends Controller
{
    // Dobijanje svih rezervacija Get all bookings
    public function index()
    {
        $bookings = Booking::all();
        return response()->json(['success' => true, 'data' => $bookings]);
    }

    // Kreiranje odnosno skladistenje novih rezervacija
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'book_date' => 'required',
            'price_per_person' => 'required',
            'num_people' => 'required',
            'price' => 'required',
            'user_id' => 'required',
            'tour_id' => 'required',
        ]);

        $booking = Booking::create($validatedData);

        return response()->json(['success' => true, 'data' => $booking], 201);
    }

    // Dobijanje rezervacije od korisnikovog id-ija 
    public function getUserBookings($user_id)
    {
        $user = User::with('bookings.tour')->find($user_id);
    
        if (!$user) {
            return response()->json(['success' => false, 'message' => 'User not found'], 404);
        }
    
        $bookings = $user->bookings;
    
        return response()->json(['success' => true, 'data' => $bookings]);
    }
    

    // Azuriranje rezervacije
    public function update(Request $request, $id)
    {
        $validatedData = $request->validate([
            'book_date' => 'required',
            'price_per_person' => 'required',
            'num_people' => 'required',
            'price' => 'required',
            'user_id' => 'required',
            'tour_id' => 'required',
        ]);

        $booking = Booking::findOrFail($id);
        $booking->update($validatedData);

        return response()->json([
            'data' => $booking,
            'message' => 'Booking updated successfully',
        ]);
    }

    // Brisanje rezervacije
    public function destroy($id)
    {
        $booking = Booking::find($id);
        
        if (!$booking) {
            return response()->json(['success' => false, 'message' => 'Booking not found'], 404);
        }

        $booking->delete();

        return response()->json(['success' => true, 'message' => 'Booking deleted successfully']);
    }
}

