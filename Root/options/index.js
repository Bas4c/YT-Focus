"use strict";

const SvgAssetId = Object.freeze({
	SpinningWheel: "Svg#A#SpinningWheel",
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
	
	if (id == SvgAssetId.SpinningWheel) {
		
		let svgAsset = document.createElementNS(
			"http://www.w3.org/2000/svg",
			"svg"
		);
		
		svgAsset.setAttribute("xmlns", "http://www.w3.org/2000/svg");
		svgAsset.setAttribute("viewBox", "0 0 15 15");
		svgAsset.setAttribute("preserveAspectRatio", "xMidYMid meet");
		
		let svgAssetShape = document.createElementNS(
			"http://www.w3.org/2000/svg",
			"path"
		);
		
		svgAssetShape.setAttribute("fill", cssColor);
		svgAssetShape.setAttribute("d",
			"M5 8V7L1 6A1 1 0 000 7V8A1 1 0 001 9ZM4 13l2-3L5 9 2 11q-1 1 0 2t2 0m5 1-1-4H7L6 14a1 1 0 001 1H8a1 1 0 001-1m4-3-3-2-1 1 2 3q1 1 2 0t0-2m1-5-4 1V8l4 1a1 1 0 001-1V7A1 1 0 0014 6M11 2 9 5l1 1 3-2q1-1 0-2T11 2M6 1 7 5H8L9 1A1 1 0 008 0H7A1 1 0 006 1M2 4 5 6 6 5 4 2Q3 1 2 2T2 4Z");
		
		svgAsset.appendChild(svgAssetShape);
		
		svgAsset.animate(
			{ transform: [ "rotate(0deg)", "rotate(360deg)" ] },
			{ duration: 10000, iterations: Infinity }
		);
		
		return svgAsset;
		
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
	YT-Focus Options Element: Start
	 - "id" == "options id"
*/

function ytFocusOptElement(
	/* Undefined */
) {
	
	let x = Reflect.construct(HTMLElement, [],
		ytFocusOptElement);
	
	x.disabled = true;
	
	x.onclick = function(
		/* PointerEvent, KeyboardEvent */ event
	) {
		
		let bFlag = true;
		if (event instanceof KeyboardEvent && event.key != "Enter") {
			bFlag = false;
		}
		
		if (!this.disabled && bFlag && event.isTrusted) {
			
			let id = this.getAttribute("id");
			if (id == "shortsRemover") {
				
				this.disabled = true; /* Way to prevent Fast clicks */
				
				let changeOptions = {};
				changeOptions.shortsRemover =
					(this.style.backgroundColor == "green") ? false : true;
				
				const x = this; /* Closure capture Object */
				chrome.runtime.sendMessage(
					{ id: "putOptions", options: changeOptions }, (
						/* Undefined */
				) => {
					
					if (x.style.backgroundColor == "green") {
						x.firstChild.style.left = "calc(100% - 78%)";
						x.style.backgroundColor = "darkred";
					} else {
						x.firstChild.style.left = "0%";
						x.style.backgroundColor = "green";
					}
					
					x.disabled = false;
					
				});
				
			}
			
			if (id == "embedEndpoint") {
				
				this.disabled = true; /* Way to prevent Fast clicks */
				
				let changeOptions = {};
				changeOptions.embedEndpoint =
					(this.style.backgroundColor == "green") ? false : true;
				
				const x = this; /* Closure capture Object */
				chrome.runtime.sendMessage(
					{ id: "putOptions", options: changeOptions }, (
						/* Undefined */
				) => {
					
					if (x.style.backgroundColor == "green") {
						x.firstChild.style.left = "calc(100% - 78%)";
						x.style.backgroundColor = "darkred";
					} else {
						x.firstChild.style.left = "0%";
						x.style.backgroundColor = "green";
					}
					
					x.disabled = false;
					
				});
				
			}
			
		}
		
	}
	
	x.onkeyup = x.onclick;
	
	return x;
	
}

/*
	---- ---- ---- ----
*/

ytFocusOptElement.prototype =
	Object.create(HTMLElement.prototype);

/*
	---- ---- ---- ----
*/

ytFocusOptElement.prototype.connectedCallback = function(
	/* Undefined */
) {
	
	/* Not Used */
	
}

/* static */ Object.defineProperty(
	ytFocusOptElement, "observedAttributes", {
		
		get() {
			return [ "id" ];
		},
		
		enumerable: true,
		configurable: true
		
	}
)

ytFocusOptElement.prototype.attributeChangedCallback = function(
	/* String */ attrName, /* String */ oldValue,
	/* String */ newValue
) {
	
	
	this.disabled = true;
	this.setAttribute("tabindex", "0");
	
	if (attrName == "id") {
		
		this.style = "";
		this.innerHTML = "";
		
		let svgAsset = CreateSvgAsset(SvgAssetId.SpinningWheel, "lightgray");
		svgAsset.style.display = "block";
		svgAsset.style.marginRight = "auto";
		svgAsset.style.marginLeft = "auto";
		svgAsset.style.height = "calc(1.58rem * 2.78)";
		this.appendChild(svgAsset);
		
		const x = this; /* Closure capture Object */
		chrome.runtime.sendMessage({ id: "getOptions" }, (
			/* Object */ options
		) => {
			
			x.disabled = true;
			let id = x.getAttribute("id");
			
			x.style = "";
			x.innerHTML = "";
			
			if (id == "shortsRemover") {
				
				let container = document.createElement("div");
				container.style.position = "relative";
				container.style.display = "block";
				container.style.padding = "0.28rem";
				container.style.width = "calc(78% - 0.28rem * 2)";
				container.style.height = "auto";
				container.style.backgroundColor = "white";
				container.style.borderRadius = "1.00rem";
				container.style.cursor = "pointer";
				
				let t = document.createElement("h2");
				t.style.display = "block";
				t.style.margin = "0.12rem 0 0.12rem 0";
				t.style.fontSize = "1.58rem";
				t.style.fontWeight = "bold";
				t.style.color = "black";
				t.innerHTML = "Shorts Remover"
				container.appendChild(t);
				
				let about = document.createElement("p");
				about.style.display = "block";
				about.style.margin = "0.08rem 0 0.08rem 0";
				about.style.fontSize = "1.00rem";
				about.style.color = "gray";
				about.innerHTML = "Removes all <b>Shorts</b> suggestions and <b>Shorts</b> endpoint links.<br>" +
					"&ensp;After changing this setting, you should refresh all opened <b>YouTube</b> tabs."
				container.appendChild(about);
				
				if (options.shortsRemover){
					container.style.left = "0%";
					x.style.backgroundColor = "green";
				} else {
					container.style.left = "calc(100% - 78%)";
					x.style.backgroundColor = "darkred";
				}
				
				x.appendChild(container);
				x.disabled = false;
				
			} else if (id == "embedEndpoint") {
				
				let container = document.createElement("div");
				container.style.position = "relative";
				container.style.display = "block";
				container.style.padding = "0.28rem";
				container.style.width = "calc(78% - 0.28rem * 2)";
				container.style.height = "auto";
				container.style.backgroundColor = "white";
				container.style.borderRadius = "1.00rem";
				container.style.cursor = "pointer";
				
				let t = document.createElement("h2");
				t.style.display = "block";
				t.style.margin = "0.12rem 0 0.12rem 0";
				t.style.fontSize = "1.58rem";
				t.style.fontWeight = "bold";
				t.style.color = "black";
				t.innerHTML = "YouTube Player: Embed Endpoint"
				container.appendChild(t);
				
				let about = document.createElement("p");
				about.style.display = "block";
				about.style.margin = "0.08rem 0 0.08rem 0";
				about.style.fontSize = "1.00rem";
				about.style.color = "gray";
				about.innerHTML = "Add's link in <b>/watch</b> endpoint to <u>current video</u> embed player.<br>" +
					"&ensp;After changing this setting, you should refresh all opened <b>YouTube</b> tabs."
				container.appendChild(about);
				
				if (options.embedEndpoint){
					container.style.left = "0%";
					x.style.backgroundColor = "green";
				} else {
					container.style.left = "calc(100% - 78%)";
					x.style.backgroundColor = "darkred";
				}
				
				x.appendChild(container);
				x.disabled = false;
				
			} else {
				
				let svgAsset = CreateSvgAsset(SvgAssetId.NotFound, "lightgray");
				svgAsset.style.display = "block";
				svgAsset.style.marginRight = "auto";
				svgAsset.style.marginLeft = "auto";
				svgAsset.style.height = "calc(1.58rem * 2.78)";
				x.appendChild(svgAsset);
				
			}
			
		});
		
	}
	
}

ytFocusOptElement.prototype.disconnectedCallback = function(
	/* Undefined */
) {
	
	/* Not Used */
	
}

/*
	---- ---- ---- ----
*/

window.customElements.define("yt-focus-opt",
	ytFocusOptElement);

/*
	YT-Focus Options Element: End
*/
