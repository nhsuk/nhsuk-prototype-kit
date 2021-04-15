const results = require('./result.js');
//const filters = require('~/filters.js');
const moment = require('moment');

/*
9991023867
9100001694
9100001384
9100002801
9100001899
9100001287
9100002798
9100001929
9100001740
*/

var patients = [
    {
        "address": {
            "address_line_1": "52 HOLLY MEWS",
            "address_line_2": "TOWNSVILLE",
            "postcode": "LS20 8QF"
        },
        "ceased_type": "Abnormal Follow-up",
        "date_of_birth": "1958-10-28",
        "date_of_birth_and_initial": "1958-10-28D",
        "date_of_birth_and_initial_and_postcode": "1958-10-28DLS208QF",
        "first_name": "ELLA",
        "gender": "0",
        "is_ceased": false,
        "last_name": "DEPETRIS",
        "migrated_1C_data": {
            "received": "2020-05-28T08:07:09.356",
            "value": "GG|9991023867|20200711|C|C|6|Y|N||lorem ipsum etc. etc. Continue until we get to 60 characters|lorem ipsum etc. etc. Continue until we get to 60 characters|lorem ipsum etc. etc. Continue until we get to 60 characters|L1|19880707"
        },
        "migrated_CSO1R": {
            "received": "2020-05-27T15:30:53.836",
            "validation_errors": {
                "GENDER": {
                    "data_error": "Gender not one of the expected values: ['M', 'F', 'I']"
                },
                "LDN": {
                    "data_error": "LDN not one of the expected values: ['L1', 'L2', 'L9', 'D1', 'D2', 'D9', 'N1', 'N2', 'N9']",
                    "schema_error": "LDN must be 2 characters long"
                }
            },
            "value": "NF|9991023867|19581028|1|20190313|L|S564|C86003||||MISS|DEPETRIS|CURRY||52 HOLLY MEWS|TOWNSVILLE||||LS20 8QF"
        },
        "next_test_due_date": moment().add(8, "weeks"),
        "nrl_review_date": moment().add(8, "weeks"),
        "nhs_number": "9991023867",
        "nrl": true,
        "participant_id": "5f03f444-8452-4e4f-8f24-03d30fefed55",
        "pnl": true,
        "pnl_action": "Ceased",
        "pnl_reason": "Patient informed choice",
        "registered_gp_practice_code": "C86003",
        "results" : [],
        "sanitised_first_name": "CURRY",
        "sanitised_last_name": "DEPETRIS",
        "sanitised_nhs_number": "9991023867",
        "sanitised_postcode": "LS208QF",
        "sort_key": "PARTICIPANT",
        "status": "Cancelled",
        "title": "MISS"
    },
    {
        "address": {
            "address_line_2": "14 Huntley Place",
            "address_line_3": "South Zeal",
            "address_line_4": "EXETER",
            "address_line_5": "Devon",
            "postcode": "EX2 5SE"
        },
        "ceased_type": "Registered ceased",
        "date_of_birth": "1979-12-23",
        "date_of_birth_and_initial": "1949-12-23C",
        "date_of_birth_and_initial_and_postcode": "1949-12-23CEX25SE",
        "first_name": "Judith",
        "gender": "2",
        "is_ceased": true,
        "last_name": "Cunningham",
        "middle_names": "May",
        "migrated_1C_data": {
            "received": "2020-05-28T16:33:38.695",
            "value": "SUN|9100001694|20110516|C|C|1|N|C|SUN||||D1|19900530"
        },
        "migrated_CSO1R": {
            "received": "2020-05-28T16:30:20.619",
            "value": "SUN|9100001694|19491223|F|19900530|D1|S4365|L83665|D|20150422||Ms|Cunningham|Judith|May||14 Huntley Place|South Zeal|EXETER|Devon|EX2 5SE"
        },
        "next_test_due_date": moment().add(10, "weeks"),
        "nrl_review_date": moment().add(4, "weeks"),
        "nhs_number": "9100001694",
        "nrl": true,
        "participant_id": "239ca055-3160-47c2-a8c0-f91558c72e6c",
        "pnl": true,
        "pnl_action": "Ceased",
        "pnl_reason": "No cervix",
        "registered_gp_practice_code": "L83665",
        "results" : [],
        "sanitised_first_name": "JUDITH",
        "sanitised_last_name": "CUNNINGHAM",
        "sanitised_nhs_number": "9100001694",
        "sanitised_postcode": "EX25SE",
        "sort_key": "PARTICIPANT",
        "status": "Cancelled",
        "title": "Ms"
    },
    {
        "address": {
            "address_line_2": "15 Clovelly Road",
            "address_line_3": "Moretonhampstead",
            "address_line_4": "EXETER",
            "address_line_5": "Devon",
            "postcode": "EX2 5SE"
        },
        "ceased_type": "Registered ceased",
        "date_of_birth": "1955-08-01",
        "date_of_birth_and_initial": "1952-08-01J",
        "date_of_birth_and_initial_and_postcode": "1952-08-01JEX25SE",
        "first_name": "Danielle",
        "gender": "2",
        "is_ceased": false,
        "last_name": "Jeffery",
        "migrated_1C_data": {
            "received": "2020-05-28T16:33:38.601",
            "value": "SOP|9100001384|20040512|C|C|0|N|D|SOP|CANCELLED AS PER FORM CE/1 16.4.99.KH|||D1|20090407"
        },
        "migrated_CSO1R": {
            "received": "2020-05-28T16:29:56.482",
            "value": "SOP|9100001384|19520801|F|20090407|D1|D876|L83665|D|20120608|||Jeffery|Pepita|||15 Clovelly Road|Moretonhampstead|EXETER|Devon|EX2 5SE"
        },
        "next_test_due_date": moment().add(8, "weeks"),
        "nrl_review_date": moment().add(2, "weeks"),
        "nhs_number": "9100001384",
        "nrl": true,
        "participant_id": "28f4390a-4a47-4318-8705-8e0ef69f3ffe",
        "pnl": true,
        "pnl_action": "Ceased",
        "pnl_reason": "Due to age",
        "registered_gp_practice_code": "L83665",
        "results" : [],
        "sanitised_first_name": "PEPITA",
        "sanitised_last_name": "JEFFERY",
        "sanitised_nhs_number": "9100001384",
        "sanitised_postcode": "EX25SE",
        "sort_key": "PARTICIPANT",
        "status": "Cancelled"
    },
    {
        "address": {
            "address_line_2": "47 Ashburnham Road",
            "address_line_3": "Livermead",
            "address_line_4": "EXETER",
            "address_line_5": "Devon",
            "postcode": "EX2 5SE"
        },
        "ceased_type": "Recently ceased",
        "date_of_birth": "1968-06-25",
        "date_of_birth_and_initial": "1928-06-25H",
        "date_of_birth_and_initial_and_postcode": "1928-06-25HEX25SE",
        "first_name": "Veronica",
        "gender": "2",
        "is_ceased": true,
        "last_name": "Hitchings",
        "migrated_1C_data": {
            "received": "2020-05-28T16:33:37.909",
            "value": "LL|9100002801|20060526|C|C|0|N|C|LL||||D1|20060523"
        },
        "migrated_CSO1R": {
            "received": "2020-05-28T16:30:24.215",
            "value": "LL|9100002801|19280625|F|20060523|D1|J792|L83665|D|20130617|||Hitchings|Veronica|||47 Ashburnham Road|Livermead|EXETER|Devon|EX2 5SE"
        },
        "next_test_due_date": moment().add(10, "weeks"),
        "nrl_review_date": moment().add(4, "weeks"),
        "nhs_number": "9100002801",
        "nrl": true,
        "participant_id": "8d0243e8-2ef0-4d4d-be8c-06be86138bfc",
        "pnl": true,
        "pnl_action": "Ceased",
        "pnl_reason": "Patient informed choice",
        "registered_gp_practice_code": "L83665",
        "results" : [],
        "sanitised_first_name": "VERONICA",
        "sanitised_last_name": "HITCHINGS",
        "sanitised_nhs_number": "9100002801",
        "sanitised_postcode": "EX25SE",
        "sort_key": "PARTICIPANT",
        "status": "Cancelled"
    },
    {
        "address": {
            "address_line_2": "4 Alexandra Terrace",
            "address_line_3": "Berry Pomeroy",
            "address_line_4": "EXETER",
            "address_line_5": "Devon",
            "postcode": "EX2 5SE"
        },
        "ceased_type": "Recently ceased",
        "date_of_birth": "1974-05-19",
        "date_of_birth_and_initial": "1954-05-19E",
        "date_of_birth_and_initial_and_postcode": "1954-05-19EEX25SE",
        "first_name": "Annie",
        "gender": "2",
        "is_ceased": true,
        "last_name": "Evans",
        "middle_names": "May",
        "migrated_1C_data": {
            "received": "2020-05-28T16:33:37.406",
            "value": "LNJ|9100001899|20170216|C|C|1|Y|C|LNJ||||D1|19920925"
        },
        "migrated_CSO1R": {
            "received": "2020-05-28T16:29:08.642",
            "value": "LNJ|9100001899|19540519|F|19920925|D1|PL713B|L83665|R|20180815|DYF|Ms|Evans|Annie|May||4 Alexandra Terrace|Berry Pomeroy|EXETER|Devon|EX2 5SE"
        },
        "next_test_due_date": moment().add(8, "weeks"),
        "nrl_review_date": moment().add(1, "weeks"),
        "nhs_number": "9100001899",
        "nrl": true,
        "participant_id": "ff2cf9de-98ae-49ae-819d-0018d009f619",
        "pnl": true,
        "pnl_action": "",
        "registered_gp_practice_code": "L83665",
        "results" : [],
        "sanitised_first_name": "ANNIE",
        "sanitised_last_name": "EVANS",
        "sanitised_nhs_number": "9100001899",
        "sanitised_postcode": "EX25SE",
        "sort_key": "PARTICIPANT",
        "status": "Cancelled",
        "title": "Ms"
    },
    {
        "address": {
            "address_line_2": "69 Speedwell Crescent",
            "address_line_3": "Southway",
            "address_line_4": "EXETER",
            "address_line_5": "Devon",
            "postcode": "EX2 5SE"
        },
        "ceased_type": "Recently ceased",
        "date_of_birth": "1981-02-09",
        "date_of_birth_and_initial": "1981-02-09G",
        "date_of_birth_and_initial_and_postcode": "1981-02-09GEX25SE",
        "first_name": "Muriel",
        "gender": "2",
        "is_ceased": false,
        "last_name": "Smith",
        "migrated_1C_data": {
            "received": "2020-05-28T16:33:37.276",
            "value": "LD|9100001287|20170309|N|H|0|N||||||D1|20101012"
        },
        "migrated_CSO1R": {
            "received": "2020-05-28T16:30:01.760",
            "value": "LD|9100001287|19810209|F|20101012|D1|V32|L83665|R|20141223|NI|Miss|Grewcock|Muriel|||69 Speedwell Crescent|Southway|EXETER|Devon|EX2 5SE"
        },
        "next_test_due_date": moment().add(10, "weeks"),
        "nrl_review_date": moment().add(3, "weeks"),
        "nhs_number": "9100001287",
        "nrl": true,
        "participant_id": "1490e402-80a4-4b31-890f-bc28d3850a06",
        "pnl": true,
        "pnl_action": "",
        "registered_gp_practice_code": "L83665",
        "results" : [],
        "sanitised_first_name": "MURIEL",
        "sanitised_last_name": "GREWCOCK",
        "sanitised_nhs_number": "9100001287",
        "sanitised_postcode": "EX25SE",
        "sort_key": "PARTICIPANT",
        "status": "Routine",
        "title": "Miss"
    },
    {
        "address": {
            "address_line_2": "17 Belmont Road",
            "address_line_3": "Buckland",
            "address_line_4": "EXETER",
            "address_line_5": "Devon",
            "postcode": "EX2 5SE"
        },
        "ceased_type": "Recently ceased",
        "date_of_birth": "1992-06-11",
        "date_of_birth_and_initial": "1922-06-11P",
        "date_of_birth_and_initial_and_postcode": "1922-06-11PEX25SE",
        "first_name": "Tanya",
        "gender": "2",
        "is_ceased": true,
        "last_name": "Parr",
        "migrated_1C_data": {
            "received": "2020-05-28T16:33:37.161",
            "value": "LL|9100002798|20130925|C|C|0|N|C|LL|R/RECALL LIST AUG 94 CEASE DUE TO AGE|||D1|20130919"
        },
        "migrated_CSO1R": {
            "received": "2020-05-28T16:29:49.831",
            "value": "LL|9100002798|19220611|F|20130919|D1|N1306|L83665|D|20150311|||Parr|Tanya|||17 Belmont Road|Buckland|EXETER|Devon|EX2 5SE"
        },
        "next_test_due_date": moment().add(8, "weeks"),
        "nrl_review_date": moment().add(3, "weeks"),
        "nhs_number": "9100002798",
        "nrl": true,
        "participant_id": "527087fc-4372-4949-b50e-e1b3b9f3e15a",
        "pnl": true,
        "pnl_action": "",
        "registered_gp_practice_code": "L83665",
        "results" : [],
        "sanitised_first_name": "TANYA",
        "sanitised_last_name": "PARR",
        "sanitised_nhs_number": "9100002798",
        "sanitised_postcode": "EX25SE",
        "sort_key": "PARTICIPANT",
        "status": "Cancelled"
    },
    {
        "address": {
            "address_line_2": "36 Widewell Road",
            "address_line_3": "Whitleigh",
            "address_line_4": "EXETER",
            "address_line_5": "Devon",
            "postcode": "EX2 5SE"
        },
        "ceased_type": "Recently ceased",
        "date_of_birth": "1964-10-06",
        "date_of_birth_and_initial": "1954-10-06B",
        "date_of_birth_and_initial_and_postcode": "1954-10-06BEX25SE",
        "first_name": "Brenda",
        "gender": "2",
        "is_ceased": false,
        "last_name": "Brazier",
        "migrated_1C_data": {
            "received": "2020-05-28T16:33:37.860",
            "value": "LNE|9100001929|20060817|N|P|1|N|||POSTPONED SURGERY REQUEST|||D1|20111102"
        },
        "migrated_CSO1R": {
            "received": "2020-05-28T16:30:21.028",
            "value": "LNE|9100001929|19541006|F|20111102|D1|0978|L83665|D|20120711||Ms|Brazier|Brenda|||36 Widewell Road|Whitleigh|EXETER|Devon|EX2 5SE"
        },
        "next_test_due_date": moment().add(10, "weeks"),
        "nrl_review_date": moment().add(1, "weeks"),
        "nhs_number": "9100001929",
        "nrl": true,
        "participant_id": "ffb1226a-1849-46d8-8c1e-f273e8417f27",
        "pnl": true,
        "pnl_action": "",
        "registered_gp_practice_code": "L83665",
        "results" : [],
        "sanitised_first_name": "BRENDA",
        "sanitised_last_name": "BRAZIER",
        "sanitised_nhs_number": "9100001929",
        "sanitised_postcode": "EX25SE",
        "sort_key": "PARTICIPANT",
        "status": "Routine",
        "title": "Ms"
    },
    {
        "address": {
            "address_line_1": "Flat 5",
            "address_line_2": "Leigh Road",
            "address_line_3": "Hawkchurch",
            "address_line_4": "EXETER",
            "address_line_5": "Devon",
            "postcode": "EX2 5SE"
        },
        "ceased_type": "Abnormal Follow-up",
        "date_of_birth": "1961-09-18",
        "date_of_birth_and_initial": "1951-09-18G",
        "date_of_birth_and_initial_and_postcode": "1951-09-18GEX25SE",
        "first_name": "Jennifer",
        "gender": "2",
        "is_ceased": false,
        "last_name": "Golding",
        "migrated_1C_data": {
            "received": "2020-05-28T16:33:37.877",
            "value": "LL|9100001740|20060312|N|1|0|Y||||||D1|20010510"
        },
        "migrated_CSO1R": {
            "received": "2020-05-28T16:29:10.249",
            "value": "LL|9100001740|19510918|F|20010510|D1|W896|L83665|R|20040504|SCT||Golding|Jennifer||Flat 5|Leigh Road|Hawkchurch|EXETER|Devon|EX2 5SE"
        },
        "next_test_due_date": moment().add(10, "weeks"),
        "nrl_review_date": moment().add(8, "weeks"),
        "nhs_number": "9100001740",
        "nrl": true,
        "participant_id": "b5a5bf31-5484-4ce2-8ad5-f1c1e0ac5086",
        "pnl": true,
        "pnl_action": "Ceased",
        "pnl_reason": "Patient informed choice",
        "registered_gp_practice_code": "L83665",
        "results" : [],
        "sanitised_first_name": "JENNIFER",
        "sanitised_last_name": "GOLDING",
        "sanitised_nhs_number": "9100001740",
        "sanitised_postcode": "EX25SE",
        "sort_key": "PARTICIPANT",
        "status": "Routine"
    }
]

