// External dependencies
const express = require('express');

const router = express.Router();

router.post("/", (request, response) => {
    const incomingAge = request.session.data.age;
    if (incomingAge < 16) {
        response.redirect("/fail");
    } else { 
        response.redirect("/choose-event");
    }
});

router.post("/choose-event", (request, response) => {
    const chosenNight = request.session.data.nightselection;
    switch (chosenNight) {
        case 'thursday':
            response.redirect("/event-details/thursday");
                break;
        case 'friday':
            response.redirect("/event-details/friday");
                break;
      }
});

module.exports = router;
