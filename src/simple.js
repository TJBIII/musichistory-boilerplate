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
