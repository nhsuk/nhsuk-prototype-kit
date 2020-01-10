// External dependencies
const express = require('express');
const router = express.Router();

// Add your routes here - above the module.exports line

// Branching example
router.post('/csass/add-test-result/v1/change', function (req, res) {

  // Make a variable and give it the value from 'know-nhs-number'
  var reason = req.session.data['change-due-date']

  // Check whether the variable matches a condition
  if (reason == "Defer"){
    // Send user to next page
    res.redirect('/csass/add-test-result/v1/defer')
  }
  else {
    // Send user to ineligible page
    res.redirect('/csass/add-test-result/v1/cease')
  }

})

module.exports = router;
