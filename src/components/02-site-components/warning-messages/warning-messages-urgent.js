(function ($, Drupal) {
  'use strict';

  $(document).on('finished', function () {
    let warningMessages = $('.warning-messages-urgent');
    warningMessages.html(processData());
  });

  function processData() {
    let output = $('<ul class="warning-messages-urgent__list"></ul>');
    let responses = Drupal.warningMessages.parsedJSONResponse.data;

    $.cookie.json = true;
    let currentCookie = $.cookie('allianz-warning-messages') || {ignoredMessages: []};

    for (var i = 0; i < responses.length; i++) {
      let response = responses[i];

      // Add just critical items to status.
      if (response.BusinessCritical && response.BusinessCritical === '1') {
        let itemId = response.Start + '-' + response.System + '-' + response.BusinessCritical;
        itemId = itemId.toLowerCase();

        let innerList;
        if ($.inArray(itemId, currentCookie.ignoredMessages) < 0) {
          innerList = $('<li class="warning-messages-urgent__message warning-messages-urgent__message--status-' + response.Status + '">' + response.Bannertext + '</li>');
          let innerListButton = $('<button class="warning-messages-urgent__hide-button"><span>' + Drupal.t('Hide message') + '</span></button>');
          innerListButton.click(function () {
            $(this).parent().hide('fast');

            currentCookie.ignoredMessages.push(itemId);

            // Update cookie.
            $.cookie('allianz-warning-messages', currentCookie, {expires: 7, path: '/'});
          });

          innerList.append(innerListButton);
        }

        output.append(innerList);
      }
    }

    return output;
  }


})(jQuery, Drupal);
