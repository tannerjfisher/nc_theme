/**
 * @file
 * Adds a toggle to facet groups.
 */

(function (Drupal, once) {
  'use strict';

  /**
   * Toggles the visibility of a facet group.
   *
   * @param {HTMLElement} element
   *   The toggle button element.
   */
  const toggleFacets = (element) => {
    element.classList.toggle('open');
    const facetList = element.parentNode.nextElementSibling;

    if (element.classList.contains('open')) {
      element.setAttribute('aria-expanded', 'true');
      facetList.style.display = 'block';
    } else {
      element.setAttribute('aria-expanded', 'false');
      facetList.style.display = 'none';
    }
  };

  /**
   * Drupal behavior to attach the facet toggle functionality.
   */
  Drupal.behaviors.facetsToggle = {
    attach: function (context) {
      // Use `once` to ensure the click event is added only once.
      once('facetsToggle', 'button.facet-group-toggle', context).forEach((facetHeading) => {
        facetHeading.addEventListener('click', () => {
          toggleFacets(facetHeading);
        });
      });
    },
  };
})(Drupal, once);
