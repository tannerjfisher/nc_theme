# Alert Banner

The **`alert-banner`** component is used to display **important notifications, warnings, and emergency messages** on the site. It supports **different alert levels**, **dismiss functionality**, and an optional **call-to-action link**.

This component is dynamically controlled via JavaScript to persist user actions (e.g., dismissing an alert) using cookies.

## Features

- **Supports multiple alert levels** (`emergency`, `warning`, `information`) and associated colour scheme.
- **Dismiss functionality** using JavaScript & cookies.
- **Optional call-to-action (CTA) link** (`Read More`).
- **Fully responsive** (`d-lg-none`, `d-lg-inline-block`).
- **Uses Bootstrap utilities** for layout and spacing.
- **Supports optional container wrapping (`has_container`)**.
- **Accessible** with proper `aria-hidden`, `aria-controls`, and `aria-pressed` attributes.
- **SVG icons** dynamically change based on the alert level.


## Usage

```twig
{% include 'nc_theme:alert-banner' with {
  label: label,
  content: content|without('field_alert_level', 'field_persist', 'field_link'),
  link: node.get('field_link'),
  classes: classes,
  id: node.id,
  alert_level: content.field_alert_level[0]['#markup']|clean_class,
  persists: content.field_persist.0['#markup'],
  has_container: true,
} %}
```
