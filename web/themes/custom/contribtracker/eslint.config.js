export default {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['prettier', '@typescript-eslint'],
  extends: ['prettier', 'plugin:@typescript-eslint/recommended'],
  rules: {
    'prettier/prettier': ['error'],
    '@typescript-eslint/indent': 'off',
    '@typescript-eslint/no-var-requires': [
      'off',
      { devDependencies: ['gulpfile.js'] },
    ],
    '@typescript-eslint/explicit-function-return-type': [
      'off',
      {
        devDependencies: ['gulpfile.js', 'gulp-tasks/*.js'],
      },
    ],
  },
  ignores: ['node_modules', 'dist', 'build'],
};
