<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Venue extends Model
{
    use HasFactory;

    protected $primaryKey = 'venue_id';
    public $timestamps = false;

    protected $fillable = ['venue_name', 'city', 'province', 'postal_code', 'address_detail'];

    // satu venue punya banyak event
    public function events()
    {
        return $this->hasMany(Event::class, 'venue_id', 'venue_id');
    }

    // satu venue punya banyak kursi
    public function seats()
    {
        return $this->hasMany(Seat::class, 'venue_id', 'venue_id');
    }
}
