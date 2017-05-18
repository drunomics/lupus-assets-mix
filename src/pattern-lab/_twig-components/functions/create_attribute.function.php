<?php
// See \Drupal\Core\Template\TwigExtension::createAttribute().
$function = new Twig_SimpleFunction('create_attribute', function (array $attributes = []) {
  // Note that the class is provided by aleksip/plugin-data-transform for PL.
  return new \Drupal\Core\Template\Attribute($attributes);
});
