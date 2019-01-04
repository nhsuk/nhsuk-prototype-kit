// External dependencies
const express = require('express')
const router = express.Router()

// Local dependencies
const config = require('./config');

router.get('/', function(req, res) {
  res.render('index');
});

module.exports = router
