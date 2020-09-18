const auditInfo = [
    {
    "action": "SEARCH_PARTICIPANTS",
    "expires": 1915889999,
    "logged_time": "2020 - 09 - 17T15: 39: 59.924609",
    "nhsid_useruid": "100000000001",
    "participant_id": "2e3eb171 - 0ba6 - 46c4 - a460 - 8812fa6a947a",
    "role_id": "R8000",
    "session_id": "235604a6 - f5e3 - 4b9f - bddc - 13dbc1613d0c",
    "sort_key": "2020 - 09 - 17T15: 39: 59.8194612e3eb171 - 0ba6 - 46c4 - a460 - 8812fa6a947a",
    "timestamp": "2020 - 09 - 17T15: 39: 59.819461"
},
{
    "action": "VIEW_PARTICIPANT",
    "expires": 1915890001,
    "logged_time": "2020 - 09 - 17T15: 40: 01.113814",
    "nhsid_useruid": "100000000001",
    "participant_id": "2e3eb171 - 0ba6 - 46c4 - a460 - 8812fa6a947a",
    "role_id": "R8000",
    "session_id": "235604a6 - f5e3 - 4b9f - bddc - 13dbc1613d0c",
    "sort_key": "2020 - 09 - 17T15: 40: 01.0155492e3eb171 - 0ba6 - 46c4 - a460 - 8812fa6a947a",
    "timestamp": "2020 - 09 - 17T15: 40: 01.015549"
},
{
    "action": "PRINT_HMR101",
    "expires": 1915891876,
    "logged_time": "2020 - 09 - 17T16: 11: 16.095571",
    "nhsid_useruid": "100000000001",
    "participant_id": "0b1a5fce - 3ace - 44d1 - b8c5 - b5165bb61e62",
    "role_id": "R8000",
    "session_id": "e360c42c - 3a6b - 4950 - 8ea2 - 212bb328de15",
    "sort_key": "2020 - 09 - 17T16: 11: 15.9547500b1a5fce - 3ace - 44d1 - b8c5 - b5165bb61e62",
    "timestamp": "2020 - 09 - 17T16: 11: 15.954750"
},
{
    "action": "CEASE_EPISODE",
    "expires": 1915892017,
    "logged_time": "2020 - 09 - 17T16: 13: 37.903558",
    "nhsid_useruid": "100000000001",
    "participant_id": "ed34942b - 0c06 - 4576 - 960d - a69cce8195be",
    "role_id": "R8000",
    "session_id": "e360c42c - 3a6b - 4950 - 8ea2 - 212bb328de15",
    "sort_key": "2020 - 09 - 17T16: 13: 37.781152ed34942b - 0c06 - 4576 - 960d - a69cce8195be",
    "timestamp": "2020 - 09 - 17T16: 13: 37.781152"
}]

module.exports = function () {
    console.log('getting audit info');
}

module.exports.getAuditInfo = function () {
    return auditInfo;
};