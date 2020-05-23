const { check } = require('express-validator');

// Add rules for validation here, docs at: https://github.com/validatorjs/validator.js#validators
module.exports = [
  check('name')
    .not().isEmpty()
    .withMessage('Name a required field'),
  check('email')
    .isEmail()
    .withMessage('Please enter a valid email address')
];
