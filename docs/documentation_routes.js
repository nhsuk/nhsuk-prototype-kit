// External dependencies
const express = require('express');
const packageJson = require('../package.json');

const router = express.Router();

// Documentation router
router.get('/', (req, res) => {
  res.render('index');
});

// Install guide branching
router.post('/install', (req, res) => {
  const { install } = req.session.data;

  if (install === 'Simple') {
    res.redirect('/docs/install/simple');
  }
  if (install === 'Developer') {
    res.redirect('/docs/install/advanced');
  } else {
    res.redirect('/docs/install/download-zip');
  }
});

// Install - Mac or Windows branching
router.post('/install/mac', (req, res) => {
  const { machine } = req.session.data;

  if (machine === 'Mac') {
    res.redirect('/docs/install/mac/terminal');
  } else {
    res.redirect('/docs/install/windows/terminal');
  }
});

router.get('/download', (req, res) => {
  const { version } = packageJson;
  res.redirect(
    `https://github.com/nhsuk/nhsuk-prototype-kit/archive/refs/tags/v${version}.zip`,
  );
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
