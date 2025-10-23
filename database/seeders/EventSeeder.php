<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class EventSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('events')->insert([
            [
                'venue_id' => 1, // venue pertama
                'date_time' => now()->addDays(7),
                'price' => 75000.0,
                'organizer' => 'Marvel Studios',
                'description' => 'Pemutaran perdana film terbaru Marvel.',
                'genre' => 'Action',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'venue_id' => 2, // venue kedua
                'date_time' => now()->addDays(14),
                'price' => 60000.0,
                'organizer' => 'Disney',
                'description' => 'Film animasi keluarga terbaru dari Disney.',
                'genre' => 'Animation',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
