(function ($, Drupal) {
  'use strict';

  $('.warning-messages').once('warning-messages').each(function () {
    var warningMessages = $(this);

    $(document).on('finished', function () {
      processData();
    });

    function processData() {
      var responses = Drupal.warningMessages.parsedJSONResponse.data;
      const warningMessagesUrl = Drupal.warningMessages.allWarningMessagesUrl;

      var alerts = {};

      for (var i = 0; i < responses.length; i++) {
        var response = responses[i];

        if (response.Status > 1 && response.Status < 5) {
          alerts[response.Status] = alerts[response.Status] || {label: response.StatusText, status: response.Status, data: []};
          alerts[response.Status].data.push({
            system: response.System,
            url: response.Url,
            start: response.Start,
            end: response.End
          });
        }
      }

      var messageList = $('<ul class="warning-messages__list"></ul>');

      $.each(alerts, function (index, item) {
        var outerLi = '';

        outerLi += '<div class="warning-messages__header"><div class="warning-messages__column-1">' + item.label + '</div><div class="warning-messages__column-2">' + Drupal.t('From') + '</div><div class="warning-messages__column-3">' + Drupal.t('To') + '</div></div>';
        var innerLi = '';

        $.each(item.data, function (index2, alert) {
          var from = alert.start || Drupal.t('Unknown');
          var to = alert.end || Drupal.t('Unknown');

          innerLi += '<li class="warning-messages__item"><div class="warning-messages__column-1"><a href="' + alert.url + '">' + alert.system + '</a></div><div class="warning-messages__column-2"><span>' + Drupal.t('From') + ':</span> ' + from + '</div><div class="warning-messages__column-3"><span>' + Drupal.t('To') + ':</span> ' + to + '</div></li>';
        });

        outerLi += '<ul class="warning-messages__items">' + innerLi + '</ul>';

        messageList.append('<li class="warning-messages__category warning-messages__category--status-' + item.status + '">' + outerLi + '</li>');
      });
      if (warningMessagesUrl) {
        messageList.append('<li class="warning-messages__link"><a href="' + warningMessagesUrl + '" class="button">' + Drupal.t('All information') + '</a></li>');
      }

      const currentWarningMessages = warningMessages.children().html();
      if (currentWarningMessages !== messageList.html()) {
        // Only update the warning messages if there are any changes.
        warningMessages.html(messageList);
      }
    }
  });

})(jQuery, Drupal);
