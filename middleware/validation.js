// Use express validator depencency
const { validationResult } = require('express-validator');
const validationRules = require('../app/validation-rules');
const docsValidationRules = require('../docs/documentation_validation_rules');
const { matchRoutesRefererPath } = require('./auto-routing');

const rules = [...validationRules, ...docsValidationRules];

module.exports = [rules, (req, res, next) => {
  // Reset any previous errors
  req.session.errors = {};
  // Only run validation on POST requests
  if (req.method === 'POST') {
    // Get array of all keys in the request body 
    const errorsToValidate = Object.keys(req.body);
    // Set errors to session for use in Nunjucks templates
    const nhsErrors = validationResult(req).array().reduce((obj, { param, msg }) => {
      // Only return errors for inputs on this page 
      if (errorsToValidate.includes(param)) {
        return {
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
        }
      }
      return obj;
    }, {
      // Set default empty arrays and objects
      errorsList: [],
      errorsObj: {}
    });
    if (nhsErrors.errorsList.length) {
      req.session.errors = nhsErrors;
      // Redirect back to referer route
      return matchRoutesRefererPath(req, res, next);
    }
  }
  return next();
}];
