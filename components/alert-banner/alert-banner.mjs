/**
 * @file
 * Alert banner logic for hiding dismissed alerts based on cookies.
 */
(function (Drupal, once, cookies) {
  'use strict';

  Drupal.behaviors.alertBanner = {
    attach: function (context, settings) {
      once('alertBannerBehaviour', '.view-alerts', context).forEach(() => {
        // Get any stored alert IDs from the cookie
        let alerts = cookies.get('alert-banner');
        let dismissedAlerts = alerts ? alerts.split(';') : [];

        // Loop through all alert banners and hide only the ones in the cookie
        document.querySelectorAll('.alert-banner').forEach((alertElement) => {
          let alertId = alertElement.id;

          if (dismissedAlerts.includes(alertId)) {
            alertElement.classList.add('hidden');
            alertElement.setAttribute('aria-hidden', 'true');
          }
        });

        // Add click handlers to dismiss alerts and store them in cookies
        context.querySelectorAll('.dismiss').forEach((e) => {
          e.addEventListener('click', function () {
            this.setAttribute('aria-pressed', 'true');

            let alertElement = this.closest('.alert-banner');
            let alertId = alertElement.id;

            // Hide the alert
            alertElement.classList.add('hidden');
            alertElement.setAttribute('aria-hidden', 'true');

            // Set the cookie to expire in one month
            let expiryDate = new Date();
            expiryDate.setMonth(expiryDate.getMonth() + 1);

            let existingAlerts = cookies.get('alert-banner');
            let updatedAlerts = existingAlerts ? `${existingAlerts};${alertId}` : alertId;
            cookies.set('alert-banner', updatedAlerts, { expires: expiryDate });
          });
        });
      });
    }
  };
})(Drupal, once, window.Cookies);
