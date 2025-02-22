<?php
namespace App\Http\Controllers;

use App\Models\Overdue;
use Illuminate\Http\Request;

class OverdueController extends Controller
{
    // Get all overdue records
    public function index()
    {
        return Overdue::all();
    }

    // Get a specific overdue record
    public function show($id)
    {
        return Overdue::findOrFail($id);
    }

    // Create a new overdue record
    public function store(Request $request)
    {
        return Overdue::create($request->all());
    }

    // Update an overdue record
    public function update(Request $request, $id)
    {
        $overdue = Overdue::findOrFail($id);
        $overdue->update($request->all());
        return $overdue;
    }

    // Delete an overdue record
    public function destroy($id)
    {
        Overdue::destroy($id);
        return response()->noContent();
    }
}