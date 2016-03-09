"use strict";
// One module is responsible for loading songs from a JSON file and storing them in an array. This module should expose one method for getting the entire list of songs, and one method for adding a song to the array.

const songsArr = [];

const songsEl = $("#songs");
let addSongHTML;
let addSongElem;


function getSongs () {
  return songsArr;
}

function setSongs () {

}

function addSong(song, artist, album, id) {
  // console.log("adding song:", song);
  addSongHTML = "";

  addSongHTML += `<div class="row song" id="${id}">`;
  addSongHTML +=   `<div class="col-md-8 song"><header>${song}</header>`;
  addSongHTML +=     `<p>by ${artist} on the album ${album}</p>`;
  addSongHTML +=   `</div>`;
  addSongHTML +=   `<div class="col-md-4">`;
  addSongHTML +=     `<button class="remove btn btn-default">Remove</button>`;
  addSongHTML +=   `</div>`;
  addSongHTML += `</div>`;

  songsEl.append(addSongHTML);
  songsArr.push({song, artist, album, id});

  // console.log(songsArr)
}



function deleteFromDatabase(name) {

  $.ajax({
    url: `https://amber-fire-2440.firebaseio.com/songs/${name}.json`,
    method: 'DELETE'
  })
  .done(function() {
    console.log("success");
  })
  .fail(function() {
    console.log("error");
  });
  
}

// module.exports = {getSongs, addSong, songsArr};
// exports.updateDatabase = updateDatabase;
exports.getSongs = getSongs;
exports.addSong = addSong;
exports.deleteFromDatabase = deleteFromDatabase;