const express = require('express');
const routes = require('../routes.js');
const router = express.Router();
const patient = require('../data/patient.js');
const moment = require('moment');

function getVersion(a) {
    var secondBracket = a.url.indexOf('/', 1);
    return a.url.substring(1, secondBracket) || "v1";
}

function getNotificationVersion(a) {
    var url = a.url;
    return url.substring((url.lastIndexOf('-') + 1), url.length) || "10";
}

function getUpdatedPatients(req) {
    req.session.data["patients"] = patient.getPatients("pnl");
    var patients = patient.getPatients("pnl");
    req.session.data["patients"] = patients;

    req.session.data["nrl_patients"] = patient.getPatients("nrl");
    var patients = patient.getPatients("nrl");
    req.session.data["nrl_patients"] = patients;

    req.session.data["ceased_patients"] = patient.getPatients("ceased");
    var patients = patient.getPatients("ceased");
    req.session.data["ceased_patients"] = patients;
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

    getUpdatedPatients(req);
    
    //req.session.data["nrl_patients"] = patient.getPatients("nrl");
    //var patients = patient.getPatients("nrl");
    //req.session.data["nrl_patients"] = patients;
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

    //req.session.data["patients"] = patient.getPatients("pnl");
    //var patients = patient.getPatients("pnl");
    //req.session.data["patients"] = patients;
    getUpdatedPatients(req);
    

    res.redirect("/" + getVersion(req) + "/prior-notification/prior-notification-" + getNotificationVersion(req))
});

