<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('venues', function (Blueprint $table) {
            $table->id('venue_id'); // custom primary key
            $table->string('venue_name');
            $table->string('city');
            $table->string('province');
            $table->string('postal_code', 10);
            $table->string('address_detail')->nullable();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('venues');
    }
};
