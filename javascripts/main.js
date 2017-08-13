"use strict";

let songcounter = 1;

let viewport = require('./spa-viewports.js')();
document.getElementById("addbutton").addEventListener("click", addtomasterplaylist_firebase);


function addtomasterplaylist_firebase() {
	var name = document.getElementById("song-name").value;
	var artist = document.getElementById("artist").value;
	var album = document.getElementById("album-name").value;
	var newSong = {
      artist: artist,
      album: album,
      name: name
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
		printdatafromuser(newSong);
	}
}

/////////////////////GETTING DATA FROM FIREBASE////////////////////////
(function refreshfromfirebase() {
	let ajaxrequest = require('./firebaserequest');
	ajaxrequest().then((response)=>{
		console.log("the most updated songdata from firebase is", response);
		if (response!== null ) {
			var arr = Object.keys(response).reverse().forEach( function(key){
			var newArrItem = response[ key ];
			newArrItem.key = key;
		  	printdatafromfirebase(newArrItem);
			});
		}
	});
})();







function printdatafromfirebase(newSong) {
		let newsongdiv = document.createElement("div");
		$(newsongdiv).attr("class","col-12 single-song");
		$(newsongdiv).attr("id",`${songcounter}`);	
		$(newsongdiv).html(`<h2>${newSong.name}</h2>
	         <label>${newSong.artist}</label> | <label>${newSong.album}</label> | <label>Genre</label>
	         <time class='date timeago' dateTime='${'8/12/2017 7:25 PM'}'></time>`);
		$("#row").append(newsongdiv);
		$('.timeago').timeago();
		
	    let deletebutton = document.createElement("button");
	    $(deletebutton).html("Delete");
	    $(deletebutton).on("click",killall);
	    $(deletebutton).attr("id",`b${songcounter}`);
	    $(`#${songcounter}`).append(deletebutton);



		$(`#b${songcounter}`).on("click", ()=>{
			
				
			    	$.ajax({
				      url: `https://musichistory-43b58.firebaseio.com/${newSong.key}/.json`,
				      method: "DELETE"
				    })
				    .done(function(response) {
				      // console.log("response after deletion", response);
				      // You'll likely want to execute the code that you're using
				      // on page load here to run the GET XHR and bind to Handlebars
				    });
				});	
		songcounter+=1;
	
}



function printdatafromuser(newSong) {
	console.log("newSong is", newSong);
		
	var key;
	$.ajax({
      url: "https://musichistory-43b58.firebaseio.com/.json",
      method: "POST",
      data: JSON.stringify(newSong)
    })
    .done(function(response) {
      // console.log("Added Your Song", response);
      key = response.name;
      // console.log("", key);
		document.getElementById("song-name").value="";
		document.getElementById("artist").value="";
		document.getElementById("album-name").value="";
		document.getElementById("song-name").focus();
		let newsongdiv = document.createElement("div");
		$(newsongdiv).attr("class","col-12 single-song");
		$(newsongdiv).attr("id",`${songcounter}`);	
		$(newsongdiv).html(`<h2>${newSong.name}</h2>
	         <label>${newSong.artist}</label> | <label>${newSong.album}</label> | <label>Genre</label>
	         <time class='date timeago' dateTime=${'8/12/2017 7:25 PM'}></time>`);
		$("#row").prepend(newsongdiv);
		$('.timeago').timeago();
		
	    let deletebutton = document.createElement("button");
	    $(deletebutton).html("Delete");
	    $(deletebutton).on("click",killall);
	    $(deletebutton).attr("id",`b${songcounter}`);
	    $(`#${songcounter}`).append(deletebutton);



		$(`#b${songcounter}`).on("click", ()=>{
			
				
			    	$.ajax({
				      url: `https://musichistory-43b58.firebaseio.com/${key}/.json`,
				      method: "DELETE"
				    })
				    .done(function(response) {
				      // console.log("response after deletion", response);
				      // You'll likely want to execute the code that you're using
				      // on page load here to run the GET XHR and bind to Handlebars
				    });
				});	

      // You'll likely want to execute the code that you're using
      // on page load here to run the GET XHR and bind to Handlebars
    	
	

	
	});
	
songcounter+=1;
}
document.getElementById("song-name").onkeydown = enter;
document.getElementById("artist").onkeydown = enter;
document.getElementById("album-name").onkeydown = enter;

function enter(e) {
	if (e.keyCode == 13) {
		addtomasterplaylist_firebase();	
	}
}

function killall(a) {
	var parent = a.target.parentNode;	
	parent.parentNode.removeChild(parent);
}	

$('.timeago').timeago();
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
// 		songData += "<input type='button' value='delete' onclick='killall(this.parentNode);'>" + "</div>";
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
// 		songData1 += "<input type='button' value='delete' onclick='killall(this.parentNode);'>" + "</div>";
// 	}
// 	songDiv.innerHTML += songData1;
// }

// function dataRequestFailed1(e) {
// 	console.log("dataFailed", e);	
// }
// dataRequest1.open("GET", "./songs1.json");
// dataRequest1.send();





