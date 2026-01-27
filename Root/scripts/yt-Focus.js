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
	
} /* -> SVGElement, null */

/*
	---- ---- ---- ----
*/

const ytTab = Object.preventExtensions(
	Object.create(Object.prototype, {
		
		hostType: {
			
			enumerable: true,
			get() /* -> "mobile", "desktop", null */ {
				
				return (
					(/^(?:www\.)?m\.youtube(?:\-nocookie)?(?:\.[A-Za-z]+)+$/.test(window.location.host)) ?
					"mobile" :
					/^(?:www\.)?youtube(?:\-nocookie)?(?:\.[A-Za-z]+)+$/.test(window.location.host) ?
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

const ShortsRemover = (
	/* Undefined */
) => {
	
	let targetNode = document.body;
	
	/* Shorts endpoints */
	
	if (ytTab.hostType == "mobile") {
		for (let yt_endpoint of targetNode.querySelectorAll(".pivot-bar-item-tab.pivot-shorts")) {
			yt_endpoint.parentNode.remove();
		}
	}
	
	if (ytTab.hostType == "desktop") {
		for (let yt_endpoint of targetNode.querySelectorAll("#endpoint[title=\"Shorts\"]")) {
			yt_endpoint.parentNode.remove();
		}
	}
	
	/* Shorts suggestions */
	
	if (ytTab.endpoint.endsWith("/")) {
		
		if (ytTab.hostType == "mobile") {
			
			/* yt-shorts sections */
			for (let yt_section of targetNode.querySelectorAll("ytm-rich-section-renderer")) {
				if (yt_section.querySelector("ytm-shorts-lockup-view-model") != null)
					yt_section.remove();
			}
			
			/* loose shorts */
			for (let yt_item of targetNode.querySelectorAll("ytm-rich-item-renderer")) {
				if (yt_item.querySelector(".media-item-thumbnail-container[href*=\"/shorts\"]") != null)
					yt_item.remove();
			}
			
		}
		
		if (ytTab.hostType == "desktop") {
			
			/* yt-shorts sections */
			for (let yt_section of targetNode.querySelectorAll("ytd-rich-section-renderer")) {
				if (yt_section.querySelector("ytd-rich-item-renderer ytm-shorts-lockup-view-model") != null)
					yt_section.remove();
			}
			
			/* loose shorts */
			for (let yt_item of targetNode.querySelectorAll("ytd-rich-item-renderer")) {
				if (yt_item.querySelector("ytm-shorts-lockup-view-model") != null)
					yt_item.remove();
			}
			
		}
		
	}
	
	if (ytTab.endpoint.endsWith("/results")) {
		
		if (ytTab.hostType == "mobile") {
			
			/* yt-shorts sections */
			for (let yt_section of targetNode.querySelectorAll("ytm-reel-shelf-renderer")) {
				if (yt_section.querySelector("ytm-shorts-lockup-view-model") != null)
					yt_section.remove();
			}
			
			/* loose shorts */
			for (let yt_item of targetNode.querySelectorAll("ytm-compact-radio-renderer, ytm-video-with-context-renderer")) {
				if (yt_item.querySelector(".media-item-thumbnail-container[href*=\"/shorts\"]") != null || yt_item.querySelector("ytm-shorts-lockup-view-model") != null)
					yt_item.remove();
			}
			
		}
		
		if (ytTab.hostType == "desktop") {
			
			/* yt-shorts sections */
			for (let yt_section of targetNode.querySelectorAll("ytd-reel-shelf-renderer")) {
				if (yt_section.querySelector("ytm-shorts-lockup-view-model") != null)
					yt_section.remove();
			}
			
			/* loose shorts */
			for (let yt_item of targetNode.querySelectorAll("ytd-video-renderer")) {
				if (yt_item.querySelector("#thumbnail[href*=\"/shorts\"]") != null || yt_item.querySelector("ytm-shorts-lockup-view-model") != null)
					yt_item.remove();
			}
			
		}
		
	}
	
	if (ytTab.endpoint.endsWith("/watch")) {
		
		if (ytTab.hostType == "mobile") {
			
			/* yt-shorts sections */
			for (let yt_section of targetNode.querySelectorAll("ytm-reel-shelf-renderer")) {
				if (yt_section.querySelector("ytm-shorts-lockup-view-model") != null)
					yt_section.remove();
			}
			
			/* loose shorts */
			for (let yt_item of targetNode.querySelectorAll("ytm-compact-radio-renderer, ytm-video-with-context-renderer")) {
				if (yt_item.querySelector(".media-item-thumbnail-container[href*=\"/shorts\"]") != null)
					yt_item.remove();
			}
			
		}
		
		if (ytTab.hostType == "desktop") {
			
			/* yt-shorts sections */
			for (let yt_section of targetNode.querySelectorAll("ytd-reel-shelf-renderer")) {
				if (yt_section.querySelector("ytm-shorts-lockup-view-model") != null)
					yt_section.remove();
			}
			
			/* loose shorts */
			for (let yt_item of targetNode.querySelectorAll("ytd-compact-video-renderer")) {
				if (yt_item.querySelector("#thumbnail[href*=\"/shorts\"]") != null)
					yt_item.remove();
			}
			
		}
		
	}
	
	if (/\/shorts\/.*?$/.test(ytTab.endpoint)) {
		
		if (ytTab.hostType == "mobile") {
			
			if (targetNode.querySelector("#player-container-id") != null)
				targetNode.querySelector("#player-container-id")
					.remove();
			
			if (targetNode.querySelector("#bd323b9e-6a5f-47b2-a02c-864111679b2f") == null) {
				
				if (targetNode.querySelector("#app") != null) {
					
					let yt_app = targetNode.querySelector("#app");
					yt_app.style.backgroundColor = "black";
					
					let container = document.createElement("div");
					container.setAttribute("id", "bd323b9e-6a5f-47b2-a02c-864111679b2f");
					container.style.position = "fixed";
					container.style.display = "flex";
					container.style.left = "0%";
					container.style.top = "0%";
					container.style.width = "100%";
					container.style.height = "100%";
					container.style.justifyContent = "center";
					container.style.alignItems = "center";
					container.style.zIndex = "-1";
					
					let svgAsset = CreateSvgAsset(SvgAssetId.NotFound, "lightgray");
					svgAsset.style.height = "28%";
					
					container.appendChild(svgAsset);
					yt_app.parentNode.insertBefore(container, yt_app.nextSibling);
					
				}
				
			}
			
		}
		
		if (ytTab.hostType == "desktop") {
			
			if (targetNode.querySelector("#bd323b9e-6a5f-47b2-a02c-864111679b2f") == null) {
				
				if (targetNode.querySelector("ytd-shorts") != null) {
					
					let yt_shorts = targetNode.querySelector("ytd-shorts");
					yt_shorts.setAttribute("id", "bd323b9e-6a5f-47b2-a02c-864111679b2f");
					yt_shorts.innerHTML = "";
					
					let container = document.createElement("div"); /* Using yt Style Sheet */
					container.setAttribute("id", "shorts-container");
					container.setAttribute("class", "style-scope ytd-shorts");
					container.style.alignItems = "center";
					
					let svgAsset = CreateSvgAsset(SvgAssetId.NotFound, "lightgray");
					svgAsset.style.height = "28%";
					container.appendChild(svgAsset);
					
					yt_shorts.appendChild(container);
					
				}
				
			}
			
		}
		
	}
	
}

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
			
			if (container != null) {
				
				let x = document.createElement("div")
				x.setAttribute("id", "d1ed5d8a-10d9-49a7-a5de-2251c044ff2a");
				x.setAttribute("class",
					"yt-spec-button-view-model slim_video_action_bar_renderer_button");
				
				let embedEndpoint = document.createElement("a");
				embedEndpoint.style.textDecoration = "none";
				embedEndpoint.setAttribute("button-renderer", "true");
				embedEndpoint.setAttribute("class",
					"yt-spec-button-shape-next " +
					"yt-spec-button-shape-next--tonal yt-spec-button-shape-next--mono " +
					"yt-spec-button-shape-next--size-m " +
					"yt-spec-button-shape-next--icon-leading");
				
				embedEndpoint.innerHTML = "<b>&#128437;</b>&ensp;Embed";
				embedEndpoint.setAttribute("target", "_self");
				embedEndpoint.setAttribute("href",
					(!query.has("v")) ? "https://www.youtube.com/embed/xxxxxxxxxxx?rel=0" :
						("https://www.youtube.com/embed/" + query.get("v") + "?rel=0")
				);
				
				x.appendChild(embedEndpoint);
				container.appendChild(x);
				
			}
			
		}
		
	}
	
	if (ytTab.hostType == "desktop" && ytTab.endpoint.endsWith("/watch")) {
		
		if (document.body.querySelector("#d1ed5d8a-10d9-49a7-a5de-2251c044ff2a") == null) {
			
			let container = document.body.querySelector(
					"ytd-watch-metadata #actions ytd-menu-renderer #top-level-buttons-computed"
			);
			
			if (container != null) {
				
				let embedEndpoint = document.createElement("a");
				embedEndpoint.style.textDecoration = "none";
				embedEndpoint.setAttribute("id", "d1ed5d8a-10d9-49a7-a5de-2251c044ff2a");
				embedEndpoint.setAttribute("button-renderer", "true");
				embedEndpoint.setAttribute("class",
					"ytd-menu-renderer yt-spec-button-view-model yt-spec-button-shape-next yt-spec-button-shape-next--tonal " +
					"yt-spec-button-shape-next--mono yt-spec-button-shape-next--size-m " +
					"yt-spec-button-shape-next--icon-leading");
				
				embedEndpoint.innerHTML = "<b>&#128437;</b>&ensp;Embed";
				embedEndpoint.setAttribute("target", "_self");
				embedEndpoint.setAttribute("href",
					(!query.has("v")) ? "https://www.youtube.com/embed/xxxxxxxxxxx?rel=0" :
						("https://www.youtube.com/embed/" + query.get("v") + "?rel=0")
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
			
			ShortsRemover(); /* Initial Call */
			
			let _ey51e934e2 = new MutationObserver((
				/* MutationRecord[] */ mutations, /* MutationObserver */ observer
			) => {
				ShortsRemover();
			});
			
			_ey51e934e2.observe(document.body, {
				childList: true, subtree: true
			});
			
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
