/**
 * Netflix Details Link
 * Copyright (c) 2012 Chris Nanney
 * https://github.com/cnanney/Netflix-Details-Link
 *
 * Licensed under MIT
 * http://www.opensource.org/licenses/mit-license.php
 */

(function(){

	chrome.extension.onMessage.addListener(
		function(request, sender, sendResponse){
			if (request.greeting == "webRequest"){
				sendResponse({elapsed: run(true)});
			}

		}
	);

	var run = function(t){

		var start = new Date().getMilliseconds();
		var time = typeof t === "boolean" ? t : false;
		var linkRegex = /^https?:\/\/movies\.netflix\.com\/WiPlayer\?movieid=([\d]+)/;

		$('span.hoverPlay:not(.ndl-processed)').each(function(){

			var link = $(this).find('a.playLink').attr('href');

			if (link && linkRegex.test(link)){
				var detailsUrl = 'http://movies.netflix.com/WiMovie/'+link.match(linkRegex)[1];
				var badge = document.createElement('a');
				badge.className = 'episodeBadge';
				badge.href = detailsUrl;
				badge.innerHTML = 'Details';
				this.appendChild(badge);
			}

			$(this).addClass('ndl-processed');

		});

		var stop = new Date().getMilliseconds();

		return time ? (stop - start) : true;
	}

	run();

})();