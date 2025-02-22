<?php

// app/Models/Cart.php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cart extends Model
{
    // Relationships
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function books()
    {
        return $this->belongsToMany(BookToSell::class, 'cart_book', 'cart_id', 'book_id')->withPivot('quantity');
    }
}

