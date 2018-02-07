<?php

namespace drunomics\Styleguide;

class View {
  public function __construct(\drunomics\Styleguide\Application $application) {
    $this->application = $application;
    $this->twig = $this->application['twig'];
  }

  public function render($template) {
    if (!preg_match("/\.twig$/", $template)) {
      $template .= '.twig';
    }
    return $this->application->render($template);
  }
}
