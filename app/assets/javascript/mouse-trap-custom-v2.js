// this is just lazy beyond compare...even to my standards

$(document).ready(function() {
    Mousetrap.bind('?', function() { alert("Help Section - Keyboard Commands"); });

  // search
  Mousetrap.bind('e c', function(e) {
    var frm = document.getElementById("searchfield") || null;
    if (frm) {
        document.getElementById("searchfield").focus();
        document.getElementById('searchform').action = "http://localhost:3000/manage-participant/v2/screening-history-a-notes";
        return false;
    } else {
        window.location.href = "http://localhost:3000/manage-participant/v2/screening-history-a-notes";
    }
  });

  Mousetrap.bind('c y', function(e) {
    var frm = document.getElementById("searchfield") || null;
    if (frm) {
        document.getElementById("searchfield").focus();
        document.getElementById('searchform').action = "http://localhost:3000/manage-participant/v2/screening-history-a#testresults";
        return false;
    } else {
        window.location.href = "http://localhost:3000/manage-participant/v2/screening-history-a#testresults";
    }
  });

  Mousetrap.bind('up up down down left right left right b a', function() {
    window.location.href = "https://www.konami.com/games/eu/en/products/contra_rc/";
  });



  

  //document.getElementById("searchfield").onclick(console.log('clicked'));



//  Mousetrap.bind('ctrl c y', function(e) {
//    window.location.href = "http://localhost:3000/manage-participant/screening-history-a#test-results";
//    return false;
//  });

  Mousetrap.bind('h p', function(e) {
    window.location.href = "http://localhost:3000/manage-participant/v2/screening-history-a-hpv";
    return false;
  });

  Mousetrap.bind('e x i t', function() {
      alert('Are you sure you want to leave?');
  })
  
});