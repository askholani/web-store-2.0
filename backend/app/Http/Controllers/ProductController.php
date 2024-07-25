<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Validator;
use App\Models\Product;
use App\Models\Wishlist;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class ProductController extends Controller
{
  /**
   * Display a listing of the resource.
   */
  public function index(Request $req)
  {
    // Validate query parameters
    $validated = $req->validate([
      'page' => 'integer|min:1',
      'perPage' => 'integer|min:1',
      'category' => 'string|nullable',
      'sort' => 'string|nullable',
      'sortBy' => 'string|in:asc,desc|nullable',
      'search' => 'string|nullable',
    ]);

    // Assign default values if not provided
    $page = $req->query('page', 1);
    $perPage = $req->query('perPage', 6);
    $category = $req->query('category', 'all');
    $sort = $req->query('sort', 'created_at');
    $order = $req->query('order', 'asc');
    $sortBy = $req->query('sortBy', $order);
    $search = $req->query('search', '');
    $press = $req->query('press', 'false');

    if (strlen($search) > 0) {
      if ($press === 'true') {
        $products = Product::with('details')->where('name', 'REGEXP', '[[:<:]]' . $search)->paginate($perPage, ['*'], 'page', $page);;
        return response()->json($products);
      } else {
        $products = Product::where('name', 'REGEXP', '[[:<:]]' . $search)->select('name')->paginate($perPage, ['*'], 'page', $page);;
      }
    } else {
      $query = Product::with('details');

      // Filter by category if provided
      if ($category !== 'all') {
        $query->where('category', $category);
      }

      // Apply sorting if provided
      if ($sort !== 'all') {
        $query->orderBy($sort, $sortBy);
      }

      // Paginate results
      $products = $query->paginate($perPage, ['*'], 'page', $page);
    }

    // Return JSON response
    return response()->json($products);
  }

  public function detail(Request $req)
  {
    $validated = $req->validate([
      'id' => 'integer|min:1'
    ]);
    $id = $req->query('id', null);
    $prodDetail = null;
    if ($id) {
      $prodDetail = Product::with('details')->where('id', $id)->first();
    }

    return response()->json($prodDetail);
  }

  public function sendToWishlist(Request $request)
  {
    $user = Auth::user();

    if (!$user) {
      return response()->json(['message' => 'User not authenticated'], 401);
    }

    $validator = Validator::make($request->all(), [
      'product_id' => 'required|integer',
    ]);

    if ($validator->fails()) {
      return response()->json($validator->errors(), 422);
    }

    $productId = $request->input('product_id');

    try {
      DB::beginTransaction();
      $product = Product::find($productId);

      $wishlist = Wishlist::where('product_id', $product->id)->where('user_id', $user->id)->first();
      if ($wishlist) {
        $product->decrement('likes');
        $wishlist->delete();
        DB::commit();
        return response()->json(['message' => 'wishlist updated successfully', 'wishlist' => null, 'product' => $product], 200);
      } else {
        $product->increment('likes');
        $wishlist = Wishlist::create([
          'product_id' => $product->id,
          'user_id' => $user->id,
        ]);
        DB::commit();
        return response()->json(['message' => 'wishlist updated successfully', 'wishlist' => $wishlist, 'product' => $product], 200);
      }
    } catch (\Exception $e) {
      DB::rollBack();
      Log::error('Failed to add product to wishlist: ' . $e->getMessage());

      return response()->json(['message' => 'Failed to add to wishlist'], 500);
    }
  }

  public function getWishlist(Request $req)
  {
    $user = Auth::user();

    if (!$user) {
      return response()->json(['message' => 'User not authenticated'], 401);
    }

    $validator = Validator::make($req->all(), [
      'id' => 'integer',
      'page' => 'integer|nullable',
      'sort' => 'string|nullable',
      'sortBy' => 'string|in:asc,desc|nullable',
      'search' => 'string|nullable',
    ]);

    if ($validator->fails()) {
      return response()->json(['errors' => $validator->errors()], 422);
    }

    $id = $req->query('id');
    $page = $req->query('page', 1);
    $sort = $req->query('sort', 'created_at');
    $order = $req->query('order', 'asc');
    $sortBy = $req->query('sortBy', $order);

    if (!$id) {
      $query = Wishlist::with(['product', 'product.details'])
        ->whereHas('product', function ($query) use ($user) {
          $query->where('user_id', $user->id);
        });

      if ($sort !== 'all') {
        $query->orderBy(Product::select($sort)
          ->whereColumn('products.id', 'wishlists.product_id')
          ->take(1), $sortBy);
      }
      $wishlists = $query->paginate(6, ['*'], 'page', $page);

      return response()->json($wishlists);
    } else { // when user reload happened on DetailPage so check the product included wishlist
      $wishlist = Wishlist::where('user_id', $user->id)->where('product_id', $id)->first();
      if (!$wishlist) {
        return response(null);
      }
      return response()->json($wishlist);
    }
  }

  public function sendToChart(Request $req)
  {
  }

  /**
   * Store a newly created resource in storage.
   */
  public function store(Request $request)
  {
    //
  }

  /**
   * Display the specified resource.
   */
  public function show(string $id)
  {
    //
  }

  /**
   * Update the specified resource in storage.
   */
  public function update(Request $request, string $id)
  {
    //
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(string $id)
  {
    //
  }
}
