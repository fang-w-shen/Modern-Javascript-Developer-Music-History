"use strict";
function viewportbuttons() {

document.getElementById("addb").addEventListener("click", function() {
	document.getElementById("main").classList.add('hidden');
	document.getElementById("addb").style.color = "#2dfc1e";
	document.getElementById("viewb").style.color = "white";
	document.getElementById("body").style.backgroundColor = "rgb(223,128,126)";
	document.getElementById("addb").style.backgroundColor = "rgb(248,239,222)";
	document.getElementById("viewb").style.backgroundColor = "transparent";
	document.getElementById("add").classList.remove('hidden');			
});
document.getElementById("viewb").addEventListener("click", function() {
	document.getElementById("add").classList.add('hidden');
	document.getElementById("viewb").style.color = "#2dfc1e";
	document.getElementById("addb").style.color = "white";
	document.getElementById("body").style.backgroundColor = "rgb(239,205,118)";
	document.getElementById("viewb").style.backgroundColor = "rgb(248,239,222)";
	document.getElementById("addb").style.backgroundColor = "transparent";
	document.getElementById("main").classList.remove('hidden');			
});
}
module.exports = viewportbuttons;