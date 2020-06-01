
const express = require('express');
const routes = require('../routes.js');
const router = express.Router();
const patient = require('../data/patient.js');


function getVersion(a) {
    return a.url.substring(1, 3) || "v1";
}



router.get("/*/get-prior-notifications", function (req, res) {
    console.log('getting notifications')

    if ((req.session.data["pnl_update_msg_show"] >= 1) ) {

        // the message has been set to show

        if (req.session.data["pnl_update_msg_show"] >= 2) {
            // the message has already been shown, remove the message and reset the counter
            req.session.data["pnl_update_msg"] = ""
            req.session.data["pnl_update_msg_show"] = 0;
        }
        // fgfg
        // increment the counter
        req.session.data["pnl_update_msg_show"]++;
    }

    console.log(req.session.data["pnl_update_msg_show"])
    
        req.session.data["patients"] = patient.getPatients();
        var patients = patient.getPatients();
        req.session.data["patients"] = patients;
    console.log(patients);

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

    var pnlPatient = patient.getPatient(nhsNumber);
    req.session.data["pnl_patient"] = pnlPatient;

    res.redirect("/" + getVersion(req) + "/prior-notification/prior-notification-9-cease-reason")
})

router.get("/*/get-prior-notifications-invite*", function (req, res) {
    const params = new URLSearchParams(req.query);
    const nhsNumber = params.get('nhsNumber')

    var pnlPatient = patient.getPatient(nhsNumber);
    req.session.data["pnl_patient"] = pnlPatient;

    res.redirect("/" + getVersion(req) + "/prior-notification/prior-notification-9-invite")
})
    
router.get("/*/prior-notification/prior-notification-9-invited", function (req, res) {

    var nhsnumber = req.session.data['pnl_patient']['nhs_number'];

    patient.deferPatient(req.session.data['pnl_patient']['nhs_number'])

    req.session.data["pnl_update_msg"] = "Patient has been Invited"
    req.session.data["pnl_update_msg_show"] = 1;
    res.redirect("/" + getVersion(req) + "/get-prior-notifications")
})

router.get("/*/prior-notification/prior-notification-9-deferred", function (req, res) {

    var nhsnumber = req.session.data['pnl_patient']['nhs_number'];

    patient.deferPatient(req.session.data['pnl_patient']['nhs_number'])

    req.session.data["pnl_update_msg"] = "Patient has been deferred"
    req.session.data["pnl_update_msg_show"] = 1;
    res.redirect("/" + getVersion(req) + "/get-prior-notifications")
})



router.get("/*/prior-notification/prior-notification-9-ceased", function (req, res) {

    var nhsnumber = req.session.data['pnl_patient']['nhs_number'];
    patient.ceasePatient(req.session.data['pnl_patient']['nhs_number'])
    req.session.data["pnl_update_msg"] = "Patient has been ceased"
    req.session.data["pnl_update_msg_show"] = 1;
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
