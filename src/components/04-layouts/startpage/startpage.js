(function ($) {
  'use strict';

  $(document).ready(function () {
    $('.startpage').each(function () {
      var $container = $(this);
      var $header = $container.find('.startpage__header');
      var $tools = $container.find('.tools');
      var $teasers = $container.find('.startpage__teaser');

      var $first_box = $container.find('.teaser-box:first');
      var $connect = $container.find('.list-news-connect');

      setTeaserMargin();

      $(window).resize(setTeaserMargin);

      /**
       * Updates the start-page grid margins.
       */
      function setTeaserMargin() {
        if (window.innerWidth > 768) {
          var offset = $tools.height() - $header.outerHeight() + 20;
          var offset_2 = $connect.outerHeight(true) - $first_box.outerHeight(true) + 20;
          $teasers.css('margin-top', Math.max(offset, offset_2));
        }
        else {
          $teasers.css('margin-top', 0);
        }
      }
    });
  });
})(jQuery);
