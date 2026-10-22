# Contrib Tracker (CT) theme

The Contrib Tracker front-end theme. It is built from Drupal single directory
components (SDC) and plain, modern CSS and JavaScript, so there is **no build
step**: Drupal serves the files in this folder as they are written.

- `components/<name>/`: one folder per component with its Twig, CSS, optional
  JavaScript, and a `*.component.yml` that declares its props and slots. Drupal
  attaches a component's CSS and JS wherever the component is rendered.
- `css/`: theme-wide styles (tokens, base, icons, forms, pager, page content).
  `tokens.css` holds the design tokens as custom properties.
- `icons/`: SVG icons, painted with CSS masks so they follow the text colour.
- `templates/`: Twig overrides. Where a template used to repeat markup it now
  embeds a component.
- `js/`: theme-wide behaviours.

CSS uses native nesting, container queries and custom properties. A Stylelint
rule (`stylelint-plugin-use-baseline`) fails if a feature is not Baseline
"widely available", which is the browser support policy of this theme.

## Tooling

Everything runs through DDEV (Node comes from `.ddev/config.yaml`):

```bash
ddev exec -d /var/www/html/web/themes/custom/ct npm ci
ddev exec -d /var/www/html/web/themes/custom/ct npm run lint   # vp check + stylelint
ddev exec -d /var/www/html/web/themes/custom/ct npm run fmt    # fix formatting
ddev exec -d /var/www/html/web/themes/custom/ct npm test       # vitest
```

[Vite+](https://viteplus.dev) provides `vp check` (Oxfmt, Oxlint and a type check
of the JSDoc-typed JavaScript) and `vp test` (Vitest with jsdom). It is not used
to build anything.

## Conventions

- Components own their look; breakpoints that depend on available space use a
  container query (see `contribution-card`), page-level ones use a media query
  with the widths listed in `css/tokens.css`.
- Do not use `@layer` in theme CSS: core and the base theme are unlayered and
  would always win.
- Select2 comes from composer (`npm-asset/select2`, in `web/libraries`).
