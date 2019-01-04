// Core dependencies
const path = require('path')

// External dependencies
const express = require('express');
const nunjucks = require('nunjucks');

// Local dependencies
const authentication = require('./middleware/authentication');
const routes = require('./app/routes');
const config = require('./app/config');

// Set configuration variables
const PORT = config.port || process.env.PORT || 3000;

// Initialise applications
const app = express()

// Authentication middleware
app.use(authentication);

// Nunjucks configuration
var appViews = [
  path.join(__dirname, 'app/views/'),
  path.join(__dirname, 'node_modules/nhsuk-frontend/packages/components')
]

var nunjucksConfig = {
  autoescape: true,
  noCache: true,
  watch: false 
}

nunjucks.configure(appViews, nunjucksConfig);

// View engine
app.set('view engine', 'html');

// Middleware to serve static assets
app.use(express.static(path.join(__dirname, 'public')));
app.use('/nhsuk-frontend', express.static(path.join(__dirname, 'node_modules/nhsuk-frontend/packages')));

// Application routes
app.use('/', routes)

app.listen(PORT, () => {
  console.log(`App is running at http://localhost:${PORT}`);
});

module.exports = app;
