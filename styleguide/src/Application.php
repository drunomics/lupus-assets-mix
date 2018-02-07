<?php

namespace drunomics\Styleguide;

use Silex\Application\TwigTrait;
use Silex\Application\UrlGeneratorTrait;
use Silex\Provider\TwigServiceProvider;

class Application extends \Silex\Application {

  use TwigTrait;
  use UrlGeneratorTrait;

  public function __construct($config_file, $isDev = FALSE) {
    // Right now we don't use Silex values.
    parent::__construct();
    $this['debug'] = TRUE;

    $this->isDev = $isDev;
    $this->config = new Config($config_file);

    $this->register(new TwigServiceProvider(), [
      'twig.path' => __DIR__ . '/../templates',
      'twig.options' => $this->config->get('twig.options'),
    ]);

    $this->twigExtensions = new TwigCustomizations($this);

    $this['twig'] = $this->share($this->extend('twig', function($twig, $app) {
      /** @var $twig \Twig_Environment */
      $this->twigExtensions->addCustomFunctions($twig);
      $this->twigExtensions->addCustomFilters($twig);
      return $twig;
    }));


    // This seems to be a silex thing: Twig (and other things) are added
    // directly to the application class.
    $this['twig']->addExtension(new \Twig_Extension_Debug());

    // Set up namespaces.
    foreach ($this->config->get('component_paths') AS $namespace => $path) {
      $this['twig.loader.filesystem']->addPath($path, $namespace);
    }

    $this->navigation = new Navigation($this, $isDev);
    $this->data = new Data($this);
    // $this->view is already taken by Silex.
    $this->viewClass = new View($this);
    // The controller class sets up request handling.
    $this->controller = new Controller($this, $isDev);
  }

  public function isValidVariantAndPage($variant = '', $page = '') {
    return $this->isValidVariant($variant) && $this->isValidPage($page);
  }

  public function isValidVariant($variant = '') {
    if (empty($variant)) {
      $variant = $this['active_variant'];
    }

    $cssPath = $this->data->getVariantCssUrl($variant);
    return file_exists(preg_replace('/^\//', '', $cssPath));
  }

  public function isValidPage($page = '') {
    if (empty($page)) {
      $page = $this['active_page'];
    }

    $componentPaths = $this->config->get('component_paths');
    $pagesPath = $componentPaths['pages'];
    return file_exists($pagesPath . '/' . $page . '.twig');
  }
}
