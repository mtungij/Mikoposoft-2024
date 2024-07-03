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
        Schema::table('loan_categories', function (Blueprint $table) {
            $table->integer('fee')->default(0)->after('penalt_amount');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('loan_categories', function (Blueprint $table) {
            $table->dropColumn('fee');
        });
    }
};
