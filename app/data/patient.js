// the data
const results = require('./result.js');


const patients = [{
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
    "next_test_due_date": "2020-07-11",
    "nhs_number": "9991023867",
    "participant_id": "5f03f444-8452-4e4f-8f24-03d30fefed55",
    "pnl": true,
    "registered_gp_practice_code": "C86003",
    "results": "",
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
            "address_line_1": "52 HOLLY MEWS",
            "address_line_2": "TOWNSVILLE",
            "postcode": "LS20 8QF"
        },
        "date_of_birth": "1958-10-28",
        "date_of_birth_and_initial": "1958-10-28D",
        "date_of_birth_and_initial_and_postcode": "1958-10-28DLS208QF",
        "first_name": "ALISON",
        "gender": "0",
        "is_ceased": false,
        "last_name": "NIXON",
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
        "next_test_due_date": "2020-07-11",
        "nhs_number": "1234567890",
        "participant_id": "5f03f444-8452-4e4f-8f24-03d30fefed55",
        "pnl": true,
        "registered_gp_practice_code": "C86003",
        "results": "",
        "sanitised_first_name": "CURRY",
        "sanitised_last_name": "DEPETRIS",
        "sanitised_nhs_number": "9991023867",
        "sanitised_postcode": "LS208QF",
        "sort_key": "PARTICIPANT",
        "status": "Cancelled",
        "title": "MISS"
    }
]



//  the functions


module.exports = function () {
    console.log('getting patients')
}

module.exports.getPatient = function (nhsNumber) {
    console.log("getting 1 patient: " + nhsNumber);
    var patient = patients.find((patient) => patient.nhs_number == nhsNumber);

    
    try {
        console.log(patient.first_name + " " + patient.last_name + " NHS Number: " + patient.nhs_number);
    }
    catch (err) {
        console.log('patient not found')
    }

    return patient;
};


module.exports.getPatients = function () {
    console.log('---getting all patients---')

    for (i = 0; i < patients.length; i++) {
        // this just works if the results are ordered nicely
        patients[i]['results'] = results.getResults()[i];
    }

    //console.log(patients)

    return patients.filter(patient => patient.pnl == true);
};

module.exports.deferPatient = function (nhsNumber, reason, length) {
    console.log('deferring the patient')
    var patient = patients.find((patient) => patient.nhs_number == nhsNumber);
    patient.pnl = false;

    console.log(patient);
    //patient.next_test_due_date = "09 04 2020"; // add the length on top based
    //patient.reason = reason

};

module.exports.ceasePatient = function (nhsNumber, reason) {
    console.log("ceasing the patient");
    var patient = patients.find((patient) => patient.nhs_number == nhsNumber);
    patient.status = 'ceased';
    patient.reason = reason;
};