module.exports = function () {
    console.log('getting patients')
}

module.exports.getPatient = function (nhsNumber) {
    if (nhsNumber == '') {
        var patient = patients[0];
    } else {
        var patient = patients.find((patient) => patient.nhs_number == nhsNumber);
        try { console.log(patient.first_name + " " + patient.last_name + " NHS Number: " + patient.nhs_number); }
        catch (err) { console.log('patient not found') }
    }

    return patient;
};


module.exports.getPatients = function (notificationType) {
    var allResults = results.getResults();

    for (i = 0; i < patients.length; i++) {
        for (j = 0; j < allResults.length; j++) {
            if (patients[i].nhs_number == allResults[j].nhs_number) {
                // there is a match with the nhs number
                 var index = patients[i].results.findIndex(result => result.slide_number == allResults[j].slide_number)
                if (index === -1) {
                    patients[i].results.push(allResults[j]);
                }
                    //else //console.log("object already exists")
            }
        }

        // if there are more than 1 results then order
        if (patients[i].results.length > 1) {
            patients[i].results.sort(function (a, b) {
                return  new Date(b.test_date) - new Date(a.test_date);
            });
        }
    }
    
    function compare(a, b) {
        if (notificationType == "nrl") {
            var aTime = moment(a.nrl_review_date).diff(moment(), "days");
            var bTime = moment(b.nrl_review_date).diff(moment(), "days");
        } else {
            var aTime = moment(a.next_test_due_date).diff(moment(), "days");
            var bTime = moment(b.next_test_due_date).diff(moment(), "days");
        }
        // might need to add sorting for ceased by ceased date
        // could sort by ceased type / reason
        
        var aStatus = "";
        var bStatus = "";

        if (a.results[0]) {
            aStatus = a.results[0].action_code;
        }

        if (b.results[0]) {
            bStatus = b.results[0].action_code;
        } 

        if (aTime == bTime) {
            return (aStatus > bStatus) ? -1 : (aStatus < bStatus) ? 1 : 0;
        }
        else {
            return (aTime < bTime) ? -1 : 1;
        }
    }

    if (notificationType == "pnl") {
        console.log("PRIOR NOTIFICATION")
        patients.sort(compare);
        return patients.filter(patient => patient.pnl == true);
    }

    if (notificationType == "ceased") {
        console.log("CEASED")
        patients.sort(compare);
        return patients.filter(patient => patient.pnl_action == "Ceased");
    }

    if (notificationType == "nrl") {
        console.log("NON RESPONDER")
        patients.sort(compare);
        return patients.filter(patient => patient.nrl == true);
    }

    return patients;
};
//nhsNumber, reason, length, ntdd, edd, prev, req.session.data['returnUrl']
module.exports.deferPatient = function (nhsNumber, reason, length, ntdd, edd, prev, type) {
    var patient = patients.find((patient) => patient.nhs_number == nhsNumber);

    if (type == "nrl") {
        patient.nrl = false;
        patient.pnl_action = "Deferred";
        patient.pnl_reason = reason || '';
    } else {
        patient.pnl = false;
        patient.pnl_action = "Deferred";
        patient.pnl_reason = reason || '';
    }

    // use the estimated date of delivery
    if (edd) {
        patient.next_test_due_date = moment(edd).add(length, 'months').format("DD-MMM-YYYY");
    }

    // use the next test due date supplied
    if (ntdd) {
        patient.next_test_due_date = moment(ntdd).format("DD-MMM-YYYY");
    }

    // use the existing next test due date
    if (!ntdd && !edd) {
        patient.next_test_due_date = moment().add(length, 'months').format("DD-MMM-YYYY");
    }

};

