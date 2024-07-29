<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderItems extends Model
{
  use HasFactory;

  protected $fillable = [
    'size',
    'image',
    'quantity',
    'color',
    'product_id',
    'order_id',
  ];

  public function order()
  {
    return $this->belongsTo(Order::class);
  }

  public function product()
  {
    return $this->belongsTo(Product::class);
  }
}
