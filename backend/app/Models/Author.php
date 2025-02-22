<?php

// app/Models/Author.php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Author extends Model
{
    // Relationships

    /**
     * An author has many books available for rent.
     */
    public function booksToRent()
    {
        return $this->hasMany(BookToRent::class);
    }

    /**
     * An author has many books available for sale.
     */
    public function booksToSell()
    {
        return $this->hasMany(BookToSell::class);
    }
}