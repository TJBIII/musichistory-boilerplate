(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

// One module is responsible for loading songs from a JSON file and storing them in an array. This module should expose one method for getting the entire list of songs, and one method for adding a song to the array.

const songsArr = [];
const songsEl = $("#songs");
let addSongHTML;
let addSongElem;


function getSongs () {
  return songsArr;
}

function addSong(song, artist, album) {
  addSongHTML = "";

  addSongHTML += `<div class="row song">`;
  addSongHTML +=   `<div class="col-md-8 song"><header>${song}</header>`;
  addSongHTML +=     `<p>by ${artist} on the album ${album}</p>`;
  addSongHTML +=   `</div>`;
  addSongHTML +=   `<div class="col-md-4">`;
  addSongHTML +=     `<button class="remove btn btn-default">Remove</button>`;
  addSongHTML +=   `</div>`;
  addSongHTML += `</div>`;

  songsEl.append(addSongHTML);
  songsArr.push({song, artist, album});
  // console.log(songsArr)
}

// module.exports = {getSongs, addSong, songsArr};
exports.getSongs = getSongs;
exports.addSong = addSong;
},{}],2:[function(require,module,exports){
"use strict";


const load = require("./load");

// console.log("load", load);

//make ajax call for inital group of songs
$.ajax({
    url: "src/songs.json"
  }).done(populatePage);




let title;
let artist;
let album;

function populatePage(songsList){
  let songsData = songsList.songs;
  //console.log("songsData", songsData);

  songsData.forEach(function(currentSong){

    title = currentSong.title;
    artist = currentSong.artist;
    album = currentSong.album;

    load.addSong(title, artist, album);
  });
}



let moreBtnEl = $('#more');

moreBtnEl.click(function(){
  //make ajax call for second group of songs and then add them to page
  $.ajax({
    url:"src/moreSongs.json"
  }).done(populatePage);
  
  moreBtnEl[0].disabled = true;
})

},{"./load":1}]},{},[2])


//# sourceMappingURL=bundle.js.map
