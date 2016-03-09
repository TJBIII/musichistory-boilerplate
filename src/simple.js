"use strict";
const load = require("./load");
const filter= require("./filtering");
const views = require("./views");



let $registerBtnEl = $('#registerBtn'),
    $loginBtnEl = $('#loginBtn'),
    $inputEmailEl = $('#inputEmail'),
    $inputPasswordEl = $('#inputPassword'),
    $logoutEl = $('#logout');




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


//references to navigation menu items in DOM
let linkView = views.linkView;
let linkAdd = views.linkAdd;





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
