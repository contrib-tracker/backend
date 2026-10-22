# Contrib Tracker Modern

A rebuild of the `contribtracker` theme on current tooling. It is meant to look
the same as the original; only the build and source changed.

| Concern                  | Tool                                                          |
| ------------------------ | ------------------------------------------------------------- |
| Build, dev watch         | [Vite+](https://viteplus.dev) (`vp build`, Vite 8 + Rolldown) |
| Format, lint, type-check | `vp check` (Oxfmt, Oxlint, tsgolint)                          |
| Unit tests               | `vp test` (Vitest, jsdom)                                     |
| Styles                   | Sass modules (`@use`) in `src/scss`, linted with Stylelint    |
| Scripts                  | TypeScript in `src/ts`, emitted as ES modules                 |

Node 22.18 or newer is required.

## Commands

```bash
npm ci            # install
npm run build     # build to dist/ (css/, js/, assets/, vendor/)
npm run watch     # rebuild on change
npm run lint      # vp check + stylelint
npm test          # vitest
```

`dist/` is not committed; the Upsun build hook and CI run `npm run build`.

## Layout

- `src/scss/global.scss` is the main stylesheet; `config/` holds tokens and mixins
  (`@use 'config' as *;` in each partial). `components/blocks/graph/contrib-graph.scss`
  is built separately and only loaded with the contribution graph block.
- `src/ts/` holds the scripts. Select2 is copied from `node_modules` to
  `dist/vendor/select2` and loaded against Drupal's jQuery.
- `templates/` are the Twig overrides, unchanged from the original theme apart
  from block IDs that embed the theme name.

## Switching to this theme

Blocks are placed per theme, and this theme ships its own placements. To make it
the default: `drush config:set system.theme default contribtracker_modern`.
It keeps `stable` as its base theme because the templates target Stable's markup.
