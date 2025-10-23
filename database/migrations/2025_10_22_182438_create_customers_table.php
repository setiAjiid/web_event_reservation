<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('customers', function (Blueprint $table) {
            $table->id('user_id');
            $table->char('nik', 16);
            $table->string('email', 100)->unique();
            $table->string('password', 100);
            $table->string('first_name', 100);
            $table->string('last_name', 100)->nullable();
            $table->date('birth_of_date');
            $table->string('phone_number', 17);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('customers');
    }
};
