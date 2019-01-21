// External dependencies
const express = require('express');
const router = express.Router();

// Documentation router
router.get('/', function(req , res){ 
  res.render('index');
});

// Passing data example
router.get('/examples/passing-data', function (req, res) {
  res.render('examples/passing-data/index', {'message' : 'Hello world'});
});

// Branching example
router.post('/examples/branching/answer', function (req, res) {
  let nhsNumber = req.body.nhsNumber;

  if (nhsNumber === 'Yes') {
    res.redirect('/docs/examples/branching/answer-yes')
  } else {
    res.redirect('/docs/examples/branching/answer-no')
  }
});

module.exports = router;
