<?php

namespace Database\Factories;

use GuzzleHttp\Client;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Porduct>
 */
class ProductFactory extends Factory
{
  /**
   * Define the model's default state.
   *
   * @return array<string, mixed>
   */

  public function definition(): array
  {
    $data = $this->getImages();

    return [];
  }
}
