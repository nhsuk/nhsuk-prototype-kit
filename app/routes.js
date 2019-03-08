// External dependencies
const express = require('express');
const router = express.Router();

// Add your routes here - above the module.exports line

// Branching example
router.post('/examples/branching/answer', function (req, res) {

  // Make a variable and give it the value from 'know-nhs-number'
  var nhsNumber = req.session.data['know-nhs-number']

  // Check whether the variable matches a condition
  if (nhsNumber == "Yes"){
    // Send user to next page
    res.redirect('/examples/branching/answer-yes')
  }
  else {
    // Send user to ineligible page
    res.redirect('/examples/branching/answer-no')
  }

})

module.exports = router;
