(function ($) {
  'use strict';

  $(document).ready(function () {
    var blockSelector = '.facet';
    var titleClass = 'facet__title';
    var contentClass = 'facet__content';
    var expandedClass = 'facet--expanded';
    var collapsedClass = 'facet--collapsed';
    var toggleClass = 'facet__toggle';
    var activeClass = 'facet-link--is_active';

    $(blockSelector).each(function () {
      var $block = $(this);
      initializeSorts($block);
      var $title = $block.find('.' + titleClass);
      var $toggle = $('<span class="' + toggleClass + '">');
      $title.append($toggle);

      // Toggle block on title click.
      $title.click(function () {
        var $block = $(this).closest(blockSelector);
        toggleSorts($block);
      });

      /**
       * Initializes blocks.
       *
       * @param {object} $block
       *   The block jQuery object.
       */
      function initializeSorts($block) {
        if ($block.find('.' + activeClass).length) {
          $block.addClass(expandedClass);
        }
        else {
          if (!$block.hasClass(expandedClass)) {
            var $content = $block.find('.' + contentClass);
            $block.addClass(collapsedClass);
            $content.hide();
          }
        }
      }

      /**
       * Toggles blocks.
       *
       * @param {object} $block
       *   The block jQuery object.
       */
      function toggleSorts($block) {
        var $content = $block.find('.' + contentClass);
        if ($block.hasClass(collapsedClass)) {
          $content.slideDown();
        }
        else {
          $block.addClass(expandedClass);
          $content.slideUp();
        }

        $block.toggleClass(expandedClass);
        $block.toggleClass(collapsedClass);
      }
    });
  });

})(jQuery);
