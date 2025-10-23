<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('tickets', function (Blueprint $table) {
            $table->id('ticket_id'); // custom primary key
            $table->foreignId('event_id')->constrained('events', 'event_id');
            $table->foreignId('seat_id')->constrained('seats', 'seat_id');
            $table->enum('status', ['available', 'reserved', 'sold']); 
            $table->dateTime('expires_at')->nullable(); 
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('tickets');
    }
};
