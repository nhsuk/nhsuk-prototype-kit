

const gpInfo = [
{
    "active": false,
    "address": {
        "address_line_1": "IVESON APPROACH",
        "address_line_3": "LEEDS",
        "address_line_4": "WEST YORKSHIRE",
        "address_line_5": "ENGLAND",
        "postcode": "LS16 6FR"
    },
    "name": "IRELAND WOOD SURGERY",
    "organisation_code": "B86044",
    "type": "PRESCRIBING COST CENTRE"
    }]

module.exports = function () {
    //console.log('getting gp info')
}

module.exports.getGPInfo = function () {
    var gpAddress = gpInfo[0];
    //console.log(gpAddress);
    return gpAddress;
};