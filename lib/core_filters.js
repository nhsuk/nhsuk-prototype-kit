// This is a CommonJS wrapper for the ES module
// Dynamically import the ES module and re-export its functionality

let coreFiltersES

async function loadCoreFilters() {
  if (!coreFiltersES) {
    const { default: coreFilters } = await import('./core_filters.mjs')
    coreFiltersES = coreFilters
  }
  return coreFiltersES
}

/**
 * @param {Environment} env
 */
module.exports = function (env) {
  // For synchronous compatibility, we need to handle this differently
  // Since this is called synchronously by the app, we need to have pre-loaded the module
  if (!coreFiltersES) {
    // Fallback to a basic implementation
    console.warn('ES module not loaded, using fallback')
    return {
      log: function(a) {
        return `<script>console.log(${JSON.stringify(a, null, '\t')});</script>`
      }
    }
  }
  return coreFiltersES(env)
}

// Pre-load the ES module
loadCoreFilters().catch(console.error)

/**
 * @import { Environment } from 'nunjucks'
 */
