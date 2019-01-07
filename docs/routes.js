// External dependencies
const express = require('express')
const documentationApp = express()

documentationApp.get('/', function(req , res){ 
  console.log("hello");
  res.end();
});

module.exports = documentationRoutes
