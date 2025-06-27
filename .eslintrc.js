/**
 * @type {ESLint.ConfigData}
 */
module.exports = {
  ignorePatterns: [
    '**/public/**',

    // Enable dotfile linting
    '!.*',
    'node_modules',
    'node_modules/.*',

    // Prevent CHANGELOG history changes
    'CHANGELOG.md'
  ],
  overrides: [
    {
      files: ['**/*.{cjs,js,mjs}'],
      extends: [
        'eslint:recommended',
        'plugin:import/recommended',
        'plugin:jest/style',
        'plugin:jest-dom/recommended',
        'plugin:jsdoc/recommended-typescript-flavor',
        'plugin:n/recommended',
        'plugin:promise/recommended',
        'plugin:@typescript-eslint/strict',
        'plugin:@typescript-eslint/stylistic'
      ],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ecmaVersion: 'latest'
      },
      plugins: [
        '@typescript-eslint',
        'import',
        'jsdoc',
        'n',
        'promise',
        'jest',
        'jest-dom'
      ]
    }
  ],
  root: true
}

/**
 * @import { ESLint } from 'eslint'
 */
