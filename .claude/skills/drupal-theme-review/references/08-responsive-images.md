# Responsive Images

Responsive images in Drupal use a three-layer system: breakpoints → image styles → responsive image style. The theme layer defines the breakpoints; the rest is configured in the UI.

## Setup Flow

```
1. Define breakpoints in THEMENAME.breakpoints.yml
2. Create image styles per breakpoint at /admin/config/media/image-styles
3. Map breakpoints to image styles at /admin/config/media/responsive-image-style
4. Set the field display formatter to "Responsive image" and select your style
```

## Breakpoints File

```yaml
# mytheme.breakpoints.yml
mytheme.mobile:
  label: Mobile
  mediaQuery: 'all and (min-width: 0px)'
  weight: 0
  multipliers: ['1x']

mytheme.md:
  label: Tablet
  mediaQuery: 'all and (min-width: 768px)'
  weight: 2
  multipliers: ['1x']

mytheme.lg:
  label: Desktop
  mediaQuery: 'all and (min-width: 1024px)'
  weight: 3
  multipliers: ['1x', '2x']     # 2x = HiDPI / retina
```

The `multipliers` array determines which HiDPI variants are offered. Include `'2x'` for breakpoints where most devices are retina (typically laptop/desktop).

## What Drupal Generates

When a field uses a responsive image style, Drupal renders a `<picture>` element:

```html
<picture>
  <source media="(min-width: 1024px)"
          srcset="/sites/default/files/styles/hero_lg/…1x.jpg 1x,
                  /sites/default/files/styles/hero_lg_2x/…2x.jpg 2x">
  <source media="(min-width: 768px)"
          srcset="/sites/default/files/styles/hero_md/….jpg 1x">
  <img src="/sites/default/files/styles/hero_mobile/….jpg"
       alt="…"
       loading="lazy">
</picture>
```

The browser selects the correct source based on viewport and device pixel ratio. You don't write this HTML — Drupal generates it from your responsive image style configuration.

## Image Styles in Twig

For cases where you can't use the field formatter, apply image styles manually:

```twig
{# Apply an image style to a file URI #}
<img src="{{ file.uri.value|image_style('thumbnail') }}"
     alt="{{ file.field_image.alt }}"
     loading="lazy">

{# For a file entity's URI #}
{{ file_url(file.uri.value) }}
```

`|image_style` generates the derivative URL but does not create the derivative on the fly — Drupal creates it on first request. Don't use this for responsive images with multiple breakpoints; use the field formatter instead.

## `loading="lazy"`

Add `loading="lazy"` to all images below the fold. It's a native browser feature (no JS required) that defers loading until the image is near the viewport.

```twig
{# When overriding image templates — add loading="lazy" for below-fold images #}
<img{{ attributes.setAttribute('loading', 'lazy') }}>

{# Or in a preprocess if you need to conditionally set it #}
function mytheme_preprocess_image(array &$variables): void {
  // Add lazy loading to all images except the first (LCP candidate)
  $variables['attributes']['loading'] = 'lazy';
}
```

For the largest contentful paint (LCP) image (hero, page header), do **not** use `loading="lazy"` — it delays the most important visual element and hurts Core Web Vitals.

## Common Mistakes

**Hardcoding image dimensions** in Twig instead of using responsive image styles — images look fine on one viewport but are oversized or pixelated on others.

**Using `<img>` with only one `src`** for content images — wastes bandwidth on mobile, under-serves retina displays.

**Using `|image_style` when a responsive image style exists** — bypasses the `<picture>` element and loses HiDPI support.

**Missing `alt` text** — the `alt` attribute on Drupal's image field is stored per-file. If overriding the image template, always pass `{{ attributes }}` through rather than hardcoding `alt=""`.

**Forgetting `loading="lazy"`** on below-fold images — especially costly on image-heavy pages where dozens of images load at once.
