# Heading

All HTML headings, `<h1>` through `<h6>` are available.

### Bootstrap Documentation

<https://getbootstrap.com/docs/5.3/content/typography/#headings>
<https://getbootstrap.com/docs/5.3/content/typography/#display-headings>

## Properties

- `heading_html_tag` : The HTML tag to use for the header.
  Defaults to h1 (h1 | h2 | h3 | h4 | h5 | h6)
- `display`: When you need a heading to stand out, consider using a display
  `heading—a` larger, slightly more opinionated heading style.
- `attributes`: Attributes array.
- `heading_utility_classes`: This property contains an array of utility classes.
- `heading_link_utility_classes`: This property contains an array of utility classes if the heading is linked. eg. `title_link` is not null.
- `title_link`: The URL to link the title to.

### HTML Tag (`heading_html_tag`)

Heading HTML tag (h1, h2, h3, h4, h5, h6)

### Display (`display`)

When you need a heading to stand out, consider using a display
heading—a larger, slightly more opinionated heading style.
optional values are: ( display-1, display-2, display-3, display-4, display-5, display-6)
<https://getbootstrap.com/docs/5.3/content/typography/#display-headings>

#### Utility Classes (`heading_utility_classes`)

This property contains an array of utility classes that can be used to
add extra Bootstrap utility classes or custom classes to this component.

## Slots

- `content`: Content text for the heading.

## Examples

**Example #1:** Have a heading for the h1 page title

```twig
{%
  include 'nc_theme:heading' with {
    heading_html_tag: 'h1',
    content: title|render|striptags|trim,
    heading_attributes: title_attributes,
    heading_utility_classes: [
      'fs-4',
    ],
  }
%}
```

**Example #2:** Use for the heading of a block

```twig
{%
  include 'nc_theme:heading' with {
    heading_html_tag: heading_tag,
    content: heading_text|render|striptags|trim,
  }
%}
```

**Example #3:** Use in views title

```twig
{%
  embed "nc_theme:heading" with {
    heading_attributes: title_attributes,
    content: label,
    heading_html_tag: 'h2'
  }
%}
{% endembed %}
```

**Example #4**: Have a title with utility classes

```twig
{%
  include "nc_theme:heading" with {
    heading_attributes: your_custom_heading_attributes,
    heading_html_tag: 'h2',
    content: heading,
    heading_utility_classes: ['rich-heading', 'mb-2']
  }
%}
```

**Example #5**: Heading with a link

```twig
{%
  include 'nc_theme:heading' with {
    heading_html_tag: 'h3',
    title_link: url,
    content: label,
    heading_utility_classes: [
      'card-date__title',
      'fs-2',
      'mb-0',
    ],
    heading_link_utility_classes: [
      'text-black',
      'stretched-link',
    ]
  }
%}
```
