const { check } = require('express-validator');

// Add rules for validation here, docs at: https://github.com/validatorjs/validator.js#validators
module.exports = [
  check('docsExampleName')
    .not().isEmpty()
    .withMessage('Name a required field'),
  check('docsExampleEmail')
    .isEmail()
    .withMessage('Please enter a valid email address')
];
