$('nav.nhsuk-tabs li a').click(function() {
  $('nav.nhsuk-tabs li a').removeClass('selected');
  $(this).addClass('selected');

  var target = $(this).attr('href');
  $('.tab').removeClass('active');
  $(target).addClass('active');
})

function myFunction() {
  var element = document.getElementByClass(".nhsuk-header__navigation-item");
  element.classList.add(".nhsuk-header__navigation-item--current");
}
