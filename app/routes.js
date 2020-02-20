// External dependencies
const express = require('express');
const router = express.Router();

// Add your routes here - above the module.exports line

router.post('/v5/patient/change-due-date/change', function (req, res) {
  // Make a variable and give it the value from 'know-nhs-number'
  var reason = req.session.data['reason']
console.log(reason);
  // Check whether the variable matches a condition
  if ((reason == "No cervix") || (reason == "Cease - Patient choice")
   || (reason == "Mental capacity act") || (reason == "Receiving radiotherapy")
   || (reason == "Aged over 65") || (reason == "Patient choice")
  || (reason == "Cease - Other reason")){

    // Send user to next page
    res.redirect('/v5/patient/change-due-date/enter-reason-check-cease')
  }
  else {
    // Send user to ineligible page
    res.redirect('/v5/patient/change-due-date/enter-test-date')
  }
})


// NEXT
router.post('/v6/patient/change-due-date/change', function (req, res) {
  // Make a variable and give it the value from 'know-nhs-number'
  var reason = req.session.data['reason']
  // Check whether the variable matches a condition
  if ((reason == "No cervix") || (reason == "Cease - Patient choice")
   || (reason == "Mental capacity act") || (reason == "Receiving radiotherapy")
   || (reason == "Aged over 65") || (reason == "Patient choice")
  || (reason == "Cease - Other reason")){

    // Send user to next page
    res.redirect('/v6/patient/change-due-date/enter-reason-check-cease')
  }
  else {
    // Send user to ineligible page
    res.redirect('/v6/patient/change-due-date/enter-test-date')
  }
})

// CEASE / DEFER
router.post('/csass/add-test-result/v2/change', function (req, res) {
  // Make a variable and give it the value from 'know-nhs-number'
  var reason = req.session.data['change-due-date']

  // Check whether the variable matches a condition
  if (reason == "Defer"){
    // Send user to next page
    res.redirect('/archive/csass/add-test-result/v2/defer')
  }
  else {
    // Send user to ineligible page
    res.redirect('/archive/csass/add-test-result/v2/cease')
  }
})

router.post('/csass/add-test-result/v1/change', function (req, res) {
  // Make a variable and give it the value from 'know-nhs-number'
  var reason = req.session.data['change-due-date']

  // Check whether the variable matches a condition
  if (reason == "Defer"){
    // Send user to next page
    res.redirect('/archive/csass/add-test-result/v1/defer')
  }
  else {
    // Send user to ineligible page
    res.redirect('/archive/csass/add-test-result/v1/cease')
  }
})

router.post('/v5/login/role-select', function(req, res) {
  var roleSelected = req.session.data['role'];
  res.redirect('/v5/patient/search/search')
})

router.post('/v6/login/role-select', function(req, res) {
  var roleSelected = req.session.data['role'];
  res.redirect('/v6/patient/search/search')
})

// NEXT
router.post('/v5/change-due-date', function(req, res) {
  if (req.session.data['recall'] == 'defer') {
    res.redirect('/v5/patient/patient-summary-deferred')
  }

  if (req.session.data['recall'] == 'cease') {
    res.redirect('/v5/patient/patient-summary-ceased')
  }

  res.redirect('/v5/patient/patient-summary-deferred')
})
//NEXT
router.post('/v6/change-due-date', function(req, res) {
  if (req.session.data['recall'] == 'defer') {
    res.redirect('/v6/patient/patient-summary-deferred')
  }

  if (req.session.data['recall'] == 'cease') {
    res.redirect('/v6/patient/patient-summary-ceased')
  }

  res.redirect('/v6/patient/patient-summary-deferred')
})

//NEXT
router.post('/search-v2/', function (req, res) {
    var nhsNumber = req.session.data['searchnhs']

    if (nhsNumber == "3816158897") {
        res.redirect('/archive/sample-taker/v2/history')
    }
    if (nhsNumber == "6170211547") {
        res.redirect('/archive/sample-taker/v2/history-routine')
    }
    if (nhsNumber == "7594384164") {
        res.redirect('/archive/sample-taker/v2/history-colposcopy')
    }
    console.log("not found")
  })

 // lots of repeating code that needs sorting

  router.post('/search-v5/', function (req, res) {
    var nhsNumber = req.session.data['searchnhs']

    // Routine recall
    // Recall is 5 years away
    if (nhsNumber == "6170211547") {
      req.session.data['nhsNumber'] = '617 021 1547';
      req.session.data['title'] = 'Miss';
      req.session.data['firstName'] = 'Josie';
      req.session.data['lastName'] = 'Jackson';
      req.session.data['dob'] = '29 years (4 June 1991)';
      req.session.data['ntdd'] = '09 04 2025';
      req.session.data['status'] = 'ROUTINE';
      req.session.data['address'] = '19 Polly Fall Close, Bradford, BD10 3RT';
      res.redirect('/v5/patient/patient-summary')
    }

    // NOT USED
    if (nhsNumber == "3816158897") {
        res.redirect('/v5/patient/patient-summary')
    }

    // Referred to colposcopy
    // Recall is 6 months away
    if (nhsNumber == "7594384164") {
      req.session.data['nhsNumber'] = '759 438 4164';
      req.session.data['title'] = 'Mrs';
      req.session.data['firstName'] = 'Francesca';
      req.session.data['lastName'] = 'Williams';
      req.session.data['dob'] = '40 years (15 Dec 1979)';
      req.session.data['ntdd'] = '09 04 2020';
      req.session.data['status'] = 'REFERRED TO COLPOSCOPY';
      req.session.data['address'] = '19 Polly Fall Close, Bradford, BD10 3RT';
      res.redirect('/v5/patient/patient-summary')
    }

    res.redirect('/v5/patient/patient-summary')
  })

  router.post('/search-v6/', function (req, res) {
    var nhsNumber = req.session.data['searchnhs']

    // Routine recall
    // Recall is 5 years away
    if (nhsNumber == "6170211547") {
      req.session.data['nhsNumber'] = '617 021 1547';
      req.session.data['title'] = 'Miss';
      req.session.data['firstName'] = 'Josie';
      req.session.data['lastName'] = 'Jackson';
      req.session.data['dob'] = '29 years (4 June 1991)';
      req.session.data['ntdd'] = '09 04 2025';
      req.session.data['status'] = 'ROUTINE';
      req.session.data['address'] = '19 Polly Fall Close, Bradford, BD10 3RT';
      res.redirect('/v6/patient/patient-summary')
    }

    // NOT USED
    if (nhsNumber == "3816158897") {
        res.redirect('/v6/patient/patient-summary')
    }

    // Referred to colposcopy
    // Recall is 6 months away
    if (nhsNumber == "7594384164") {
      req.session.data['nhsNumber'] = '759 438 4164';
      req.session.data['title'] = 'Mrs';
      req.session.data['firstName'] = 'Francesca';
      req.session.data['lastName'] = 'Williams';
      req.session.data['dob'] = '40 years (15 Dec 1979)';
      req.session.data['ntdd'] = '09 04 2020';
      req.session.data['status'] = 'REFERRED TO COLPOSCOPY';
      req.session.data['address'] = '19 Polly Fall Close, Bradford, BD10 3RT';
      res.redirect('/v6/patient/patient-summary')
    }

    res.redirect('/v6/patient/patient-summary')
  })

  module.exports = router;
