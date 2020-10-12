// External dependencies
const express = require("express");
const router = express.Router();
const patient = require('./data/patient.js');
const gpInfo = require('./data/gp-info.js');

/* ---------------------------------------- */
/* ----------------ROUTES------------------ */
/* ---------------------------------------- */
router.use("/", require('./routes/pnl.js'))
/* ---------------------------------------- */
/* ---------------------------------------- */
/* ---------------------------------------- */

// This cheeky function just grabs the first part of the url after the first forward slash
// It will return just the 'v1' or 'v5' depending on what is passed to it
// This means there is no need for duplicate code for each iteration
// oh and it only works up to to v9
function getVersion(a) {
  var secondBracket = a.url.indexOf('/', 1);
  return a.url.substring(1, secondBracket) || "v1";
}

router.post("/*/patient/change-due-date/change", function(req, res) {
  var reason = req.session.data["reason"];
  // Check whether the variable matches a condition
  if (
    reason == "No cervix" ||
    reason == "Cease - Patient choice" ||
    reason == "Mental capacity act" ||
    reason == "Receiving radiotherapy" ||
    reason == "Aged over 65" ||
    reason == "Patient choice" ||
    reason == "Cease - Other reason"
  ) {
    // Send user to next page
    res.redirect("/" + getVersion(req) + "/patient/change-due-date/enter-reason-check-cease");
  } else {
    // Send user to ineligible page
    res.redirect("/" + getVersion(req) + "/patient/change-due-date/enter-test-date"
    );
  }
});

router.post("/csass/add-test-result/v2/change", function(req, res) {
  var reason = req.session.data["change-due-date"];
  if (reason == "Defer") {
    res.redirect("/archive/csass/add-test-result/v2/defer");
  } else {
    res.redirect("/archive/csass/add-test-result/v2/cease");
  }
});

router.post("/csass/add-test-result/v1/change", function(req, res) {
  var reason = req.session.data["change-due-date"];
  if (reason == "Defer") {
    res.redirect("/archive/csass/add-test-result/v1/defer");
  } else {
    res.redirect("/archive/csass/add-test-result/v1/cease");
  }
});

router.post("/*/hmr101/choose", function(req, res) {
  var reason = req.session.data["choose"];
  console.log(reason);
  if (reason == "print") {
    res.redirect("/" + getVersion(req) + "/patient/hmr101/preview");
  } else {
    if (getVersion(req) == 'v8') {
      res.redirect("/" + getVersion(req) + "/patient/hmr101/confirm-address");
    } else {
      res.redirect("/" + getVersion(req) + "/patient/hmr101/confirm-address");
    }
  }
});

router.post("/*/hmr101/episode-address", function(req, res) {
  var reason = req.session.data["episode-address"];
  console.log(reason);
  if (reason == "new") {
    res.redirect("/" + getVersion(req) + "/patient/hmr101/postcode-lookup");
  } else {
    res.redirect("/" + getVersion(req) + "/patient/hmr101/step-1");
  }
});

router.post("/*/hmr101/confirm-address", function (req, res) {
  console.log('working')
  var confirmAddress = req.session.data["confirmAddress"];

  console.log("check reason: " + confirmAddress);
  if (confirmAddress == "yes") {
    res.redirect("/" + getVersion(req) + "/patient/hmr101/step-1");
  }

  if (confirmAddress == "no") {
      res.redirect("/" + getVersion(req) + "/patient/hmr101/episode-address");
  }
});

router.post("/*/hmr101/cervix", function(req, res) {
  var reason = req.session.data["cervix"];
  console.log(reason);
  if (reason == "cervix") {
    res.redirect("/" + getVersion(req) + "/patient/hmr101/address");
  } else {
    res.redirect("/" + getVersion(req) + "/patient/hmr101/address");
  }
});

router.post("/*/change-due-date", function(req, res) {
  if (req.session.data["recall"] == "defer") {
    res.redirect("/" + getVersion(req) + "/patient/patient-summary-deferred");
  }

  if (req.session.data["recall"] == "cease") {
    res.redirect("/" + getVersion(req) + "/patient/patient-summary-ceased");
  }

  res.redirect("/" + getVersion(req) + "/patient/patient-summary-deferred");
});

router.post("/*/enter-test-result", function (req, res) {
  req.session.data["pnl_update_msg_show"] = 0;
  var testType = req.session.data['result-type'];
  if (testType == "Abroad") {
    res.redirect("/" + getVersion(req) + "/patient/add-test-result/add-test-result-test-info");
  }

  res.redirect("/" + getVersion(req) + "/patient/add-test-result/add-test-result-details");
});

