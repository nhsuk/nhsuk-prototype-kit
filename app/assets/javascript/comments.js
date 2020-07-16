$(document).ready(function() {
	$('button').click(function() {
		var comment = $('.commentBox').val();
		$('<li class="nhsuk-panel">').text(comment).prependTo('.nhsuk-comment-container');
		$('button').attr('disabled', 'true');
		$('.counter').text('140');
		$('.commentBox').val('');
	});

	$('.commentBox').keyup(function() {
		var commentLength = $(this).val().length;
		var charLeft =  140 - commentLength;
		$('.counter').text(charLeft);

		if (commentLength == 0) {
			$('button').attr('disabled', 'true');
		}
		else if (commentLength > 140) {
			$('button').attr('disabled', 'true');
		}
		else {
			$('button').removeAttr('disabled', 'true');
		}
	});

	$('button').attr('disabled', 'true');

});
