(function ($) {
  'use strict';

  $(document).ready(function () {
    $('.navigation-profile--logged-in').each(function () {
      const navigationProfile = $(this);

      // General trigger button for whole menu.
      const links = $(this).find('.navigation-profile__links');
      navigationProfile.hover(function () {
        links.stop(true).show('fast');
      }, function () {
        links.stop(true).hide('fast');
      });
    });
  });
})(jQuery);
