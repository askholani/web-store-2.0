<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CartItems extends Model
{
  use HasFactory;
  protected $fillable = ['size', 'image', 'count', 'color', 'product_id', 'cart_id'];

  public function cart()
  {
    return $this->belongsTo(Cart::class);
  }

  public function product()
  {
    return $this->belongsTo(Product::class);
  }
}
