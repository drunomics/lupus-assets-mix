/**
 * @file
 * Assure that only a single line of tags are visible for tag lists. Additionally show a more button if not all tags
 * could be displayed in a single line. When clicking on the more button we show all tags.
 * */
(function ($) {
  'use strict';

  var listCopies = [];

  $(document).ready(function () {
    var lists = $('.list-links--single-line');
    updateLists(lists);

    $(window).resize(function () {
      updateLists(lists);
    });

    $('.list-links__more-link').on('click', function () {
      var list = $(this).parents('.list-links');
      var items = $('.list-links__item', list);
      var isExpanded = list.hasClass('expanded');
      items.removeClass('hidden'); // First remove he hidden class to allow all list items to be shown.
      list.toggleClass('expanded').css('maxHeight', isExpanded ? '' : list.data('full-height'));
    });
  });

  function updateLists(lists) {
    // Allows adding the single line functionality to multiple lists on the same page.
    lists.each(function (index, list) {
      list = $(list);
      var items = $('.list-links__item', list);
      var moreItem = $('.list-links__more', list);

      // Store and retrieve the height of a single line so we only compute it once.
      var heightSingle = list.data('height-single');
      if (typeof heightSingle == 'undefined') {
        heightSingle = list.height();
        list.data('height-single', heightSingle);
      }

      // Copy and store the corresponding index of the copy in the list ro can retrieve it efficiently.
      var copyIndex = list.data('list-copy');
      if (typeof copyIndex == 'undefined') {
        var parent = list.parent();
        listCopies.push(list.clone().addClass('invisible').appendTo(parent));
        copyIndex = listCopies.length - 1;
        list.data('list-copy', copyIndex);
      }
      var copy = listCopies[copyIndex];
      var fullHeight = copy.height();

      items.removeClass('hidden'); // Reset all hidden classes to allow showing more items than before.
      if (fullHeight > heightSingle) {
        // The items do not fit into a single line.
        list.data('full-height', fullHeight);
        moreItem.addClass('visible');

        var lastItem = items.filter(':not(.hidden)').last();
        // Hide item by item until we can display them in a single line.
        while (moreItem.offset().top > $(list).offset().top) {
          lastItem.addClass('hidden');
          lastItem = items.filter(':not(.hidden)').last();
        }
      }
      else {
        // The items fit into one line. Hide the more button.
        moreItem.removeClass('visible');
      }
    });
  }
})(jQuery);
