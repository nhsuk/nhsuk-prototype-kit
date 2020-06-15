const results = require('./result.js');
const moment = require('moment');

const patients = [
    {
        "address": {
            "address_line_1": "52 HOLLY MEWS",
            "address_line_2": "TOWNSVILLE",
            "postcode": "LS20 8QF"
        },
        "date_of_birth": "1958-10-28",
        "date_of_birth_and_initial": "1958-10-28D",
        "date_of_birth_and_initial_and_postcode": "1958-10-28DLS208QF",
        "first_name": "CURRY",
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
        "nhs_number": "9991023867",
        "nrl": true,
        "participant_id": "5f03f444-8452-4e4f-8f24-03d30fefed55",
        "pnl": true,
        "pnl_action": "",
        "registered_gp_practice_code": "C86003",
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
        "nhs_number": "9100001694",
        "nrl": true,
        "participant_id": "239ca055-3160-47c2-a8c0-f91558c72e6c",
        "pnl": true,
        "pnl_action": "",
        "registered_gp_practice_code": "L83665",
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
        "date_of_birth": "1955-08-01",
        "date_of_birth_and_initial": "1952-08-01J",
        "date_of_birth_and_initial_and_postcode": "1952-08-01JEX25SE",
        "first_name": "Pepita",
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
        "nhs_number": "9100001384",
        "nrl": true,
        "participant_id": "28f4390a-4a47-4318-8705-8e0ef69f3ffe",
        "pnl": true,
        "pnl_action": "",
        "registered_gp_practice_code": "L83665",
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
        "nhs_number": "9100002801",
        "nrl": true,
        "participant_id": "8d0243e8-2ef0-4d4d-be8c-06be86138bfc",
        "pnl": true,
        "pnl_action": "",
        "registered_gp_practice_code": "L83665",
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
        "nhs_number": "9100001899",
        "nrl": true,
        "participant_id": "ff2cf9de-98ae-49ae-819d-0018d009f619",
        "pnl": true,
        "pnl_action": "",
        "registered_gp_practice_code": "L83665",
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
        "nhs_number": "9100001287",
        "nrl": true,
        "participant_id": "1490e402-80a4-4b31-890f-bc28d3850a06",
        "pnl": true,
        "pnl_action": "",
        "registered_gp_practice_code": "L83665",
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
        "nhs_number": "9100002798",
        "nrl": true,
        "participant_id": "527087fc-4372-4949-b50e-e1b3b9f3e15a",
        "pnl": true,
        "pnl_action": "",
        "registered_gp_practice_code": "L83665",
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
        "nhs_number": "9100001929",
        "nrl": true,
        "participant_id": "ffb1226a-1849-46d8-8c1e-f273e8417f27",
        "pnl": true,
        "pnl_action": "",
        "registered_gp_practice_code": "L83665",
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
        "nhs_number": "9100001740",
        "nrl": true,
        "participant_id": "b5a5bf31-5484-4ce2-8ad5-f1c1e0ac5086",
        "pnl": true,
        "pnl_action": "",
        "registered_gp_practice_code": "L83665",
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
    var patient = patients.find((patient) => patient.nhs_number == nhsNumber);
    try { console.log(patient.first_name + " " + patient.last_name + " NHS Number: " + patient.nhs_number); }
    catch (err) { console.log('patient not found') }
    return patient;
};


module.exports.getPatients = function (notificationType) {
    var allResults = results.getResults();

    for (i = 0; i < patients.length; i++) {
        patients[i]['results'] = allResults.find((result) => result.nhs_number == patients[i]['nhs_number']);
    }
    
    function compare(a, b) {
        var aNTDD = moment(a.next_test_due_date).diff(moment(), "days");
        var bNTDD = moment(b.next_test_due_date).diff(moment(), "days");
        var aStatus = "";
        var bStatus = "";

        if (a.results) {
            aStatus = a.results.action_code;
        }

        if (b.results) {
            bStatus = b.results.action_code;
        } 

        if (aNTDD == bNTDD) {
            return (aStatus > bStatus) ? -1 : (aStatus < bStatus) ? 1 : 0;
        }
        else {
            return (aNTDD < bNTDD) ? -1 : 1;
        }
    }

    patients.sort(compare);

    if (notificationType == "pnl") {
        return patients.filter(patient => patient.pnl == true);
    }

    if (notificationType == "nrl") {
        return patients.filter(patient => patient.nrl == true);
    }

    return patients;
};

module.exports.deferPatient = function (nhsNumber, reason, length) {
    var patient = patients.find((patient) => patient.nhs_number == nhsNumber);
    patient.pnl = false;
    patient.pnl_action = "Deferred";
};

module.exports.ceasePatient = function (nhsNumber, reason) {
    var patient = patients.find((patient) => patient.nhs_number == nhsNumber);
    patient.pnl = false;
    patient.pnl_action = "Ceased";
};

module.exports.resetPatients = function(req) {
    patients.forEach(function (patient) {
        patient.pnl = true;
        patient.pnl_action = ""
    })
    req.session.data["patients"] = patients;
}