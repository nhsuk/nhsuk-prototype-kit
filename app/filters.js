module.exports = function (env) {
  /**
   * Instantiate object used to store the methods registered as a
   * 'filter' (of the same name) within nunjucks. You can override
   * gov.uk core filters by creating filter methods of the same name.
   * @type {Object}
   */
  var filters = {}

  var moment = require('moment');

  // Filter to print out dates in NHS App format
  //
  // Accepts numbers and strings.
  // Strings for "today" and "tomorrow"
  // Numbers like 5 will return a day 5 days away
  //
  // Usage in your templates:
  //
  // {{ "today" | returnDate }}
  // {{ "tomorrow" | returnDate }}
  // {{ 5 | returnDate }}
  filters.returnDate = function (date) {
    if (date == "today") {
      return moment().format("dddd D MMMM YYYY");
    } else if (date == "tomorrow") {
      return moment().add(1, 'days').format("dddd D MMMM YYYY");
    } else {
      return moment().add(date, 'days').format("dddd D MMMM YYYY");
    }
  }

  filters.returnDateAndTime = function (date) {
    if (date == "today") {
      return moment().format("D-MMM-YYYY, h:mm:ss a");
    }
    return moment(date).format("D-MMM-YYYY, h:mm:ss a");
  }
  
  // {{ 10 | returnDate("weeks") }}
  filters.returnDate = function (amount, type) {
      return moment().add(amount, type).format("D-MMM-YYYY");
  }

  filters.returnDate = function (amount, type, date) {
    return moment(date).add(amount, type).format("D-MMM-YYYY");
  }

  filters.returnInviteDate = function (ntdd) {
    console.log(ntdd)
    return moment(ntdd).subtract(6, "weeks").format("D-MMM-YYYY");
  }

  filters.returnInviteDateFormat = function (ntdd) {
    console.log(ntdd)
    return moment(ntdd).subtract(6, "weeks").format("DD-MM-YYYY");
  }

  filters.returnPastDate = function (amount, type) {
    return moment().subtract(amount, type).format("D-MMM-YYYY");
  }

  filters.returnPastDate = function (date, amount, type) {
    return moment(date).subtract(amount, type).format("D-MMM-YYYY");
  }
  
  filters.returnAge = function (date_of_birth) {
    return moment().diff(date_of_birth, 'years');
  }

  filters.returnTimeDiff = function (date) {

    var a = moment();
    var b = moment(date);
    
    var years = b.diff(a, 'years')
    var months = b.diff(a, 'months')
    var weeks = b.diff(a, 'weeks')
    var days = b.diff(a, 'days')

    // well this turned pretty crap
    if (days > 0) {
      if (days < 14) {
        return "(in " + days + " days)"
      }
      if (weeks < 11) {
        return "(in " + weeks + " weeks)"
      }
      if (months < 23) {
        return "(in " + months + " months)"
      }
      var remainingDays = days - (years * 365);
      return "(in " + years + " years and " + remainingDays + " days)";
    } else {
      days *= -1
      weeks *= -1
      months *= -1
      years *= -1
      if (days < 14) {
        return "(" + days + " days ago)"
      }
      if (weeks < 11) {
        return "(" + weeks + " weeks ago)"
      }
      if (months < 23) {
        return "(" + months + " months ago)"
      }
      var remainingDays = days - (years * 365);
      return "(" + years + " years and " + remainingDays + " days ago)";
    }
  }

  filters.returnTimeDiffWeeks = function (date) {
    var a = moment();
    var b = moment(date);

    var weeks = b.diff(a, 'weeks')

    // well this turned pretty crap
    if (weeks > 0) {
      return "(in " + weeks + " week" + (weeks >= 2 ? "s" : "") + ")"
    } else {
      weeks *= -1
      return "(" + weeks + " week" + (weeks >= 2 ? "s" : "") + " ago)"
    }
  }

  filters.returnTimeDiffDays = function (date) {
    var a = moment();
    var b = moment(date);

    var days = b.diff(a, 'days')

    if (days > 0) {
      return "(in " + days + " day" + (days >= 2 ? "s" : "") + ")"
    } else {
      days *= -1
      return "(" + days + " day" + (days >= 2 ? "s" : "") + " ago)"
    }
  }

  filters.removeBrackets = function (text) {
    return text.replace(/[()]/g, ''); 
  }

  filters.returnDateFormat = function (date) {
    return moment(date).format("D-MMM-YYYY");
  }

  filters.returnNumericDateFormat = function (date) {
    return moment(date).format("DD-MM-YYYY");
  }

  filters.returnDashes = function (date) {
    return moment(date).format("D-MMM-YYYY");
  }

  filters.replaceSpacesWithDashes = function (text) {
    return text.replace(/\s+/g, "-").toLowerCase();
  }
  
  filters.formatNHSNumber = function (nhs_number) {
    str = nhs_number.toString();
    str1 = str.slice(0, 3);
    str2 = str.slice(3, 6);
    str3 = str.slice(6, 10);
    return str1 + " " + str2 + " " + str3;
  } 

  filters.returnReasonGuidance = function (reason) {
    const guidanceValues = [
      {
        'Reason': 'Pregnancy',
        'Max': '12'
      },
      {
        'Reason': 'Recent test',
        'Max': '3'
      },
      {
        'Reason': 'Under care of colposcopy',
        'Max': '12'
      },
      {
        'Reason': 'Undergoing treatment relevant to screening',
        'Max': '18'
      },
      {
        'Reason': 'Discharge from colposcopy',
        'Max': '36/60'
      },
      {
        'Reason': 'Patient wishes to defer',
        'Max': '18'
      },
      {
        'Reason': 'Administrative',
        'Max': '36/60'
      }
    ]

    return guidanceValues.find((guidance) => guidance.Reason == reason).Max;
  }

  filters.returnResultText = function (resultCode) {
    const resultText = [
      { Code: 'x', Result: 'No cytology result' },
      { Code: '1', Result: 'Inadequate cytology' },
      { Code: '2', Result: 'Normal cytology' },
      { Code: '3', Result: 'Low grade dyskaryosisllow' },
      { Code: '4', Result: 'High-grade dyskaryosis (severe)' },
      { Code: '5', Result: 'High-grade dyskaryosis invasive squamous carcinoma' },
      { Code: '6', Result: 'Glandular neoplasia of endocervical type' },
      { Code: '7', Result: 'High-grade dyskaryosis (moderate)' },
      { Code: '8', Result: 'Borderline squamous' },
      { Code: '9', Result: 'Borderline endocervical' },
      { Code: '0', Result: 'Glandular neoplasia (non-cervical)' }
    ]
    try {
      return resultText.find((result) => result.Code == resultCode.toLowerCase()).Result;
    }
    catch(err) {
      console.log(err)
    }
    
  }

  filters.returnInfectionText = function (infectionCode) {
    const infectionText = [
      { Code: '0', Infection: 'HPV negative' },
      { Code: 'u', Infection: 'HPV not available' },
      { Code: '9', Infection: 'HPV positive' }
    ]
    try {
      return infectionText.find((infection) => infection.Code == infectionCode.toLowerCase()).Infection;
    }
    catch(err) {
      console.log(err)
    }
  }

  filters.returnUnixTime = function (date) {
    //return moment(date).format("unix");
    return moment(date).unix();
  }

  filters.returnActionText = function (actionCode) {
    const actionText = [
      { Code: 'a', Action: 'Routine recall' },
      { Code: 'r', Action: 'Early recall' },
      { Code: 's', Action: 'Refer colposcopy' }
    ]
    try {
      return actionText.find((action) => action.Code == actionCode.toLowerCase()).Action;
    }
    catch(err) {
      console.log(err)
    }
  }
//
//  filter.returnUnixTime = function (date) {
//    console.log(moment(date))
    //return moment(date).unix();
//  }


  /* ------------------------------------------------------------------
    add your methods to the filters obj below this comment block:
    @example:

    filters.sayHi = function(name) {
        return 'Hi ' + name + '!'
    }

    Which in your templates would be used as:

    {{ 'Paul' | sayHi }} => 'Hi Paul'

    Notice the first argument of your filters method is whatever
    gets 'piped' via '|' to the filter.

    Filters can take additional arguments, for example:

    filters.sayHi = function(name,tone) {
      return (tone == 'formal' ? 'Greetings' : 'Hi') + ' ' + name + '!'
    }

    Which would be used like this:

    {{ 'Joel' | sayHi('formal') }} => 'Greetings Joel!'
    {{ 'Gemma' | sayHi }} => 'Hi Gemma!'

    For more on filters and how to write them see the Nunjucks
    documentation.

  ------------------------------------------------------------------ */

  /* ------------------------------------------------------------------
    keep the following line to return your filters to the app
  ------------------------------------------------------------------ */
  return filters
}



