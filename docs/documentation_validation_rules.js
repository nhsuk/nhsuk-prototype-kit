const { body } = require('express-validator');

// Validation library guidance: https://github.com/validatorjs/validator.js#validators
module.exports = [
  body('docsExampleName')
    .not().isEmpty()
    .withMessage('Name a required field'),
  body('docsExampleEmail')
    .isEmail()
    .withMessage('Please enter a valid email address')
];
