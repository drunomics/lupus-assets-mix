(function ($) {
  'use strict';

  // Adjust height of slideshow element container to be able to fully display
  // the absolute positioned content element.
  function news_slideshow_element_height() {
    $('.news-slideshow-element').each(function (index) {
      var wrapperHeight = $(this).find('.news-slideshow-element__wrapper').height();
      var imageHeight = $(this).find('.news-slideshow-element__image-item').height();
      if (imageHeight < wrapperHeight) {
        $(this).height(wrapperHeight);
      }
      else {
        $(this).height(imageHeight);
      }
    });
  }

  $(document).ready(function () {
    news_slideshow_element_height();
  });

  $(window).on('resize', function () {
    news_slideshow_element_height();
  });
})(jQuery);
