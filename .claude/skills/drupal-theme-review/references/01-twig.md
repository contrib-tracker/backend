# Twig Templates

## Security: Escaping and `|raw`

Twig auto-escapes all variables by default. This is the primary XSS defense at the theme layer.

```twig
{# SAFE — auto-escaped #}
{{ user_name }}
{{ node.title.value }}
{{ content.field_body }}

{# DANGEROUS — bypasses all escaping. Never use on user input #}
{{ user_supplied_html|raw }}

{# SAFE — |raw is acceptable only on content already run through a Drupal text format #}
{{ body.value|raw }}      {# filtered_html, full_html, etc. — already sanitized #}
{{ description|raw }}     {# only if this comes from a trusted Drupal text format field #}
```

**Rule:** Trust Twig's auto-escaping. Do not pre-escape variables before passing to Twig — that causes double-escaping (e.g., `&amp;amp;`). Only use `|raw` on content that has been run through a Drupal text format filter or `Xss::filter()` in PHP.

Red flags for `|raw`:
- Applied to a variable whose source is user input, URL parameters, or form fields
- Applied to anything passed from a preprocess function without explicit sanitization
- Used inside a `{% set %}` block to build markup

## The `|without` Filter — Cache-Safe Field Rendering

```twig
{# WRONG — renders only selected fields, silently drops cache metadata from the rest #}
{{ content.field_title }}
{{ content.field_image }}
{# If field_tags has a cache tag dependency, it's now missing from the page #}

{# CORRECT — renders everything except named fields, preserves all cache metadata #}
{{ content|without('field_image', 'field_tags') }}
{{ content.field_title }}
{{ content.field_image }}
```

`|without` excludes fields from the rendered output while still allowing their cache tags and contexts to bubble up. This matters for correctness: if a field with a `node_list` cache tag is silently omitted, invalidation won't happen when content changes.

## Drupal-Specific Twig Functions

```twig
{# Attach a library to this template only #}
{{ attach_library('mytheme/swiper') }}

{# Generate URLs #}
{{ path('entity.node.canonical', {node: node.id()}) }}
{{ url('user.login') }}

{# Render a link (escaped label, safe URL) #}
{{ link('Read more', url) }}

{# File URL from URI #}
{{ file_url(file.uri.value) }}

{# Build attributes and class lists (twig/html-extra, 11.4+) #}
{{ create_attribute({'class': ['card'], 'data-id': id}) }}
<div class="{{ html_classes('card', {'card--featured': featured}) }}">
<button {{ html_attr({'type': 'button', 'aria-expanded': 'false'}) }}>
{% set btn = html_cva(base: 'btn', variants: {size: {sm: 'btn--sm', lg: 'btn--lg'}}) %}
<a class="{{ btn.apply({size: size}) }}">

{# drupal_block(), drupal_view(), drupal_entity(), drupal_config() are Twig Tweak (contrib),
   not core. Use sparingly — prefer placing blocks and views through configuration. #}
```

Flag string-built class lists (`class="card {{ featured ? 'card--featured' }}"`) when `html_classes()` or `attributes.addClass()` would do; they are easier to read and never produce stray whitespace.

## Drupal-Specific Twig Filters

```twig
{{ label|t }}                              {# translate string #}
{{ label|trans }}                          {# alias for |t #}
{{ content|without('field_image') }}       {# exclude field, preserve cache metadata #}
{{ class|clean_class }}                    {# sanitize string for use as CSS class #}
{{ id|clean_id }}                          {# sanitize string for use as HTML id #}
{{ timestamp|format_date('short') }}       {# format a Unix timestamp #}
{{ file_uri|image_style('thumbnail') }}    {# apply an image style #}
{{ render_array|render }}                  {# force render of a render array #}
{{ items|safe_join(', ') }}               {# join array items with auto-escaping #}
```

## Template Naming Convention

PHP hook names use underscores; template filenames use hyphens.

| PHP hook suggestion | Filename |
|---|---|
| `block` | `block.html.twig` |
| `block__system` | `block--system.html.twig` |
| `block__system_branding_block` | `block--system-branding-block.html.twig` |
| `node__article__teaser` | `node--article--teaser.html.twig` |
| `field__field_image__article` | `field--field-image--article.html.twig` |
| `views_view__my_view__page_1` | `views-view--my-view--page-1.html.twig` |

**Rule:** Single underscores → single hyphens. Double underscores (theme hook separator) → double hyphens.

## Enabling Twig Debug (Development Only)

In `sites/default/services.yml`:

```yaml
parameters:
  twig.config:
    debug: true
    auto_reload: true
    cache: false
```

With debug on, HTML comments show active template and all available suggestions:

```html
<!-- THEME HOOK: 'node' -->
<!-- FILE NAME SUGGESTIONS:
   * node--article--full.html.twig
   * node--article.html.twig
   x node.html.twig   ← currently active
-->
```

