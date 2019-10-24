$('nav.nhsuk-tabs li a').click(function() {
  $('nav.nhsuk-tabs li a').removeClass('selected');
  $(this).addClass('selected');

  var target = $(this).attr('href');
  $('.tab').removeClass('active');
  $(target).addClass('active');
})
