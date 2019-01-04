const express = require('express')
const router = express.Router()

const config = require('./config');

router.get('/', function(req, res) {
  res.send(config.serviceName);
});

module.exports = router
