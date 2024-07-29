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
    Schema::create('cart_items', function (Blueprint $table) {
      $table->id();
      $table->unsignedBigInteger('product_id');
      $table->unsignedBigInteger('cart_id');
      $table->string('size');
      $table->string('color');
      $table->integer('count');
      $table->string('image');
      $table->timestamps();

      $table->foreign('product_id')->references('id')->on('products')->onDelete('cascade');
      $table->foreign('cart_id')->references('id')->on('carts')->onDelete('cascade');
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('cart_items');
  }
};
