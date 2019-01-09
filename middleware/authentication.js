/**
 * Simple basic auth middleware for use with Express 4.x.
 *
 * Based on template found at: http://www.danielstjules.com/2014/08/03/basic-auth-with-express-4/
 *
 * @example
 * const authentication = required('authentication');
 * app.use(authentication);
 *
 * @param   {string}   req Express Request object
 * @param   {string}   res Express Response object
 * @returns {function} Express 4 middleware requiring the given credentials
 */

module.exports = function (req, res, next) {
  // External dependencies
  const basicAuth = require('basic-auth')

  // Set configuration variables
  const env = (process.env.NODE_ENV || 'development').toLowerCase();
  const username = process.env.PROTOTYPE_USERNAME;
  const password = process.env.PROTOTYPE_PASSWORD;

  if (env === 'production' || env === 'staging') {
    if (!username || !password) {
      return res.send('<p>Username or password not set in environment variables.</p>');
    }

    const user = basicAuth(req)

    if (!user || user.name !== username || user.pass !== password) {
      res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
      return res.sendStatus(401)
    }
  }
  next()
}
