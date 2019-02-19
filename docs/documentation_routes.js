// External dependencies
const express = require('express');
const router = express.Router();

// Documentation router
router.get('/', function(req , res){ 
  res.render('index');
});

// Install routing
router.post('/install', function (req, res) {
  let install = req.body.install;

  if (install === 'Simple') {
    res.redirect('/docs/install/simple')
  } if (install === 'Developer') {
    res.redirect('/docs/install/advanced')
  } else {
    res.redirect('/docs/install/download-zip')
  }
});

// Mac or Windows install
router.post('/install/mac', function (req, res) {
  let machine = req.body.machine;

  if (machine === 'Mac') {
    res.redirect('/docs/install/mac/terminal')
  } else {
    res.redirect('/docs/install/windows/terminal')
  }
});

module.exports = router;
