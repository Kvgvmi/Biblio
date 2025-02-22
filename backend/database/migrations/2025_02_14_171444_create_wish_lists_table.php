<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
{
    Schema::create('wishlists', function (Blueprint $table) {
        $table->id();
        $table->foreignId('user_id')->constrained()->onDelete('cascade'); // Reference to the user
        $table->foreignId('book_id')->constrained('book_to_sell')->onDelete('cascade'); // Reference to the book
        $table->timestamps(); // To track when the book was added to the wishlist
    
        // Ensure a user can't add the same book to their wishlist multiple times
        $table->unique(['user_id', 'book_id']);
    });
}


    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('wish_lists');
    }
};
