const express = require('express');
const routes = require('../routes.js');
const router = express.Router();
const patient = require('../data/patient.js');

function getVersion(a) {
    return a.url.substring(1, 3) || "v1";
}

function getNotificationVersion(a) {
    var url = a.url;
    return url.substring((url.lastIndexOf('-') + 1), url.length) || "10";
}

router.get("/*/get-non-responder-notifications*", function (req, res) {
    console.log("GETTING NRL NOTIFICATIONS");

    
    if ((req.session.data["pnl_update_msg_show"] >= 1) ) {
        if (req.session.data["pnl_update_msg_show"] >= 2) {
            req.session.data["pnl_update_msg"] = ""
            req.session.data["pnl_update_msg_show"] = 0;
        }
        req.session.data["pnl_update_msg_show"]++;
    }
    
    req.session.data["nrl_patients"] = patient.getPatients("nrl");
    var patients = patient.getPatients("nrl");
    req.session.data["_nrl_patients"] = patients;
    res.redirect("/" + getVersion(req) + "/non-responder/non-responder-" + getNotificationVersion(req))
});

router.get("/*/get-prior-notifications*", function (req, res) {
    console.log("GETTING PNL NOTIFICATIONS");
    console.log(req.url)
    if ((req.session.data["pnl_update_msg_show"] >= 1)) {

        if (req.session.data["pnl_update_msg_show"] >= 2) {
            req.session.data["pnl_update_msg"] = ""
            req.session.data["pnl_update_msg_show"] = 0;
        }
        req.session.data["pnl_update_msg_show"]++;
    }

    req.session.data["patients"] = patient.getPatients("pnl");
    var patients = patient.getPatients("pnl");
    req.session.data["patients"] = patients;

    res.redirect("/" + getVersion(req) + "/prior-notification/prior-notification-" + getNotificationVersion(req))
});

router.get("/*/start-prior-notifications-defer-reason*", function (req, res) {
    console.log("DEFERING PATIENT");
    const params = new URLSearchParams(req.query);
    const nhsNumber = params.get('nhsNumber');
    const version = params.get('pnlversion');
    req.session.data["pnlversion"] = version;
    var pnlPatient = patient.getPatient(nhsNumber);
    req.session.data["pnl_patient"] = pnlPatient;
    res.redirect("/" + getVersion(req) + "/prior-notification/prior-notification-"+ version + "-defer-reason")
})

router.get("/*/start-prior-notifications-cease-reason*", function (req, res) {
    console.log("CEASING PATIENT");
    const params = new URLSearchParams(req.query);
    const nhsNumber = params.get('nhsNumber');
    const version = params.get('pnlversion');
    req.session.data["pnlversion"] = version;
    var pnlPatient = patient.getPatient(nhsNumber);
    req.session.data["pnl_patient"] = pnlPatient;

    res.redirect("/" + getVersion(req) + "/prior-notification/prior-notification-" + version + "-cease-reason")
})

router.get("/*/start-prior-notifications-invite*", function (req, res) {
    console.log("INVITING PATIENT");
    const params = new URLSearchParams(req.query);
    const nhsNumber = params.get('nhsNumber');
    const version = params.get('pnlversion');
    req.session.data["pnlversion"] = version;
    var pnlPatient = patient.getPatient(nhsNumber);
    req.session.data["pnl_patient"] = pnlPatient;
    res.redirect("/" + getVersion(req) + "/prior-notification/prior-notification-" + version + "-invite")
})
    
router.get("/*/prior-notification/prior-notification-invited-*", function (req, res) {
    console.log("INVITE SUBMITTED");
    patient.deferPatient(req.session.data['pnl_patient']['nhs_number'])
    req.session.data["pnl_update_msg"] = "Patient has been Invited"
    req.session.data["pnl_update_msg_show"] = 1;

    const version = req.session.data["pnlversion"];
    
    res.redirect("/" + getVersion(req) + "/get-prior-notifications-" + version )
})

router.get("/*/prior-notification/prior-notification-9-deferred", function (req, res) {
    console.log("DEFER SUBMITTED");
    patient.deferPatient(req.session.data['pnl_patient']['nhs_number'])
    req.session.data["pnl_update_msg"] = "Patient has been deferred"
    req.session.data["pnl_update_msg_show"] = 1;
    res.redirect("/" + getVersion(req) + "/get-prior-notifications-" + getVersion(req).substring(1))
})

router.get("/*/prior-notification/prior-notification-9-ceased", function (req, res) {
    console.log("CEASE SUBMITTED");
    patient.ceasePatient(req.session.data['pnl_patient']['nhs_number'])
    req.session.data["pnl_update_msg"] = "Patient has been ceased"
    req.session.data["pnl_update_msg_show"] = 1;
    res.redirect("/" + getVersion(req) + "/get-prior-notifications-" + getVersion(req).substring(1))
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
