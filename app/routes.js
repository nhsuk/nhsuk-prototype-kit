// External dependencies
const express = require('express')
const router = express.Router()

// Local dependencies
const config = require('./config');

//router.get('/example', function(req, res) {
// res.render('example');
//});

router.get('/example', function (req, res) {
  res.render('example', {'message' : 'Hello world'});
});

module.exports = router
