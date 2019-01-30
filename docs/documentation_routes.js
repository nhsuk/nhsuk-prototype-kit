// External dependencies
const express = require('express');
const router = express.Router();

// Documentation router
router.get('/', function(req , res){ 
  res.render('index');
});

// Mac or Windows install
router.post('/install/mac', function (req, res) {
  let machine = req.body.machine;

  if (machine === 'Mac') {
    res.redirect('/docs/install/mac/requirements')
  } else {
    res.redirect('/docs/install/windows/requirements')
  }
});

module.exports = router;
