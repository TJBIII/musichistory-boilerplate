"use strict";
//One module is responsible for making the filtering form work. Therefore, it will need to use methods from the previous module.

let load = require('./load');


function filter () {
  let filterArtist = $('#artist-input').val();
  let filterAlbum = $('#album-input').val();
  console.log("filterArtist", filterArtist);
  console.log("filterAlbum", filterAlbum);

  let songs = load.getSongs();
  console.log("songs", songs);

  //filter by artist
  if (filterArtist) {
    songs = songs.filter((songObj) => {
      return songObj.artist === filterArtist;
    });
  }

  //filter by album 
  if (filterAlbum) {
    songs = songs.filter((songObj) => {
      return songObj.album === filterAlbum;
    });
  }

  console.log("songs after filtering", songs);

  
}


module.exports = filter;