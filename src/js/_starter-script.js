/**
 * @file
 * A JavaScript file for the theme.
 * Duplicate me for new features.
 */

(function (Drupal) {
  'use strict';

  // To understand behaviors, see https://www.drupal.org/node/2269515
  Drupal.behaviors.UNIQUE_SCRIPT_NAME = {
    attach: function (context, settings) {

      // prevents scripts from firing in other contexts such as AJAX requests
      if (context !== document) {
        return;
      }

      // use once so that selectors aren't attatched multiple times. 
      // core/once should be a dependency in theme.libraries for this to work.
      const querySelector = once('query-id-so-it-doesnt-repeat', document.querySelectorAll(".selector"), context);

    },
  };
})(Drupal);