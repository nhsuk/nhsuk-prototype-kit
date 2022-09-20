// External dependencies
const express = require('express');

const router = express.Router();
router.get("/newprototype", (request, response) => {
    response.send("LOL");
    })
// Add your routes here - above the module.exports line

module.exports = router;
