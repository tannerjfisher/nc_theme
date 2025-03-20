/**
 * @file
 * UI toggler elements control.
 */

(function (Drupal, once) {
  'use strict';

  Drupal.behaviors.uiTogglerElementsControl = {
    attach: function (context) {
      // Ensure this behavior only runs once on the main canvas
      const mainCanvas = once('uiToggler', '.dialog-off-canvas-main-canvas', context);

      mainCanvas.forEach((canvas) => {
        // Create the overlay element
        const overlay = document.createElement('div');
        overlay.className = 'search-overlay';

        // Append the overlay to the main canvas
        canvas.appendChild(overlay);
      });
    },
  };
})(Drupal, once);