module.exports.ceasePatient = function (nhsNumber, reason, type) {
    var patient = patients.find((patient) => patient.nhs_number == nhsNumber);
    if (type == 'nrl') {
        patient.nrl = false;
        patient.pnl_action = "Ceased";
        patient.pnl_reason = reason || '';
    } else {
        patient.pnl = false;
        patient.pnl_action = "Ceased";
        patient.pnl_reason = reason || '';
    }
};

module.exports.submitPatient = function (nhsNumber, type) {
    console.log("PATIENT SUBMITTED")
    var patient = patients.find((patient) => patient.nhs_number == nhsNumber);
    if (type == "ceased") {
        patient.pnl_action = "";
    } else {
        patient.nrl = false;
    }
};

module.exports.reinstatePatient = function (nhsNumber, ntdd) {
    var patient = patients.find((patient) => patient.nhs_number == nhsNumber);
    if (ntdd != null) {
        patient.next_test_due_date = moment(ntdd).format("DD-MMM-YYYY");
    } else {
        patient.next_test_due_date = moment().add(11, "weeks").format("DD-MMM-YYYY");
    }

    patient.pnl_action = '';
    patient.pnl_reason = '';
};

module.exports.addTestResult = function (nhsNumber, data) {
    console.log("ATTEMPTING TO ADD A TEST RESULT")
    var patient = patients.find((patient) => patient.nhs_number == nhsNumber);

    console.log(data['result.self-sample']);


    var newTest = [{
        "result_ID": Math.random().toString(16).slice(2),
        "action": data['action-text'], // to fill in
        "action_code": data['result-action'],
        "created": moment(),
        "infection_code": data['result-infection'],
        "infection_result": data['infection-text'], // to fill in
        "is_deleted": false, // to fill in
        "nhs_number": nhsNumber,
        "recall_months": data['repeat-months'], // default to 36 until figure a way to add this
        "result": data['result-text'], // to fill in
        "result_code": data['result-result'],
        "result_date": data['example-year'] + "-" + data['example-month'] + "-" + data['example-day'],
        "self_sample" : data['self-sample'],
        "sender_code": data['sender-code'],
        "sending_lab": data['national-code'],
        "slide_number": data['slide-number'],
        "source_code": data['source-code'],
        "test_date": data['example-year'] + "-" + data['example-month'] + "-" + data['example-day'],
        "result-type": data['result-type'],
        "health_authority": data['health-authority'],
        "result-infection": data['result-infection'],
        "hpv_primary": data['hpv-primary'],
        "crm": data['crm'],
        "comments": data['comments']
        
    }];
    
    patient.results.push(newTest[0]);
    //console.log(patient.results);

    if (patient.results.length > 1) {
        patient.results.sort(function (a, b) {
            return  new Date(b.test_date) - new Date(a.test_date);
        });
    }
}

