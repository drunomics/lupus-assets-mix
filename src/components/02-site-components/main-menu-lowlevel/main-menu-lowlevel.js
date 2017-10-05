(function ($, Drupal) {
  'use strict';

  $(document).ready(function () {
    $('.main-menu-lowlevel').each(function () {
      const menu_wrapper = $(this);

      menu_wrapper.find('.menu__item--expanded').each(function () {
        const menu_item = $(this);
        const menu_trigger = $('<button class="main-menu-lowlevel__trigger"><span>' + Drupal.t('Toggle item') + '</span></button>');

        menu_trigger.click(function (e) {
          menu_item.children('ul.menu').fadeToggle();

          if ($(this).hasClass('main-menu-lowlevel__trigger--is-active')) {
            $(this).removeClass('main-menu-lowlevel__trigger--is-active');
          }
          else {
            $(this).addClass('main-menu-lowlevel__trigger--is-active');
          }

          e.preventDefault();
          return false;
        });

        // Check if it contains active menu
        if (menu_item.find('a.is-active').length) {
          menu_item.children('ul.menu').show();
          menu_trigger.addClass('main-menu-lowlevel__trigger--is-active');
        }

        menu_item.children('a').append(menu_trigger);
      });
    });
  });
})(jQuery, Drupal);
