<?php

namespace drunomics\Styleguide;

use \Symfony\Component\Finder\Finder;

class Navigation {
  public function __construct(Application $application) {
    $this->application = $application;
    $this->config = $application->config;
  }

  public function getContentPages($path = false) {
    if (!$path) {
      $path = $this->config->get('component_paths')['pages'];
    }
    $path = Util::trailingSlash($path);

    $finder = new Finder();
    $finder
      ->ignoreDotFiles(true)
      ->ignoreUnreadableDirs()
      ->ignoreVCS(true)
      ->depth(0)
      ->sortByName()
      ->in($path);

    $pages = [];
    foreach ($finder as $page) {
      if ($page->getType() === 'dir') {
        $pages[] = [
          'title' => $page->getBasename(),
          'pages' => $this->getContentPages($path . $page->getFilename()),
        ];
      }
      // Ignore files starting with '_'.
      elseif (preg_match('/^[^_][a-z0-9-_]*\.twig$/', $page->getFilename())) {
        $pages[] = $page->getBasename('.twig');
      }
    }

    return $pages;
  }

  public function getVariants() {
    $path = Util::trailingSlash($this->config->get('asset_paths')['css_dir']);
    $finder = new Finder();
    $finder
      ->files()
      ->in($path)
      ->name('/\.css$/');

    $variants = [];
    foreach ($finder as $variant) {
      $file = $variant->getBasename('.css');
      $variants[] = $file;
    }

    sort($variants);
    return $variants;
  }

  public function getVariantUrl($variant = '') {
    if (!$variant) {
      $variant = $this->application['active_variant'];
    }
    $variant = preg_replace('/\.css$/', '', $variant);
    return '/' . strtolower($variant);
  }

  public function getUrl($variant = '', $page = '') {
    if (!$variant) {
      $variant = $this->application['active_variant'];
    }

    if (!$page) {
      $page = $this->application['active_page'];
    }
    $prefix = $this->getVariantUrl($variant);

    return $prefix ? $prefix . '/' . $page : $page;
  }

  public function getNavigationData() {
    $result = [
      'variants' => [],
      'pages' => [],
      'active_variant' => $this->application['active_variant'],
      'active_page' => $this->application['active_page'],
    ];

    $i = 0;
    foreach ($this->getVariants() as $variant) {
      $url = $this->getUrl($variant);
      $i++;
      $result['variants'][] = [
        'label' => str_pad($i, 2, '0', STR_PAD_LEFT) . ' - ' . Util::getVariantTitle($variant),
        'value' => $url,
        'id' => $variant,
      ];
    }

    $result['pages'] = $this->getPageStructure($this->getContentPages());
    return $result;
  }

  public function getPageStructure($pages, $baseUrl = '') {
    $result = [];

    foreach ($pages as $page) {
      if (is_array($page)) {
        $result[] = [
          'title' => Util::getTitle($page['title']),
          'url' => $this->getUrl('', $baseUrl . $page['title']),
          'pages' => $this->getPageStructure($page['pages'], Util::trailingSlash($page['title'])),
        ];

      }
      else {
        $result[] = [
          'url' => $this->getUrl('', $baseUrl . $page),
          'title' => Util::getTitle($page),
        ];
      }
    }

    return $result;
  }
}
