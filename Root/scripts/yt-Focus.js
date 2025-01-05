"use strict";

const ytTab = Object.preventExtensions(
	Object.create(Object.prototype, {
		
		hostType: {
			
			enumerable: true,
			get() /* -> ["mobile", "desktop", null] */ {
				
				return (
					(/^(?:www\.)?m\.youtube(?:\.[A-Za-z]+)+$/.test(window.location.host)) ?
					"mobile" :
					/^(?:www\.)?youtube(?:\.[A-Za-z]+)+$/.test(window.location.host) ?
					"desktop" : null
				);
				
			}
			
		},
		
		endpoint: {
			
			enumerable: true,
			get() /* -> String */ {
				return window.location.pathname;
			}
			
		},
		
		query: {
			
			enumerable: true,
			get() /* -> Map() */ {
				
				let query = new Map();
				const search = (window.location.search.startsWith("?")) ? 
					window.location.search.slice(1) : window.location.search;
				
				for (let cur of search.split("&")) {
					let keyValuePair = cur.split("=");
					if (keyValuePair.length == 1)
						query.set(decodeURIComponent(keyValuePair[0]), "");
					if (keyValuePair.length >  1)
						query.set(decodeURIComponent(keyValuePair[0]),
							decodeURIComponent(keyValuePair.slice(1).join("=")));
				}
				
				return query;
				
			}
			
		}
		
	})
	
);

chrome.runtime.sendMessage({ id: "getOptions" }, (
	/* Object */ options
) => {
	
	if (options.shortsRemover) {
		
		
		
	}
	
	if (options.embedEndpoint) {
		
		
		
	}
	
});
