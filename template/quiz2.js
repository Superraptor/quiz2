/*global $, alert, console, jQuery: false */

(function () {
	// This is where you will write your function for the programming challenge
	// Do not commit console.log statements
	// Use ajax to reach the api endpoint
	// Whether or not you use jQuery, you still have to fix the jQuery errors. Removing jQuery is not fixing the problem.
	"use strict";
	$(document).ready(function () {
		
		function readCookie(name) {
			var nameEQ = name + "=", ca = document.cookie.split(';'), i, c;
			for (i = 0; i < ca.length; i += 1) {
				c = ca[i];
				while (c.charAt(0) === ' ') {
					c = c.substring(1, c.length);
				}
				if (c.indexOf(nameEQ) === 0) {
					return c.substring(nameEQ.length, c.length);
				}
			}
			return null;
		}
		
		function createCookie(name, value, days) {
			var date, expires;
			if (days) {
				date = new Date();
				date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
				expires = "; expires=" + date.toGMTString();
			} else {
				expires = "";
			}
			document.cookie = name + "=" + value + expires + "; path=/";
			console.log(document.cookie.split(';'));
		}
		
		console.log(readCookie('myCookie'));
		
		var $mouseover = $('.mouseover'), $click = $('.click'), $submit = $('.submit'), $sendData = $('#sendData'), $changeIt = $('#changeIt'), $keepIt = $('#keepIt'), $prevData = [];

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
		
		readCookie('mycookie');
	

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
					
					
					$('.returndata').append('<button id="keepIt" class="myButton">Keep It</button>');
					
					var $stuff = response, $interestsArray = $stuff.data, $prevData = $stuff.data;
					
					$('.answers').empty();
					$('.answers').append('<ul class="inner"></ul>');
					
					jQuery.each($interestsArray, function (index, value) {
						$('.answers .inner').append('<li>' + value + '</li>');
					});
					
					$keepIt.unbind();
					$keepIt = $('#keepIt');
					$keepIt.bind("click", function (event) {
						createCookie('myCookie', $prevData, 1);
						console.log(readCookie('myCookie'));
					});
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