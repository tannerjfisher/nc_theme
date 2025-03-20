# Image

Image component with responsive behavior for the system image.

Images in Bootstrap are made responsive with `.img-fluid`. This applies
`max-width: 100%;` and `height: auto;` to the image so that it scales
with the parent width.

## Bootstrap Documentation
[Bootstrap Image Documentation] <https://getbootstrap.com/docs/5.3/content/images/>


## Component Properties

- `src`: (required) The image source URL.
- `alt`: (optional) The image alt text.
- `title`: (optional) The image title.
- `align` : (optional) Align images with the helper float classes or text alignment classes.
            block-level images can be centered using the .mx-auto margin utility class.
            options (`float-start`, `mx-auto d-block`, `float-end`)
- `responsive` : (optional) Images in Bootstrap are made responsive with `.img-fluid`.
                This applies max-width with 100% and height with auto to the image so
                that it scales with the parent width.
- `thumbnails` : (optional)(true|false) In addition to Bootstrap border-radius utilities, you can
                use `.img-thumbnail` to give an image a rounded 1px border appearance.
- `rounded` : (optional)(true|false) Rounded image
- `image_utility_classes` : An array of utility classes that can
                    be used to add extra Bootstrap utility classes or custom
                    classes to this component.

## Examples

Use the Image component with aligned center, rounded, and thumbnails

```twig
{%
  include 'nc_theme:image' with {
    src: 'https://picsum.photos/id/140/600.jpg',
    alt: 'Image alt description',
    title: 'Image title',
    align: 'center',
    responsive: true,
    rounded: true,
    thumbnails: true,
    width: 600,
    height: 400,
    loading: 'lazy',
    image_utility_classes: [
      'mb-5',
    ],
    attributes: create_attribute().setAttribute('crossorigin', 'anonymous'),
  }
%}
```
