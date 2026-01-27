"use strict";

const BoolC = (
	/* Any */ object
) => {
	
	return (
		typeof object == "string" &&
		/^(?:-?0+(?:\.0+)?|-?0x0+n?|nan|-?0+n|false|no|undefined|null)$/.test(object.toLowerCase())
	) ? false : (object) ? true : false;
	
}

chrome.runtime.onMessage.addListener((
	/* Any */ request, /* MessageSender */ sender,
	/* Func(Any) */ sendResponse
) => {
	
	/*
		{ id: "getOptions" }
		{ id: "putOptions", options?: {
				shortsRemover?: truthy|falsy,
				embedEndpoint?: truthy|falsy
			}
		}
	*/
	
	if (
		"id" in sender &&
		sender.id == chrome.runtime.id /* Only Internal Messaging */
	) {
		
		if (
			typeof request == "object" &&
			"id" in request &&
			typeof request.id == "string"
		) {
			
			if (request.id == "getOptions") {
				
				chrome.storage.local.get([
					"options_shortsRemover", "options_embedEndpoint"], (
					/* Object */ storage
				) => {
					
					let options = {};
					options.shortsRemover = ("options_shortsRemover" in storage) ?
						BoolC(storage.options_shortsRemover) : true;
					options.embedEndpoint = ("options_embedEndpoint" in storage) ?
						BoolC(storage.options_embedEndpoint) : true;
					
					sendResponse(options);
					
				});
				
				return true;
				
			}
			
			if (request.id == "putOptions") {
				
				let changeStorage = {};
				
				if (
					"options" in request &&
					typeof request.options == "object"
				) {
					
					if ("shortsRemover" in request.options)
						changeStorage.options_shortsRemover = BoolC(request.options.shortsRemover);
					if ("embedEndpoint" in request.options)
						changeStorage.options_embedEndpoint = BoolC(request.options.embedEndpoint);
					
				}
				
				chrome.storage.local.set(changeStorage, (
					/* Undefined */
				) => {
					
					sendResponse();
					
				});
				
				return true;
				
			}
			
		}
		
	}
	
	return ;
	
});
