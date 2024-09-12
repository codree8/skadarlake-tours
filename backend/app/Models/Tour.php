<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Book;

class Tour extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'photo',
        'price',
        'avaialble',
    ];

    public function bookings()
    {
        return $this->hasMany(Booking::class);
    }
}

