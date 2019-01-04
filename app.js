// Core dependencies
const path = require('path')

// External dependencies
const express = require('express');
const nunjucks = require('nunjucks');
const chalk = require('chalk');

// Local dependencies
const authentication = require('./middleware/authentication');
const routes = require('./app/routes');
const config = require('./app/config');
const automaticRouting = require('./middleware/auto-routing');

// Set configuration variables
const PORT = process.env.PORT || config.port;
const ENV = (process.env.NODE_ENV || 'development').toLowerCase()

// Initialise applications
const app = express()

// Authentication middleware
app.use(authentication);

// View engine
app.set('view engine', 'html');

// Middleware to serve static assets
app.use(express.static(path.join(__dirname, 'public')));
app.use('/nhsuk-frontend', express.static(path.join(__dirname, 'node_modules/nhsuk-frontend/packages')));
app.use('/nhsuk-frontend', express.static(path.join(__dirname, 'node_modules/nhsuk-frontend/dist')));

// Nunjucks configuration
var appViews = [
  path.join(__dirname, 'app/views/'),
  path.join(__dirname, 'node_modules/nhsuk-frontend/packages/components')
]

nunjucks.configure(appViews, {
  autoescape: true,
  express: app
});

// Automatically route pages
app.get(/^([^.]+)$/, function (req, res, next) {
  automaticRouting.matchRoutes(req, res, next)
})

// Custom application routes
app.use('/', routes)

// Run the application
app.listen(PORT, () => {
  console.log(chalk.green(`App is running at http://localhost:${PORT}`));
})
.on( 'error', function (e) { 
  if (ENV == 'development' && e.code == 'EADDRINUSE') { // If selected port is in use elsewhere
    console.log(chalk.yellow(`Port ${PORT} is currently in use, kill the process running on port ${PORT} or change the port number in app/config.js`));
  }
});

module.exports = app;
