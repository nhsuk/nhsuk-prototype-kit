// Core dependencies
const path = require('path');
const fs = require('fs');

// External dependencies
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const express = require('express');
const nunjucks = require('nunjucks');
const sessionInCookie = require('client-sessions');
const sessionInMemory = require('express-session');

// Run before other code to make sure variables from .env are available
dotenv.config();

// Local dependencies
const packageInfo = require('./package.json');
const authentication = require('./middleware/authentication');
const automaticRouting = require('./middleware/auto-routing');
const config = require('./app/config');
const locals = require('./app/locals');
const routes = require('./app/routes');
const documentationRoutes = require('./docs/documentation_routes');
const utils = require('./lib/utils');

// Set configuration variables
const port = process.env.PORT || config.port;
const useDocumentation = process.env.SHOW_DOCS || config.useDocumentation;
const onlyDocumentation = process.env.DOCS_ONLY;

// Initialise applications
const app = express();
const documentationApp = express();

// Set up configuration variables
const useAutoStoreData = process.env.USE_AUTO_STORE_DATA || config.useAutoStoreData;
const useCookieSessionStore = process.env.USE_COOKIE_SESSION_STORE || config.useCookieSessionStore;

// Add variables that are available in all views
app.locals.asset_path = '/public/';
app.locals.useAutoStoreData = (useAutoStoreData === 'true');
app.locals.useCookieSessionStore = (useCookieSessionStore === 'true');
app.locals.serviceName = config.serviceName;

// Nunjucks configuration for application
const appViews = [
  path.join(__dirname, 'app/views/'),
  path.join(__dirname, 'node_modules/nhsuk-frontend/packages/components'),
  path.join(__dirname, 'docs/views/'),
];

const nunjucksConfig = {
  autoescape: true,
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

// Support session data in cookie or memory
if (useCookieSessionStore === 'true' && !onlyDocumentation) {
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
    console.error('ERROR: Node module folder missing. Try running `npm install`');
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
  console.log('Creating session data defaults file');
  if (!fs.existsSync(dataDirectory)) {
    fs.mkdirSync(dataDirectory);
  }

  fs.createReadStream(path.join(__dirname, '/lib/template.session-data-defaults.js'))
    .pipe(fs.createWriteStream(sessionDataDefaultsFile));
}

// Check if the app is documentation only
if (onlyDocumentation !== 'true') {
  // Require authentication if not
  app.use(authentication);
}

// Local variables
app.use(locals(config));

// View engine
app.set('view engine', 'html');
documentationApp.set('view engine', 'html');

// Middleware to serve static assets
app.use(express.static(path.join(__dirname, 'public')));
app.use('/nhsuk-frontend', express.static(path.join(__dirname, 'node_modules/nhsuk-frontend/packages')));
app.use('/nhsuk-frontend', express.static(path.join(__dirname, 'node_modules/nhsuk-frontend/dist')));

// Check if the app is documentation only
if (onlyDocumentation === 'true') {
  app.get('/', (req, res) => {
    // Redirect to the documentation pages if it is
    res.redirect('/docs');
  });
}

// Use custom application routes
app.use('/', routes);

// Automatically route pages
app.get(/^([^.]+)$/, (req, res, next) => {
  automaticRouting.matchRoutes(req, res, next);
});

// Check if the app is using documentation
if (useDocumentation || onlyDocumentation === 'true') {
  // Documentation routes
  app.use('/docs', documentationApp);

  // Nunjucks configuration for documentation
  const docViews = [
    path.join(__dirname, 'docs/views/'),
    path.join(__dirname, 'node_modules/nhsuk-frontend/packages/components'),
  ];

  nunjucksAppEnv = nunjucks.configure(docViews, {
    autoescape: true,
    express: documentationApp,
  });
  nunjucksAppEnv.addGlobal('version', packageInfo.version);

  // Add Nunjucks filters
  utils.addNunjucksFilters(nunjucksAppEnv);

  // Automatically store all data users enter
  if (useAutoStoreData === 'true') {
    documentationApp.use(utils.autoStoreData);
    utils.addCheckedFunction(nunjucksAppEnv);
  }

  // Support for parsing data in POSTs
  documentationApp.use(bodyParser.json());
  documentationApp.use(bodyParser.urlencoded({
    extended: true,
  }));

  // Custom documentation routes
  documentationApp.use('/', documentationRoutes);

  // Automatically route documentation pages
  documentationApp.get(/^([^.]+)$/, (req, res, next) => {
    automaticRouting.matchRoutes(req, res, next);
  });
}

// Clear all data in session if you open /examples/passing-data/clear-data
app.post('/examples/passing-data/clear-data', (req, res) => {
  req.session.data = {};
  res.render('examples/passing-data/clear-data-success');
});

// Redirect all POSTs to GETs - this allows users to use POST for autoStoreData
app.post(/^\/([^.]+)$/, (req, res) => {
  res.redirect(`/${req.params[0]}`);
});

// Catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error(`Page not found: ${req.path}`);
  err.status = 404;
  next(err);
});

// Display error
app.use((err, req, res) => {
  console.error(err.message);
  res.status(err.status || 500);
  res.send(err.message);
});

// Run the application
app.listen(port);

module.exports = app;
