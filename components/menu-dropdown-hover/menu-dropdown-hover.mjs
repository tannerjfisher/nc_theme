/**
 * @file
 * Hover style dropdown menu.
 */

import { handleDropdownOverflow } from '@js/dropdown-utils.js';

(function (Drupal, once) {
  'use strict';

  Drupal.behaviors.addHoverToDropdown = {
    attach: function (context) {
      // Ensure this behavior only runs once on the main canvas
      const dropdowns = once('hover-dropdown', '.navbar .dropdown', context);

      dropdowns.forEach((dropdown) => {
        const dropdownMenu = dropdown.querySelector('.dropdown-menu');

        // Show dropdown on hover
        dropdown.addEventListener('mouseenter', () => {
          dropdownMenu.classList.add('show');

          if (dropdown.parentElement.classList.contains('nav')) {
            handleDropdownOverflow(dropdown);
          };
        });

        // Hide dropdown when mouse leaves
        dropdown.addEventListener('mouseleave', () => {
          dropdownMenu.classList.remove('show');
        });

        dropdown.querySelector('a').addEventListener('click', (e) => {
          if (dropdown.parentElement.classList.contains('nav')) {
            handleDropdownOverflow(dropdown);
          }
        });
      });
    },
  };
})(Drupal, once);
