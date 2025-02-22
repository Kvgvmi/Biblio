<?php
namespace App\Http\Controllers;

use App\Models\Wishlist;
use App\Models\BookToSell;
use Illuminate\Http\Request;

class WishlistController extends Controller
{
    // Get all wishlists
    public function index()
    {
        return Wishlist::all();
    }

    // Get a specific wishlist
    public function show($id)
    {
        return Wishlist::findOrFail($id);
    }

    // Create a new wishlist
    public function store(Request $request)
    {
        return Wishlist::create($request->all());
    }

    // Update a wishlist
    public function update(Request $request, $id)
    {
        $wishlist = Wishlist::findOrFail($id);
        $wishlist->update($request->all());
        return $wishlist;
    }

    // Delete a wishlist
    public function destroy($id)
    {
        Wishlist::destroy($id);
        return response()->noContent();
    }

    // Add a book to a wishlist
    public function addBook(Request $request, $wishlistId, $bookId)
    {
        $wishlist = Wishlist::findOrFail($wishlistId);
        $book = BookToSell::findOrFail($bookId);
        $wishlist->books()->attach($book);
        return response()->json(['message' => 'Book added to wishlist']);
    }

    // Remove a book from a wishlist
    public function removeBook(Request $request, $wishlistId, $bookId)
    {
        $wishlist = Wishlist::findOrFail($wishlistId);
        $book = BookToSell::findOrFail($bookId);
        $wishlist->books()->detach($book);
        return response()->json(['message' => 'Book removed from wishlist']);
    }
}