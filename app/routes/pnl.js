const express = require('express');
const routes = require('../routes.js');
const router = express.Router();
const patient = require('../data/patient.js');
const moment = require('moment');

function getVersion(a) {
    return a.url.substring(1, 3) || "v1";
}

function getNotificationVersion(a) {
    var url = a.url;
    return url.substring((url.lastIndexOf('-') + 1), url.length) || "10";
}

router.get("/*/get-non-responder-notifications*", function (req, res) {
    //console.log("GETTING NRL NOTIFICATIONS");

    
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
    //console.log("GETTING PNL NOTIFICATIONS");
    //console.log(req.url)
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
    //console.log("DEFERING PATIENT");
    const params = new URLSearchParams(req.query);
    const nhsNumber = params.get('nhsNumber');
    const version = params.get('pnlversion');
    req.session.data["pnlversion"] = version;
    var pnlPatient = patient.getPatient(nhsNumber);
    req.session.data["pnl_patient"] = pnlPatient;
    res.redirect("/" + getVersion(req) + "/prior-notification/prior-notification-"+ version + "-defer-reason")
})

router.get("/*/start-prior-notifications-cease-reason*", function (req, res) {
    //console.log("CEASING PATIENT");
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
    //console.log("INVITE SUBMITTED");
    patient.deferPatient(req.session.data['pnl_patient']['nhs_number'])
    req.session.data["pnl_update_msg"] = "Patient has been Invited"
    req.session.data["pnl_update_msg_show"] = 1;

    const version = req.session.data["pnlversion"];
    
    res.redirect("/" + getVersion(req) + "/get-prior-notifications-" + version )
})

router.get("/*/prior-notification/prior-notification-deferred-*", function (req, res) {
    console.log("DEFER SUBMITTED");
    const reason = req.session.data['pnl-defer-reason'];
    const nhsNumber = req.session.data['pnl_patient']['nhs_number'];
    const length = req.session.data['defer-length'] || 0;

    // set the ntdd and edd as null and only set if they are valid and supplied
    var ntdd = null;
    var edd = null;

    console.log("-----------------");
    console.log("ntdd-year: " + req.session.data['ntdd-year']);
    console.log(" edd-year: " + req.session.data['edd-year']);
    console.log(" store: " + req.session.data['stored-ntdd'])
    console.log("-----------------");

    if (req.session.data['stored-ntdd'] == undefined) {
        console.log('setting the prev ntdd')
        req.session.data['stored-ntdd'] = moment(req.session.data['patientSummary']['next_test_due_date']).format("DD-MMM-YYYY");
    }

    var prev = req.session.data['stored-ntdd'];

    if (req.session.data['ntdd-year'] != undefined && req.session.data['ntdd-year'] != '') {
       //  NTDD ENTERED
         ntdd = req.session.data['ntdd-year'] + "-" + req.session.data['ntdd-month'] + "-" + req.session.data['ntdd-day'];
         edd = null;
   }
    if (req.session.data['edd-year'] != undefined && req.session.data['edd-year'] != '') {
        // EDD ENTERED
         edd = req.session.data['edd-year'] + "-" + req.session.data['edd-month'] + "-" + req.session.data['edd-day'];
         ntdd = null;
    } 


    patient.deferPatient(nhsNumber, reason, length, ntdd, edd, prev)
    
    const version = req.session.data["pnlversion"];
    req.session.data["pnl_update_msg"] = "Patient has been deferred"
    req.session.data["pnl_update_msg_show"] = 1;

    if (req.session.data['role'] == 'csas') {
        if ((req.session.data["pnl_update_msg_show"] >= 1)) {
            if (req.session.data["pnl_update_msg_show"] >= 2) {
                req.session.data["pnl_update_msg"] = ""
                req.session.data["pnl_update_msg_show"] = 0;
            }
            req.session.data["pnl_update_msg_show"]++;
        }
        const patientSummary = patient.getPatient(nhsNumber);
        req.session.data['patientSummary'] = patientSummary;
        //console.log(patientSummary)
        res.redirect("/" + getVersion(req) + "/patient/patient-summary")
    } else {
        res.redirect("/" + getVersion(req) + "/get-prior-notifications-" + version)
    }
    
})

