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
            $table->integer('penalt_amount')->nullable()->after('interest');
            $table->string('penalt_type')->nullable()->after('penalt_amount');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('loan_categories', function (Blueprint $table) {
            $table->dropColumn('penalt_amount');
            $table->dropColumn('penalt_type');
        });
    }
};
