<?php
namespace App\Http\Controllers;

use App\Models\Transaction;
use Illuminate\Http\Request;

class TransactionController extends Controller
{
    // Get all transactions
    public function index()
    {
        return Transaction::all();
    }

    // Get a specific transaction
    public function show($id)
    {
        return Transaction::findOrFail($id);
    }

    // Create a new transaction
    public function store(Request $request)
    {
        return Transaction::create($request->all());
    }

    // Update a transaction
    public function update(Request $request, $id)
    {
        $transaction = Transaction::findOrFail($id);
        $transaction->update($request->all());
        return $transaction;
    }

    // Delete a transaction
    public function destroy($id)
    {
        Transaction::destroy($id);
        return response()->noContent();
    }
}