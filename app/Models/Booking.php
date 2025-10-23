<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    use HasFactory;

    protected $primaryKey = 'booking_id';

    protected $fillable = ['user_id', 'total_amount', 'status'];

    // Satu booking dimiliki oleh satu customer
    public function customer()
    {
        return $this->belongsTo(Customer::class, 'user_id', 'user_id');
    }

    // Satu booking punya banyak item
    public function bookingItems()
    {
        return $this->hasMany(BookingItem::class, 'booking_id', 'booking_id');
    }
}
