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

// Set configuration variables
const PORT = config.port || process.env.PORT || 3000;
const ENV = (process.env.NODE_ENV || 'development').toLowerCase()

// Initialise applications
const app = express()

// Authentication middleware
app.use(authentication);

// View engine
app.set('view engine', 'html');

// Nunjucks configuration
var appViews = [
  path.join(__dirname, 'app/views/'),
  path.join(__dirname, 'node_modules/nhsuk-frontend/packages/components')
]

nunjucks.configure(appViews, {
  autoescape: true,
  express: app
});

// Middleware to serve static assets
app.use(express.static(path.join(__dirname, 'public')));
app.use('/nhsuk-frontend', express.static(path.join(__dirname, 'node_modules/nhsuk-frontend/packages')));

// Application routes
app.use('/', routes)

// Run the application
app.listen(PORT, () => {
  console.log(chalk.green(`App is running at http://localhost:${PORT}`));
})
.on( 'error', function (e) { 
  if (ENV == 'development' && e.code == 'EADDRINUSE') { // If selected port is in use elsewhere
    console.log(chalk.yellow(`Port ${PORT} is currently in use, switching to a random port...`));
    randomPort = PORT + Math.floor(Math.random()*(999-100+1)+100); // Randomise the port number
    app.listen(randomPort); // Set new random port
    console.log(chalk.green(`App is running at http://localhost:${randomPort}`)); // Re-run the application on new port
  }
});

module.exports = app;
