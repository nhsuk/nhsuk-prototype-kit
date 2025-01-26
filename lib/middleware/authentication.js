const url = require('url');
const { encryptPassword } = require('../utils');

const allowedPathsWhenUnauthenticated = [
  '/prototype-admin/password',
  '/css/main.css',
  '/nhsuk-frontend/nhsuk.min.js',
  '/js/auto-store-data.js',
  '/js/main.js',
];

const encryptedPassword = encryptPassword(process.env.PROTOTYPE_PASSWORD);
const nodeEnv = process.env.NODE_ENV || 'development';

// Redirect the user to the password page, with
// the current page path set as the returnURL in a query
// string so the user can be redirected back after successfully
// entering a password
function sendUserToPasswordPage(req, res) {
  const returnURL = url.format({
    pathname: req.path,
    query: req.query,
  });
  const passwordPageURL = url.format({
    pathname: '/prototype-admin/password',
    query: { returnURL },
  });
  res.redirect(passwordPageURL);
}

// Give the user some instructions on how to set a password
function showNoPasswordError(res) {
  return res.send('<h1>Error:</h1><p>Password not set. <a href="https://prototype-kit.service-manual.nhs.uk/how-tos/publish-your-prototype-online">See guidance for setting a password</a>.</p>');
}

function authentication(req, res, next) {
  if (nodeEnv !== 'production') {
    next();
  } else if (!process.env.PROTOTYPE_PASSWORD) {
    showNoPasswordError(res);
  } else if (allowedPathsWhenUnauthenticated.includes(req.path)) {
    next();
  } else if (req.cookies.authentication === encryptedPassword) {
    next();
  } else {
    sendUserToPasswordPage(req, res);
  }
}

module.exports = authentication;
