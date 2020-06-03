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

  filters.returnPastDate = function (amount, type) {
    return moment().subtract(amount, type).format("D-MMM-YYYY");
  }
  // {{ "2" | returnDate("years") }}

/*
  filters.returnPastDate = function (date) {
    return moment().subtract(date, 'days').format("dddd D MMMM YYYY");
  }

  filters.returnTime = function (date) {
    if (date == "now") {
      return moment().format("h:mm a");
    }
    if (date == "30MinAgo") {
      return moment().subtract(30, 'minutes').format("h:mm a");
    }
*/
  
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
      return "(in " + years + " years)"
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
      return "(" + years + " years ago)"
    }
  }

  filters.removeBrackets = function (text) {
    return text.replace(/[()]/g, ''); 
  }

  filters.returnDateFormat = function (date) {
    return moment(date).format("D-MMM-YYYY");
  }
  
  filters.formatNHSNumber = function (nhs_number) {
    str = nhs_number.toString();
    str1 = str.slice(0, 3);
    str2 = str.slice(3, 6);
    str3 = str.slice(6, 10);
    return str1 + " " + str2 + " " + str3;
  } 

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