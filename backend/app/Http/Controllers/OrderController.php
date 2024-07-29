<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderItems;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class OrderController extends Controller
{
  public function index()
  {
    $user = Auth::user();

    if (!$user) {
      return response()->json(['message' => 'User not authenticated'], 401);
    }

    // $orders = OrderItems::with(['order', 'product'])
    //   ->whereHas('order', function ($query) use ($user) {
    //     $query->where('user_id', $user->id)->where('status', 'unpaid');
    //   })
    //   ->get();

    $order = Order::with(['Items', 'Items.product'])
      ->where('user_id', $user->id)
      ->where('status', 'unpaid')
      ->first();

    return response()->json($order, 200);
  }

  public function store(Request $request)
  {
    $validator = Validator::make($request->all(), [
      'items' => 'required|array',
      'items.*.size' => 'required|string|max:255',
      'items.*.quantity' => 'required|integer|min:1',
      'items.*.image' => 'required|string|max:255',
      'items.*.product' => 'required|integer|exists:products,id', // Ensure product exists
      'user' => 'required|integer|exists:users,id', // Ensure user exists
      'status' => 'required|string|max:255',
      'totalPrice' => 'required|numeric',
      'shippingAddress' => 'required|string|max:255',
      'shippingType' => 'required|string|max:255',
      'paymentType' => 'required|string|max:255',
    ]);

    if ($validator->fails()) {
      return response()->json($validator->errors(), 400);
    }

    $userId = $request->input('user');

    try {
      // Start transaction
      DB::beginTransaction();

      // Check if the order already exists for the user
      $order = Order::firstOrCreate(
        ['user_id' => $userId],
        [
          'status' => $request->input('status'),
          'total_price' => $request->input('totalPrice'),
          'shipping_address' => $request->input('shippingAddress'),
          'shipping_type' => $request->input('shippingType'),
          'payment_type' => $request->input('paymentType'),
        ]
      );

      // Add items to the order
      foreach ($request->input('items') as $item) {
        OrderItems::create([
          'order_id' => $order->id,
          'product_id' => $item['product'],
          'size' => $item['size'],
          'color' => $item['color'] ?? null, // Ensure color is optional
          'quantity' => $item['quantity'],
          'image' => $item['image'],
        ]);
      }

      // Commit the transaction
      DB::commit();
      return response()->json(['message' => 'Order placed successfully'], 200);
    } catch (\Exception $e) {
      // Rollback the transaction in case of error
      DB::rollBack();
      Log::error('Failed to place order: ' . $e->getMessage());
      return response()->json(['message' => 'Failed to place order' . $e->getMessage()], 500);
    }
  }

  public function getStatusOrder(Request $request)
  {
    $validator = Validator::make($request->query(), [
      'user' => 'required|integer',
      'status' => 'required|string|max:255',
    ]);

    if ($validator->fails()) {
      return response()->json($validator->errors(), 400);
    }

    // Fetch the order for the authenticated user based on id and status
    $order = Order::where('user_id', $request->query('user'))
      ->where('status', $request->query('status'))
      ->first();

    if ($order) {
      return response()->json($order, 200);
    } else {
      return response()->json(['message' => 'Order not found'], 404);
    }
  }

  public function destroy(Request $request)
  {
    // $validated = $request->validate([
    //   'id' => 'required|integer',
    // ]);

    // return response()->json($request->id);

    try {
      DB::beginTransaction();
      OrderItems::where('order_id', $request->id)->delete();
      $order = Order::findOrFail($request->id);
      $order->delete();
      DB::commit();


      return response()->json(['message' => 'Order deleted successfully'], 200);
    } catch (ModelNotFoundException $e) {
      DB::rollBack();
      return response()->json(['message' => 'Product not found'], 404);
    } catch (\Exception $e) {
      DB::rollBack();
      return response()->json(['message' => 'An error occurred while deleting the product', 'error' => $e->getMessage()], 500);
    }
  }
}
