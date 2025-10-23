<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Event;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class EventController extends Controller
{
    public function index(Request $request)
    {
        $query = Event::with('venue');

        if ($request->filled('genre')) {
            $query->where('genre', $request->genre);
        }

        if ($request->filled('date')) {
            $query->whereDate('date_time', $request->date);
        }

        if ($request->filled('max_price')) {
            $query->where('price', '<=', $request->max_price);
        }

        return response()->json([
            'status' => 'success',
            'data' => $query->get(),
        ]);
    }

    // Rekomendasi Film by Frequency Transaksi
    public function recommendations()
    {
        $recommendations = Event::select('events.*', DB::raw('count(booking_items.ticket_id) as booking_count'))->join('tickets', 'events.event_id', '=', 'tickets.event_id')->join('booking_items', 'tickets.ticket_id', '=', 'booking_items.ticket_id')->groupBy('events.event_id')->orderByDesc('booking_count')->with('venue')->take(5)->get();

        return response()->json($recommendations);
    }

    public function show(Event $event)
    {
        // Lepaskan tiket expired sebelum return
        \App\Models\Ticket::where('status', 'reserved')
            ->where('expires_at', '<', now())
            ->update([
                'status' => 'available',
                'expires_at' => null,
            ]);

        return response()->json([
            'status' => 'success',
            'data' => $event->load('venue', 'tickets.seat'),
        ]);
    }

    public function filter(Request $request)
    {
        $events = Event::query()
            ->filterPrice($request->min_price, $request->max_price)
            ->filterTime($request->start_date, $request->end_date)
            ->with('venue')
            ->get();

        return response()->json($events);
    }

    public function search(Request $request)
    {
        $keyword = $request->query('q');

        $events = Event::with('venue')
            ->where('organizer', 'like', "%{$keyword}%")
            ->orWhere('genre', 'like', "%{$keyword}%")
            ->orWhereHas('venue', function ($q) use ($keyword) {
                $q->where('city', 'like', "%{$keyword}%")
                ->orWhere('venue_name', 'like', "%{$keyword}%");
            })
            ->get();

        return response()->json([
            'status' => 'success',
            'data' => $events,
        ]);
    }
}
