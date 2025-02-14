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

  console.log(req.headers)

  // Redirect to HTTPS if page requested over HTTP
  // This relies on the X-Forwarded-Proto HTTP header as hosts
  // like Heroku place apps behind a load balance which uses HTTPS
  // internally. The X-Forwarded-Proto reveals the protocol of the
  // original request.
  if (req.headers['x-forwarded-proto'] === 'http') {
    return res.redirect(302, 'https://' + req.get('Host') + req.url)
  } else {
    next()
  }

}

module.exports = production;
