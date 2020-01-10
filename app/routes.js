// External dependencies
const express = require('express');
const router = express.Router();

// Add your routes here - above the module.exports line

module.exports = router;


// Branching example
router.post('/search-v2/', function (req, res) {
    
    var nhsNumber = req.session.data['searchnhs']
    // 3816158897 - invited
    // 6170211547 - routine
    // 7594384164 - colposcopy

    if (nhsNumber == "3816158897") {
        res.redirect('/sample-taker/v2/history')
    }

    if (nhsNumber == "6170211547") {
        res.redirect('/sample-taker/v2/history-routine')
    }
    
    if (nhsNumber == "7594384164") {
        res.redirect('/sample-taker/v2/history-colposcopy')
    }

    console.log("not found")
    //res.render("sample-taker/search/index.html")
  
  })