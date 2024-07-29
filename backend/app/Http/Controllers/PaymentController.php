<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
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
    // return response()->json($request->transaction);

    $params = [
      'transaction_details' => [
        'order_id' => rand(),
        'gross_amount' => $request->transaction["amount"]
      ],
      'item_details' => $request->items,
      'credit_card' => [
        'secure' => true
      ],
      'customer_details' => [
        'first_name' => $request->customer["name"],
        'email' => $request->customer["email"],
        'phone' => $request->customer["phone"]
      ]
    ];

    $snapToken = Snap::getSnapToken($params);
    return response()->json($snapToken);
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
