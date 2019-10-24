$(document).ready(function() {

  function compare(idx) {
    return function(a, b) {
      var A = getCell(a, idx), B = getCell(b, idx)
      return $.isNumeric(A) && $.isNumeric(B) ?
        A - B : A.toString().localeCompare(B)
    }
  }

  function getCell(tr, index){
    return $(tr).children('td').eq(index).text()
  }

  $('table thead th').click(function() {
    var table = $(this).parents('table').eq(0);
    var row = table.find('tr:gt(0)').toArray().sort(compare($(this).index()));

    this.asc = !this.asc;

    if(!this.asc) {
      row.reverse();
    }

    $.each(row, function(key, value) {
      table.append(row[key]);
    });

    flipIcon($(this), this.asc);
  });

});
