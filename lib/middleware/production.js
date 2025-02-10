// This Express middleware function sets some
// HTTP headers which should only be set in deployed
// environments

function production(req, res, next) {
  // Set Strict-Transport-Security header to
  // ensure that browsers only use HTTPS
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');

  // Set content security policy to upgrade
  // all HTTP requests to HTTPS
  res.setHeader('Content-Security-Policy', 'upgrade-insecure-requests');
  next();
}

module.exports = production;
