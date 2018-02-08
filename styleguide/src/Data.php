<?php

namespace drunomics\Styleguide;

use \Symfony\Component\Finder\Finder;
use \Symfony\Component\Yaml\Parser;

class Data {

  public function __construct(\drunomics\Styleguide\Application $application) {
    $this->application = $application;
    $this->config = $application->config;
    $this->navigation = $this->application->navigation;
    $this->yaml = new Parser();
  }

  public function getStyleguideData() {
    $data = [
      'pages_dir' => Util::trailingSlash($this->config->get('component_paths')['pages'], TRUE),
      'styleguide_css' => '/css/styleguide.css',
      'variant_css' => $this->getVariantCssUrl(),
      'js_path' => '/' . $this->config->get('asset_paths')['main_js'],
      'page_title' => Util::getTitle($this->application['active_page']),
      'show_styleguide_nav' => isset($_GET['raw']) ? false : true,
    ];

    return $data += $this->navigation->getNavigationData();
  }

  public function getGlobalData() {
    $globalDataPath = __DIR__ . '/../data';

    // Get namespaced global data.
    $data = $this->loadDataFromDir($globalDataPath);

    // Get non-namespaced global data.
    $filename = Util::trailingSlash($globalDataPath, TRUE) . '_global.yml';
    if (file_exists($filename)) {
      $data += $this->yaml->parse(file_get_contents($filename));
    }

    return $data;
  }

  public function loadDataFromDir($dir, $filename = '*.yml') {
    $finder = new Finder();
    $finder
      ->files()
      ->in($dir)
      ->name($filename);
    $data = [];

    foreach ($finder as $file) {
      $data[$file->getBasename('.yml')] = $this->yaml->parse($file->getContents());
    }

    return $data;
  }

  public function getDataForPage($page) {
    $pagesPath = $this->config->get('component_paths')['pages'];
    $pageData = $this->loadDataFromDir($pagesPath, $page . '.yml');
    if (isset($pageData[$page])) {
      $pageData = $pageData[$page];
    }
    return $pageData;
  }

  public function addData($page) {
    // Add global data.
    foreach ($this->getGlobalData() as $key => $value) {
      $this->application['twig']->addGlobal($key, $value);
    }

    // Add data needed for the styleguide itself.
    $this->application['twig']->addGlobal('styleguide', $this->getStyleguideData());

    // Add page specific data.
    if ($page && is_string($page)) {
      foreach ($this->getDataForPage($page) as $key => $value) {
        $this->application['twig']->addGlobal($key, $value);
      }
    }
  }

  public function getVariantCssUrl($variant = FALSE) {
    if (!$variant) {
      $variant = $this->application['active_variant'];
    }
    return '/' . Util::trailingSlash($this->config->get('asset_paths')['css_dir']) . $variant . '.css';
  }

}
