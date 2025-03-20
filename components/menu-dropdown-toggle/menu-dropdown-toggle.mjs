/**
 * @file
 * Toggle style dropdown menu.
 */

import { handleDropdownOverflow } from '@js/dropdown-utils.js';

(function (Drupal, once) {
  'use strict';

  Drupal.behaviors.addToggleToDropdown = {
    attach: function (context) {
      // Ensure this behavior only runs once on the main canvas
      const dropdowns = once('toggle-dropdown', '.navbar .dropdown', context);

      dropdowns.forEach((dropdown) => {
        const dropdownMenu = dropdown.querySelector('.dropdown-menu');

        dropdown.querySelector('a').addEventListener('click', (e) => {
          if (dropdown.parentElement.classList.contains('nav')) {
            handleDropdownOverflow(dropdown);
          }
        });
      });
    },
  };
})(Drupal, once);
