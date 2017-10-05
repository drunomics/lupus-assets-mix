(function ($) {
  'use strict';

  $(document).ready(function () {
    var $header = $('.header');
    var $toggleLink = $('.language-switcher__current');
    var $menu = $('.language-switcher__menu');

    $toggleLink.click(function () {
      if ($header.hasClass('header--enforce-mobile')) {
        $menu.toggleClass('expanded');
      }
    });
  });
})(jQuery);
