<?php

namespace drunomics\Styleguide;

class Util {

  /**
   * @param $str
   * @param bool $slash Add (TRUE), remove (FALSE) the trailing slash.
   *
   * @return string
   */
  public static function trailingSlash($str, $slash = TRUE) {
    $str = rtrim($str, '/');
    return $slash ? $str . '/' : $str;
  }

  /**
   * Creates a readable title replacing dashes with spaces.
   * @param $str
   *
   * @return string
   */
  public static function getTitle($str) {
    // Replace the prepended number if existing.
    $str = preg_replace('/^[0-9-]+/', '', $str);
    // Replace the numbers of any subpages if existing.
    $str = preg_replace('/\/[0-9-]+/', '-', $str);
    $str = preg_replace('/[^a-zA-Z0-9]+/', ' ', $str);
    return ucwords($str);
  }

  public static function getVariantTitle($str) {
    $str = preg_replace('/[^a-zA-Z0-9\s]{2,}/', ' / ', $str);
    return ucwords($str);

  }
}
