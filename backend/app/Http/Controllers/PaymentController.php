<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Midtrans\Config;
use Midtrans\Snap;

class PaymentController extends Controller
{
  /**
   * Display a listing of the resource.
   */

  public function __construct()
  {
    Config::$serverKey = config('midtrans.serverKey');
    Config::$isProduction = config('midtrans.is_production');
    Config::$isSanitized = config('midtrans.is_sanitized');
    Config::$is3ds = config('midtrans.is_3ds');
  }

  public function createCharge(Request $request)
  {
    $validator = Validator::make($request->all(), [
      'orderId' => 'required|integer',
      'transaction.amount' => 'required|numeric',
      'customer.name' => 'required|string',
      'customer.email' => 'required|email',
      'customer.phone' => 'required|string'
    ]);

    if ($validator->fails()) {
      return response()->json(['errors' => $validator->errors()], 422);
    }

    $params = [
      'transaction_details' => [
        'order_id' => rand(),
        'gross_amount' => $request->input('transaction.amount')
      ],
      'credit_card' => [
        'secure' => true
      ],
      'customer_details' => [
        'first_name' => $request->input('customer.name'),
        'email' => $request->input('customer.email'),
        'phone' => $request->input('customer.phone')
      ]
    ];

    try {
      DB::beginTransaction();
      $order = Order::findOrFail($request->input('orderId'));
      $snapToken = Snap::getSnapToken($params);
      $order->update([
        'token' => $snapToken
      ]);
      DB::commit();
      return response()->json(['token' => $snapToken]);
    } catch (\Exception $e) {
      DB::rollBack();
      Log::error('Failed to place order: ' . $e->getMessage());
      return response()->json(['message' => 'Failed to place order', 'error' => $e->getMessage()], 500);
    }
  }

  public function index()
  {
    //
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
