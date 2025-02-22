<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\MembershipCard;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Validator;

class MembershipCardController extends Controller
{
    // Get all membership cards
    public function index()
    {
        $cards = MembershipCard::all();
        \Log::info('Membership Cards: ', $cards->toArray()); // Log the cards to the log file
        return response()->json($cards, 200);
    }

    // Get a specific membership card
    public function show($id)
    {
        $card = MembershipCard::find($id);
        
        if (!$card) {
            return response()->json(['message' => 'Membership card not found'], 404);
        }

        return response()->json($card, 200);
    }

    // Create a new membership card
    public function store(Request $request)
    {
        // Validate the incoming request data
        $validatedData = $request->validate([
            'user_id' => 'required|exists:users,id',
            'card_number' => 'required|string|unique:membership_cards,card_number',
            'issued_on' => 'required|date',
            'valid_until' => 'required|date|after:issued_on',
        ]);

        $card = MembershipCard::create($validatedData);

        return response()->json(['message' => 'Membership card created successfully', 'card' => $card], 201);
    }

    // Update a membership card
    public function update(Request $request, $id)
    {
        $card = MembershipCard::find($id);

        if (!$card) {
            return response()->json(['message' => 'Membership card not found'], 404);
        }

        // Validate the incoming request data
        $validatedData = $request->validate([
            'user_id' => 'sometimes|required|exists:users,id',
            'card_number' => 'sometimes|required|string|unique:membership_cards,card_number,' . $id,
            'issued_on' => 'sometimes|required|date',
            'valid_until' => 'sometimes|required|date|after:issued_on',
        ]);

        $card->update($validatedData);

        return response()->json(['message' => 'Membership card updated successfully', 'card' => $card], 200);
    }

    // Delete a membership card
    public function destroy($id)
    {
        $card = MembershipCard::find($id);

        if (!$card) {
            return response()->json(['message' => 'Membership card not found'], 404);
        }

        $card->delete();

        return response()->json(['message' => 'Membership card deleted successfully'], 204);
    }
}
