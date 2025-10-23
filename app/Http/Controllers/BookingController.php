<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\Ticket;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class BookingController extends Controller
{
    // Booking tiket
    public function store(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:customers,user_id',
            'ticket_ids' => 'required|array',
            'ticket_ids.*' => 'exists:tickets,ticket_id',
        ]);

        // Ambil event_id dari salah satu tiket (anggap semua tiket dari event yang sama)
        $firstTicket = Ticket::findOrFail($request->ticket_ids[0]);
        $eventId = $firstTicket->event_id;

        // Hitung jumlah tiket yang sudah pernah dibooking user untuk event ini
        $alreadyBooked = \App\Models\BookingItem::whereHas('booking', function ($q) use ($request) {
            $q->where('user_id', $request->user_id);
        })
            ->whereHas('ticket', function ($q) use ($eventId) {
                $q->where('event_id', $eventId);
            })
            ->count();

        // Limit maksimal 5 tiket per event per user
        if ($alreadyBooked + count($request->ticket_ids) > 5) {
            return response()->json(
                [
                    'status' => 'error',
                    'message' => 'Maksimal 5 tiket per event per user',
                ],
                400,
            );
        }

        // --- lanjutkan kode transaction booking yang sudah ada ---
        $booking = DB::transaction(function () use ($request) {
            $tickets = Ticket::whereIn('ticket_id', $request->input('ticket_ids'))->where('status', 'available')->lockForUpdate()->get();

            if ($tickets->count() != count($request->input('ticket_ids'))) {
                abort(409, 'One or more tickets are not available.');
            }

            $totalAmount = 0;
            foreach ($tickets as $ticket) {
                $totalAmount += $ticket->event->price;
            }

            $newBooking = Booking::create([
                'user_id' => $request->input('user_id'),
                'total_amount' => $totalAmount,
                'status' => 'pending', // awalnya pending
            ]);

            foreach ($tickets as $ticket) {
                $newBooking->bookingItems()->create([
                    'ticket_id' => $ticket->ticket_id,
                    'price' => $ticket->event->price,
                ]);

                $ticket->update([
                    'status' => 'reserved',
                    'expires_at' => now()->addMinutes(15),
                ]);
            }

            return $newBooking;
        });

        return response()->json($booking->load('bookingItems.ticket'), 201);
    }

    // History ticket
    public function history($userId)
    {
        $history = Booking::where('user_id', $userId)->with('bookingItems.ticket.event.venue', 'bookingItems.ticket.seat')->orderBy('created_at', 'desc')->get();

        return response()->json($history);
    }

    // Refund
    public function refund(Booking $booking)
    {
        if ($booking->status !== 'paid') {
            return response()->json(['message' => 'This booking cannot be refunded.'], 409);
        }

        DB::transaction(function () use ($booking) {
            // 1. Ambil semua ID tiket dari booking ini
            $ticketIds = $booking->bookingItems->pluck('ticket_id');

            // 2. Update status booking menjadi 'refund'
            $booking->update(['status' => 'refund']);

            // 3. Update status tiket menjadi 'available' kembali
            Ticket::whereIn('ticket_id', $ticketIds)->update(['status' => 'available']);
        });

        return response()->json(['message' => 'Booking has been successfully refunded.']);
    }

    public function pay(Booking $booking)
    {
        if ($booking->status !== 'pending') {
            return response()->json(['message' => 'Booking tidak bisa dibayar'], 400);
        }

        DB::transaction(function () use ($booking) {
            $booking->update(['status' => 'paid']);

            foreach ($booking->bookingItems as $item) {
                $item->ticket->update([
                    'status' => 'sold',
                    'expires_at' => null,
                ]);
            }
        });

        return response()->json(['message' => 'Pembayaran berhasil']);
    }
}
