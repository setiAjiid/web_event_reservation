<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ticket extends Model
{
    use HasFactory;

    protected $primaryKey = 'ticket_id';

    protected $fillable = ['event_id', 'seat_id', 'status', 'expires_at'];

    // Satu tiket untuk satu event
    public function event()
    {
        return $this->belongsTo(Event::class, 'event_id', 'event_id');
    }

    // Satu tiket untuk satu kursi
    public function seat()
    {
        return $this->belongsTo(Seat::class, 'seat_id', 'seat_id');
    }

    public function scopeReleaseExpired($query)
    {
        return $query->where('status', 'reserved')->where('expires_at', '<', now());
    }
}
