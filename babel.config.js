/**
 * Babel config
 *
 * @type {ConfigFunction}
 */
module.exports = function (api) {
  // Assume browser environment via Gulp plugin
  const isBrowser = api.caller((caller) => caller?.name === 'babel-gulp')

  return {
    browserslistEnv: 'javascripts',
    presets: [
      [
        '@babel/preset-env',
        {
          // Apply bug fixes to avoid transforms
          bugfixes: true,

          // Apply smaller "loose" transforms for browsers
          loose: isBrowser,

          // Skip ES module transforms for browsers
          modules: isBrowser ? false : 'auto'
        }
      ]
    ],
    env: {
      test: {
        browserslistEnv: 'node'
      }
    }
  }
}

/**
 * @import { ConfigFunction } from '@babel/core';
 */
