"use strict";
(function( $ ) { 
    $.fn.tabbedTable = function() { 
        this.filter( "table" ).each(function() {
            var tabs = [];
            var table = $(this);
            var randomId = 'tabbedTable-' + Math.floor((Math.random() * 100000) + 1);
          
            // wrap our table
            table.wrap('<div class="tabbedTable-wrapper">');
          
            // add an id
            table.addClass(randomId);
          
            // add a style tag to store visible / invisible columns
            $('body').append('<style class="'+ randomId +'-style"></style>');
          
            var wrapper = table.parent('.tabbedTable-wrapper');
          
            // Find table headers to hide
            $('th', table).each(function(i) {
              var tabName = $(this).attr('data-tabbedTable');
              if(tabName !== undefined) {
                var columnNumber = i + 1;
                // hide the columns
                // $('th:nth-child('+ columnNumber +'), td:nth-child('+ columnNumber +')', table).hide();
                
                // add the tabname to 
                if(tabs.indexOf(tabName) ==  -1) {
                  tabs.push(tabName);
                } 
              }
            });
          
            // add buttons
            var buttons = '';
            for (t = 0; t < tabs.length; t++) { 
                buttons += '<label class="tabbedTable-label">'+ tabs[t] + '</label>';
                
            }
            wrapper.prepend('<div class="tabbedTable-labels">' + buttons + '</div>');
          
            // click events
            $('.tabbedTable-label', wrapper).on('click', function(){
              $('.tabbedTable-label', wrapper).removeClass('tabbedTable-label--active');
              $(this).addClass('tabbedTable-label--active');
              var tabSelected = $(this).text();
              var styleContent = '';
              $('th', table).each(function(i){
                if($(this).attr('data-tabbedTable') !== undefined) {
                  // header index
                  var columnNumber = i + 1;

                  if(tabSelected == $(this).attr('data-tabbedTable')) {
                    // show columns
                    // $('th:nth-child('+ columnNumber +'), td:nth-child('+ columnNumber +')', table).show();
                    styleContent += '.'+ randomId +' th:nth-child(' + columnNumber + ') { display: table-cell; } ';
                    styleContent += '.'+ randomId +' td:nth-child(' + columnNumber + ') { display: table-cell; } ';
                  }
                  else {
                    // show columns
                    // $('th:nth-child('+ columnNumber +'), td:nth-child('+ columnNumber +')', table).hide(); 
                    styleContent += '.'+ randomId +' th:nth-child(' + columnNumber + ') { display: none; } ';
                    styleContent += '.'+ randomId +' td:nth-child(' + columnNumber + ') { display: none; } ';                 
                  }                  
                }
              });
              
              //var styleContent = '.'+ randomId +' td:nth-child(2) { background: red; }';
              
              // update <style> tag
              $('.' + randomId +'-style').html(styleContent);
            });
          
            // click first
            $('.tabbedTable-labels label:first', wrapper).click();
        }); 
        return this; 
    }; 
}( jQuery ));
 
// Usage example:
$( ".tabbedTable" ).tabbedTable();