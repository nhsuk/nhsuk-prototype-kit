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
      ],
      rules: {
        // Check for valid formatting
        'jsdoc/check-line-alignment': [
          'warn',
          'never',
          {
            wrapIndent: '  '
          }
        ],

        // JSDoc blocks are optional by default
        'jsdoc/require-jsdoc': 'off',

        // Require hyphens before param description
        // Aligns with TSDoc style: https://tsdoc.org/pages/tags/param/
        'jsdoc/require-hyphen-before-param-description': 'warn',

        // JSDoc @param required in (optional) blocks but
        // @param description is not necessary by default
        'jsdoc/require-param-description': 'off',
        'jsdoc/require-param-type': 'error',
        'jsdoc/require-param': 'off',

        // JSDoc @returns is optional
        'jsdoc/require-returns-description': 'off',
        'jsdoc/require-returns-type': 'off',
        'jsdoc/require-returns': 'off',

        // Maintain new line after description
        'jsdoc/tag-lines': [
          'warn',
          'never',
          {
            startLines: 1
          }
        ]
      },
      settings: {
        jsdoc: {
          // Allows us to use type declarations that exist in our dependencies
          mode: 'typescript'
        }
      }
    }
  ],
  root: true
}

/**
 * @import { ESLint } from 'eslint'
 */