module.exports.editTestResult = function (nhsNumber, data) {
    console.log("ATTEMPTING TO EDIT A TEST RESULT")
    //console.log(data);
    // find the patient
    var patient = patients.find((patient) => patient.nhs_number == nhsNumber);
    
    //console.log("result id: " + data['result_ID']);
    // find the result to edit
    var result = patient.results.find((result) => result.result_ID == data['result_ID']);
    // need some unique ID to make this easier

    result.action = data['action-text'] || ''; // not sure why this isn't working - need to double check it doesn't break anything
    result.action_code = data['result-action'] || '';
    result.infection_code = data['result-infection'] || '';
    result.infection_result = data['infection-text'] || '';
    result.recall_months = data['repeat-months'] || '';
    result.result = data['result-text'] || '';
    result.result_code = data['result-result'];
    result.result_date = data['example-year'] || '' + "-" + data['example-month'] || '' + "-" + data['example-day'] || '';
    result.self_sample = data['self-sample'] || '';
    result.sender_code = data['sender-code'] || '';
    result.sending_lab = data['national-code'] || '';
    result.slide_number = data['slide-number'] || '';
    result.source_code = data['source-code'] || '';
    result.test_date = data['example-year'] || '' + "-" + data['example-month'] || '' + "-" + data['example-day'] || '';
    result.result_type = data['result-type'] || '';
    result.health_authority = data['health-authority'] || '';
    result.result_infection = data['result-infection'] || '';
    result.hpv_primary = data['hpv-primary'] || '';
    result.crm = data['crm'] || '';
    result.comments = data['comments'] || '';
    
    // sort the results - incase the test date was changed
    if (patient.results.length > 1) {
        patient.results.sort(function (a, b) {
            return  new Date(b.test_date) - new Date(a.test_date);
        });
    }
}

