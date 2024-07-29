<?php
return [
  'serverKey' => env('MIDTRANS_SERVER_KEY', ''),
  'clientKey' => env('MIDTRANS_CLIENT_KEY', ''),
  'is_sanitized' => env('MIDTRANS_IS_SANITIZED', false),
  'is_3ds' => env('MIDTRANS_IS_3DS', false),
  'is_sroduction' => env('MIDTRANS_IS_PRODUCTION', false),
  'is_devMode' => env('MIDTRANS_IS_DEV_MODE', false),
];
