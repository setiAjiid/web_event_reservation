<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('seats', function (Blueprint $table) {
            $table->id('seat_id');
            $table->foreignId('venue_id')->constrained('venues', 'venue_id');
            $table->string('seat_code');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('seats');
    }
};