module.exports.deleteTestResult = function (nhsNumber, data) {
    console.log("ATTEMPTING TO DELETE A TEST RESULT")
    
    // find the patient
    var patient = patients.find((patient) => patient.nhs_number == nhsNumber);
    
    console.log("result id: " + data['result_ID']);
    // find the result to delete
    var result = patient.results.find((result) => result.result_ID == data['result_ID']).is_deleted = true;
    // need some unique ID to make this easier
    console.log(patient.results)

    // sort the results - incase the test date was changed
    /*
    if (patient.results.length > 1) {
        patient.results.sort(function (a, b) {
            return  new Date(b.test_date) - new Date(a.test_date);
        });
    }
    */
}



module.exports.resetPatients = function (req) {
    patients.forEach(function (patient) {
        patient.pnl = true;
        patient.pnl_action = "";
        patient.nrl = true; 
    })
    
    var allResults = results.getResults();
    for (i = 0; i < patients.length; i++) {        
        patients[i].results = [];

        for (j = 0; j < allResults.length; j++) {
            if (patients[i].nhs_number == allResults[j].nhs_number) {
                 var index = patients[i].results.findIndex(result => result.slide_number == allResults[j].slide_number)
                if (index === -1) {
                    patients[i].results.push(allResults[j]);
                }
            }
        }

        if (patients[i].results.length > 1) {
            patients[i].results.sort(function (a, b) {
                return  new Date(b.test_date) - new Date(a.test_date);
            });
        }

        if (patients[i].nhs_number == "9100002801" || patients[i].nhs_number == "9100001694" || patients[i].nhs_number == "9100001384" || patients[i].nhs_number == "9100001740" || patients[i].nhs_number == "9991023867") {
            patients[i].pnl_action = "Ceased";
            
            if (patients[i].nhs_number == "9100001694") {
                patients[i].pnl_reason = "No cervix";
            }

            if (patients[i].nhs_number == "9100001384") {
                patients[i].pnl_reason = "Due to age";
            }

            if (patients[i].nhs_number == "9100001740" || patients[i].nhs_number == "9991023867" || patients[i].nhs_number == "9100002801") {
                patients[i].pnl_reason = "Patient informed choice";
            }
       }
   }
    req.session.data['nrl_patients'] = patients;
    req.session.data['patients'] = patients;
}