<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

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
      'sort' => 'string|in:name,price,created_at|nullable',
      'sortBy' => 'string|in:asc,desc|nullable'
    ]);

    // Assign default values if not provided
    $page = $req->query('page', 1);
    $perPage = $req->query('perPage', 2);
    $category = $req->query('category', 'all');
    $sort = $req->query('sort', 'created_at');
    $order = $req->query('order', 'asc');
    $sortBy = $req->query('sortBy', $order);

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

    // Return JSON response
    return response()->json($products);
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
