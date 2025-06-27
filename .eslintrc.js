/**
 * @type {ESLint.ConfigData}
 */
module.exports = {
  overrides: [
    {
      files: ['**/*.js'],
      extends: [
        'eslint:recommended',
        'plugin:import/recommended',
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
