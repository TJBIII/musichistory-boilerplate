"use strict";


const load = require("./load");
const filter= require("./filtering");
const views = require("./views");


//make ajax call for inital group of songs

function getData () {
  $.ajax({
      url: "https://amber-fire-2440.firebaseio.com/songs/.json",
      method: "GET"
    }).done(populatePage);
}

getData();

let title;
let artist;
let album;
let id;

function populatePage(songsList){
  let songsData = songsList;
  console.log("songsData", songsData);


  //new way using firebase data
  for (let song in songsList){
    let currentSong = songsList[song];
    currentSong.id = song;

    title = currentSong.title;
    artist = currentSong.artist;
    album = currentSong.album;
    id = currentSong.id;

    load.addSong(title, artist, album, id ); 
  }

  // //old way using local storage
  // songsData.forEach(function(currentSong){

  //   title = currentSong.title;
  //   artist = currentSong.artist;
  //   album = currentSong.album;

  //   load.addSong(title, artist, album);
  // });
}



let moreBtnEl = $('#more');

moreBtnEl.click(function(){
  //make ajax call for second group of songs and then add them to page
  $.ajax({
    url:"src/moreSongs.json"
  }).done(populatePage);

  moreBtnEl[0].disabled = true;
});


//references to navigation menu items in DOM
let linkView = views.linkView;
let linkAdd = views.linkAdd;
//handle the two different app views
linkView.click(views.showView);
linkAdd.click(views.showAdd);



var addBtnEl = $('#add--btn');
let songEl, artistEl, albumEl,
    songTitle, artistTitle, albumTitle;
//Add song to list view when button is clicked
addBtnEl.click(function() {
  songEl = $('#song-name');
  artistEl = $('#artist-name');
  albumEl = $('#album-name');

  songTitle = songEl.val();
  artistTitle = artistEl.val();
  albumTitle = albumEl.val();

  load.addSong(songTitle, artistTitle, albumTitle);

  //post new song to database
  load.updateDatabase(songTitle, artistTitle, albumTitle);
  $('#songs').html('');
  getData();

  songEl.val("");
  artistEl.val("");
  albumEl.val("");

  linkView.click();
})


//handle filtering
let filterBtn = $('#filter--btn');
filterBtn.click(filter);




let songsEl = $('#songs')
//add event handler to handle remove button clicks
songsEl.on('click', 'button[class^="remove"]', function(event){
  // console.log($(this).parents(".song")[0].id);
  let songID = $(this).parents(".song")[0].id;

  $(this).parents('.song').remove();
  load.deleteFromDatabase(songID);

});