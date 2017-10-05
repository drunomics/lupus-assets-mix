(function ($) {
  'use strict';

  $(document).ready(function () {
    $('.responsive-menu').each(function () {
      const responsiveMenu = $(this);

      // General trigger button for whole menu.
      const triggerButton = $('<button class="responsive-menu__trigger"><span>' + Drupal.t('Toggle menu') + '</span></button>');

      triggerButton.click(function () {
        $(this).toggleClass('responsive-menu__trigger--is-active');
        responsiveMenu.find('.responsive-menu__list').fadeToggle('fast');
      });

      $(this).prepend(triggerButton);

      // Processing for contained menus.
      $(this).find('.menu__item--expanded').each(function () {
        var firstLink = $(this).find('a').first().detach();

        // Create Text placeholder.
        const textPlaceholder = $('<div class="responsive-menu__placeholder">' + firstLink.text() + '</div>');

        textPlaceholder.click(function () {
          $(this).toggleClass('responsive-menu__placeholder--is-active');
          $(this).next('ul').fadeToggle('fast');
        });

        $(this).prepend(textPlaceholder);

        firstLink.wrap('<li class="menu__item"></li>');
        $(this).children('ul').prepend(firstLink.parent());
      });
    });
  });
})(jQuery);
