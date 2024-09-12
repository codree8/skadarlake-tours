<?php

namespace App\Http\Controllers;

use App\Models\Tour;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TourController extends Controller
{
    // Dobijanje svih tura iz baze podataka
    public function index()
    {
        $tours = Tour::select('id', 'title', 'description', 'photo', 'price', 'available')->get();
        return response()->json(['success' => true, 'data' => $tours], 200);
    }

    // Prikazivanje tura prema id-iju i prikazivanje jsona sa statusom OK
    public function show($id)
    {
        $tour = DB::table('tours')->where('id', $id)->get();
        return response()->json(['success' => true, 'data' => $tour], 200);
    }

    // Skladistenje novih tura
    public function store(Request $request)
    {
        DB::table('tours')->insert([
            'title' => $request->title,
            'description' => $request->description,
            'photo' => $request->photo,
            'price' => $request->price,
            'available' => $request->available,
        ]);

        return response()->json(['success' => true, 'data' => 'okok'], 201);
    }

    // Azuriranje ture
    public function update(Request $request, $id)
    {
        $tour = Tour::findOrFail($id);

        $validatedData = $request->validate([
            'title' => 'required',
            'description' => 'required',
            'price' => 'required|numeric',
            'available' => 'required|boolean',
        ]);

        DB::table('tours')->where('id', $id)->update([
            'title' => $request->title,
            'description' => $request->description,
            'price' => $request->price,
            'available' => $request->available
        ]);

        return response()->json([
            'data' => $tour,
            'message' => 'Tour updated successfully',
        ]);
    }

    // Brisanje ture
    public function destroy($id)
    {
        $tour = Tour::find($id);

        if (!$tour) {
            return response()->json(['success' => false, 'message' => 'Tour not found'], 404);
        }

        $tour->delete();

        return response()->json(['success' => true, 'message' => 'Tour deleted successfully']);
    }
}