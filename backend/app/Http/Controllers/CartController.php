<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\CartItems;
use App\Models\Wishlist;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class CartController extends Controller
{
  /**
   * Display a listing of the resource.
   */
  public function index()
  {
    $user = Auth::user();

    if (!$user) {
      return response()->json(['message' => 'User not authenticated'], 401);
    }

    $cart = Cart::where('user_id', $user->id)->first();
    if (!$cart) {
      return response()->json(['message' => 'Cart not found'], 404);
    }

    $cartItems = CartItems::with('product')->where('cart_id', $cart->id)->get();

    // $carts = Cart::with('items')->where('user_id', $user->id)->get();
    return response()->json($cartItems);
  }

  public function update(Request $req)
  {
    $validator = Validator::make($req->all(), [
      'items' => 'required|array',
      'items.*.id' => 'required|integer|exists:cart,id',
      'items.*.count' => 'required|integer|min:1',
    ]);

    if ($validator->fails()) {
      return response()->json($validator->errors(), 400);
    }

    try {
      DB::beginTransaction();

      foreach ($req->input('items') as $item) {
        $cart = Cart::find($item['id']);
        $cart->count = $item['count'];
        $cart->save();
      }

      DB::commit();
      return response()->json(['message' => 'Cart updated successfully']);
    } catch (\Exception $e) {
      DB::rollBack();
      return response()->json(['message' => $e->getMessage()], 500);
    }
  }

  public function store(Request $request)
  {
    $validated = $request->validate([
      'size' => 'required|string|max:255',
      'color' => 'required|string|max:255',
      'count' => 'required|integer|min:1',
      'image' => 'required|string|max:255',
      'wishlist' => 'nullable|integer', // Validate wishlist id exists
      'product' => 'nullable|integer', // Validate product id exists
      'user' => 'nullable|integer', // Validate user id exists
    ]);

    try {
      // Start transaction
      DB::beginTransaction();

      // If wishlist id is provided, delete the corresponding wishlist entry
      if ($validated['wishlist']) {
        Wishlist::where('product_id', $validated['wishlist'])
          ->where('user_id', $validated['user'])
          ->delete();
      }

      // Check if the user already has a cart
      $cart = Cart::firstOrCreate(['user_id' => $validated['user']]);

      // Check if the item already exists in the cart
      $item = CartItems::where('cart_id', $cart->id)
        ->where('product_id', $validated['product'])
        ->where('color', $validated['color'])
        ->where('size', $validated['size'])
        ->where('image', $validated['image'])
        ->first();

      if ($item) {
        // If item exists, update the count
        $item->increment('count', $validated['count']);
        $message = 'Product updated successfully';
      } else {
        CartItems::create([
          'cart_id' => $cart->id,
          'product_id' => $validated['product'],
          'size' => $validated['size'],
          'color' => $validated['color'],
          'count' => $validated['count'],
          'image' => $validated['image'],
        ]);
        $message = 'Product added successfully';
      }

      // Commit the transaction
      DB::commit();
      return response()->json(['message' => $message], 200);
    } catch (\Exception $e) {
      // Rollback the transaction in case of error
      DB::rollBack();
      Log::error('Failed to add product to cart: ' . $e->getMessage());
      return response()->json(['message' => 'Failed to add product to cart'], 500);
    }
  }
  public function destroy(Request $req)
  {
    $validator = Validator::make($req->all(), [
      'id' => 'required|integer|exists:cart,id',
    ]);


    if ($validator->fails()) {
      return response()->json(['errors' => $validator->errors()], 422);
    }

    try {
      DB::beginTransaction();
      $cart = Cart::findOrFail($req->id);
      $cart->delete();
      DB::commit();
      return response()->json(['message' => 'Product deleted successfully'], 200);
    } catch (ModelNotFoundException $e) {
      DB::rollBack();
      return response()->json(['message' => 'Product not found'], 404);
    } catch (\Exception $e) {
      DB::rollBack();
      return response()->json(['message' => 'An error occurred while deleting the product', 'error' => $e->getMessage()], 500);
    }
  }
}
