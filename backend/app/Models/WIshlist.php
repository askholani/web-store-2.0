<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User; // Ensure the correct namespace for User model
use App\Models\Product; // Ensure the correct namespace for Product model

class Wishlist extends Model
{
  use HasFactory;

  protected $table = 'wishlists';

  // Correctly format the fillable array
  protected $fillable = ['product_id', 'user_id'];

  // Define the relationship to the User model
  public function user()
  {
    return $this->belongsTo(User::class);
  }

  // Define the relationship to the Product model
  public function product()
  {
    return $this->belongsTo(Product::class);
  }
}
