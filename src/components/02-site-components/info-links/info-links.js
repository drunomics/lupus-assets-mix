(function ($) {
  'use strict';

  function processData() {
    $('.info-links').each(function () {
      const infoLinks = $(this);
      const activeClassNav = 'info-links__navigation__item--is-active';
      const activeClass = 'info-links__list-item--is-active';
      const warningItems = infoLinks.find('.warning-messages__category');
      const infoItems = infoLinks.find('.info-links__list-item');

      if (warningItems) {
        // Find the warning with the highest impact == lowest status.
        let lowestStatus = false;
        $('.warning-messages__category', infoItems).each(function(index) {
          const status = $(this)
            .attr('class')
            .match(/warning-messages__category--status-([0-9]+)/);
          if (lowestStatus === false || (status && status[1] < lowestStatus)) {
            lowestStatus = status[1];
          }
        });

        let infoLinksClasses = infoLinks
          .attr('class')
          .split(' ')
          .filter((className) => {
            return !className.match(/^info-links--lowest-status-[0-9]+/);
          });
        if (lowestStatus !== false) {
          // Only add a class for the lowest status if there are any stati.
          infoLinksClasses.push('info-links--lowest-status-' + lowestStatus);
        }
        infoLinks.attr('class', infoLinksClasses.join(' '));

        infoLinks.find('.info-links__navigation__toggle').each(function (index) {
          const infoLink = $(this);
          const infoItemBlock = infoItems.eq(index);
          var timeoutId;

          $(this).hover(function () {
              clearTimeout(infoLink.data('timeoutId'));

              // Handle active state of navigation item.
              infoLinks.find('.info-links__navigation__item').removeClass(activeClassNav);
              $(this).addClass(activeClassNav);

              infoItems.removeClass(activeClass);
              infoItemBlock.addClass(activeClass);
            },
            function () {
              if ($(window).width() > 480) {
                // Delay on desktop.
                timeoutId = setTimeout(function () {
                  infoLinks.find('.info-links__navigation__item').removeClass(activeClassNav);
                  infoItems.removeClass(activeClass);
                }, 550);
              }
              else {
                infoLinks.find('.info-links__navigation__item').removeClass(activeClassNav);
                infoItems.removeClass(activeClass);
              }

              infoLink.data('timeoutId', timeoutId);
            });

          infoItemBlock.on('mouseenter', function () {
            clearTimeout(infoLink.data('timeoutId'));
          });

          infoItemBlock.on('mouseleave', function () {
            timeoutId = setTimeout(function () {
              infoLinks.find('.info-links__navigation__item').removeClass(activeClassNav);
              infoItems.removeClass(activeClass);
            }, 650);

            infoLink.data('timeoutId', timeoutId);
          });
        });
      }
    });
  }

  $(document).ready(function () {
    $(document).on('finished', function () {
      processData();
    });
    processData();
  });

})(jQuery, Drupal);
