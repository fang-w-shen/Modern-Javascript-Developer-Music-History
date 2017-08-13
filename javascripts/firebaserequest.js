"use strict";

function firebaserequest() {
	return new Promise((resolve,reject)=>{
		$.ajax({
	      url: "https://musichistory-43b58.firebaseio.com/.json"
	    })
	    .done(function(response) {
	      // console.log("response from Firebase:", response);
	      resolve(response);
	    });
	});
}
module.exports = firebaserequest;