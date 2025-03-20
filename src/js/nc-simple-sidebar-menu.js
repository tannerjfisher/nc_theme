/**
 * @file
 * Simple Sidebar Menu
 */

(function (Drupal) {
  'use strict';

  Drupal.behaviors.simpleSidebarMenu = {
    attach: function (context) {
      // ===== Add menu control to the custom close button in the mobile navigation panel
      const subMenuToExpand = context.querySelectorAll('.nc-simple-sidebar-menu .menu-item--expanded > ul');

      subMenuToExpand.forEach((subMenu) => {
        const toggleButton = document.createElement('button');
        toggleButton.classList.add('sub-menu--toggle');

        toggleButton.setAttribute('aria-expanded', 'false');
        toggleButton.innerHTML = `
          <span class="text visually-hidden">Show Sub Menu</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down icon" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"/>
          </svg>

        `;
        subMenu.before(toggleButton);
      });

      const subMenuToggles = context.querySelectorAll('.sub-menu--toggle');

      // ===== Set sub menu toggles
      subMenuToggles.forEach((toggle) => {
        const parentLink = toggle.previousElementSibling;
        if (parentLink && parentLink.tagName === 'A') {
          const subMenuItemText = parentLink.textContent.trim();
          const toggleText = toggle.querySelector('.text');
          toggleText.textContent = `Show ${subMenuItemText} sub menu`;

          // Automatically open if the parent has the active trail class
          if (toggle.parentNode.classList.contains('menu-item--active-trail')) {
            toggleSubMenu(toggle);
          }
        }
      });

      /**
       * Toggles the sub menu visibility.
       *
       * @param {HTMLElement} toggle
       *   The toggle button element.
       */
      function toggleSubMenu(toggle) {
        const parentLink = toggle.previousElementSibling;
        const subMenu = toggle.nextElementSibling;
        const subMenuItemText = parentLink ? parentLink.textContent.trim() : '';

        // Toggle classes
        if (parentLink) parentLink.classList.toggle('show');
        if (subMenu) subMenu.classList.toggle('show');
        toggle.classList.toggle('show');

        // Update ARIA attributes and toggle text
        const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
        toggle.setAttribute('aria-expanded', !isExpanded);
        const toggleText = toggle.querySelector('.text');
        toggleText.textContent = isExpanded
                                 ? `Show ${subMenuItemText} sub menu`
                                 : `Hide ${subMenuItemText} sub menu`;
      }

      // ===== Attach click event listeners
      subMenuToggles.forEach((toggle) => {
        toggle.addEventListener('click', () => {
          toggleSubMenu(toggle);
        });
      });
    },
  };
})(Drupal);
