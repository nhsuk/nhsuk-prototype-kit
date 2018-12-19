const app = require('express')();
const express = require('express');
const nunjucks = require('nunjucks');
const path = require('path');
const routing = require('./middleware/routing.js');
const routes = require('./app/routes.js')

app.set('view engine', 'html');
app.set('port', process.env.PORT || 3000);
app.use(express.static(path.join(__dirname, 'public')));
app.use('/nhsuk-frontend', express.static(path.join(__dirname, 'node_modules/nhsuk-frontend/packages')));

var appViews = [
  path.join(__dirname, '/app/views/'),
  path.join(__dirname, 'node_modules/nhsuk-frontend/packages/components')
]

nunjucks.configure(appViews, {
  autoescape: true,
  express: app,
  noCache: true,
  watch: true
})

app.use('/', routes)

app.get(/^([^.]+)$/, function (req, res, next) {
  routing.matchRoutes(req, res, next)
})

app.listen(app.get('port'), function() {
  console.log('App running at http://localhost:' + app.get('port'));
});

module.exports = app;
