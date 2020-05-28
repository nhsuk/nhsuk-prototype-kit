
const express = require('express');
const routes = require('../routes.js');
const router = express.Router();
const patient = require('../data/patient.js');


function getVersion(a) {
    return a.url.substring(1, 3) || "v1";
}

router.get("/*/get-prior-notifications", function (req, res) {
    console.log('getting notifications')
    
    // need to do a check to get only the patients that have not been removed from the PNL

    //if (req.session.data["patients"] == undefined) {
        req.session.data["patients"] = patient.getPatients();
        var patients = patient.getPatients();
        req.session.data["patients"] = patients;
        //console.log(patients[0].first_name.toLowerCase())
    //}

    console.log(patients);
    //var patients = patient.getPatients();
    //req.session.data["patients"] = patients;
    //console.log(patients[0].first_name.toLowerCase())
    res.redirect("/" + getVersion(req) + "/prior-notification/prior-notification-9")
});

router.get("/*/get-prior-notifications-defer-reason*", function (req, res) {
    const params = new URLSearchParams(req.query);
    const nhsNumber = params.get('nhsNumber')
    //console.log(nhsNumber)

    var pnlPatient = patient.getPatient(nhsNumber);
    req.session.data["pnl_patient"] = pnlPatient;
    //console.log(pnlPatient)

    res.redirect("/" + getVersion(req) + "/prior-notification/prior-notification-9-defer-reason")
})

router.get("/*/get-prior-notifications-cease-reason*", function (req, res) {
    const params = new URLSearchParams(req.query);
    const nhsNumber = params.get('nhsNumber')
    //console.log(nhsNumber)

    var pnlPatient = patient.getPatient(nhsNumber);
    req.session.data["pnl_patient"] = pnlPatient;
    //console.log(pnlPatient)

    res.redirect("/" + getVersion(req) + "/prior-notification/prior-notification-9-cease-reason")
})
    
router.get("/*/prior-notification/prior-notification-9-deferred", function (req, res) {

    var nhsnumber = req.session.data['pnl_patient']['nhs_number'];


    patient.deferPatient(req.session.data['pnl_patient']['nhs_number'])

    res.redirect("/" + getVersion(req) + "/get-prior-notifications")
})

   

router.post("/*/prior-notification-8-check", function (req, res) {
    var invite = req.session.data["pnl-invite"];

    
    if (invite == "yes") {
        res.redirect(
            "/" +
            getVersion(req) +
            "/prior-notification/prior-notification-8-confirmation"
        );
    } else {
        res.redirect(
            "/" + getVersion(req) + "/prior-notification/prior-notification-8"
        );
    }
});

module.exports = router;
