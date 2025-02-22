<?php
namespace App\Http\Controllers;

use App\Models\Rental;
use Illuminate\Http\Request;

class RentalController extends Controller
{
    // Get all rentals
    public function index()
    {
        return Rental::all();
    }

    // Get a specific rental
    public function show($id)
    {
        return Rental::findOrFail($id);
    }

    // Create a new rental
    public function store(Request $request)
    {
        return Rental::create($request->all());
    }

    // Update a rental
    public function update(Request $request, $id)
    {
        $rental = Rental::findOrFail($id);
        $rental->update($request->all());
        return $rental;
    }

    // Delete a rental
    public function destroy($id)
    {
        Rental::destroy($id);
        return response()->noContent();
    }
}