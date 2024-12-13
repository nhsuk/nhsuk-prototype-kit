// Core dependencies
const path = require('path');
const fs = require('fs');

// External dependencies
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const express = require('express');
const nunjucks = require('nunjucks');
const sessionInCookie = require('client-sessions');
const sessionInMemory = require('express-session');

// Run before other code to make sure variables from .env are available
dotenv.config();

// Local dependencies
const packageInfo = require('./package.json');
const authentication = require('./lib/middleware/authentication');
const automaticRouting = require('./lib/middleware/auto-routing');
const config = require('./app/config');
const locals = require('./app/locals');
const routes = require('./app/routes');
const utils = require('./lib/utils');

const prototypeAdminRoutes = require('./lib/middleware/prototype-admin-routes');
const exampleTemplatesRoutes = require('./lib/example_templates_routes');

// Set configuration variables
const port = parseInt(process.env.PORT, 10) || config.port;

// Initialise applications
const app = express();
const exampleTemplatesApp = express();

// Set up configuration variables
const useAutoStoreData = process.env.USE_AUTO_STORE_DATA || config.useAutoStoreData;
const useCookieSessionStore = process.env.USE_COOKIE_SESSION_STORE || config.useCookieSessionStore;

// Add variables that are available in all views
app.locals.asset_path = '/public/';
app.locals.useAutoStoreData = (useAutoStoreData === 'true');
app.locals.useCookieSessionStore = (useCookieSessionStore === 'true');
app.locals.serviceName = config.serviceName;

// Use cookie middleware to parse cookies
app.use(cookieParser());

// Nunjucks configuration for application
const appViews = [
  path.join(__dirname, 'app/views/'),
  path.join(__dirname, 'lib/example-templates/'),
  path.join(__dirname, 'lib/prototype-admin/'),
  path.join(__dirname, 'node_modules/nhsuk-frontend/packages/components'),
  path.join(__dirname, 'node_modules/nhsuk-frontend/packages/macros'),
];

const nunjucksConfig = {
  autoescape: true,
  noCache: true,
};

nunjucksConfig.express = app;

let nunjucksAppEnv = nunjucks.configure(appViews, nunjucksConfig);
nunjucksAppEnv.addGlobal('version', packageInfo.version);

// Add Nunjucks filters
utils.addNunjucksFilters(nunjucksAppEnv);

// Session uses service name to avoid clashes with other prototypes
const sessionName = `nhsuk-prototype-kit-${(Buffer.from(config.serviceName, 'utf8')).toString('hex')}`;
const sessionOptions = {
  secret: sessionName,
  cookie: {
    maxAge: 1000 * 60 * 60 * 4, // 4 hours
  },
};

// Authentication
app.use(authentication);

// Support session data in cookie or memory
if (useCookieSessionStore === 'true') {
  app.use(sessionInCookie(Object.assign(sessionOptions, {
    cookieName: sessionName,
    proxy: true,
    requestKey: 'session',
  })));
} else {
  app.use(sessionInMemory(Object.assign(sessionOptions, {
    name: sessionName,
    resave: false,
    saveUninitialized: false,
  })));
}

// Support for parsing data in POSTs
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));

// Automatically store all data users enter
if (useAutoStoreData === 'true') {
  app.use(utils.autoStoreData);
  utils.addCheckedFunction(nunjucksAppEnv);
}

// Warn if node_modules folder doesn't exist
function checkFiles() {
  const nodeModulesExists = fs.existsSync(path.join(__dirname, '/node_modules'));
  if (!nodeModulesExists) {
    console.error('ERROR: Node module folder missing. Try running `npm install`'); // eslint-disable-line no-console
    process.exit(0);
  }

  // Create template .env file if it doesn't exist
  const envExists = fs.existsSync(path.join(__dirname, '/.env'));
  if (!envExists) {
    fs.createReadStream(path.join(__dirname, '/lib/template.env'))
      .pipe(fs.createWriteStream(path.join(__dirname, '/.env')));
  }
}

// initial checks
checkFiles();

// Create template session data defaults file if it doesn't exist
const dataDirectory = path.join(__dirname, '/app/data');
const sessionDataDefaultsFile = path.join(dataDirectory, '/session-data-defaults.js');
const sessionDataDefaultsFileExists = fs.existsSync(sessionDataDefaultsFile);

if (!sessionDataDefaultsFileExists) {
  console.log('Creating session data defaults file'); // eslint-disable-line no-console
  if (!fs.existsSync(dataDirectory)) {
    fs.mkdirSync(dataDirectory);
  }

  fs.createReadStream(path.join(__dirname, '/lib/template.session-data-defaults.js'))
    .pipe(fs.createWriteStream(sessionDataDefaultsFile));
}

// Local variables
app.use(locals(config));

// View engine
app.set('view engine', 'html');
exampleTemplatesApp.set('view engine', 'html');

// Middleware to serve static assets
app.use(express.static(path.join(__dirname, 'public')));
app.use('/nhsuk-frontend', express.static(path.join(__dirname, 'node_modules/nhsuk-frontend/packages')));
app.use('/nhsuk-frontend', express.static(path.join(__dirname, 'node_modules/nhsuk-frontend/dist')));

// Use custom application routes
app.use('/', routes);

// Automatically route pages
app.get(/^([^.]+)$/, (req, res, next) => {
  automaticRouting.matchRoutes(req, res, next);
});

// Example template routes
app.use('/example-templates', exampleTemplatesApp);

// Nunjucks configuration for example templates
const exampleTemplateViews = [
  path.join(__dirname, 'lib/example-templates/'),
  path.join(__dirname, 'node_modules/nhsuk-frontend/packages/components'),
  path.join(__dirname, 'node_modules/nhsuk-frontend/packages/macros'),
];

nunjucksAppEnv = nunjucks.configure(exampleTemplateViews, {
  autoescape: true,
  express: exampleTemplatesApp,
});
nunjucksAppEnv.addGlobal('version', packageInfo.version);

// Add Nunjucks filters
utils.addNunjucksFilters(nunjucksAppEnv);

exampleTemplatesApp.use('/', exampleTemplatesRoutes);

// Automatically route example template pages
exampleTemplatesApp.get(/^([^.]+)$/, (req, res, next) => {
  automaticRouting.matchRoutes(req, res, next);
});

app.use('/prototype-admin', prototypeAdminRoutes);

// Redirect all POSTs to GETs - this allows users to use POST for autoStoreData
app.post(/^\/([^.]+)$/, (req, res) => {
  res.redirect(`/${req.params[0]}`);
});

// Catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error(`Page not found: ${req.path}`); // eslint-disable-line no-console
  err.status = 404;
  next(err);
});

// Display error
app.use((err, req, res) => {
  console.error(err.message); // eslint-disable-line no-console
  res.status(err.status || 500);
  res.send(err.message);
});

// Run the application
app.listen(port);

if (
  process.env.WATCH !== 'true' // If the user isn’t running watch
  && process.env.NODE_ENV !== 'production' // and it’s not in production mode
) {
  /* eslint-disable no-console */
  console.info(`Running at http://localhost:${port}/`);
  console.info('');
  console.warn('Warning: It looks like you may have run the command `npm start` locally.');
  console.warn('Press `Ctrl+C` and then run `npm run watch` instead');
  /* eslint-enable no-console */
}

module.exports = app;
