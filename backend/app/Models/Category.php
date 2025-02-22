<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    // Relationships

    /**
     * A category has many books available for rent.
     */
    public function booksToRent()
    {
        return $this->hasMany(BookToRent::class);
    }

    /**
     * A category has many books available for sale.
     */
    public function booksToSell()
    {
        return $this->hasMany(BookToSell::class);
    }
}