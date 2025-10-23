<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('events', function (Blueprint $table) {
            $table->id('event_id'); // custom primary key
            $table->unsignedBigInteger('venue_id');
            $table->dateTime('date_time');
            $table->decimal('price', 10, 2);
            $table->string('organizer');
            $table->text('description')->nullable();
            $table->string('genre')->nullable();
            $table->timestamps();

            $table->foreign('venue_id')->references('venue_id')->on('venues')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('events');
    }
};
