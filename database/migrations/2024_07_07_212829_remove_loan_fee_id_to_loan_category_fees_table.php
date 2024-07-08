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
        Schema::table('loan_category_fees', function (Blueprint $table) {
            $table->dropConstrainedForeignId('loan_fee_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('loan_category_fees', function (Blueprint $table) {
            $table->foreignId('loan_fee_id')->after('id')->nullable()->constrained()->nullOnDelete();
        });
    }
};
