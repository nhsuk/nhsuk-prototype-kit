// Core dependencies
const {
  createReadStream,
  createWriteStream,
  existsSync,
  mkdirSync
} = require('node:fs')
const { join } = require('node:path')
const { format: urlFormat } = require('node:url')

// External dependencies
const cookieParser = require('cookie-parser')
const dotenv = require('dotenv')
const express = require('express')
const expressSession = require('express-session')
const nunjucks = require('nunjucks')

const NHSPrototypeKit = require('nhsuk-prototype-kit')

// Run before other code to make sure variables from .env are available
dotenv.config({
  quiet: true
})

// Local dependencies
const config = require('./app/config')
const locals = require('./app/locals')
const routes = require('./app/routes')
const packageInfo = require('./package.json')

// Set configuration variables
const port = parseInt(process.env.PORT || config.port, 10) || 2000

// Initialise applications
const app = express()
const exampleTemplatesApp = express()

// Add variables that are available in all views
app.locals.asset_path = '/public/'
app.locals.serviceName = config.serviceName

// Nunjucks configuration for application
const appViews = [
  join(__dirname, 'app/views/'),
  join(__dirname, 'node_modules/nhsuk-prototype-kit/lib/views/'),
  join(__dirname, 'node_modules/nhsuk-frontend/dist/nhsuk/components'),
  join(__dirname, 'node_modules/nhsuk-frontend/dist/nhsuk/macros'),
  join(__dirname, 'node_modules/nhsuk-frontend/dist/nhsuk'),
  join(__dirname, 'node_modules/nhsuk-frontend/dist')
]

/**
 * @type {ConfigureOptions}
 */
const nunjucksConfig = {
  autoescape: true,
  noCache: true
}

nunjucksConfig.express = app

let nunjucksAppEnv = nunjucks.configure(appViews, nunjucksConfig)
nunjucksAppEnv.addGlobal('version', packageInfo.version)

// Session uses service name to avoid clashes with other prototypes
const sessionName = `nhsuk-prototype-kit-${Buffer.from(config.serviceName, 'utf8').toString('hex')}`
const sessionOptions = {
  secret: sessionName,
  cookie: {
    maxAge: 1000 * 60 * 60 * 4 // 4 hours
  }
}

app.use(
  expressSession({
    ...sessionOptions,
    name: sessionName,
    resave: false,
    saveUninitialized: false
  })
)

// Warn if node_modules folder doesn't exist
function checkFiles() {
  const nodeModulesExists = existsSync(join(__dirname, '/node_modules'))
  if (!nodeModulesExists) {
    throw new Error(
      'ERROR: Node module folder missing. Try running `npm install`'
    )
  }

  // Create template .env file if it doesn't exist
  const envExists = existsSync(join(__dirname, '/.env'))
  if (!envExists) {
    createReadStream(join(__dirname, '/lib/template.env')).pipe(
      createWriteStream(join(__dirname, '/.env'))
    )
  }
}

// initial checks
checkFiles()

// Create template session data defaults file if it doesn't exist
const dataDirectory = join(__dirname, '/app/data')
const sessionDataDefaultsFile = join(dataDirectory, '/session-data-defaults.js')
const sessionDataDefaultsFileExists = existsSync(sessionDataDefaultsFile)

if (!sessionDataDefaultsFileExists) {
  console.log('Creating session data defaults file')
  if (!existsSync(dataDirectory)) {
    mkdirSync(dataDirectory)
  }

  createReadStream(
    join(__dirname, '/lib/template.session-data-defaults.js')
  ).pipe(createWriteStream(sessionDataDefaultsFile))
}

// Local variables
app.use(locals(config))

// View engine
app.set('view engine', 'html')
exampleTemplatesApp.set('view engine', 'html')

// Support for parsing nested query strings
// https://github.com/nhsuk/nhsuk-prototype-kit/issues/644
app.set('query parser', 'extended')

// This setting trusts the X-Forwarded headers set by
// a proxy and uses them to set the standard header in
// req. This is needed for hosts like Heroku.
// See https://expressjs.com/en/guide/behind-proxies.html
app.set('trust proxy', 1)

// Use public folder for static assets
app.use(express.static(join(__dirname, 'public')))

// Use assets from NHS frontend
app.use(
  '/nhsuk-frontend',
  express.static(join(__dirname, 'node_modules/nhsuk-frontend/dist/nhsuk'))
)

// Use custom application routes
app.use('/', routes)

NHSPrototypeKit.init(app, nunjucksAppEnv)

// Run the application
app.listen(port)

if (
  process.env.WATCH !== 'true' && // If the user isn’t running watch
  process.env.NODE_ENV !== 'production' // and it’s not in production mode
) {
  console.info(`Running at http://localhost:${port}/`)
  console.info('')
  console.warn(
    'Warning: It looks like you may have run the command `npm start` locally.'
  )
  console.warn('Press `Ctrl+C` and then run `npm run watch` instead')
}

module.exports = app

/**
 * @import { ConfigureOptions } from 'nunjucks'
 */
