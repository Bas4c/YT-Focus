"use strict";

const SvgAssetId = Object.freeze({
	NotFound: "Svg#S#NotFound"
});

const CreateSvgAsset = (
	/* String */ id,
	/* cssColor */ cssColor
) => {
	
	if ((typeof id != "string") || (typeof cssColor != "string")) {
		throw TypeError("\"id\" or \"cssColor\" is not string type");
	}
	
	if (!CSS.supports("color", cssColor)) {
		throw TypeError("\"cssColor\" is invalid CSS color");
	}
	
	if (id == SvgAssetId.NotFound) {
		
		let svgAsset = document.createElementNS(
			"http://www.w3.org/2000/svg",
			"svg"
		);
		
		svgAsset.setAttribute("xmlns", "http://www.w3.org/2000/svg");
		svgAsset.setAttribute("viewBox", "0 0 10 10");
		svgAsset.setAttribute("preserveAspectRatio", "xMidYMid meet");
		
		let svgAssetShape = document.createElementNS(
			"http://www.w3.org/2000/svg",
			"path"
		);
		
		svgAssetShape.setAttribute("fill", cssColor);
		svgAssetShape.setAttribute("d",
			"M3.5 6.5q.5.5 1 0L5 6l.5.5q.5.5 1 0t0-1L6 5l.5-.5q.5-.5 0-1t-1 0L5 4l-.5-.5q-.5-.5-1 0t0 1L4 5l-.5.5q-.5.5 0 1ZM5 1A1 1 0 005 9 1 1 0 005 1M5 0A1 1 0 015 10 1 1 0 015 0Z");
		
		svgAsset.appendChild(svgAssetShape);
		
		return svgAsset;
		
	}
	
	return null;
	
} /* -> [SVGElement, null] */

/*
	---- ---- ---- ----
*/

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

/*
	---- ---- ---- ----
*/

const InjectEmbedEndpoint = (
	/* Undefined */
) => {
	
	const query = ytTab.query;
	
	if (ytTab.hostType == "mobile" && ytTab.endpoint.endsWith("/watch")) {
		
		if (document.body.querySelector("#d1ed5d8a-10d9-49a7-a5de-2251c044ff2a") == null) {
			
			let container = document.body.querySelector(
				".slim-video-action-bar-actions"
			);
			
			if (container != null){
				
				let embedEndpoint = document.createElement("a");
				embedEndpoint.style.textDecoration = "none";
				embedEndpoint.setAttribute("id", "d1ed5d8a-10d9-49a7-a5de-2251c044ff2a");
				embedEndpoint.setAttribute("button-renderer", "true");
				embedEndpoint.setAttribute("class",
					"slim_video_action_bar_renderer_button yt-spec-button-shape-next " +
					"yt-spec-button-shape-next--tonal yt-spec-button-shape-next--mono " +
					"yt-spec-button-shape-next--size-m " +
					"yt-spec-button-shape-next--icon-leading");
				
				embedEndpoint.innerHTML = "<b>&#128437;</b>&ensp;Embed";
				embedEndpoint.setAttribute("href", 
					(!query.has("v")) ? "https://www.youtube.com/embed/XXXXXXXXXXX" :
						("https://www.youtube.com/embed/" + query.get("v"))
				);
				
				container.appendChild(embedEndpoint);
				
			}
			
		}
	}
	
	if (ytTab.hostType == "desktop" && ytTab.endpoint.endsWith("/watch")) {
		
		if (document.body.querySelector("#d1ed5d8a-10d9-49a7-a5de-2251c044ff2a") == null) {
			
			let container = document.body.querySelector(
					"ytd-watch-metadata #actions ytd-menu-renderer #top-level-buttons-computed"
			);
			
			if (container != null){
				
				let embedEndpoint = document.createElement("a");
				embedEndpoint.style.textDecoration = "none";
				embedEndpoint.setAttribute("id", "d1ed5d8a-10d9-49a7-a5de-2251c044ff2a");
				embedEndpoint.setAttribute("button-renderer", "true");
				embedEndpoint.setAttribute("class",
					"ytd-menu-renderer yt-spec-button-shape-next yt-spec-button-shape-next--tonal " +
					"yt-spec-button-shape-next--mono yt-spec-button-shape-next--size-m " +
					"yt-spec-button-shape-next--icon-leading");
				
				embedEndpoint.innerHTML = "<b>&#128437;</b>&ensp;Embed";
				embedEndpoint.setAttribute("href", 
					(!query.has("v")) ? "https://www.youtube.com/embed/XXXXXXXXXXX" :
						("https://www.youtube.com/embed/" + query.get("v"))
				);
				
				container.appendChild(embedEndpoint);
				
			}
			
		}
		
	}
	
}

/*
	---- ---- ---- ----
*/

if (ytTab.hostType != null) {
	
	chrome.runtime.sendMessage({ id: "getOptions" }, (
		/* Object */ options
	) => {
		
		if (options.shortsRemover) {
			
			
			
		}
		
		if (options.embedEndpoint) {
			
			InjectEmbedEndpoint(); /* Initial Call */
			
			let _ey51e934e2 = new MutationObserver((
				/* MutationRecord[] */ mutations, /* MutationObserver */ observer
			) => {
				InjectEmbedEndpoint();
			});
			
			_ey51e934e2.observe(document.body, {
				childList: true, subtree: true
			});
			
		}
		
	});
	
}
