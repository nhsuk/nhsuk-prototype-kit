// External dependencies
const express = require('express');
const router = express.Router();

// Documentation router
router.get('/', function(req , res){ 
  res.render('index');
});

// Install guide branching
router.post('/install', function (req, res) {

  var install = req.session.data['install']

  if (install == "Simple"){
    res.redirect('/docs/install/simple')
  }
  if (install == "Developer"){
    res.redirect('/docs/install/advanced')
  }
  else {
    res.redirect('/docs/install/download-zip')
  }

})

// Install - Mac or Windows branching
router.post('/install/mac', function (req, res) {

  var machine = req.session.data['machine']

  if (machine == "Mac"){
    res.redirect('/docs/install/mac/terminal')
  }
  else {
    res.redirect('/docs/install/windows/terminal')
  }

})

// Branching example
router.post('/examples/branching/answer', function (req, res) {

  // Make a variable and give it the value from 'know-nhs-number'
  var nhsNumber = req.session.data['know-nhs-number']

  // Check whether the variable matches a condition
  if (nhsNumber == "Yes"){
    // Send user to next page
    res.redirect('/docs/examples/branching/answer-yes')
  }
  else {
    // Send user to ineligible page
    res.redirect('/docs/examples/branching/answer-no')
  }

})

module.exports = router;
