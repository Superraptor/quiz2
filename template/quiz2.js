/*global $, alert, console, jQuery: false */

(function () {
	// This is where you will write your function for the programming challenge
	// Do not commit console.log statements
	// Use ajax to reach the api endpoint
	// Whether or not you use jQuery, you still have to fix the jQuery errors. Removing jQuery is not fixing the problem.
	"use strict";
	$(document).ready(function () {
		
		var $mouseover = $('.mouseover'), $click = $('.click'), $submit = $('.submit'), $sendData = $('#sendData'), $changeIt = $('#changeIt'), $keepIt = $('#keepIt'), $prevData = [], $myCookie;
		
		console.log(document.cookie);
		if (document.cookie.length > 0) {
			$myCookie = document.cookie.split("=")[1];
			$(".prevData").append("<p>The previous data returned was: " + $myCookie + "</p>");
			console.log(document.cookie);
			document.cookie = "";
		}

		$mouseover.mouseover(function () {
			var $this = $(this);
			$(this).html('Scrooge McDuck!');
			$(this).height($(this).height() + 50);
		});

		$click.click(function () {
			var $this = $(this);
			$(this).html('Peace Out!');
			$(this).fadeOut(1500);
			return false;
		});

		$submit.submit(function (e) {
			e.preventDefault();
			if ($(this).find('input[type="text"]').val() !== '') {
				$(this).find('input').each(function () {
					$(this).fadeOut('slow');
				});
				$(this).append("<h2>Congratulations! You've entered some text!</h2>");
			}
			return false;
		});

	
		$('.content').hide();
		setTimeout(function () { $('.content').fadeIn('slow'); }, 1000);
	

		$sendData.click(function () {
			jQuery.ajax({
				type: 'POST',
				url: 'http://www.mattbowytz.com/simple_api.json?data=quizData',
				data: {
					data: "quizData"
				},
				datatype: "json",
				success: function (response) {
					$('#sendData').empty();
					$('#sendData').html('Change It').removeAttr('id').attr('id', 'changeIt');
					
					var $stuff = response, $interestsArray = $stuff.data, $prevData = $interestsArray[Math.floor(Math.random() * $interestsArray.length)];
					
					$('.returndata').append("<button class='myButton' onclick = " + '"' + "document.cookie = 'cookie=' + " + "'" + $prevData + "'" + "; location.reload();" + '"' + " type= " + '"' + "button" + '"' +  ">Keep It!</button>");
							
					$('.answers').empty();
					$('.answers').append('<ul class="inner"></ul>');
					$('.answers .inner').append('<li>' + $prevData + '</li>');
					
					$keepIt.unbind();
					$keepIt = $('#keepIt');
					$sendData.unbind();
					$changeIt = $('#changeIt');
					$changeIt.bind("click", function (event) {
						console.log("There is nothing to be done here... according to the directions?");
					});
				}
			});

			return false;
		});
		
	});
	
}(jQuery));