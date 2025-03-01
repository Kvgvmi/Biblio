<?php
namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\BookToSell;
use Illuminate\Http\Request;

class CartController extends Controller
{
    // Get all carts
    public function index()
    {
        return Cart::all();
    }

    // Get a specific cart
    public function show($id)
    {
        return Cart::findOrFail($id);
    }

    // Create a new cart
    public function store(Request $request)
    {
        return Cart::create($request->all());
    }

    public function addToCart(Request $request, $userId)
{
    $request->validate([
        'book_id' => 'required|exists:books,id',
        'quantity' => 'required|integer|min:1',
    ]);

    $cart = Cart::updateOrCreate(
        ['user_id' => $userId, 'book_id' => $request->book_id],
        ['quantity' => $request->quantity]
    );

    return response()->json($cart, 201);
}

public function getCart($userId)
{
    $cart = Cart::where('user_id', $userId)->with('book')->get();
    return response()->json($cart, 200);
}
public function removeFromCart($userId, $bookId)
{
    Cart::where('user_id', $userId)->where('book_id', $bookId)->delete();
    return response()->json(['message' => 'Item removed from cart'], 200);
}

    // Update a cart
    public function update(Request $request, $id)
    {
        $cart = Cart::findOrFail($id);
        $cart->update($request->all());
        return $cart;
    }

    // Delete a cart
    public function destroy($id)
    {
        Cart::destroy($id);
        return response()->noContent();
    }

    // Add a book to a cart
    public function addBook(Request $request, $cartId, $bookId)
    {
        $cart = Cart::findOrFail($cartId);
        $book = BookToSell::findOrFail($bookId);
        $cart->books()->attach($book, ['quantity' => $request->input('quantity', 1)]);
        return response()->json(['message' => 'Book added to cart']);
    }

    // Remove a book from a cart
    public function removeBook(Request $request, $cartId, $bookId)
    {
        $cart = Cart::findOrFail($cartId);
        $book = BookToSell::findOrFail($bookId);
        $cart->books()->detach($book);
        return response()->json(['message' => 'Book removed from cart']);
    }

    // Checkout a cart (create an order)
    public function checkout(Request $request, $cartId)
    {
        $cart = Cart::findOrFail($cartId);
        // Logic to create an order from the cart
        // Clear the cart after checkout
        $cart->books()->detach();
        return response()->json(['message' => 'Checkout successful']);
    }
}