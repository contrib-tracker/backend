module.exports = {
    root: true,
    env: {
        node: true,
    },
    plugins: ['stylelint-scss'],
    extends: [
        'stylelint-config-recommended-scss',
        'stylelint-config-standard',
        'stylelint-config-prettier',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
    },
    plugins: [
        '@typescript-eslint',
    ],
    rules: {
        // Add your custom rules here
        'indent': ['error', 2],
        'linebreak-style': ['error', 'unix'],
        'quotes': ['error', 'single'],
        'semi': ['error', 'always']
    },
};
  