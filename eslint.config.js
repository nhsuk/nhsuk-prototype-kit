import { join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

import { includeIgnoreFile } from '@eslint/config-helpers'
import eslint from '@eslint/js'
import configPrettier from 'eslint-config-prettier/flat'
import pluginESx from 'eslint-plugin-es-x'
import pluginJsdoc from 'eslint-plugin-jsdoc'
import pluginNode from 'eslint-plugin-n'
import pluginNodeImport from 'eslint-plugin-node-import'
import pluginPromise from 'eslint-plugin-promise'
import { defineConfig, globalIgnores } from 'eslint/config'
import globals from 'globals'
import pluginTypeScript from 'typescript-eslint'

const rootPath = resolve(fileURLToPath(new URL('.', import.meta.url)))
const gitignorePath = join(rootPath, '.gitignore')

export default defineConfig([
  {
    files: ['**/*.{cjs,js,mjs}'],
    extends: [
      eslint.configs.recommended,
      pluginJsdoc.configs['flat/recommended-typescript-flavor'],
      pluginPromise.configs['flat/recommended'],
      configPrettier
    ],
    languageOptions: {
      parserOptions: {
        ecmaVersion: 'latest',
        projectService: true,
        tsconfigRootDir: rootPath
      }
    },
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
      ],

      // Prefer rules that are type aware
      'no-redeclare': 'off',
      'no-undef': 'off',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_'
        }
      ]
    }
  },
  {
    // Configure ESLint for Node.js
    files: ['**/*.{cjs,js,mjs}'],
    ignores: [
      'app/{javascripts,views}/**/*.{cjs,js,mjs}',
      '!**/*.test.{cjs,js,mjs}'
    ],
    extends: [
      pluginTypeScript.configs.strict,
      pluginTypeScript.configs.stylistic,
      pluginNode.configs['flat/recommended'],
      pluginNodeImport.configs['flat/recommended']
    ],
    languageOptions: {
      globals: globals.node
    },
    rules: {
      '@typescript-eslint/no-require-imports': 'off',
      '@typescript-eslint/unbound-method': 'off'
    }
  },
  {
    // Configure ESLint for browsers
    files: ['app/{javascripts,views}/**/*.{cjs,js,mjs}'],
    ignores: ['**/*.test.{cjs,js,mjs}'],
    extends: [
      pluginTypeScript.configs.strictTypeChecked,
      pluginTypeScript.configs.stylisticTypeChecked,
      pluginESx.configs['flat/restrict-to-es2015']
    ],
    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        // Note: Allow ES2015 for import/export syntax
        ecmaVersion: 2015
      }
    },
    rules: {
      // Allow void return shorthand in arrow functions
      '@typescript-eslint/no-confusing-void-expression': [
        'error',
        {
          ignoreArrowShorthand: true
        }
      ],

      // Check type support for template string implicit `.toString()`
      '@typescript-eslint/restrict-template-expressions': [
        'error',
        {
          allowBoolean: true,
          allowNumber: true
        }
      ],

      // Promise.prototype.catch() errors cannot be typed in JavaScript
      '@typescript-eslint/use-unknown-in-catch-callback-variable': 'off',

      // Babel transpiles ES2020 class fields
      'es-x/no-class-fields': 'off',

      // Babel transpiles ES2022 class instance fields
      'es-x/no-class-instance-fields': 'off',

      // Babel transpiles ES2022 class static fields
      'es-x/no-class-static-fields': 'off',

      // ES modules include ES2016 '[].includes()' coverage
      // https://browsersl.ist/#q=supports+es6-module+and+not+supports+array-includes
      'es-x/no-array-prototype-includes': 'off',

      // Babel transpiles ES2021 `??=` logical assignment
      'es-x/no-logical-assignment-operators': 'off',

      // Babel transpiles ES2020 `??` nullish coalescing
      'es-x/no-nullish-coalescing-operators': 'off',

      // ES modules include ES2017 'Object.entries()' coverage
      // https://browsersl.ist/#q=supports+es6-module+and+not+supports+object-entries
      'es-x/no-object-entries': 'off',

      // Babel transpiles optional catch binding
      'es-x/no-optional-catch-binding': 'off',

      // Babel transpiles ES2020 optional chaining
      'es-x/no-optional-chaining': 'off',

      // JSDoc blocks are optional but must be valid
      'jsdoc/require-jsdoc': [
        'error',
        {
          enableFixer: false,
          require: {
            FunctionDeclaration: false
          }
        }
      ],

      // JSDoc @param types are mandatory for JavaScript
      'jsdoc/require-param-description': 'off',
      'jsdoc/require-param-type': 'error',
      'jsdoc/require-param': 'off',

      // JSDoc @returns is optional
      'jsdoc/require-returns-description': 'off',
      'jsdoc/require-returns-type': 'off',
      'jsdoc/require-returns': 'off'
    }
  },
  globalIgnores([
    '**/public/**',

    // Prevent CHANGELOG history changes
    'CHANGELOG.md'
  ]),
  includeIgnoreFile(gitignorePath, 'Imported .gitignore patterns')
])
