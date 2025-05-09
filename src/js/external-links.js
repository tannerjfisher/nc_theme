/**
 * @file
 * External links handling to add an 'external' icon to links or buttons along with text to indicate it as external.
 * Add the 'no-external-icon' class to links to exclude them from this functionality.
 *
 */
// JavaScript should be made compatible with libraries other than jQuery by
// wrapping it with an "anonymous closure". See:
// - https://drupal.org/node/1446420
// - http://www.adequatelygood.com/2010/3/JavaScript-Module-Pattern-In-Depth

(function (Drupal) {
  'use strict';

  // To understand behaviors, see https://www.drupal.org/node/2269515
  Drupal.behaviors.external_links = {
    attach: function (context, settings) {

      if (context !== document) {
        return;
      }

      // Uses a reference to the SVG sprite in the `html.html.twig` template.
      const svgMarkup = `
      <svg class="bi" fill="currentColor" aria-hidden="true" tabindex="-1" focusable="false">
        <use xlink:href="/themes/custom/nc_theme/dist/img/icons/bootstrap-icons.svg#box-arrow-up-right"></use>
      </svg>
      `;
      const links = once('external-links', document.querySelectorAll("[href^='http']:not(.skip-external-script)"), context);

      // loop through all external links, and append external link icon SVG
      links.forEach((element) => {
        let a = new RegExp('/' + window.location.host + '/');
        if (!a.test(element.href)) {
          if (!element.classList.contains('external-link-icon-added') && !element.classList.value.includes('no-external-icon')) {
            element.classList.add('icon-link');

            element.innerHTML += `<span class="visually-hidden"> (${Drupal.t(
              'external link'
            )})</span>${svgMarkup}`;
          }
        }
      });
    },
  };
})(Drupal);
