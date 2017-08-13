"use strict";
/////////////////////GETTING DATA FROM FIREBASE////////////////////////
var songcounter = 1;
(function refreshfromfirebase() {
	let ajaxrequest = require('./firebaserequest');
	ajaxrequest().then((response)=>{
		console.log("the most updated songdata from firebase is", response);
		if (response!== null ) {
			let arr = Object.keys(response).forEach( function(key){
			let newArrItem = response[key];
			newArrItem.key = key;
		  	printdatatoHTML(newArrItem);
			});
		}
	});
})();

/////////////////////GET VIEWPORT & ADD EVENT LISTENERS////////////////////////
let settingUpSinglePageViewPort = require('./spa-viewports.js')();
document.getElementById("song-name").onkeydown = checkenterkey;
document.getElementById("artist").onkeydown = checkenterkey;
document.getElementById("album-name").onkeydown = checkenterkey;
document.getElementById("addbutton").addEventListener("click", takeuserinput);

function checkenterkey(e) {
	if (e.keyCode == 13) {
		takeuserinput();	
	}
}

/////////////////////RECORDING USER DATA////////////////////////
function takeuserinput() {
	let name = document.getElementById("song-name").value;
	let artist = document.getElementById("artist").value;
	let album = document.getElementById("album-name").value;
	let dateObj = new Date();
	let month = dateObj.getUTCMonth() + 1; //months from 1-12
	let day = dateObj.getUTCDate();
	let year = dateObj.getUTCFullYear();
	let hour = dateObj.getHours();
	let minute = dateObj.getMinutes();
	let currentdate = month + "/" + day + "/" + year +" "+hour+":"+minute;
	let newSong = {
      artist: artist,
      album: album,
      name: name,
      time:currentdate
    };
    
	if (name ==="") {
		alert("Enter a Song Name");
		document.getElementById("song-name").focus();
	}
	else if(artist === "") {
		alert("Enter an Artist Name");
		document.getElementById("artist").focus();
	}
	else if(album === "") {
		alert("Enter an Album Name");
		document.getElementById("album-name").focus();
	}
	else {
		// songcounter.push(name+" > by "+artist+" on the album " +album);
		senddatatofirebase(newSong);
	}
}

/////////////////////SENDING USER DATA TO FIREBASE////////////////////////
function senddatatofirebase(newSong) {
	$.ajax({
      url: "https://musichistory-43b58.firebaseio.com/.json",
      method: "POST",
      data: JSON.stringify(newSong)
    })
    .done(function(response) {
    	newSong.key = response.name;  		
		document.getElementById("song-name").value="";
		document.getElementById("artist").value="";
		document.getElementById("album-name").value="";
		document.getElementById("song-name").focus();
		printdatatoHTML(newSong);
	});

}

/////////////////////PRINTING USER DATA TO HTML////////////////////////
let Handlebars = require('hbsfy/runtime');
Handlebars.registerPartial("timestamp", require('../template/partials/timestamp.hbs'));
let songtemplate = require('../template/songgrid.hbs');

function printdatatoHTML(newSong) {
		newSong.counter=songcounter;

		$("#row").prepend(songtemplate(newSong));	
		
		$(`#b${songcounter}`).on("click", (event)=>{
					
					
			    	$.ajax({
				      url: `https://musichistory-43b58.firebaseio.com/${newSong.key}/.json`,
				      method: "DELETE"
				    })
				    .done(function(response) {
				    	deleteself(event);
				      // console.log("response after deletion", response);
				      // You'll likely want to execute the code that you're using
				      // on page load here to run the GET XHR and bind to Handlebars
				    });
				});	
		songcounter+=1;
		$('.timeago').timeago();
		$('#search').quicksearch('.default_list_data');
}


function deleteself(event) {
	let parent = event.target.parentNode;	
	parent.parentNode.removeChild(parent);
}	

//===========MUSIC HISTORY 4 BELOW=============//

