var moment = require('moment');

// Action Codes
// A - routine
// R - Repeat Advised
// S - Suspended

const results = [
    {
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
        "action_code": "A",
        "created": "2020-05-28T16:35:45.890",
        "migrated_CSO2_data": {
            "received": "2020-05-28T16:35:45.890",
            "value": "LL|9100002801|1|19890523|2|A||60|S|60210|G|M371|Y|861321|19890616|198901|89007139||KHU|20060526|||"
        },
        "nhs_number": "9100002801",
        "participant_id": "8d0243e8-2ef0-4d4d-be8c-06be86138bfc",
        "recall_months": "60",
        "result": "Negative",
        "result_code": "2",
        "result_date": "2006-05-26",
        "sender_code": "861321",
        "sending_lab": "60210",
        "slide_number": "89007139",
        "sort_key": "RESULT#1989-05-23#2020-05-28T16:35:45.890",
        "source_code": "G",
        "test_date": "1989-05-23"
    },
    {
        "action": "Routine",
        "action_code": "A",
        "created": "2020-05-28T16:35:49.207",
        "migrated_CSO2_data": {
            "received": "2020-05-28T16:35:49.207",
            "value": "LL|9100002801|1|19890523|2|A||60|S|60210|G|M371|Y|861321|19890616|198901|89007139||KHU|20060526|||"
        },
        "nhs_number": "9100002801",
        "participant_id": "8d0243e8-2ef0-4d4d-be8c-06be86138bfc",
        "recall_months": "60",
        "result": "Negative",
        "result_code": "2",
        "result_date": "2006-05-26",
        "sender_code": "861321",
        "sending_lab": "60210",
        "slide_number": "89007139",
        "sort_key": "RESULT#1989-05-23#2020-05-28T16:35:49.207",
        "source_code": "G",
        "test_date": "1989-05-23"
    },
    {
        "action": "Routine",
        "action_code": "A",
        "created": "2020-05-28T16:35:45.306",
        "migrated_CSO2_data": {
            "received": "2020-05-28T16:35:45.306",
            "validation_errors": {
                "SLIDE": {
                    "data_error": "Slide number can only contain numbers through 0 - 9"
                }
            },
            "value": "LD|9100001287|1|20011218|2|A||60|X|65030|X||||||0154590C||NI|20101204|||"
        },
        "nhs_number": "9100001287",
        "participant_id": "1490e402-80a4-4b31-890f-bc28d3850a06",
        "recall_months": "60",
        "result": "Negative",
        "result_code": "2",
        "result_date": "2010-12-04",
        "sending_lab": "65030",
        "slide_number": "0154590C",
        "sort_key": "RESULT#2001-12-18#2020-05-28T16:35:45.306",
        "source_code": "X",
        "test_date": "2001-12-18"
    },
    {
        "action": "Routine",
        "action_code": "A",
        "created": "2020-05-28T16:35:45.883",
        "migrated_CSO2_data": {
            "received": "2020-05-28T16:35:45.883",
            "validation_errors": {
                "HPV": {
                    "data_error": "HPV not one of the expected values: ['Y']"
                },
                "LAB_NAT": {
                    "data_error": "Lab national code can only contain numbers through 0 - 9"
                }
            },
            "value": "LL|9100002798|1|19880622|2|A||60|X|XXXXX|X||||||88011206|N||20130925|||"
        },
        "nhs_number": "9100002798",
        "participant_id": "527087fc-4372-4949-b50e-e1b3b9f3e15a",
        "recall_months": "60",
        "result": "Negative",
        "result_code": "2",
        "result_date": "2013-09-25",
        "sending_lab": "XXXXX",
        "slide_number": "88011206",
        "sort_key": "RESULT#1988-06-22#2020-05-28T16:35:45.883",
        "source_code": "X",
        "test_date": "1988-06-22"
    },
    {
        "action": "Routine",
        "action_code": "A",
        "created": "2020-05-28T16:35:49.199",
        "migrated_CSO2_data": {
            "received": "2020-05-28T16:35:49.199",
            "validation_errors": {
                "HPV": {
                    "data_error": "HPV not one of the expected values: ['Y']"
                },
                "LAB_NAT": {
                    "data_error": "Lab national code can only contain numbers through 0 - 9"
                }
            },
            "value": "LL|9100002798|1|19880622|2|A||60|X|XXXXX|X||||||88011206|N||20130925|||"
        },
        "nhs_number": "9100002798",
        "participant_id": "527087fc-4372-4949-b50e-e1b3b9f3e15a",
        "recall_months": "60",
        "result": "Negative",
        "result_code": "2",
        "result_date": "2013-09-25",
        "sending_lab": "XXXXX",
        "slide_number": "88011206",
        "sort_key": "RESULT#1988-06-22#2020-05-28T16:35:49.199",
        "source_code": "X",
        "test_date": "1988-06-22"
    },
    {
        "action": "Routine",
        "action_code": "A",
        "created": "2020-05-28T16:35:45.864",
        "migrated_CSO2_data": {
            "received": "2020-05-28T16:35:45.864",
            "value": "LNE|9100001929|2|19910404|2|A||60|X|60670|N|||871147|||91003184|||20111108|||"
        },
        "nhs_number": "9100001929",
        "participant_id": "ffb1226a-1849-46d8-8c1e-f273e8417f27",
        "recall_months": "60",
        "result": "Negative",
        "result_code": "2",
        "result_date": "2011-11-08",
        "sender_code": "871147",
        "sending_lab": "60670",
        "slide_number": "91003184",
        "sort_key": "RESULT#1991-04-04#2020-05-28T16:35:45.864",
        "source_code": "N",
        "test_date": "1991-04-04"
    },
    {
        "action": "Routine",
        "action_code": "A",
        "created": "2020-05-28T16:35:45.700",
        "migrated_CSO2_data": {
            "received": "2020-05-28T16:35:45.700",
            "value": "LNE|9100001929|3|19921104|2|A||60|X|60720|N|||871147|||92023780|||20111108|||"
        },
        "nhs_number": "9100001929",
        "participant_id": "ffb1226a-1849-46d8-8c1e-f273e8417f27",
        "recall_months": "60",
        "result": "Negative",
        "result_code": "2",
        "result_date": "2011-11-08",
        "sender_code": "871147",
        "sending_lab": "60720",
        "slide_number": "92023780",
        "sort_key": "RESULT#1992-11-04#2020-05-28T16:35:45.700",
        "source_code": "N",
        "test_date": "1992-11-04"
    },
    {
        "action": "Repeat advised",
        "action_code": "R",
        "created": "2020-05-28T16:35:45.829",
        "migrated_CSO2_data": {
            "received": "2020-05-28T16:35:45.829",
            "value": "LL|9100001740|1|19880720|3|R||--|X|60450|X||||||88034800||NN|20010517|||"
        },
        "nhs_number": "9100001740",
        "participant_id": "b5a5bf31-5484-4ce2-8ad5-f1c1e0ac5086",
        "result": "Low-grade dyskaryosis",
        "result_code": "3",
        "result_date": "2001-05-17",
        "sending_lab": "60450",
        "slide_number": "88034800",
        "sort_key": "RESULT#1988-07-20#2020-05-28T16:35:45.829",
        "source_code": "X",
        "test_date": "1988-07-20"
    }
]

//
//function getNTDD() {
//    return moment(); //moment().subtract(3, "month").format("YYYY-MM-DD");
//}


module.exports.getResults = function () {
    console.log('---getting all results---')
    return results;
}