/**
 * @type {ESLint.ConfigData}
 */
module.exports = {
  extends: ['prettier'],
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
      files: ['**/*.{cjs,js}'],
      extends: [
        'eslint:recommended',
        'plugin:import/recommended',
        'plugin:jest/style',
        'plugin:jest-dom/recommended',
        'plugin:jsdoc/recommended-typescript-flavor',
        'plugin:n/recommended',
        'plugin:promise/recommended',
        'plugin:@typescript-eslint/strict',
        'plugin:@typescript-eslint/stylistic',
        'prettier'
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
        // Always import Node.js packages from `node:*`
        'import/enforce-node-protocol-usage': ['error', 'always'],

        // Check import or require statements are A-Z ordered
        'import/order': [
          'error',
          {
            'alphabetize': { order: 'asc' },
            'newlines-between': 'always'
          }
        ],

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
    },
    {
      // CommonJS modules allow require statements
      files: ['**/*.{cjs,js}'],
      rules: {
        '@typescript-eslint/no-require-imports': 'off',
        '@typescript-eslint/no-var-requires': 'off'
      }
    },
    {
      // ES modules mandatory file extensions
      files: [
        'app.js',
        'gulpfile.js',
        'app/**/*.js',
        'lib/**/*.js',
        'tests/**/*.js'
      ],
      excludedFiles: ['app/assets/**/*.js'],
      rules: {
        'import/extensions': [
          'error',
          'always',
          {
            ignorePackages: true,
            pattern: {
              cjs: 'always',
              js: 'always',
              mjs: 'always'
            }
          }
        ]
      }
    },
    {
      // Browser-side JavaScript files
      files: ['app/assets/**/*.js'],
      env: {
        browser: true,
        node: false
      },
      rules: {
        '@typescript-eslint/no-require-imports': 'off',
        '@typescript-eslint/no-var-requires': 'off',
        'n/no-unsupported-features/es-syntax': 'off',
        'import/extensions': 'off'
      }
    },
    {
      // Configure ESLint in test files
      files: ['**/*.test.{cjs,js}'],
      extends: ['plugin:jest/recommended', 'plugin:jest/style'],
      env: {
        'jest/globals': true
      },
      plugins: ['jest']
    }
  ],
  root: true
}

/**
 * @import { ESLint } from 'eslint'
 */
