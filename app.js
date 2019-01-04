// Required dependencies
const express = require('express');
const app = require('express')();
const nunjucks = require('nunjucks');
const path = require('path');

// Custom middleware
const autoRouting = require('./middleware/auto-routing');

// Environment variables
const PORT = process.env.PORT || 3000;
const ENV = process.env.NODE_ENV || 'development';
const USERNAME = process.env.USERNAME || 'hello';
const PASSWORD = process.env.PASSWORD || 'goodbye';

// Shared configuration
app.set('view engine', 'html');
app.use(express.static(path.join(__dirname, 'public')));
app.use('/nhsuk-frontend', express.static(path.join(__dirname, 'node_modules/nhsuk-frontend/packages')));

// Nunjucks configuration
var appViews = [
  path.join(__dirname, '/app/views/'),
  path.join(__dirname, '/docs/views/'),
  path.join(__dirname, 'node_modules/nhsuk-frontend/packages/components')
]

nunjucks.configure(appViews, {
  autoescape: true,
  express: app,
  noCache: true,
  watch: true
})

// Automatic page routing
app.get(/^([^.]+)$/, function (req, res, next) {
  autoRouting.matchRoutes(req, res, next)
})

app.listen(PORT, () => {
  console.log(`App is running in ${ENV} mode at http://localhost:${PORT}`);
});

module.exports = app;