//    const formatTime = (dateTime) => moment(dateTime)
//      .format('h.mma')
//      .replace('.00', '')
//      .replace('12am', 'midnight')
//      .replace('12pm', 'midday');
//    
//    let date = new Date();
//    
//    describe("formatTime function", () => {
//      beforeEach(function () {
//        date = new Date();
//      });
//    
//      it('uses "." as time separator', () => {
//        date.setHours(10)
//        date.setMinutes(30);
//        expect(formatTime(date)).toEqual('10.30am');
//      });
//    
//      it('uses lowercase am/pm with no spaces rather than 24hr clock', () => {
//        date.setHours(22)
//        date.setMinutes(00);
//        expect(formatTime(date)).toEqual('10pm');
//      });
//    
//      it('hides any "0"s before hours', () => {
//        date.setHours(9);
//        date.setMinutes(30);
//        expect(formatTime(date)).toEqual('9.30am');
//      });
//    
//      it('hides minutes if they are "00"', () => {
//        date.setHours(9);
//        date.setMinutes(00);
//        expect(formatTime(date)).toEqual('9am');
//      });
//    
//      it('displays midnight rather than 00:00pm', () => {
//        date.setHours(00);
//        date.setMinutes(00)
//        expect(formatTime(date)).toEqual('midnight');
//      });
//    
//      it('displays midday rather than 12:00pm', () => {
//        date.setHours(12)
//        date.setMinutes(00);
//        expect(formatTime(date)).toEqual('midday');
//      });
//    });