<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('bookings', function (Blueprint $table) {
            $table->id('booking_id');
            $table->foreignId('user_id')->constrained('customers', 'user_id');
            $table->decimal('total_amount', 12, 2);
            $table->enum('status', ['pending', 'paid', 'canceled', 'refund']);
            $table->enum('payment_method', ['Cash', 'Bank', 'QRIS', 'OVO', 'ShopeePay'])->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('bookings');
    }
};
