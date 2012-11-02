//
// Toast popup notifier
//
// By: Stuart Rackham
//
// Inspired by: https://github.com/Srirangan/notifer.js
//              https://github.com/CodeSeven/toastr
//

var Toast = (function($){

  /* Private variables and functions */

  // Exported as Toast.defaults
  var _defaults = {
    displayDuration: 2000,    // In milliseconds, set to 0 to make sticky.
    fadeOutDuration: 800,     // In milliseconds.
    toastClass: '',   // CSS class name.
    toastCSS: {},     // Override .toast properties in toast.css
    containerCSS: {}  // Override #toast-container properties in toast.css
  };

  var _container; // Contains toast stack.

  // Does all the work.
  function _notify(message, title, options) {
    options = $.extend({}, _defaults, options);
    if (!_container) {
      _container = $('<div>')
        .attr('id', 'toast-container')
        .appendTo($('body'));
    }
    _container.css(options.containerCSS);
    console.log(options.containerCSS);
    var toastElement = $('<div>')
      .addClass('toast')
      .addClass(options.toastClass)
      .css(options.toastCSS);
    if (title) {
      var titleElement = $('<div>').addClass('toast-title').append(title);
      toastElement.append(titleElement);
    }
    if (message) {
      var messageElement = $('<div>').addClass('toast-message').append(message);
      toastElement.append(messageElement);
    }
    if (options.displayDuration > 0) {
      setTimeout(function() {
        toastElement.fadeOut(options.fadeOutDuration, function() {
          toastElement.remove();
        });
      }, options.displayDuration);
    }
    toastElement.on('click', function() {
      toastElement.remove();
    });
    _container.prepend(toastElement);
  }


  /* Public API */

  return {

    // Toast.defaults
    // Modifiable default CSS and animation parameters.
    defaults: _defaults,

    // Popup functions:
    //
    // Toast.info    (message [,title [, options]])
    // Toast.warning (message [,title [, options]])
    // Toast.error   (message [,title [, options]])
    // Toast.success (message [,title [, options]])
    //
    // message: String
    // title:   String
    // options: Object with properties to override Toast.defaults

    info: function(message, title, options) {
      _notify(message, title,
          $.extend({}, {toastClass: 'toast-info'}, options));
    },

    warning: function(message, title, options) {
      _notify(message, title,
          $.extend({}, {toastClass: 'toast-warning'}, options));
    },

    error: function(message, title, options) {
      _notify(message, title,
          $.extend({}, {toastClass: 'toast-error'}, options));
    },

    success: function(message, title, options) {
      _notify(message, title,
          $.extend({}, {toastClass: 'toast-success'}, options));
    }
  };

}(jQuery));