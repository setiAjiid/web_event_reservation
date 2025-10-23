<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BookingItem extends Model
{
    use HasFactory;

    protected $primaryKey = 'booking_item_id';
    public $timestamps = false;

    protected $fillable = ['booking_id', 'ticket_id', 'price'];

    // Satu booking item dimiliki oleh satu booking
    public function booking()
    {
        return $this->belongsTo(Booking::class, 'booking_id', 'booking_id');
    }

    // Satu booking item merujuk ke satu tiket
    public function ticket()
    {
        return $this->belongsTo(Ticket::class, 'ticket_id', 'ticket_id');
    }
}
