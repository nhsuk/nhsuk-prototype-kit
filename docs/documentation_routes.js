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

// Branching
router.post('/examples/branching/over-18-answer', function (req, res) {
  let over18 = req.session.data['over-18']

  if (over18 === 'false') {
    res.redirect('/docs/examples/branching/under-18')
  } else {
    res.redirect('/docs/examples/branching/over-18')
  }
})

module.exports = router;
