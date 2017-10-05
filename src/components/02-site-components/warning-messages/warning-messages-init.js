(function ($, Drupal, drupalSettings) {
  'use strict';

  Drupal.warningMessages = {
    parsedJSONResponse: null,
    allWarningMessagesUrl: drupalSettings.warning_messages.all_warning_messages_url
  };

  function updateWarningMessages() {
    $.getJSON(drupalSettings.warning_messages.resource_url, function (response) {
      Drupal.warningMessages.parsedJSONResponse = response;
      $.event.trigger('finished');
    });
  }

  updateWarningMessages();
  setInterval(updateWarningMessages, 90000);
})(jQuery, Drupal, drupalSettings);