// var songs = [];

// songs[songs.length] = "Legs > by Z*ZTop on the album Eliminator";
// songs[songs.length] = "The Logical Song > by Supertr@amp on the album Breakfast in America";
// songs[songs.length] = "Another Brick in the Wall > by Pink Floyd on the album The Wall";
// songs[songs.length] = "Welco(me to the Jungle > by Guns & Roses on the album Appetite for Destruction";
// songs[songs.length] = "Ironi!c > by Alanis Moris*ette on the album Jagged Little Pill";

// function populate() {
// 	for (var i = 0; i < songs.length; i++) {
// 		var song = songs[i].indexOf(">") - 1;
// 		document.getElementById(i).innerHTML = songs[i].slice(0,song);
// 		for (var j = 0; j < 2; j++) {
// 			var artistnamebegin = songs[i].indexOf(">") + 1;
// 			var artistnameend = songs[i].indexOf("on the") - 1;
// 			var albumnamebegin = songs[i].indexOf("on the album");
// 			var albumnameend = songs[i].length;
// 			if (j === 0) {
// 				document.getElementById(i+""+j).innerHTML = songs[i].slice(artistnamebegin,artistnameend);
// 			}
// 			else {
// 				document.getElementById(i+""+j).innerHTML = songs[i].slice(albumnamebegin,albumnameend);
// 			}
// 		}
// 	}
// }


// function updateTextInput(val) {
//   document.getElementById('num1').value = val;
// }

// function updateTextInput1(val) {
//   document.getElementById('num2').value = Number(val);
// }


// let dataRequest = new XMLHttpRequest();

// dataRequest.addEventListener("load", dataRequestComplete);
// dataRequest.addEventListener("error", dataRequestFailed);



// function dataRequestComplete(e) {
// 		if (this.status === 200) {
// 			console.log("songs have loaded");
// 			let songData = JSON.parse(e.target.responseText);
// 			console.log("song data", songData);
// 			showData(songData);
// 		}
// 		else {
// 			console.log("type it right");
				
// 		}
// }

// function showData(songs) {
// 	let songDiv = document.getElementById("row");
// 	let songData = '';
// 	for (let item in songs) {
// 		let songItem = songs[item];
// 		songData += "<div>";
// 		songData += "<h2>" + songItem.name + ": " + songItem.artist +": "+songItem.album+"</h2>";
// 		songData += "<input type='button' value='delete' onclick='deleteself(this.parentNode);'>" + "</div>";
// 	}
// 	songDiv.innerHTML += songData;
// }

// function dataRequestFailed(e) {
// 	console.log("dataFailed", e);	
// }
// dataRequest.open("GET", "./songs.json");
// dataRequest.send();




// let dataRequest1 = new XMLHttpRequest();

// dataRequest1.addEventListener("load", dataRequestComplete1);
// dataRequest1.addEventListener("error", dataRequestFailed1);

// let songData;
// function dataRequestComplete1(e) {
// 		if (this.status === 200) {
// 			console.log("songs1 have loaded");
// 			songData = JSON.parse(e.target.responseText);
// 			console.log("song data", songData);

// 		}
// 		else {
// 			console.log("type it right");
				
// 		}
// }

// function showData1(songs) {
// 	let songDiv = document.getElementById("row");
// 	let songData1 = '';
// 	for (let item in songs) {
// 		let songItem = songs[item];
// 		songData1 += "<div>";
// 		songData1 += "<h2>" + songItem.name + ": " + songItem.artist +": "+songItem.album+"</h2>";
// 		songData1 += "<input type='button' value='delete' onclick='deleteself(this.parentNode);'>" + "</div>";
// 	}
// 	songDiv.innerHTML += songData1;
// }

// function dataRequestFailed1(e) {
// 	console.log("dataFailed", e);	
// }
// dataRequest1.open("GET", "./songs1.json");
// dataRequest1.send();





