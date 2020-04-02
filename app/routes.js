// External dependencies
const express = require("express");
const router = express.Router();

// This cheeky function just grabs the first part of the url after the first forward slash
// It will return just the 'v1' or 'v5' depending on what is passed to it
// This means there is no need for duplicate code for each iteration
// oh and it only works up to to v9
function getVersion(a) {
  return a.url.substring(1, 3) || "v1";
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
    res.redirect("/v7/patient/hmr101/preview");
  } else {
    res.redirect("/v7/patient/hmr101/code");
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

  res.redirect("/" + getVersion(req) + "/patient/patient-summary");
});

module.exports = router;
