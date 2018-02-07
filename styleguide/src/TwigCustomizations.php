<?php

namespace drunomics\Styleguide;

class TwigCustomizations {
  public function __construct(Application $application) {
    $this->application = $application;

    $this->customFunctions = [
      'path' => $this->getPathFunction(),
      'create_attribute' => $this->getCreateAttributeFunction(),
    ];

    $this->customFilters = [
      't' => $this->getTranslateFilter(),
      'without' => $this->getWithoutFilter(),
      'clean_class' => $this->getCleanClassFilter(),
    ];
  }

  public function addCustomFunctions(\Twig_Environment $twig) {
    foreach ($this->customFunctions as $functionName => $function) {
      $twig->addFunction($functionName, $function);
    }
  }

  public function addCustomFilters(\Twig_Environment $twig) {
    foreach ($this->customFilters as $filterName => $filter) {
      $twig->addFilter($filterName, $filter);
    }
  }

  public function getPathFunction() {
    return new \Twig_SimpleFunction('path', function() {
      $args = func_get_args();
      if ($args[0] === 'GET_variant_page') {
        $variant = $args[1]['variant'];
        $page = $args[1]['page'];
        return  $this->application->navigation->getUrl($variant, $page);
      }
      return '/';
    });
  }

  public function getCreateAttributeFunction() {
    return new \Twig_SimpleFunction('create_attribute', function (array $attributes = []) {
      // Note that the class is provided by aleksip/plugin-data-transform for PL.
      return new \Drupal\Core\Template\Attribute($attributes);
    });
  }

  public function getTranslateFilter() {
    return new \Twig_SimpleFilter('t', function($content) {
      return $content;
    });
  }

  public function getWithoutFilter() {
    return new \Twig_SimpleFilter('without', function($element) {
      // Shamelessly copied from drupals core/themes/engines/twig/twig.engine, line 137.
      if ($element instanceof ArrayAccess) {
        $filtered_element = clone $element;
      }
      else {
        $filtered_element = $element;
      }
      $args = func_get_args();
      unset($args[0]);
      foreach ($args as $arg) {
        if (isset($filtered_element[$arg])) {
          unset($filtered_element[$arg]);
        }
      }
      return $filtered_element;
    });
  }

  public function getCleanClassFilter() {
    return new \Twig_SimpleFilter('clean_class', function($class) {
      return $class;
    });
  }
}
