<?php

// Php's built-in webserver handles all requests including static assets.
// So we need to ignore these requests here by returning FALSE.
$ignored_extensions = [
  'jpg',
  'jpeg',
  'gif',
  'png',
  'css',
  'js',
  'eot',
  'woff',
  'woff2',
  'svg',
  'htc',
  'tif',
  'tiff',
  'ttf',
  'ico',
  'csv',
  'json',
  'yml',
];

$asset_regex = '/\.(' . join('|', $ignored_extensions) . ')$/i';
if (preg_match($asset_regex, $_SERVER['REQUEST_URI'])) {
  // Serve static files without further php handling.
  return FALSE;
}

$loader = require_once __DIR__ . '/vendor/autoload.php';
chdir(__DIR__);

$app = new drunomics\Styleguide\Application('config.yml');
$app->run();
