(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
},{"./load":2}],2:[function(require,module,exports){
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
},{}],3:[function(require,module,exports){
"use strict";
const load = require("./load");
const filter= require("./filtering");
const views = require("./views");




let $registerBtnEl = $('#registerBtn'),
    $loginBtnEl = $('#loginBtn'),
    $inputEmailEl = $('#inputEmail'),
    $inputPasswordEl = $('#inputPassword'),
    $logoutEl = $('#logout');


//references to navigation menu items in DOM
let linkView = views.linkView;
let linkAdd = views.linkAdd;


var ref = new Firebase("https://amber-fire-2440.firebaseio.com/");

//register users
$registerBtnEl.click(function () {
  console.log("Registering New User");
  let email = $inputEmailEl.val();
  let password = $inputPasswordEl.val();

  if (email && password){
    ref.createUser({
      email    : email,
      password : password
    }, function(error, userData) {
      if (error) {
        console.log("Error creating user:", error);
      } else {
        console.log("Successfully created user account with uid:", userData.uid);
      }
    });
  } else {
    console.log("You need to enter both an email and a password to register.");
  }

});


//login user
$loginBtnEl.click(function () {
  console.log("Loggin In New User");
  let email = $inputEmailEl.val();
  let password = $inputPasswordEl.val();

  if (email && password) {

    ref.authWithPassword({
      email    : email,
      password : password
    }, function(error, authData) {
      if (error) {
        console.log("Login Failed!", error);
      } else {
        console.log("Authenticated successfully with payload:", authData);
        getData();
        views.hideLogin();
        views.showView();
      }
    });
  } else {
    console.log("You need to enter both an email and a password to login.");
  }
});






ref.onAuth(function(authData) {
  if (authData) {
    console.log("Authenticated with uid:", authData.uid);

  //if user is authenticated then enable the nav buttons by adding click event listeners
  linkView.click(views.showView);
  linkAdd.click(views.showAdd);

  } else {
    console.log("Client unauthenticated.")
  }
});




$logoutEl.click(() => {
  ref.unauth();
  console.log("User logged out");
  views.hideAll();
  views.showLogin();
})







//make ajax call for inital group of songs

function getData () {
  $.ajax({
      url: "https://amber-fire-2440.firebaseio.com/songs/.json",
      method: "GET"
    }).done(populatePage);
}


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

  // load.addSong(songTitle, artistTitle, albumTitle);

  //post new song to database
  updateDatabase(songTitle, artistTitle, albumTitle);
  // $('#songs').html('');
  // getData();

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


function updateDatabase(title, artist, album) {
  let newSong = {title, artist, album};
  newSong = JSON.stringify(newSong);

  $.ajax({
    url: 'https://amber-fire-2440.firebaseio.com/songs.json',
    type: 'POST',
    data: newSong
  })
  .done(function() {
    console.log("success");
    $('#songs').html('');
    getData();
  })
  .fail(function() {
    console.log("error");
  })
  
}

},{"./filtering":1,"./load":2,"./views":4}],4:[function(require,module,exports){
"use strict";

// One module is responsible for showing the two views of the app (song list and song form).

var addEl = $('#add--music');
var viewEl = $('#list--music');
var loginEl = $('#login');

//references to navigation menu items in DOM
var linkView = $('#link--view');
var linkAdd = $('#link--add');


function hideAll() {
  addEl.hide();
  viewEl.hide();
}

function showView () {
  addEl.removeClass('visible');
  addEl.addClass('hidden');
  viewEl.addClass('visible');
  viewEl.removeClass('hidden');

  linkAdd.removeClass('active');
  linkView.addClass('active');
}

function hideLogin() {
  loginEl.hide();
}

function showLogin() {
  loginEl.show();
}

function showAdd () {
  viewEl.removeClass('visible');
  viewEl.addClass('hidden');
  addEl.addClass('visible');
  addEl.removeClass('hidden');

  linkView.removeClass('active');
  linkAdd.addClass('active');
}


exports.showView = showView;
exports.showAdd = showAdd;
exports.linkView = linkView;
exports.linkAdd = linkAdd;
exports.hideLogin = hideLogin;
exports.showLogin = showLogin;
exports.hideAll = hideAll;

},{}]},{},[3])


//# sourceMappingURL=bundle.js.map
