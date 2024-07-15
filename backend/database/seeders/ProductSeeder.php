<?php

namespace Database\Seeders;

use GuzzleHttp\Client;
use App\Models\Product;
use App\Models\ProductDetail;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class ProductSeeder extends Seeder
{
  /**
   * Run the database seeds.
   */
  public $sizes = [
    '1' => 's',
    '2' => 'm',
    '3' => 'l',
    '4' => 'xl'
  ];
  public function run(): void
  {
    for ($i = 0; $i < 4; $i++) {
      $data = $this->getImages();
      // dd(collect($data));
      // dd(collect($data));
      $product = Product::create([
        'name' =>  $data[0]['alt_description'],
        'description' => $data[0]['alt_description'],
        'image' => $data[0]['url']['full']
      ]);
      foreach (collect($data) as $key => $productDetail) {
        if ($key > 1) {
          ProductDetail::create([
            'image' => $productDetail['urls']['full'],
            'size' => $key < 5 ? $this->sizes[$key] : $this->sizes[$key - 4],
            'color' => $productDetail['color'],
            'prize' => rand(100, 200),
            'product_id' => $product->id
          ]);
        }
      }
    }
  }

  public function getImages()
  {
    $client = new Client([
      'base_uri' => env('UNSPLASH_URL')
    ]);
    $response = $client->request('GET', 'photos/random', [
      'headers' => [],
      'query' => [
        'query' => 'shirt man',
        'count' => '2',
        'client_id' => env('UNSPLASH_ACCESS_KEY')
      ]
    ]);
    $body = $response->getBody()->getContents();
    $data = json_decode($body, true);

    return response()->json($data);
  }
}
