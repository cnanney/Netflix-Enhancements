/**
 * Netflix Details Link
 * Copyright (c) 2012 Chris Nanney
 * https://github.com/cnanney/Netflix-Details-Link
 *
 * Licensed under MIT
 * http://www.opensource.org/licenses/mit-license.php
 */

(function(){

	chrome.webRequest.onCompleted.addListener(
		function(details){
			chrome.tabs.get(details.tabId, function(tab){
				// Fixes "Port error: Could not establish connection. Receiving end does not exist."
				if (tab.status == 'complete'){
					chrome.tabs.sendMessage(details.tabId, {greeting: "webRequest"}, function(response){
						//response && console.log('Netflix Details Link called via webRequest: '+response.elapsed+'ms');
					});
				}
			});
		},
		{
			urls: [
				"*://movies.netflix.com/WiGenre*",
				"*://movies.netflix.com/WiAltGenre*"
			],
			types: ["xmlhttprequest"]
		}
	);

})();