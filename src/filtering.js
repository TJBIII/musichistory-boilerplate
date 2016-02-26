"use strict";
//One module is responsible for making the filtering form work. Therefore, it will need to use methods from the previous module.

let load = require('./load');


function filter () {
  let filterArtist = $('#artist');
  let filterAlbum = $('#album').val()
  console.log("filterArtist", filterArtist[0]);

  let songs = load.getSongs();

  console.log("currently filtering");
}


module.exports = filter;