var moment = require('moment');

// Action Codes
// A - routine
// R - Repeat Advised
// S - Suspended

const senders = [
    
   
    
    {
        "result_ID": Math.random().toString(16).slice(2),
        "action": "Routine",
        "action_code": "A",
        "created": "2020-05-28T16:35:45.890",
        "is_deleted": false,
        "letter_status": "Sent",
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
    }
]




module.exports.getSenders = function () {
    
   

   

    return senders;
};