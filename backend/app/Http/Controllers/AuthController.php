<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use App\Models\User;
use GuzzleHttp\Client;
use App\Models\Product;
use Illuminate\Support\Str;
use App\Mail\UserRegistered;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;
use App\Models\ProductDetail;

class AuthController extends Controller
{

  public function me(Request $request)
  {
    try {
      if (!$user = JWTAuth::parseToken()->authenticate()) {
        return response()->json(['message' => 'User not found'], 404);
      }
    } catch (\Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {
      return response()->json(['message' => 'Token expired'], 401);
    } catch (\Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {
      return response()->json(['message' => 'Token invalid'], 401);
    } catch (\Tymon\JWTAuth\Exceptions\JWTException $e) {
      return response()->json(['message' => 'Token absent'], 401);
    }

    return response()->json(compact('user'));
  }

  /**
   * Register a new user.
   *
   * @param  \Illuminate\Http\Request  $request
   * @return \Illuminate\Http\JsonResponse
   */
  public function register(Request $request)
  {
    $validator = Validator::make($request->all(), [
      'name' => 'required|string|max:255',
      'email' => 'required|string|email|unique:users,email', // Ensure unique email
      'password' => 'required|string|min:8',
    ]);

    if ($validator->fails()) {
      return response()->json($validator->errors(), 422);
    }

    $verificationCode = Str::random(4);
    $timestamp = Carbon::now()->addMinutes(5);

    DB::beginTransaction();

    try {
      $user = User::create([
        'name' => $request->name,
        'email' => $request->email,
        'password' => Hash::make($request->password),
        'verification_code' => $verificationCode,
        'verification_code_expired' => $timestamp,
        'phone' => null
      ]);

      Mail::to($user->email)->send(new UserRegistered($verificationCode));

      DB::commit();

      return response()->json(['message' => 'User created successfully'], 201);
    } catch (\Exception $e) {
      DB::rollBack();
      Log::error('User registration failed: ' . $e->getMessage());
      return response()->json(['message' => 'User registration failed' . $e->getMessage()], 500);
    }
  }


  /**
   * Authenticate the user and return a JWT token if valid credentials are provided.
   *
   * @param  \Illuminate\Http\Request  $request
   * @return \Illuminate\Http\JsonResponse
   */
  public function login(Request $request)
  {
    $validator = Validator::make($request->all(), [
      'email' => 'required|email',
      'password' => 'required|string|min:6',
    ]);
    if ($validator->fails()) {
      return response()->json($validator->errors(), 422);
    }
    $credentials = request(['email', 'password']);

    if (!$token = auth()->attempt($credentials)) {
      return response()->json(['error' => 'Unauthorized'], 401);
    }
    $user = Auth::user();
    return $this->respondWithToken($token, $user);
  }
  /**
   * Respond with a JWT token.
   *
   * @param  string  $token
   * @return \Illuminate\Http\JsonResponse
   */
  protected function respondWithToken($token, $user)
  {
    // return response()->json([
    //     'access_token' => $token,
    //     'token_type' => 'bearer',
    //     'expires_in' => auth('api')->factory()->getTTL() * 60
    // ]);
    return response()->json([
      'access_token' => $token,
      'token_type' => 'bearer',
      'expires_in' => JWTAuth::factory()->getTTL() * 60,
      'user' => $user
    ]);
  }
  /**
   * Get the authenticated user's profile.
   *
   * @param  \Illuminate\Http\Request  $request
   * @return \Illuminate\Http\JsonResponse
   */
  public function profile(Request $request)
  {
    // Retrieve the authenticated user
    $user = Auth::user();
    // return response()->json(['message' => 'hai']);

    // Return the user's profile information
    return response()->json($user);
  }

  public function resend()
  {
    $user = Auth::user();

    if (!$user) {
      return response()->json(["message" => 'User not authenticated', 'status' => 401], 401);
    }

    $user = User::where('id', $user->id)->first();

    $verificationCode = Str::random(4);
    $timestamp = Carbon::now()->addMinutes(5);
    // return response()->json($user);
    try {
      // Start transaction
      DB::beginTransaction();

      // Update user's verification code and expiry time
      $user->update([
        'verification_code' => $verificationCode,
        'verification_code_expired' => $timestamp
      ]);

      // Send verification code email
      Mail::to($user->email)->send(new UserRegistered($verificationCode));

      // Commit transaction
      DB::commit();

      return response()->json(["message" => 'Verification code sent successfully', 'status' => 201, 'verified_code_expired' => $user->verification_code_expired], 201);
    } catch (\Exception $e) {
      // Rollback transaction
      DB::rollBack();

      // Log error for debugging purposes
      Log::error('Error resending verification code: ' . $e->getMessage());

      return response()->json(["message" => 'Failed to resend verification code', 'status' => 500], 500);
    }
  }

  public function verify(Request $request)
  {
    $user = Auth::user();
    if (!$user) {
      return response()->json(["message" => 'User not authenticated'], 401);
    }

    $validator = Validator::make($request->all(), [
      'code' => 'required|string',
    ]);

    if ($validator->fails()) {
      return response()->json($validator->errors(), 422);
    }

    $code = $request->input('code');
    $time = Carbon::now();

    if ($time > $user->verification_code_expired) {
      return response()->json(["message" => 'Time to verification has ended'], 401);
    }

    if ($user->verification_code !== $code) {
      return response()->json(["message" => 'Verification code is incorrect'], 401);
    }


    try {
      DB::beginTransaction();
      $user = User::where('id', $user->id)->first();
      $user->update([
        'email_verified_at' => $time,
        'verification_code' => null, // Optionally clear the verification code after successful verification
        'verification_code_expired' => null // Optionally clear the expiration time
      ]);
      DB::commit();
      return response()->json(["message" => 'Email verified successfully'], 200);
    } catch (\Exception $e) {
      DB::rollBack();
      Log::error('Verification failed: ' . $e->getMessage());
      return response()->json(["message" => 'Verification failed'], 500);
    }
  }

  public function completeProfile(Request $request)
  {
    $user = Auth::user();
    if (!$user) {
      return response()->json(['message' => 'User not authenticated'], 401);
    }

    $validator = Validator::make($request->all(), [
      'name' => ['required', 'string', 'max:255'],
      'phone' => ['required', 'string', 'max:15'], // assuming max 15 characters for phone numbers
      'gender' => ['required', 'string', 'in:male,female'], // if you have specific gender options
      'photo' => ['nullable', 'image', 'mimes:jpeg,png,jpg,gif', 'max:2048'], // max 2MB file size
    ]);

    if ($validator->fails()) {
      return response()->json($validator->errors(), 422);
    }

    $data = $validator->validated();
    $url = '';


    $photo = $request->file('photo');

    if ($photo) {
      $dir = Str::slug($data['name']);
      $code = Str::random(4);
      $filename = "{$code}_photo_" . Str::slug(explode(' ', $data['name'])[0]);
      $result = $request->file('photo')->storeOnCloudinaryAs($dir, $filename);
      $url = $result->getSecurePath();
    }

    try {
      DB::beginTransaction();
      $user = User::where('id', $user->id)->first();

      $user->update([
        'name' => $data['name'],
        'phone' => $data['phone'],
        'gender' => $data['gender'],
        'photo' => $url,
      ]);

      DB::commit();
      return response()->json(['user' => $user, 'data' => $data]);
      return response()->json(['message' => 'Profile updated successfully'], 200);
    } catch (\Exception $e) {
      DB::rollBack();
      Log::error('Profile update failed: ' . $e->getMessage());
      return response()->json(['message' => 'Profile update failed'], 500);
    }
  }

  public function getImages(Request $request)
  {
    $type = $request->type ?? 'shirt man';
    $quantities = $request->quantities ?? 8;
    $client = new Client([
      'base_uri' => env('UNSPLASH_URL')
    ]);
    $response = $client->request('GET', 'photos/random', [
      'headers' => [
        // 'Authorization' => "Client-ID" . env('UNSPLASH_ACCESS_KEY')
      ],
      'query' => [
        'query' => $type,
        'count' => $quantities,
        'client_id' => env('UNSPLASH_ACCESS_KEY')
      ]
    ]);
    $body = $response->getBody()->getContents();
    $data = json_decode($body, true);

    return response()->json($data);
  }

  public function storeNewProduct(Request $req)
  {
    // Validate the request data
    $validated = $req->validate([
      'data.*.name' => 'required|string|max:255',
      'data.*.description' => 'required|string',
      'data.*.image' => 'required|url',
      'data.*.size' => 'required|string|max:10',
      'data.*.price' => 'required|numeric|min:0',
      'data.*.color' => 'required|string|max:50',
      'data.*.likes' => 'required|numeric|',
      'data.*.category' => 'required|string|max:50',
    ]);

    // Use a transaction to ensure data integrity
    DB::beginTransaction();

    try {
      $data = $req->all()["data"];

      // Create the main product

      $product = '';
      // Create the product details
      foreach ($data as $key => $value) {
        if ($key === 0) {
          $product = Product::create([
            'name' => $value['name'],
            'description' => $value['description'],
            'image' => $value['image'],
            'likes' => $value["likes"],
            'category' => $value["category"],
            'price' => $value["price"]
          ]);
        }
        // if ($key > 0) {
        ProductDetail::create([
          'image' => $value['image'],
          'size' => $value['size'],
          'price' => $value['price'],
          'product_id' => $product->id,
          'color' => $value['color']
        ]);
        // }
      }

      // Commit the transaction
      DB::commit();

      return response()->json(['message' => 'Product created successfully'], 201);
    } catch (\Exception $e) {
      // Rollback the transaction if something goes wrong
      DB::rollBack();

      return response()->json(['error' => 'Failed to create product', 'details' => $e->getMessage()], 500);
    }
  }
}
