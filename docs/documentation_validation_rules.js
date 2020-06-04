const { body } = require('express-validator');

// Validation library guidance: https://github.com/validatorjs/validator.js#validators
module.exports = {
  '/examples/validation/email': [
    body('docsExampleName')
      .not().isEmpty()
      .withMessage('Name a required field')
  ],
  '/examples/validation/complete': [
    body('docsExampleEmail')
        .isEmail()
        .withMessage('Please enter a valid email address')
  ]
};
