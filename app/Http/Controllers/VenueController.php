<?php

namespace App\Http\Controllers;

use App\Models\Venue;
use Illuminate\Http\Request;

class VenueController extends Controller
{
    public function withEventCount()
    {
        $venues = Venue::withCount('events')->get();
        return response()->json($venues);
    }
}
