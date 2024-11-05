// External dependencies
const express = require('express');
const packageJson = require('../package.json');

const router = express.Router();

// Documentation router
router.get('/', (req, res) => {
  res.render('index');
});

// Branching example
router.post('/examples/branching/answer', (req, res) => {
  // Make a variable and give it the value from 'know-nhs-number'
  const nhsNumber = req.session.data['know-nhs-number'];

  // Check whether the variable matches a condition
  if (nhsNumber === 'Yes') {
    // Send user to next page
    res.redirect('/docs/examples/branching/answer-yes');
  } else {
    // Send user to ineligible page
    res.redirect('/docs/examples/branching/answer-no');
  }
});

module.exports = router;
