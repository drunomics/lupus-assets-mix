(function ($) {
  'use strict';

  $(document).ready(function () {
    $('.responsive-menu-sublist').each(function () {
      const responsiveMenuSublist = $(this);
      const header = $(this).find('.responsive-menu-sublist__header');

      header.click(function (e) {
        $(this).toggleClass('responsive-menu-sublist__header--is-active');
        responsiveMenuSublist.find('.responsive-menu-sublist__list').fadeToggle('fast');

        e.preventDefault();
        return false;
      });
    });
  });
})(jQuery);
