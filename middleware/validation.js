const customRules = require('../app/validation-rules');
const docsRules = require('../docs/documentation_validation_rules');

const { validationResult } = require('express-validator');

// Default object to be passed to every request object
const defaultErrorState = {
  hasErrors: false,
  errorList: [],
  errors: {}
};

// Build object of rules merged from custom and docs
const rules = {
  ...customRules,
  ...docsRules
}

// Middleware to apply rules to passed request object
const applyRules = async (req, _, next) => {
  // Run validation on POST requests
  if (req.method === 'POST') {
    // Retrieve rules based on URL
    const ruleSet = rules[req.originalUrl] || [];
    // Run rules async... this allows us to run the rules async within a 
    // single middleware rather than inline for each route in the route
    await Promise.all(ruleSet.map(async rule => {
      await rule.run(req);
    }));
  }
  return next();
}

// Transform error data for use in nhsuk-frontend templates
const transformErrors = (req, _, next) => {
  // Set errors to session for use in Nunjucks templates
  req.session.errors = validationResult(req).array().reduce(({ errorList, errors }, { param, msg }) => ({
    // Set error flag to true
    hasErrors: true,
    // Array of objects with href and text properties
    errorList: [
      ...errorList,
      {
        href: `#${param}`,
        text: msg
      }
    ],
    // Object of errors with { param , msg }
    errors: {
      ...errors,
      [param]: msg
    }
  }), defaultErrorState);

  return next();
}

// Redirect request back to referer URL for less jarring URL change
const redirectToReferer = (req, res, next) => {
  if (req.session.errors.hasErrors) {
     // Retrieve referer path from request object
    const { pathname } = new URL(req.get('referer'));
    return res.redirect(pathname);
  }

  return next();
}

// Middleware to apply rules, make them available in templates and handle routing
const validation = [applyRules, transformErrors, redirectToReferer];

module.exports = validation;