Never leave `debug: true` in production — it leaks internal template structure.

Drupal 12 stays on Twig 3 (3.28+). Templates written for Twig 2 syntax (`{% filter %}`, `{% spaceless %}`, `sameas`, `divisibleby`) have been broken since Drupal 10; flag them as critical, not as style.

## Template Organization

```
templates/
├── layout/       # html.html.twig, page.html.twig, region.html.twig
├── block/        # block.html.twig, block--TYPE.html.twig
├── content/      # node.html.twig, node--TYPE.html.twig
├── field/        # field.html.twig, field--FIELDNAME.html.twig
├── views/        # views-view.html.twig, views-view-unformatted.html.twig
├── navigation/   # menu.html.twig, breadcrumb.html.twig
└── forms/        # input.html.twig, form-element.html.twig
```

Flat `templates/` directories with dozens of files become unmaintainable. Organize by element type.

## Null-Safe Entity Traversal

Twig does not have an optional chaining operator. Accessing a property on `null` throws a Twig error and produces a white screen. Entity reference fields return `null` when the referenced entity is missing, unpublished, or access-denied.

```twig
{# DANGEROUS — any step in the chain can be null #}
{{ node.field_image.entity.uri.value|image_style('thumbnail') }}
{{ item.entity.field_author.entity.getDisplayName() }}

{# SAFE — guard each nullable step with a conditional or |default #}
{% if node.field_image.entity %}
  <img src="{{ node.field_image.entity.uri.value|image_style('thumbnail') }}"
       alt="{{ node.field_image.alt|default('') }}"
       loading="lazy">
{% endif %}

{# |default — provides a fallback value if the variable is null/undefined/empty #}
{{ node.field_subtitle.value|default('') }}
{{ item.entity ? item.entity.title.value : '' }}
```

**Common nullable steps:**
- `.entity` on an entity reference field — null if the referenced entity is deleted, unpublished, or access-denied
- `.field_image.entity` — null if the image field is empty
- `.uri.value` on a file entity — null if the file was deleted from the filesystem
- Any field on a node loaded via entity reference when the user lacks view access

**Rule:** Any time you traverse more than one `.` deep through an entity reference (`item.entity.something`), guard the `.entity` step. The deeper the chain, the more guard points you need.

```twig
{# Pattern: guard the nullable entity reference, then safely traverse #}
{% set ref_entity = item.entity %}
{% if ref_entity %}
  <h3>{{ ref_entity.title.value }}</h3>
  {% if ref_entity.field_image.entity %}
    <img src="{{ ref_entity.field_image.entity.uri.value|image_style('card') }}"
         alt="{{ ref_entity.field_image.alt }}">
  {% endif %}
{% endif %}
```

## Accessing Render Arrays vs. Raw Values

Drupal passes content to templates as render arrays, not raw entity objects. Working inside the render system preserves cache metadata, field access control, and formatters.

```twig
{# WRONG — bypasses render system; cache tags never bubble up #}
{% for item in content.field_items['#items'] %}
  {{ item.entity.title.value }}
{% endfor %}

{# CORRECT — let Drupal render the field with its configured formatter #}
{{ content.field_items }}

{# CORRECT — if you need custom markup, prepare variables in preprocess
   and pass render arrays, not raw strings #}
{{ card_title }}    {# set in preprocess as a render array or safe string #}
```

`content.field_items['#items']` accesses Drupal's internal render array structure — this is not a stable API and bypasses the entire render pipeline. Referenced entity cache tags (`node:42`, `file:7`) never attach to the response, so content changes don't invalidate the cache.

## Hardcoded URLs

```twig
{# WRONG — breaks path aliases, language prefixes, base path installs #}
<a href="/node/{{ node.id() }}">Read more</a>

{# CORRECT — path() resolves the canonical URL with aliases and language #}
<a href="{{ path('entity.node.canonical', {node: node.id()}) }}">
  {{ 'Read more'|t }}
</a>

{# For link fields, render the field (formatter handles escaping and protocols) #}
{{ content.field_link }}

{# For a raw external URL string prepared in preprocess, strip dangerous protocols in PHP first:
   $variables['cta_url'] = UrlHelper::stripDangerousProtocols($raw); #}
<a href="{{ cta_url }}">{{ cta_label }}</a>
```

Always use `path()` or `url()` Twig functions for internal routes. Never construct paths by string concatenation. There is no `check_url` filter in core; a template using one only works with a contrib extension.

## Including Sub-Templates

```twig
{# Include another template — shares context by default #}
{% include 'mytheme:card' %}

{# Include with explicit variables — with_context = false prevents variable leaking #}
{{ include('mytheme:my-button', {
  'label': 'Click me',
  'variant': 'primary'
}, with_context = false) }}
```

Use `with_context = false` when including SDC components to prevent accidentally exposing the parent template's full variable scope inside the component.
