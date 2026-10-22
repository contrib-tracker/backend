import { copyFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite-plus';

const root = dirname(fileURLToPath(import.meta.url));

// Select2 is loaded by Drupal against core's jQuery, so it is shipped as a
// vendor file instead of being bundled (which would pull in a second jQuery).
const select2Files = ['select2.min.css', 'select2.min.js'].map((file) => ({
  from: resolve(root, 'node_modules/select2/dist', file.endsWith('css') ? 'css' : 'js', file),
  to: resolve(root, 'dist/vendor/select2', file),
}));

export default defineConfig({
  root,
  base: './',
  publicDir: false,
  css: {
    preprocessorOptions: {
      scss: {
        loadPaths: [resolve(root, 'src/scss')],
      },
    },
  },
  experimental: {
    // CSS is emitted to dist/css and its assets (fonts) to dist/assets.
    renderBuiltUrl(filename, { hostType }) {
      return hostType === 'css' ? `../${filename}` : { relative: true };
    },
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    cssCodeSplit: true,
    // Drupal serves these files via *.libraries.yml, so file names are stable.
    rollupOptions: {
      input: {
        'css/global': resolve(root, 'src/scss/global.scss'),
        'css/contrib-graph': resolve(root, 'src/scss/components/blocks/graph/contrib-graph.scss'),
        'js/navigation': resolve(root, 'src/ts/navigation.ts'),
        'js/select2': resolve(root, 'src/ts/select2.ts'),
        'js/contrib-graph': resolve(root, 'src/ts/contrib-graph.ts'),
      },
      output: {
        entryFileNames: '[name].js',
        chunkFileNames: 'js/chunks/[name]-[hash].js',
        assetFileNames: (asset) =>
          asset.names.some((name) => name.endsWith('.css'))
            ? '[name][extname]'
            : 'assets/[name]-[hash][extname]',
      },
    },
  },
  plugins: [
    {
      name: 'copy-select2',
      apply: 'build',
      closeBundle() {
        for (const { from, to } of select2Files) {
          mkdirSync(dirname(to), { recursive: true });
          copyFileSync(from, to);
        }
      },
    },
  ],
  lint: {
    ignorePatterns: ['dist/**'],
    options: { typeAware: true, typeCheck: true },
  },
  fmt: {
    singleQuote: true,
    ignorePatterns: ['dist/**', 'src/scss/**', 'templates/**', 'fonts/**'],
  },
  test: {
    include: ['src/**/*.test.ts'],
    environment: 'jsdom',
  },
});
