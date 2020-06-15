const express = require('express');
const routes = require('../routes.js');
const router = express.Router();
const patient = require('../data/patient.js');

function getVersion(a) {
    return a.url.substring(1, 3) || "v1";
}

function getPNLVersion(a) {
    var url = a.url;
    //console.log(url)
    //console.log("last index of: " + url.lastIndexOf('-'));
    //console.log("url length: " + url.length)

    //console.log("substrong: " + url.substring((url.lastIndexOf('-') + 1), url.length))
    return url.substring((url.lastIndexOf('-') + 1), url.length) || "10" //a.url.substring(1, 3) || "v1";
}

router.get("/*/get-prior-notifications*", function (req, res) {

    if ((req.session.data["pnl_update_msg_show"] >= 1) ) {

        if (req.session.data["pnl_update_msg_show"] >= 2) {
            req.session.data["pnl_update_msg"] = ""
            req.session.data["pnl_update_msg_show"] = 0;
        }

        req.session.data["pnl_update_msg_show"]++;
    }
    
    req.session.data["patients"] = patient.getPatients();
    var patients = patient.getPatients();
    req.session.data["patients"] = patients;

    //getPNLVersion(req);
    res.redirect("/" + getVersion(req) + "/prior-notification/prior-notification-" + getPNLVersion(req))
});

router.get("/*/get-prior-notifications-defer-reason*", function (req, res) {
    const params = new URLSearchParams(req.query);
    const nhsNumber = params.get('nhsNumber')
    var pnlPatient = patient.getPatient(nhsNumber);
    req.session.data["pnl_patient"] = pnlPatient;
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
    patient.deferPatient(req.session.data['pnl_patient']['nhs_number'])
    req.session.data["pnl_update_msg"] = "Patient has been Invited"
    req.session.data["pnl_update_msg_show"] = 1;
    res.redirect("/" + getVersion(req) + "/get-prior-notifications")
})

router.get("/*/prior-notification/prior-notification-9-deferred", function (req, res) {
    patient.deferPatient(req.session.data['pnl_patient']['nhs_number'])
    req.session.data["pnl_update_msg"] = "Patient has been deferred"
    req.session.data["pnl_update_msg_show"] = 1;
    res.redirect("/" + getVersion(req) + "/get-prior-notifications")
})



router.get("/*/prior-notification/prior-notification-9-ceased", function (req, res) {
    patient.ceasePatient(req.session.data['pnl_patient']['nhs_number'])
    req.session.data["pnl_update_msg"] = "Patient has been ceased"
    req.session.data["pnl_update_msg_show"] = 1;
    res.redirect("/" + getVersion(req) + "/get-prior-notifications")
})

   

router.post("/*/prior-notification-8-check", function (req, res) {
    var invite = req.session.data["pnl-invite"];
    if (invite == "yes") {
        res.redirect("/" + getVersion(req) + "/prior-notification/prior-notification-8-confirmation");
    } else {
        res.redirect("/" + getVersion(req) + "/prior-notification/prior-notification-8");
    }
});

router.post("/*/patient-cease-confirm", function (req, res) {
    var cease = req.session.data["pnl-cease"];
    if (cease == "yes") {
        res.redirect("/" + getVersion(req) + "/prior-notification/prior-notification-9-cease-review")     
    } else {
        res.redirect("/" + getVersion(req) + "/prior-notification/prior-notification-9");
    }
});

router.get("/*/reset-patient-data", function (req, res) {
    patient.resetPatients(req);
    req.session.data["pnl_update_msg"] = ""
    req.session.data["pnl_update_msg_show"] = 0;
    res.redirect("/" + getVersion(req) + "/prior-notification/prior-notification-9")
})

module.exports = router;
