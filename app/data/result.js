const results = [{
    "action": "Suspended",
    "action_code": "S",
    "created": "2020-05-28T12:53:39.328",
    "infection_code": "9",
    "infection_result": "HPV positive",
    "migrated_CSO2_data": {
        "received": "2020-05-28T12:53:39.328",
        "validation_errors": {
            "COMM_1": {
                "schema_error": "Comm must be between 1 and 59 characters (inclusive)"
            },
            "COMM_2": {
                "schema_error": "Comm must be between 1 and 59 characters (inclusive)"
            },
            "COMM_3": {
                "schema_error": "Comm must be between 1 and 59 characters (inclusive)"
            },
            "INVITE_DATE": {
                "data_error": "Invalid date format. Expected format to be %Y%m",
                "schema_error": "Date length must be exactly 6 characters"
            }
        },
        "value": "SUN|9991023867|1|19720518|3|S|9|3|A|65030|N|S998|Y|676567|19720523|19720324|70406000|Y|SUN|19720519|Lorem ipsum dolor sit amet, consectetur adipiscing volutpat.|Lorem ipsum dolor sit amet, consectetur adipiscing volutpat.|Lorem ipsum dolor sit amet, consectetur adipiscing volutpat."
    },
    "nhs_number": "9991023867",
    "participant_id": "5f03f444-8452-4e4f-8f24-03d30fefed55",
    "recall_months": "3",
    "result": "Low-grade dyskaryosis",
    "result_code": "3",
    "result_date": "1972-05-19",
    "sender_code": "676567",
    "sending_lab": "65030",
    "slide_number": "70406000",
    "sort_key": "RESULT#1972-05-18#2020-05-28T12:53:39.328",
    "source_code": "N",
    "test_date": "1972-05-18"
},
    {
        "action": "Routine",
        "action_code": "S",
        "created": "2020-05-28T12:53:39.328",
        "infection_code": "9",
        "infection_result": "HPV positive",
        "migrated_CSO2_data": {
            "received": "2020-05-28T12:53:39.328",
            "validation_errors": {
                "COMM_1": {
                    "schema_error": "Comm must be between 1 and 59 characters (inclusive)"
                },
                "COMM_2": {
                    "schema_error": "Comm must be between 1 and 59 characters (inclusive)"
                },
                "COMM_3": {
                    "schema_error": "Comm must be between 1 and 59 characters (inclusive)"
                },
                "INVITE_DATE": {
                    "data_error": "Invalid date format. Expected format to be %Y%m",
                    "schema_error": "Date length must be exactly 6 characters"
                }
            },
            "value": "SUN|9991023867|1|19720518|3|S|9|3|A|65030|N|S998|Y|676567|19720523|19720324|70406000|Y|SUN|19720519|Lorem ipsum dolor sit amet, consectetur adipiscing volutpat.|Lorem ipsum dolor sit amet, consectetur adipiscing volutpat.|Lorem ipsum dolor sit amet, consectetur adipiscing volutpat."
        },
        "nhs_number": "1234567890",
        "participant_id": "5f03f444-8452-4e4f-8f24-03d30fefed55",
        "recall_months": "3",
        "result": "Low-grade dyskaryosis",
        "result_code": "3",
        "result_date": "1985-05-19",
        "sender_code": "676567",
        "sending_lab": "65030",
        "slide_number": "70406000",
        "sort_key": "RESULT#1972-05-18#2020-05-28T12:53:39.328",
        "source_code": "N",
        "test_date": "1985-05-18"
    }]



module.exports.getResults = function () {
    console.log('---getting all results---')
    return results;
}