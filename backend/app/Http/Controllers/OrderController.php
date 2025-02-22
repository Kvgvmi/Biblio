<?php
namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    // Get all orders
    public function index()
    {
        return Order::all();
    }

    // Get a specific order
    public function show($id)
    {
        return Order::findOrFail($id);
    }

    // Create a new order
    public function store(Request $request)
    {
        return Order::create($request->all());
    }

    // Update an order
    public function update(Request $request, $id)
    {
        $order = Order::findOrFail($id);
        $order->update($request->all());
        return $order;
    }

    // Delete an order
    public function destroy($id)
    {
        Order::destroy($id);
        return response()->noContent();
    }
}