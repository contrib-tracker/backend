# Accessibility

Drupal sites are expected to meet WCAG 2.1 AA. The theme layer is where most accessibility wins (and regressions) happen.

## Skip Links

Every page must have a skip link so keyboard users can bypass the navigation and jump directly to main content.

```twig
{# In html.html.twig or page.html.twig #}
<a href="#main-content" class="visually-hidden focusable skip-link">
  {{ 'Skip to main content'|t }}
</a>

{# The target — id must match the href above #}
<main id="main-content" tabindex="-1">
  {{ page.content }}
</main>
```

`tabindex="-1"` allows the main element to receive programmatic focus (so the skip link actually moves keyboard focus there) without adding it to the natural tab order.

## Visually Hidden Content

Content for screen readers that should not be visually rendered:

```twig
{# The "visually-hidden" class is provided by Drupal core — use it, don't reinvent it #}
<span class="visually-hidden">{{ 'More about %title'|t({'%title': node.title.value}) }}</span>

{# "focusable" makes it visible when focused (used for skip links) #}
<a href="#main-content" class="visually-hidden focusable">Skip to main content</a>
```

```css
/* Drupal core's visually-hidden — don't override this pattern */
.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
}
```

Never use `display: none` or `visibility: hidden` for content intended for screen readers — those hide it from assistive technology too.

## ARIA Live Regions

For content that updates dynamically (search results, cart counts, notifications):

```twig
{# polite — waits for user to be idle before announcing #}
<div aria-live="polite" aria-atomic="true" class="js-search-status visually-hidden"></div>

{# assertive — interrupts screen reader immediately. Use only for urgent errors #}
<div role="alert" aria-live="assertive" class="js-form-errors"></div>
```

```javascript
// In Drupal.behaviors — update content via JS, the live region announces it
Drupal.behaviors.searchStatus = {
  attach(context, settings) {
    once('search-status', '.js-search-form', context).forEach((form) => {
      form.addEventListener('submit', async () => {
        const status = document.querySelector('.js-search-status');
        // Use Drupal.announce for simple messages
        Drupal.announce(Drupal.t('Loading search results…'));
        // Or update the live region for persistent status
        status.textContent = Drupal.t('Loading…');
      });
    });
  }
};
```

`Drupal.announce()` is simpler for one-off announcements; a live region `<div>` is better for status text that persists.

Core's `status-messages.html.twig` uses ARIA live region roles (`role="status"` / `role="alert"`) since 11.5 instead of wrapping messages in a `contentinfo` landmark. A theme override that still emits `role="contentinfo"` around messages is out of date; flag it.

## Focus Management

When AJAX opens a dialog, modal, or changes the page content, move focus programmatically:

```javascript
Drupal.behaviors.myModal = {
  attach(context, settings) {
    once('my-modal-trigger', '.open-modal', context).forEach((trigger) => {
      trigger.addEventListener('click', () => {
        const modal = document.querySelector('#my-modal');
        modal.removeAttribute('hidden');
        // Move focus to the modal's heading or close button
        modal.querySelector('h2, button').focus();
      });
    });
  }
};
```

Without explicit focus management, keyboard users are stranded at the trigger while the new content is elsewhere on the page.

## Semantic HTML

```twig
{# Use landmark elements — don't use <div> for everything #}
<header role="banner">{{ page.header }}</header>
<nav aria-label="{{ 'Main navigation'|t }}">{{ page.primary_menu }}</nav>
<main id="main-content">{{ page.content }}</main>
<aside aria-label="{{ 'Sidebar'|t }}">{{ page.sidebar }}</aside>
<footer role="contentinfo">{{ page.footer }}</footer>

{# Heading hierarchy matters — don't skip levels #}
<h1>Page title</h1>    {# only one h1 per page #}
  <h2>Section</h2>
    <h3>Subsection</h3>
```

`role="banner"`, `role="main"`, `role="contentinfo"` are redundant when using the HTML5 elements but don't hurt for older screen readers.

## Image Accessibility

```twig
{# Decorative image — empty alt, no title #}
<img src="{{ file_url(logo.uri) }}" alt="" aria-hidden="true">

{# Informative image — descriptive alt text #}
<img src="{{ file_url(image.uri) }}" alt="{{ image.alt }}">

{# Images from Drupal image fields — the alt text is stored on the field #}
{{ content.field_image }}   {# let the field formatter render it — alt is included #}
```

Never hardcode `alt="image"` or `alt="photo"`. If the image is purely decorative (icon, background texture), use `alt=""` to tell screen readers to skip it.

## Color and Contrast

CSS is outside the scope of a code review, but flag:
- Custom color values set in preprocess or Twig that bypass the design system
- Hardcoded text colors without a paired background color
- Interactive states (`:focus`, `:hover`) that rely on color alone (no shape/weight change)

WCAG 2.1 AA requires:
- 4.5:1 contrast ratio for normal text
- 3:1 for large text (18pt / 14pt bold) and UI components

## Form Accessibility

```twig
{# Never leave form elements without labels — Drupal's Form API handles this when used correctly #}
{# If overriding form templates, ensure the label association is preserved #}
<label for="{{ id }}">{{ label }}</label>
<input id="{{ id }}" type="{{ type }}" …>

{# Error messages must be associated with their field #}
<input aria-describedby="{{ id }}-error" …>
<div id="{{ id }}-error" role="alert">{{ error_message }}</div>
```

The Drupal Form API generates correct label/input associations automatically. Only override form templates when necessary, and verify the output has correct `for`/`id` pairing.
