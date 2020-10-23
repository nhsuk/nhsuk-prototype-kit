var moment = require('moment');

// Action Codes
// A - routine
// R - Repeat Advised
// S - Suspended

const results = [
    {
        "action": "Repeat Advised",
        "action_code": "R",
        "created": "2020-05-28T12:53:39.328",
        "infection_code": "9",
        "infection_result": "HPV positive",
        "nhs_number": "9991023867",
        "participant_id": "5f03f444-8452-4e4f-8f24-03d30fefed55",
        "recall_months": "3",
        "result": "Low-grade dyskaryosis",
        "result_code": "3",
        "result_date": moment().subtract(96, "weeks"),
        "result-type": "English",
        "sender_code": "676567",
        "sending_lab": "65030",
        "slide_number": "70406000",
        "sort_key": "RESULT#1972-05-18#2020-05-28T12:53:39.328",
        "source_code": "N",
        "test_date": moment().subtract(96, "weeks")
    },
    {
        "action": "Routine",
        "action_code": "A",
        "created": "2020-05-28T16:35:45.890",
        "nhs_number": "9100002801",
        "participant_id": "8d0243e8-2ef0-4d4d-be8c-06be86138bfc",
        "recall_months": "60",
        "result": "Negative",
        "result_code": "2",
        "result_date": moment().subtract(146, "weeks"), 
        "result-type": "English",
        "sender_code": "861321",
        "sending_lab": "60210",
        "slide_number": "89007139",
        "sort_key": "RESULT#1989-05-23#2020-05-28T16:35:45.890",
        "source_code": "G",
        "test_date": moment().subtract(146, "weeks")
    },
    {
        "action": "Routine",
        "action_code": "A",
        "created": "2020-05-28T16:35:45.890",
        "nhs_number": "9100001384",
        "participant_id": "8d0243e8-2ef0-4d4d-be8c-06be86138bfc",
        "recall_months": "60",
        "result": "Negative",
        "result_code": "2",
        "result_date": moment().subtract(146, "weeks"),
        "result-type": "English",
        "sender_code": "861321",
        "sending_lab": "60210",
        "slide_number": "89007139",
        "sort_key": "RESULT#1989-05-23#2020-05-28T16:35:45.890",
        "source_code": "G",
        "test_date": moment().subtract(146, "weeks")
    },
    {
        "action": "Routine",
        "action_code": "A",
        "created": "2020-05-28T16:35:49.207",
        "nhs_number": "9100002801",
        "participant_id": "8d0243e8-2ef0-4d4d-be8c-06be86138bfc",
        "recall_months": "60",
        "result": "Negative",
        "result_code": "2",
        "result_date": moment().subtract(146, "weeks"), 
        "result-type": "English",
        "sender_code": "861321",
        "sending_lab": "60210",
        "slide_number": "89007139",
        "sort_key": "RESULT#1989-05-23#2020-05-28T16:35:49.207",
        "source_code": "G",
        "test_date": moment().subtract(146, "weeks")
    },
    {
        "action": "Routine",
        "action_code": "A",
        "created": "2020-05-28T16:35:45.306",
        "nhs_number": "9100001287",
        "participant_id": "1490e402-80a4-4b31-890f-bc28d3850a06",
        "recall_months": "60",
        "result": "Negative",
        "result_code": "2",
        "result_date": moment().subtract(146, "weeks"), 
        "result-type": "English",
        "sending_lab": "65030",
        "slide_number": "0154590C",
        "sort_key": "RESULT#2001-12-18#2020-05-28T16:35:45.306",
        "source_code": "X",
        "test_date": moment().subtract(146, "weeks")
    },
    {
        "action": "Routine",
        "action_code": "A",
        "created": "2020-05-28T16:35:45.883",
        "nhs_number": "9100002798",
        "participant_id": "527087fc-4372-4949-b50e-e1b3b9f3e15a",
        "recall_months": "60",
        "result": "Negative",
        "result_code": "2",
        "result_date": moment().subtract(148, "weeks"), 
        "result-type": "English",
        "sending_lab": "XXXXX",
        "slide_number": "88011206",
        "sort_key": "RESULT#1988-06-22#2020-05-28T16:35:45.883",
        "source_code": "X",
        "test_date": moment().subtract(148, "weeks")
    },
    {
        "action": "Routine",
        "action_code": "A",
        "created": "2020-05-28T16:35:49.199",
        "nhs_number": "9100002798",
        "participant_id": "527087fc-4372-4949-b50e-e1b3b9f3e15a",
        "recall_months": "60",
        "result": "Negative",
        "result_code": "2",
        "result_date": moment().subtract(146, "weeks"), 
        "result-type": "English",
        "sending_lab": "XXXXX",
        "slide_number": "88011206",
        "sort_key": "RESULT#1988-06-22#2020-05-28T16:35:49.199",
        "source_code": "X",
        "test_date": moment().subtract(146, "weeks")
    },
    {
        "action": "Routine",
        "action_code": "A",
        "created": "2020-05-28T16:35:45.864",
        "nhs_number": "9100001929",
        "participant_id": "ffb1226a-1849-46d8-8c1e-f273e8417f27",
        "recall_months": "36",
        "result": "Negative",
        "result_code": "2",
        "result_date": moment().subtract(406, "weeks"), 
        "result-type": "English",
        "sender_code": "871147",
        "sending_lab": "60670",
        "slide_number": "91003184",
        "sort_key": "RESULT#1991-04-04#2020-05-28T16:35:45.864",
        "source_code": "N",
        "test_date": moment().subtract(406, "weeks")
    },
    {
        "action": "Routine",
        "action_code": "A",
        "created": "2020-05-28T16:35:45.700",
        "nhs_number": "9100001929",
        "participant_id": "ffb1226a-1849-46d8-8c1e-f273e8417f27",
        "recall_months": "36",
        "result": "Negative",
        "result_code": "2",
        "result_date": moment().subtract(146, "weeks"), 
        "result-type": "English",
        "sender_code": "871147",
        "sending_lab": "60720",
        "slide_number": "92023780",
        "sort_key": "RESULT#1992-11-04#2020-05-28T16:35:45.700",
        "source_code": "N",
        "test_date": moment().subtract(146, "weeks")
    },
    {
        "action": "Repeat advised",
        "action_code": "R",
        "created": "2020-05-28T16:35:45.829",
        "nhs_number": "9100001740",
        "participant_id": "b5a5bf31-5484-4ce2-8ad5-f1c1e0ac5086",
        "result": "Low-grade dyskaryosis",
        "result_code": "3",
        "result_date": moment().subtract(94, "weeks"), 
        "sending_lab": "60450",
        "slide_number": "88034800",
        "sort_key": "RESULT#1988-07-20#2020-05-28T16:35:45.829",
        "result-type": "English",
        "source_code": "X",
        "test_date": moment().subtract(94, "weeks")
    },
    {
        "action": "Repeat advised",
        "action_code": "R",
        "created": "2020-05-28T16:35:45.829",
        "nhs_number": "9100001694",
        "participant_id": "b5a5bf31-5484-4ce2-8ad5-f1c1e0ac5086",
        "result": "Low-grade dyskaryosis",
        "result_code": "3",
        "result_date": moment().subtract(94, "weeks"),
        "result-type": "English",
        "sending_lab": "60450",
        "slide_number": "88034800",
        "sort_key": "RESULT#1988-07-20#2020-05-28T16:35:45.829",
        "source_code": "X",
        "test_date": moment().subtract(94, "weeks")
    }

    
]

module.exports.getResults = function () {
    return results;
}