router.get("/*/prior-notification/prior-notification-ceased-*", function (req, res) {
    //console.log("CEASE SUBMITTED");
    const reason = req.session.data['pnl-cease-reason'];
    const nhsNumber = req.session.data['pnl_patient']['nhs_number'];
    patient.ceasePatient(nhsNumber, reason)
    const version = req.session.data["pnlversion"];
    req.session.data["pnl_update_msg"] = "Patient has been ceased"
    req.session.data["pnl_update_msg_show"] = 1;

    if (req.session.data['role'] == 'csas') {
        if ((req.session.data["pnl_update_msg_show"] >= 1)) {
            if (req.session.data["pnl_update_msg_show"] >= 2) {
                req.session.data["pnl_update_msg"] = ""
                req.session.data["pnl_update_msg_show"] = 0;
            }
            req.session.data["pnl_update_msg_show"]++;
        }
        const patientSummary = patient.getPatient(nhsNumber);
        req.session.data['patientSummary'] = patientSummary;
        //console.log(patientSummary)
        res.redirect("/" + getVersion(req) + "/patient/patient-summary")
    } else {
        res.redirect("/" + getVersion(req) + "/get-prior-notifications-" + version)
    }    
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
    const version = req.session.data["pnlversion"];
    if (cease == "yes") {
        res.redirect("/" + getVersion(req) + "/prior-notification/prior-notification-" + version + "-cease-review")     
    } else {
        if (req.session.data['role'] == 'csas') {
            res.redirect("/" + getVersion(req) + "/patient/patient-summary");
        } else {
            res.redirect("/" + getVersion(req) + "/prior-notification/prior-notification-" + version);
        } 
    }
});

router.get("/*/reset-patient-data-*", function (req, res) {
    console.log("resetting")
    patient.resetPatients(req);
    req.session.data["pnl_update_msg"] = ""
    req.session.data["pnl_update_msg_show"] = 0;
    
    if (req.session.data['role'] == 'csas') {
        req.session.data['patientSummary']['next_test_due_date'] = req.session.data["store-ntdd"];
        //req.session.data['']
        req.session.data["store-ntdd"] = undefined;
        res.redirect("/" + getVersion(req) + "/patient/patient-summary");
    } else {
        res.redirect("/" + getVersion(req) + "/prior-notification/prior-notification-" + getNotificationVersion(req));
    }
    
})

/* CSAS FUNCTIONS */

router.get("/*/patient/change-due-date/choose-action*", function (req, res) {
    //console.log("CSAS CEASE AND DEFER");
    const action = req.session.data["ceasedefer"];
    //console.log("action: " + action)
    if (action == 'cease') {
        res.redirect("/" + getVersion(req) + "/prior-notification/prior-notification-10-cease-reason")
    }

    if (action == 'defer') {
        res.redirect("/" + getVersion(req) + "/prior-notification/prior-notification-10-defer-reason")
    }

    res.redirect("/" + getVersion(req) + "/prior-notification/prior-notification-10-defer-reason")
})

router.get("/*/start-csas-cease-defer*", function (req, res) {
    //console.log("CSAS CEASE AND DEFER");
    const params = new URLSearchParams(req.query);
    const nhsNumber = params.get('nhsNumber');
    const version = params.get('pnlversion');
    req.session.data["pnlversion"] = version;
    var pnlPatient = patient.getPatient(nhsNumber);
    req.session.data["pnl_patient"] = pnlPatient;
    req.session.data['ntdd-year'] = null
    req.session.data['edd-year'] = null
    res.redirect("/" + getVersion(req) + "/patient/change-due-date/enter-action-1")
})


router.get("/*/patient/patient-reinstated*", function (req, res) {
    //console.log("REINSTATED SUBMITTED");
    //const reason = req.session.data['pnl-cease-reason'];
    const nhsNumber = req.session.data['pnl_patient']['nhs_number'];
    patient.reinstatePatient(nhsNumber);
    //const version = req.session.data["pnlversion"];
    req.session.data["pnl_update_msg"] = "Patient has been reinstated"
    req.session.data["pnl_update_msg_show"] = 1;

    
    if ((req.session.data["pnl_update_msg_show"] >= 1)) {
        if (req.session.data["pnl_update_msg_show"] >= 2) {
            req.session.data["pnl_update_msg"] = ""
            req.session.data["pnl_update_msg_show"] = 0;
        }
        req.session.data["pnl_update_msg_show"]++;
    }
        
    const patientSummary = patient.getPatient(nhsNumber);
    req.session.data['patientSummary'] = patientSummary;
    //console.log(patientSummary)
    res.redirect("/" + getVersion(req) + "/patient/patient-summary")
    
})
//patient - reinstated

module.exports = router;
