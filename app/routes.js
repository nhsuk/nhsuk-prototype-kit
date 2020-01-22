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


router.post('/v5/login/role-select', function(req, res) {
  console.log('select a role');
  var roleSelected = req.session.data['role'];
  console.log('role: ' + roleSelected);
  res.redirect('/v5/patient/search')
})

router.post('/search-v2/', function (req, res) {
    
  var nhsNumber = req.session.data['searchnhs']
  // 3816158897 - invited
  // 6170211547 - routine
  // 7594384164 - colposcopy

  if (nhsNumber == "3816158897") {
      res.redirect('/sample-taker/v2/history')
  }

  if (nhsNumber == "6170211547") {
      res.redirect('/sample-taker/v2/history-routine')
  }
  
  if (nhsNumber == "7594384164") {
      res.redirect('/sample-taker/v2/history-colposcopy')
  }

  console.log("not found")
  //res.render("sample-taker/search/index.html")

})


router.post('/search-v5/', function (req, res) {
    
  var nhsNumber = req.session.data['searchnhs']

  if (nhsNumber == "3816158897") {
      res.redirect('/v5/patient/screening-history')
  }

  if (nhsNumber == "6170211547") {
      res.redirect('/v5/patient/history-routine')
  }
  
  if (nhsNumber == "7594384164") {
      res.redirect('/v5/patient/history-colposcopy')
  }

  res.redirect('/v5/patient/screening-history')

})

module.exports = router;


// Branching example
