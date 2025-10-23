<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TicketSeeder extends Seeder
{
    public function run(): void
    {
        // Event 1 => kursi venue 1 (seat_id 1-10)
        for ($i = 1; $i <= 10; $i++) {
            DB::table('tickets')->insert([
                'event_id' => 1,
                'seat_id' => $i,
                'status' => 'available',
                'expires_at' => now()->addDays(3),
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

        // Event 2 => kursi venue 2 (seat_id 11-20)
        for ($i = 11; $i <= 20; $i++) {
            DB::table('tickets')->insert([
                'event_id' => 2,
                'seat_id' => $i,
                'status' => $i % 2 === 0 ? 'sold' : 'available',
                'expires_at' => now()->addDays(5),
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
