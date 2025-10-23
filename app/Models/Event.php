<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class Event extends Model
{
    use HasFactory;

    protected $primaryKey = 'event_id';

    protected $fillable = ['venue_id', 'date_time', 'price', 'organizer', 'description', 'genre'];

    // Satu event dimiliki oleh satu venue
    public function venue()
    {
        return $this->belongsTo(Venue::class, 'venue_id', 'venue_id');
    }

    // Satu event punya banyak tiket
    public function tickets()
    {
        return $this->hasMany(Ticket::class, 'event_id', 'event_id');
    }

    /**
     * Filter berdasarkan rentang harga
     * contoh: Event::filterPrice(50000, 100000)->get();
     */
    public function scopeFilterPrice($query, $min = null, $max = null)
    {
        if (!is_null($min)) {
            $query->where('price', '>=', $min);
        }
        if (!is_null($max)) {
            $query->where('price', '<=', $max);
        }
        return $query;
    }

    /**
     * Filter berdasarkan waktu (tanggal atau range)
     * contoh:
     *  - Event::filterTime('2025-10-23')->get();
     *  - Event::filterTime('2025-10-23', '2025-10-31')->get();
     */
    public function scopeFilterTime($query, $start = null, $end = null)
    {
        if (!is_null($start) && !is_null($end)) {
            $query->whereBetween('date_time', [Carbon::parse($start), Carbon::parse($end)]);
        } elseif (!is_null($start)) {
            $query->whereDate('date_time', Carbon::parse($start));
        }
        return $query;
    }
}
