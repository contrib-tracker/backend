import { defineConfig } from 'vite-plus';

// There is no build step: Drupal serves the CSS and JS in this theme as written
// (single directory components attach their own files). Vite+ is used for
// `vp check` (format, lint, type-check) and `vp test`.
export default defineConfig({
  lint: {
    ignorePatterns: ['node_modules/**'],
    options: { typeAware: true, typeCheck: true },
  },
  fmt: {
    singleQuote: true,
    ignorePatterns: ['node_modules/**', '**/*.css', '**/*.twig', '**/*.yml', 'fonts/**'],
  },
  test: {
    include: ['**/*.test.js'],
    exclude: ['node_modules/**'],
    environment: 'jsdom',
  },
});
