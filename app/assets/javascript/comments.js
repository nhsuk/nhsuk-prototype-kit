$(document).ready(function() {


	$('button').click(function() {


		var comment = $('.commentBox').val(); // This is the text area

		$('<li class="nhsuk-panel">').text(comment).prependTo('.nhsuk-comment-container');

		//$('button').attr('enabled');
		$('.counter').text('140');
		$('.commentBox').val('');
	});

	$('.commentBox').keyup(function() {
		var commentLength = $(this).val().length;
		var charLeft =  140 - commentLength;
		$('.counter').text(charLeft);


});
