// ES6 or Vanilla JavaScript

// Add autofocus and error focusing for error summary
document.addEventListener('DOMContentLoaded', function () {
  // Error summary component
  var summary = document.querySelector('.nhsuk-error-summary');
  if (summary) {
    // Focus error summary component if it exists
    summary.focus();
    // Error summary links
    var summaryLinks = document.querySelectorAll('.nhsuk-error-summary__list a');
    // Attach click event to each error summary link
    for (var i = 0; i < summaryLinks.length; i++) {
      summaryLinks[i].addEventListener('click', function (event) {
        event.preventDefault();
        // Input component to focus
        var input = document.querySelector(event.target.hash);
        // Focus input component if it exists
        if (input) input.focus();
      });
    };
  };
});
