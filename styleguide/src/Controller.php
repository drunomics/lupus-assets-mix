<?php

namespace drunomics\Styleguide;

class Controller {

  public function __construct(Application $application) {
    $this->application = $application;
    $this->config = $application->config;
    $this->view = $this->application->viewClass;

    // The index controller/page.
    $this->application->get('/', function () {
      return $this->handleRequest();
    });

    // Content controllers/pages.
    $this->application->get('/{variant}', function ($variant) {
      return $this->handleRequest($variant);
    });

    // Content controllers/pages.
    $this->application->get('/{variant}/{page}', function ($variant, $page) {
      return $this->handleRequest($variant, $page);
    });

    // Content controllers/pages.
    $this->application->get('/{variant}/{page}/{subpage}', function ($variant, $page, $subpage) {
      return $this->handleRequest($variant, $page, $subpage);
    });
  }

  public function handleRequest($variant = '', $page = '', $subpage = '') {
    if (!$variant) {
      $variant = $this->config->get('defaults')['variant'];
    }

    if (!$page) {
      $page = $this->config->get('defaults')['page'];
    }

    $this->application['active_variant'] = $variant;
    $this->application['active_page'] = $page;
    if (!empty($subpage)) {
      $this->application['active_page'] .= '/' . $subpage;
    }
    $this->application->data->addData(!empty($subpage) ? $subpage : $page);

    if ($this->application->isValidVariantAndPage()) {
      return $this->view->render('html');
    }
    else {
      return $this->view->render('404');
    }
  }
}
