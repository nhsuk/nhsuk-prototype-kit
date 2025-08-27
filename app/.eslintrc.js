/**
 * @type {ESLint.ConfigData}
 */
module.exports = {
  ignorePatterns: ['**/*'],
  overrides: [
    {
      files: ['**/*.{cjs,js,mjs}'],
      excludedFiles: ['**/*.test.{cjs,js,mjs}'],
      env: {
        browser: true
      },
      parserOptions: {
        // Note: Allow ES2015 for import/export syntax
        ecmaVersion: '2015'
      }
    }
  ]
}

/**
 * @import { ESLint } from 'eslint'
 */
