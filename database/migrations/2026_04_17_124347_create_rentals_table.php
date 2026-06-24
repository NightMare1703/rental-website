<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('rentals', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('item_id')->constrained()->onDelete('cascade');

            // tanggal sewa
            $table->date('start_date');
            $table->date('end_date');

            // Hitung otomatis
            $table->decimal('total_price', 10, 2);
            $table->decimal('price_per_day', 10, 2);
            $table->integer('total_days');

            // Status
            $table->enum('status', ['pending', 'approved', 'ongoing', 'completed', 'rejected', 'cancled'])->default('pending');

            // Catatan opsional
            $table->text('notes')->nullable();

            // Jika ada admin yang input
            $table->foreignId('created_by')->nullable()->constrained('users')->onDelete('set null');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('rentals');
    }
};
