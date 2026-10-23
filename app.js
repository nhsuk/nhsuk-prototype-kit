import NHSPrototypeKit from 'nhsuk-prototype-kit'

// Local dependencies
import config from './app/config.js'
import sessionDataDefaults from './app/data/session-data-defaults.js'
import filters from './app/filters.js'
import locals from './app/locals.js'
import routes from './app/routes.js'

const viewsPath = [
  'app/views/'
]

const entryPoints = [
  'app/assets/sass/main.scss',
  'app/assets/javascript/*.js'
]

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
