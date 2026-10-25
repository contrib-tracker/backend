# Single Directory Components (SDC)

## What SDC Is

Single Directory Components group a component's template, CSS, JS, and metadata into one directory. This replaces the scattered approach of putting templates in `templates/`, JS in `js/`, and CSS in `css/`, making components self-contained and portable.

```
themes/custom/mytheme/components/
└── my-card/
    ├── my-card.component.yml   # schema, props, slots
    ├── my-card.html.twig       # component template
    ├── my-card.css             # scoped styles (auto-attached when component renders)
    └── my-card.js              # optional JS (auto-attached)
```

## Component YAML Schema

```yaml
# components/my-card/my-card.component.yml
'$schema': 'https://git.drupalcode.org/project/drupal/-/raw/12.0.x/core/assets/schemas/v1/metadata.schema.json'
name: "My Card"
status: "stable"          # stable | experimental | deprecated
description: "A reusable card component for content teasers."
tags:                     # 12.0+: lets other components' slots accept this one by tag
  - card

props:
  type: object
  properties:
    title:
      type: string
      title: "Card title"
    url:
      type: string
      title: "Link URL"
    variant:
      type: string
      title: "Visual variant"
      examples: ["default", "featured", "compact"]
  required:
    - title

slots:
  body:
    title: "Card body content"
```

**Props** are primitive values passed explicitly. **Slots** are Twig render arrays — content that can be any renderable Drupal markup.

The `$schema` URL that pointed at `core/modules/sdc/src/metadata.schema.json` is stale: the `sdc` module has been an empty stub since 10.3 and the schema lives at `core/assets/schemas/v1/metadata.schema.json`. Flag the old URL; editors lose validation and autocomplete.

### Slot Expectations and Cardinality (12.0+)

A slot can declare which components it accepts and how many. Page builders enforce it; plain Twig includes do not, so the template must still cope with an empty slot.

```yaml
slots:
  items:
    title: "Accordion items"
    expected:
      - mytheme:accordion-item     # component ID
      - accordion                  # or a tag declared by other components
    minItems: 1
    maxItems: 10
```

## Component Template

```twig
{# components/my-card/my-card.html.twig #}
<article {{ attributes.addClass('my-card', 'my-card--' ~ variant|default('default')) }}>
  <h2 class="my-card__title">
    {% if url %}
      <a href="{{ url }}">{{ title }}</a>
    {% else %}
      {{ title }}
    {% endif %}
  </h2>
  {% if body %}
    <div class="my-card__body">{{ body }}</div>
  {% endif %}
</article>
```

Use `{{ attributes }}` rather than hardcoding `class=""` — it lets callers add their own attributes and Drupal can inject things like `data-quickedit-entity-id`.

## Using a Component

```twig
{# In another template — include with explicit props #}
{{ include('mytheme:my-card', {
  'title': node.title.value,
  'url': path('entity.node.canonical', {node: node.id()}),
  'variant': 'featured',
  'body': content.body,
}, with_context = false) }}
```

`with_context = false` prevents the parent template's variables from leaking into the component. Always use it unless you have a specific reason to share context.

## Overriding a Module's SDC from a Theme

```yaml
# themes/custom/mytheme/components/gin-card/gin-card.component.yml
replaces: 'gin:card'      # module_name:component-name
name: "Gin Card Override"
# ... rest of schema
```

The theme's component completely replaces the module's component for all renders that reference `gin:card`.

## CSS Scoping

SDC CSS files are automatically attached when the component renders. You don't need a libraries.yml entry. However, CSS is **not** automatically scoped to the component — class names can still leak and conflict.

Use BEM naming to avoid conflicts:
```css
/* my-card.css */
.my-card { }
.my-card__title { }
.my-card__body { }
.my-card--featured { }
```

## JS in Components

If a component has a `.js` file, it's attached automatically. But it still needs to use `Drupal.behaviors` and `once()`:

```javascript
// components/my-card/my-card.js
(function (Drupal, once) {
  Drupal.behaviors.myCard = {
    attach(context, settings) {
      once('my-card', '.my-card', context).forEach((el) => {
        el.addEventListener('click', handleCardClick);
      });
    }
  };
})(Drupal, once);
```

Declare dependencies in the component YAML if using jQuery or other libraries:

```yaml
libraryOverrides:
  dependencies:
    - core/drupal
    - core/once
    - core/jquery
  fonts:                   # 11.4+: preload fonts the component needs
    - fonts/inter.woff2
```

## Configurable Heading Levels

Never hardcode a heading level (`<h1>`, `<h2>`, etc.) in a reusable component. A component placed on a homepage might warrant an `<h1>`, but the same component in a sidebar or on an interior page sits below an existing `<h1>` and needs an `<h2>` or lower. Hardcoding causes multiple `<h1>` elements, which breaks document outline and hurts accessibility.

```yaml
# component.yml — expose heading_level as a prop with a sensible default
props:
  type: object
  properties:
    heading:
      type: string
      title: "Heading text"
    heading_level:
      type: integer
      title: "Heading level (1–6)"
      default: 2
      minimum: 1
      maximum: 6
  required:
    - heading
```

```twig
{# component.html.twig — use set to build the tag name dynamically #}
{% set heading_tag = 'h' ~ (heading_level|default(2)) %}

<{{ heading_tag }} class="my-component__heading" id="component-heading">
  {{ heading }}
</{{ heading_tag }}>
```

The caller controls the level based on page context:
```twig
{# On a page where this is the primary heading #}
{{ include('mytheme:hero-banner', {'heading': title, 'heading_level': 1}, with_context = false) }}

{# In a sidebar where an h1 already exists above #}
{{ include('mytheme:hero-banner', {'heading': title, 'heading_level': 2}, with_context = false) }}
```

## Common SDC Mistakes

**Missing `with_context = false`** — parent template variables (like `node`, `view_mode`, etc.) leak into the component and can shadow component props, causing hard-to-debug behavior.

**Hardcoding HTML attributes** instead of using `{{ attributes }}` — prevents the caller from adding classes, data attributes, or ARIA attributes.

**Putting business logic in the component template** — components should be purely presentational. If you need to load an entity or check permissions, do it in preprocess and pass the result as a prop.

**Missing required props in schema** — if `title` is required but schema says it isn't, Drupal won't validate calls and you'll get empty renders with no error.
