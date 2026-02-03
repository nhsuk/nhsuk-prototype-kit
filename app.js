const NHSPrototypeKit = require('nhsuk-prototype-kit')

// Local dependencies
const config = require('./app/config')
const sessionDataDefaults = require('./app/data/session-data-defaults')
const filters = require('./app/filters')
const locals = require('./app/locals')
const routes = require('./app/routes')

const viewsPath = [
  'app/views/'
]

const entryPoints = [
  'app/assets/sass/main.scss',
  'app/assets/javascript/*.js'
]

async function init() {
  const prototype = await NHSPrototypeKit.init({
    serviceName: config.serviceName,
    buildOptions: {
      entryPoints
    },
    viewsPath,
    routes,
    locals,
    filters,
    sessionDataDefaults
  })

  prototype.start(config.port)
}

init()