router.post("/search-v2/", function (req, res) {
  var nhsNumber = req.session.data["searchnhs"];

  if (nhsNumber == "3816158897") {
    res.redirect("/archive/sample-taker/v2/history");
  }
  if (nhsNumber == "6170211547") {
    res.redirect("/archive/sample-taker/v2/history-routine");
  }
  if (nhsNumber == "7594384164") {
    res.redirect("/archive/sample-taker/v2/history-colposcopy");
  }
  console.log("not found");
});

router.post("/*/patient/search/search", function(req, res) {
  var nhsNumber = req.session.data["searchnhs"];
  req.session.data["addresult_update_msg_show"] = 0;
  if (getVersion(req) == 'v9' || 'v10' || 'v11') {
    console.log('try to get the patient out of the database')
    const patientSummary = patient.getPatient(nhsNumber);
    req.session.data['patientSummary'] = patientSummary;
    //console.log(patientSummary);
  }
  else {
    if (nhsNumber == "6170211547") {
      req.session.data["nhsNumber"] = "617 021 1547";
      req.session.data["title"] = "Miss";
      req.session.data["firstName"] = "Josie";
      req.session.data["lastName"] = "Jackson";
      req.session.data["dob"] = "29 years (4 June 1991)";
      req.session.data["ntdd"] = "09 04 2025";
      req.session.data["reason"] = "";
      req.session.data["status"] = "ROUTINE";
      req.session.data["address"] = "19 Polly Fall Close, Bradford, BD10 3RT";
      res.redirect("/" + getVersion(req) + "/patient/patient-summary");
    }

    // Referred to colposcopy - Recall is 6 months away
    if (nhsNumber == "7594384164") {
      req.session.data["nhsNumber"] = "759 438 4164";
      req.session.data["title"] = "Mrs";
      req.session.data["firstName"] = "Francesca";
      req.session.data["lastName"] = "Williams";
      req.session.data["dob"] = "40 years (15 Dec 1979)";
      req.session.data["ntdd"] = "09 04 2020";
      req.session.data["reason"] = "";
      req.session.data["status"] = "REFERRED TO COLPOSCOPY";
      req.session.data["address"] = "19 Polly Fall Close, Bradford, BD10 3RT";
      res.redirect("/" + getVersion(req) + "/patient/patient-summary");
    }

    // Ceased
    if (nhsNumber == "3816158897") {
      req.session.data["nhsNumber"] = "381 615 8897";
      req.session.data["title"] = "Mrs";
      req.session.data["firstName"] = "Francesca";
      req.session.data["lastName"] = "Williams";
      req.session.data["dob"] = "40 years (15 Dec 1979)";
      req.session.data["ntdd"] = "09 04 2020";
      req.session.data["status"] = "ceased";
      req.session.data["reason"] = "no cervix";
      req.session.data["address"] = "19 Polly Fall Close, Bradford, BD10 3RT";
      req.session.data["alreadyCeased"] = true;
      res.redirect("/" + getVersion(req) + "/patient/patient-summary");
    }
  }

  const patVersion = req.session.data["patversion"];

  if (patVersion >= '2') {
    res.redirect("/" + getVersion(req) + "/patient/patient-summary-" + patVersion);
  } else {
    res.redirect("/" + getVersion(req) + "/patient/patient-summary");
  }

});

router.post("/*/prior-notification-4-check", function (req, res) {
  var invite = req.session.data["pnl-invite"];

  if (invite == "yes") {
    res.redirect(
      "/" +
        getVersion(req) +
        "/prior-notification/prior-notification-4-confirmation"
    );
  } else {
    res.redirect(
      "/" + getVersion(req) + "/prior-notification/prior-notification-4"
    );
  }
});

router.post("/*/prior-notification-6-check", function (req, res) {
  var invite = req.session.data["pnl-invite"];

  if (invite == "yes") {
    res.redirect(
      "/" +
      getVersion(req) +
      "/prior-notification/prior-notification-6-confirmation"
    );
  } else {
    res.redirect(
      "/" + getVersion(req) + "/prior-notification/prior-notification-6"
    );
  }
});


// v8/non-responder/example"
router.post("/v8/non-responder/example", function (req, res) {
  console.log ('checking age!!')
var age = req.session.data['age'];

if (age == 'yes') {
  res.redirect("/v8/non-responder/yes");
}

if (age == 'no') {
  res.redirect("/v8/non-responder/no");
}
  //  default action if nothing selected

})


router.post("/*/add-test-result", function (req, res) {
  console.log('ADDING-TEST-RESULT');
  req.session.data["addresult_update_msg_show"] = "2";
  res.redirect("/" + getVersion(req) + "/patient/patient-summary-4");
})







module.exports = router;
