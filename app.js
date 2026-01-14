const { join } = require('node:path')

const NHSPrototypeKit = require('nhsuk-prototype-kit')

// Local dependencies
const config = require('./app/config')
const sessionDataDefaults = require('./app/data/session-data-defaults')
const filters = require('./app/filters')
const locals = require('./app/locals')
const routes = require('./app/routes')

const SERVICE_NAME = config.serviceName

// Set configuration variables
const port = parseInt(process.env.PORT, 10) || 2000

const viewsPath = [
  join(__dirname, 'app/views/')
]

const prototype = NHSPrototypeKit.init({
  serviceName: SERVICE_NAME,
  routes: routes,
  locals: locals,
  sessionDataDefaults: sessionDataDefaults,
  viewsPath: viewsPath,
  buildOptions: {
    entryPoints: ['app/assets/sass/main.scss']
  }
})

for (const [name, filter] of Object.entries(filters())) {
  prototype.nunjucks.addFilter(name, filter)
}

prototype.start(port)
