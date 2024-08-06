import prettier from 'eslint-plugin-prettier';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  {
    ignores: ['dist/*'],
  },
  ...compat.extends('prettier', 'plugin:@typescript-eslint/recommended'),
  {
    plugins: {
      prettier,
      '@typescript-eslint': typescriptEslint,
    },

    languageOptions: {
      parser: tsParser,
    },

    rules: {
      'prettier/prettier': ['error'],
      '@typescript-eslint/indent': 'off',

      '@typescript-eslint/no-var-requires': [
        'off',
        {
          devDependencies: ['gulpfile.js'],
        },
      ],

      '@typescript-eslint/explicit-function-return-type': [
        'off',
        {
          devDependencies: ['gulpfile.js', 'gulp-tasks/*.js'],
        },
      ],
    },
  },
];
