<?php

namespace App\Http\Controllers;

use App\Models\Cart;
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
  public function index(Request $req)
  {
    $user = Auth::user();

    if (!$user) {
      return response()->json(['message' => 'User not authenticated'], 401);
    }

    $validator = Validator::make($req->all(), [
      'page' => 'integer|nullable',
    ]);

    if ($validator->fails()) {
      return response()->json(['errors' => $validator->errors()], 422);
    }

    $page = $req->query('page', 1); // get data from query parameter
    $carts = Cart::with('product')->where('user_id', $user->id)->paginate(6, ['*'], 'page', $page);
    return response()->json($carts);
  }

  /**
   * Show the form for creating a new resource.
   */
  public function create()
  {
    //
  }

  /**
   * Store a newly created resource in storage.
   */
  public function store(Request $req)
  {
    // Define validation rules
    $validated = $req->validate([
      'size' => 'required|string|max:255',
      'color' => 'required|string|max:255',
      'count' => 'required|integer|min:1',
      'image' => 'required|string|max:255',
      'wishlist' => 'nullable|integer', // Assumes wishlist id is optional and must exist in wishlists table
      'product' => 'nullable|integer', // Assuming product is optional, you can adjust this based on your needs
      'user' => 'nullable|integer',
    ]);

    try {
      DB::beginTransaction();

      $cart = Cart::where('product_id', $validated['product'])->where('user_id', $validated["user"])->first();

      // return response()->json($cart);
      if ($cart) {
        if ($cart->color == $validated['color'] && $cart->size == $validated['size'] && $cart->image == $validated['image']) {
          $cart->count = $cart->count + $validated['count'];
          $cart->save();
          DB::commit();
          return response()->json(['message' => 'Product added successfully'], 200);
        }
      }


      Cart::create([
        'product_id' => $validated['product'],
        'user_id' => $validated['user'],
        'size' => $validated['size'],
        'color' => $validated['color'],
        'count' => $validated['count'],
        'image' => $validated['image'],
      ]);

      // If wishlist is provided, delete the wishlist entry
      if ($validated['wishlist']) {
        Wishlist::where('product_id', $validated['wishlist'])->where('user_id', $validated['user'])->delete();
      }

      DB::commit();

      return response()->json(['message' => 'Product added successfully'], 200);
    } catch (\Exception $e) {
      DB::rollBack();
      Log::error('Failed to add product to cart: ' . $e->getMessage());
      return response()->json(['message' => $e->getMessage()], 500);
    }
  }
  /**
   * Display the specified resource.
   */
  public function show(Cart $cart)
  {
    //
  }

  /**
   * Show the form for editing the specified resource.
   */
  public function edit(Cart $cart)
  {
    //
  }

  /**
   * Update the specified resource in storage.
   */
  public function update(Request $request, Cart $cart)
  {
    //
  }

  /**
   * Remove the specified resource from storage.
   */
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
