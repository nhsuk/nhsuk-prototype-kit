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
const bodyParser = require('body-parser')
const sessionInCookie = require('client-sessions')
const cookieParser = require('cookie-parser')
const dotenv = require('dotenv')
const express = require('express')
const sessionInMemory = require('express-session')
const nunjucks = require('nunjucks')

// Run before other code to make sure variables from .env are available
dotenv.config({
  quiet: true
})

// Local dependencies
const config = require('./app/config')
const locals = require('./app/locals')
const routes = require('./app/routes')
const exampleTemplatesRoutes = require('./lib/example_templates_routes')
const authentication = require('./lib/middleware/authentication')
const automaticRouting = require('./lib/middleware/auto-routing')
const production = require('./lib/middleware/production')
const prototypeAdminRoutes = require('./lib/middleware/prototype-admin-routes')
const utils = require('./lib/utils')
const packageInfo = require('./package.json')

// Set configuration variables
const port = parseInt(process.env.PORT || config.port, 10) || 2000

// Initialise applications
const app = express()
const exampleTemplatesApp = express()

// Set up configuration variables
const useAutoStoreData =
  process.env.USE_AUTO_STORE_DATA || config.useAutoStoreData
const useCookieSessionStore =
  process.env.USE_COOKIE_SESSION_STORE || config.useCookieSessionStore

// Add variables that are available in all views
app.locals.asset_path = '/public/'
app.locals.useAutoStoreData = useAutoStoreData === 'true'
app.locals.useCookieSessionStore = useCookieSessionStore === 'true'
app.locals.serviceName = config.serviceName

// Use cookie middleware to parse cookies
app.use(cookieParser())

// Nunjucks configuration for application
const appViews = [
  join(__dirname, 'app/views/'),
  join(__dirname, 'lib/example-templates/'),
  join(__dirname, 'lib/prototype-admin/'),
  join(__dirname, 'lib/templates/'),
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

// Add Nunjucks filters
utils.addNunjucksFilters(nunjucksAppEnv)

// Session uses service name to avoid clashes with other prototypes
const sessionName = `nhsuk-prototype-kit-${Buffer.from(config.serviceName, 'utf8').toString('hex')}`
const sessionOptions = {
  secret: sessionName,
  cookie: {
    maxAge: 1000 * 60 * 60 * 4 // 4 hours
  }
}

if (process.env.NODE_ENV === 'production') {
  app.use(production)
  app.use(authentication)
}

// Support session data in cookie or memory
if (useCookieSessionStore === 'true') {
  app.use(
    sessionInCookie({
      ...sessionOptions,
      cookieName: sessionName,
      proxy: true,
      requestKey: 'session'
    })
  )
} else {
  app.use(
    sessionInMemory({
      ...sessionOptions,
      name: sessionName,
      resave: false,
      saveUninitialized: false
    })
  )
}

// Support for parsing data in POSTs
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true
  })
)

// Automatically store all data users enter
if (useAutoStoreData === 'true') {
  app.use(utils.autoStoreData)
  utils.addCheckedFunction(nunjucksAppEnv)
}

app.use(utils.setLocals)

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

// Automatically route pages
app.get(/^([^.]+)$/, (req, res, next) => {
  automaticRouting.matchRoutes(req, res, next)
})

// Example template routes
app.use('/example-templates', exampleTemplatesApp)

nunjucksAppEnv = nunjucks.configure(appViews, {
  autoescape: true,
  express: exampleTemplatesApp
})
nunjucksAppEnv.addGlobal('version', packageInfo.version)

// Add Nunjucks filters
utils.addNunjucksFilters(nunjucksAppEnv)

exampleTemplatesApp.use('/', exampleTemplatesRoutes)

// Automatically route example template pages
exampleTemplatesApp.get(/^([^.]+)$/, (req, res, next) => {
  automaticRouting.matchRoutes(req, res, next)
})

app.use('/prototype-admin', prototypeAdminRoutes)

// Redirect all POSTs to GETs - this allows users to use POST for autoStoreData
app.post(/^\/([^.]+)$/, (req, res) => {
  res.redirect(
    urlFormat({
      pathname: `/${req.params[0]}`,
      query: req.query
    })
  )
})

// Catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error(`Page not found: ${req.path}`)
  err.status = 404
  next(err)
})

// Display error
app.use((err, req, res) => {
  console.error(err.message)
  res.status(err.status || 500)
  res.send(err.message)
})

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