router.get("/*/get-ceased-notifications*", function (req, res) {
    console.log("GETTING CEASED NOTIFICATIONS");
    //console.log(req.url)
    if ((req.session.data["pnl_update_msg_show"] >= 1)) {

        if (req.session.data["pnl_update_msg_show"] >= 2) {
            req.session.data["pnl_update_msg"] = ""
            req.session.data["pnl_update_msg_show"] = 0;
        }
        req.session.data["pnl_update_msg_show"]++;
    }

    getUpdatedPatients(req);

   // req.session.data["ceased_patients"] = patient.getPatients("ceased");
   // var patients = patient.getPatients("ceased");
   // req.session.data["ceased_patients"] = patients;

    res.redirect("/" + getVersion(req) + "/non-responder/ceased-patients")
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

router.get("/*/start-prior-notifications-submit*", function (req, res) {
    console.log("SUBMITTING PATIENT");
    const params = new URLSearchParams(req.query);
    const nhsNumber = params.get('nhsNumber');
    const PNLversion = params.get('pnlversion');
    const NRLversion = params.get('nrlversion');
    const ceasedVersion = params.get('ceasedversion');
    req.session.data["pnlversion"] = PNLversion;
    req.session.data["nrlversion"] = NRLversion;
    req.session.data["ceasedversion"] = ceasedVersion;
    var nrlPatient = patient.getPatient(nhsNumber);
    req.session.data["pnl_patient"] = nrlPatient;
    if (ceasedVersion == "1"){
     res.redirect("/" + getVersion(req) + "/prior-notification/prior-notification-" + PNLversion + "-ceased-submit")
    } else {
     res.redirect("/" + getVersion(req) + "/prior-notification/prior-notification-" + PNLversion + "-submit")
    }
    
})
    
router.get("/*/prior-notification/prior-notification-invited-*", function (req, res) {
    //console.log("INVITE SUBMITTED");
    patient.deferPatient(req.session.data['pnl_patient']['nhs_number'])
    req.session.data["pnl_update_msg"] = "Patient is due to be invited"
    req.session.data["pnl_update_msg_show"] = 1;

    const version = req.session.data["pnlversion"];
    
    res.redirect("/" + getVersion(req) + "/get-prior-notifications-" + version )
})

router.get("/*/prior-notification/prior-notification-submitted-*", function (req, res) {
    //console.log("INVITE SUBMITTED");
    const version = req.session.data["nrlversion"];
    const ceasedVersion = req.session.data["ceasedversion"];
    const returnUrl = req.session.data["returnUrl"];

    patient.submitPatient(req.session.data['pnl_patient']['nhs_number'], returnUrl)
    req.session.data["pnl_update_msg"] = "Patient has been reviewed"
    req.session.data["pnl_update_msg_show"] = 1;

    if (returnUrl == "ceased") {
        res.redirect("/" + getVersion(req) + "/get-ceased-notifications-" + ceasedVersion)
    } else {
        res.redirect("/" + getVersion(req) + "/get-non-responder-notifications-" + version)
    }

    
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


    patient.deferPatient(nhsNumber, reason, length, ntdd, edd, prev, req.session.data['returnUrl'])
    
    const versionPNL = req.session.data["pnlversion"];
    const versionNRL = req.session.data["nrlversion"];
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
        const patVersion = req.session.data["patversion"];
        req.session.data['patientSummary'] = patientSummary;
        console.log("pat version: " + patVersion)
        if (patVersion >= 2) {
            res.redirect("/" + getVersion(req) + "/patient/patient-summary-" + patVersion)
        } else {
            res.redirect("/" + getVersion(req) + "/patient/patient-summary")
        }
    } else {
        console.log("return URL: " + req.session.data['returnUrl'])
        if (req.session.data['returnUrl'] == "nrl") {
            res.redirect("/" + getVersion(req) + "/get-non-responder-notifications-" + versionNRL)
        } else {
            res.redirect("/" + getVersion(req) + "/get-prior-notifications-" + versionPNL)
        }
    }
})

router.get("/*/prior-notification/prior-notification-ceased-*", function (req, res) {
    //console.log("CEASE SUBMITTED");
    const reason = req.session.data['pnl-cease-reason'];
    const nhsNumber = req.session.data['pnl_patient']['nhs_number'];
    patient.ceasePatient(nhsNumber, reason, req.session.data['returnUrl'])
    const PNLversion = req.session.data["pnlversion"];
    const NRLversion = req.session.data["nrlversion"];
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
        const patVersion = req.session.data["patversion"];
        req.session.data['patientSummary'] = patientSummary;
        //console.log(patientSummary)
        if (patVersion >= 2) {
            res.redirect("/" + getVersion(req) + "/patient/patient-summary-" + patVersion)
        } else {
            res.redirect("/" + getVersion(req) + "/patient/patient-summary")
        }
    } else {
        if (req.session.data['returnUrl'] == 'nrl') {
            res.redirect("/" + getVersion(req) + "/get-non-responder-notifications-" + NRLversion)
        } else {
            res.redirect("/" + getVersion(req) + "/get-prior-notifications-" + PNLversion)
        }
        
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
    const params = new URLSearchParams(req.query);
    const returnUrl = params.get('returnUrl');
    req.session.data["pnl_update_msg"] = ""
    req.session.data["pnl_update_msg_show"] = 0;
    
    if (req.session.data['role'] == 'csas') {
        req.session.data = {}
        res.redirect('/v9/patient/search/search?role=csas&patversion=2&pnlversion=10')
    } else {
        req.session.data = {}
        if (returnUrl == "ceased") {
            res.redirect("/" + getVersion(req) + "/get-ceased-notifications-1");
        } else {
            res.redirect("/" + getVersion(req) + "/prior-notification/prior-notification-" + getNotificationVersion(req));
        }
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
    console.log("REINSTATED SUBMITTED");
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
    
    const patVersion = req.session.data["patversion"];
    if (patVersion >= 2) {
        res.redirect("/" + getVersion(req) + "/patient/patient-summary-" + patVersion)
    } else {
        res.redirect("/" + getVersion(req) + "/patient/patient-summary")
    }
    //console.log(patientSummary)
    res.redirect("/" + getVersion(req) + "/patient/patient-summary")
    
})
//patient - reinstated

module.exports = router;

router.get('/*/prior-notification/delete-email', function (req, res) {
    //const params = new URLSearchParams(req.query);
    const version = req.session.data['pnlversion'];
    req.session.data['manageEmail'] = null;
    req.session.data['notificationsPNL'] = null;
    req.session.data['notificationsNRL'] = null;
    res.redirect("/" + getVersion(req) + "/prior-notification/prior-notification-" + version + "-manage")
})
