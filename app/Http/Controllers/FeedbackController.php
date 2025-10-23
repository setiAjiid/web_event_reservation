<?php

namespace App\Http\Controllers;

use App\Models\Feedback;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class FeedbackController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'message' => 'required|string',
            'user_id' => 'nullable|exists:customers,user_id',
        ]);

        $feedback = Feedback::create([
            'user_id' => $request->user_id,
            'message' => $request->message,
        ]);

        try {
            Mail::raw("Feedback baru dari user_id: {$feedback->user_id}\n\nPesan:\n{$feedback->message}", function ($msg) {
                $msg->to('its.fsd.id@gmail.com')->subject('Feedback Baru dari Website');
            });
        } catch (\Exception $e) {
            \Log::error('Gagal kirim email feedback: ' . $e->getMessage());
        }

        return response()->json([
            'status' => 'success',
            'data' => $feedback,
        ]);
    }
}
