/**
 * @param {Environment} env
 */
module.exports = function (env) {
  // If you need access to an internal nunjucks filter you can use env
  // see the example below for 'safe' which is used in 'filters.log'
  const nunjucksSafe = env.getFilter('safe')

  /**
   * Object used to store the filters
   * filters.foo("input") here, becomes {{ "input" | foo }} in templates
   */
  const filters = {}

  /**
   * Logs an object in the template to the console in the browser.
   *
   * @example
   * ```njk
   * {{ "hello world" | log }}
   * ```
   * @example For environments with autoescaping turned on
   * ```njk
   * {{ "hello world" | log | safe }}
   * ```
   * @param {unknown} a - unknown type
   * @returns {string} a script tag with a console.log call.
   */
  filters.log = function log(a) {
    return nunjucksSafe(
      `<script>console.log(${JSON.stringify(a, null, '\t')});</script>`
    )
  }

  return filters
}

/**
 * @import { Environment } from 'nunjucks'
 */
