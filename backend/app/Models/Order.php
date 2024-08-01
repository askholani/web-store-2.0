<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
  use HasFactory;

  protected $fillable = [
    'user_id',
    'status',
    'total_price',
    'shipping_address',
    'shipping_type',
    'payment_type',
    'token',
    'discount',
    'shipping_cost',
    'tracker_id'
  ];

  public function items()
  {
    return $this->hasMany(OrderItems::class, 'order_id');
  }
}
