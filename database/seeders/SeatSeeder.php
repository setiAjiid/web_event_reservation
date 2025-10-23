<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SeatSeeder extends Seeder
{
    public function run(): void
    {
        // Kursi Venue 1
        for ($i = 1; $i <= 10; $i++) {
            DB::table('seats')->insert([
                'venue_id' => 1,
                'seat_code' => 'A' . $i,
            ]);
        }

        // Kursi Venue 2
        for ($i = 1; $i <= 10; $i++) {
            DB::table('seats')->insert([
                'venue_id' => 2,
                'seat_code' => 'B' . $i,
            ]);
        }
    }
}
