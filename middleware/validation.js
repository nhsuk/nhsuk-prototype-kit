// Use express validator depencency
const { validationResult } = require('express-validator');
const validationRules = require('../app/validation-rules');
const { matchRoutesRefererPath } = require('./auto-routing');

module.exports = [validationRules, (req, res, next) => {
  // Reset any previous errors
  req.session.errorsList = [];
  req.session.errorsObj = {};
  // Only run validation on POST requests
  if (req.method === 'POST') {
    // Get errors from validationRules middleware
    const reqErrors = validationResult(req);
    // If there are any errors
    if (!reqErrors.isEmpty()) {
      // Set errors to session for use in Nunjucks templates
      req.session.errors = reqErrors.array().reduce((obj, { param, msg }) => ({
        // Array of objects with href and text properties
        errorsList: [...obj.errorsList, {
          href: `#${param}`,
          text: msg
        }],
        // Object of errors with { param , msg }
        errorsObj: {
          ...obj.errorsObj,
          [param]: msg
        }
      }), {
        // Set default empty arrays and objects
        errorsList: [],
        errorsObj: {}
      });
      // Redirect back to referer route
      return matchRoutesRefererPath(req, res, next)
    };
  }
  return next();
}];
