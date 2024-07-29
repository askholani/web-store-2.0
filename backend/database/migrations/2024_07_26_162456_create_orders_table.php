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
    Schema::create('orders', function (Blueprint $table) {
      $table->id();
      $table->unsignedBigInteger('user_id');
      $table->string('status');
      $table->string('payment_type')->nullable();
      $table->string('shipping_address')->nullable();
      $table->string('shipping_type')->nullable();
      $table->string('total_price');
      $table->timestamps();

      // $table->foreign('product_id')->references('id')->on('products')->onDelete('cascade');
      $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
      // $table->foreign('cart_id')->references('id')->on('carts')->onDelete('cascade');
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('orders');
  }
};
