/**
 * Netflix Enhancements
 * Copyright (c) 2012 Chris Nanney
 * https://github.com/cnanney/Netflix-Enhancements
 *
 * Licensed under MIT
 * http://www.opensource.org/licenses/mit-license.php
 */

(function(){

	chrome.webRequest.onCompleted.addListener(
		function(details){
			chrome.tabs.get(details.tabId, function(tab){
				// Fixes "Port error: Could not establish connection. Receiving end does not exist."
				if (tab.status == 'complete' && localStorage['ne-opt-details'] == '1'){
					chrome.tabs.sendMessage(details.tabId, {greeting: "webRequest"}, function(response){});
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

	// To show a page action only on netflix requires the tabs permission,
	// so that's where the 'your tabs and browsing history' warning comes in.
	chrome.tabs.onUpdated.addListener(
		function(tabId, changeInfo, tab){
			if (tab.url.indexOf('netflix.com') != -1){
				chrome.pageAction.show(tabId);
			}
		}
	);

	// Default vars
	if (typeof localStorage['ne-opt-details'] == 'undefined') localStorage['ne-opt-details'] = '1';
	if (typeof localStorage['ne-opt-rt'] == 'undefined') localStorage['ne-opt-rt'] = '1';

	chrome.extension.onMessage.addListener(
		function(request, sender, sendResponse){
			if (request.req == 'storage')
				sendResponse({storage: localStorage});
			if (request.req == 'log')
				console.log(request.data);
		}
	);

})();