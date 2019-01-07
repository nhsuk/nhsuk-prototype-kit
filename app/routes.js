// External dependencies
const express = require('express')
const router = express.Router()

// Local dependencies
const config = require('./config');

//router.get('/example', function(req, res) {
// res.render('example');
//});

router.get('/test', function (req, res) {
  res.render('test', {'message' : 'Test message'});
});

module.exports = router
