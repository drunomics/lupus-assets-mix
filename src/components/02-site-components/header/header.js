(function ($) {
  'use strict';

  $(document).ready(function () {
    $('section.header').each(function () {
      const header = $(this);

      // Evaluate while visible.
      const headerFirstWidth = header.find('.header__wrapper:first-child .header__left').width();
      const headerSecondWidth = header.find('.header__wrapper:first-child .header__right').width();

      setMobileVisibility();

      $(window).resize(function () {
        setMobileVisibility();
      });

      function setMobileVisibility() {
        const headerWidth = header.width();

        if (headerWidth - headerFirstWidth - headerSecondWidth < 50) {
          header.addClass('header--enforce-mobile');
        }
        else {
          header.removeClass('header--enforce-mobile');
        }
      }
    });
  });
})(jQuery);
