<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class ThirdPartiesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    public function indonesiaRegion(Request $request)
    {
        $type = $request->query('type', 'province');
        $id = $request->query('id', 0);

        try {
            // Construct URL based on type and id
            $url = ($type === 'province')
                ? 'https://emsifa.github.io/api-wilayah-indonesia/api/provinces.json'
                : 'https://emsifa.github.io/api-wilayah-indonesia/api/regencies/' . $id . '.json';

            // Fetch data from external API using Laravel HTTP client
            $response = Http::get($url);

            // Check if request was successful
            if ($response->successful()) {
                $data = $response->json();
                return response()->json($data);
            } else {
                return response()->json(['message' => 'Failed to fetch data'], $response->status());
            }
        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to fetch data', 'error' => $e->getMessage()], 500);
        }
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
