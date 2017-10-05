(function ($) {
  'use strict';

  /**
   * Case insensitive jQuery :contains selector.
   */
  $.expr[":"].containsi = $.expr.createPseudo(function(arg) {
    return function( elem ) {
      return $(elem).text().toUpperCase().indexOf(arg.toUpperCase()) >= 0;
    };
  });

  /**
   * Ali facet select search handler class.
   *
   * @constructor
   */
  function AliFacetSelectSearch($facet) {

    this.TEXT_FIELD_HTML_ID = 'facet-select-search__text-field';
    this.SELECTED_WRAPPER_HTML_ID = 'facet-select-search__selected';
    this.OPTIONS_WRAPPER_HTML_ID = 'facet-select-search__options';
    this.$facet = $facet;
    this.$optionsWrapper = this.$facet.find('.' + this.OPTIONS_WRAPPER_HTML_ID);
    this.$optionLinks = this.$optionsWrapper.find('.facet-link');
    this.$selectedWrapper = this.$facet.find('.' + this.SELECTED_WRAPPER_HTML_ID);

    /**
     * Initializes the element.
     */
    this.init = function() {
      this.initTextField();
      this.initEvents();
      this.$optionsWrapper.hide();
    };

    /**
     * Initializes search text field. Creates if does not exist.
     */
    this.initEvents = function() {
      var self = this;

      // Focus on text field.
      this.$selectedWrapper.click(function(e) {
        if ($(e.target).hasClass(self.SELECTED_WRAPPER_HTML_ID)) {
          self.$textField.focus();
        }
      });

      // Show results on text field focus.
      this.$textField.focus(function() {
        self.filterOptions();
        self.$optionsWrapper.show();
      });

      // Hide results on text field un-focus.
      this.$textField.blur(function() {
        self.hideOptions();
      });

      // Hide results on text field un-focus.
      $('body').click(function() {
        self.hideOptions();
      });

      // Filter options, resize on text input.
      this.$textField.on('input',function(){
        self.filterOptions();
        self.resizeInput();
      });
    };

    /**
     * Initializes the search text field. Creates if does not exist.
     */
    this.initTextField = function() {
      var $textField = this.$selectedWrapper.find('.' + this.TEXT_FIELD_HTML_ID);
      if ($textField.length === 0) {
        $textField = $('<input/>', {
          'type': 'text',
          // @todo Translate.
          'placeholder': 'Suchen',
          'class': this.TEXT_FIELD_HTML_ID
        });
        $textField.appendTo(this.$selectedWrapper);
      }

      this.$textField = $textField;

      this.resizeInput();
    };

    /**
     * Filters facet options.
     */
    this.filterOptions = function() {
      var text = this.$textField.val();
      this.$optionLinks.hide();
      this.$optionLinks.filter(':containsi(' + text + ')').show();
    };

    /**
     * Hide options list if not focused.
     */
    this.hideOptions = function() {
      var self = this;
      var optionsWrapperSelector = '.' + self.OPTIONS_WRAPPER_HTML_ID;
      // Set timeout to wait for the focus change in DOM.
      setTimeout((function() {
        var $focused = $(document.activeElement);
        // Check if the focused element is not the text field or the options.
        if (
          !$focused.hasClass(self.TEXT_FIELD_HTML_ID) &&
          !$focused.closest(optionsWrapperSelector).length
        ) {
          self.$optionsWrapper.hide();
        }
      }), 100);
    };

    /**
     * Resize the text input to width of text.
     */
    this.resizeInput = function() {
      var size = this.$textField.val().length;
      if (size === 0) {
        // Min width is 1.
        size = 1;
      }
      this.$textField.attr('size', size);
    };
  }

  // Initialize facets search widget.
  $(document).ready(function(){
    $('.facet-select-search').each(function() {
      var facetsHandler = new AliFacetSelectSearch($(this));
      facetsHandler.init();
    });

  });

})(jQuery);
