<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('words', function (Blueprint $table) {
            $table->id();
            $table->string('word_oromo');
            $table->string('word_english');
            $table->text('definition')->nullable();
            $table->string('image_path')->nullable();
            $table->string('audio_path')->nullable();
            $table->foreignId('category_id')->constrained()->onDelete('cascade');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('words');
    }
};
