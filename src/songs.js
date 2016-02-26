"use strict";

var songsEl = $('#songs');
var moreBtnEl = $('#more');

$.ajax({
    url:"songs.json"
  }).done(populatePage);

var title;
var artist;
var album;

var songHTML;
var removeClassArr;

function populatePage(songsList){
  var songsData = songsList.songs;
  //console.log("songsData", songsData);

  songsData.forEach(function(currentSong){
    songHTML = "";

    title = currentSong.title;
    artist = currentSong.artist;
    album = currentSong.album;

    songHTML += `<div class="row song">`;
    songHTML +=   `<div class="col-md-8 song"><header>${title}</header>`;
    songHTML +=     `<p>by ${artist} on the album ${album}</p>`;
    songHTML +=   `</div>`;
    songHTML +=   `<div class="col-md-4">`;
    songHTML +=     `<button class="remove btn btn-default">Remove</button>`;
    songHTML +=   `</div>`;
    songHTML += `</div>`;

    songsEl.append(songHTML);

  });

}

  //add event handler to handle remove button clicks
  songsEl.on('click', 'button[class^="remove"]', function(event){
    // console.log("this", $(this));
    $(this).parents('.song').remove();
  })


moreBtnEl.click(function(){
  console.log("moreBtnEl", moreBtnEl);
  $.ajax({
    url:"moreSongs.json"
  }).done(addMore);
  moreBtnEl[0].disabled = true;
})


function addMore(songsList) {
  //var songsData = JSON.parse(moreSongsRequest.responseText).songs;
  var songsData = songsList.songs;
  console.log("songsData", songsData);

  songsData.forEach(function(currentSong){
    songHTML = "";

    title = currentSong.title;
    artist = currentSong.artist;
    album = currentSong.album;

    songHTML += `<div class="row song">`;
    songHTML +=   `<div class="col-md-8 song"><header>${title}</header>`;
    songHTML +=     `<p>by ${artist} on the album ${album}</p>`;
    songHTML +=   `</div>`;
    songHTML +=   `<div class="col-md-4">`;
    songHTML +=     `<button class="remove btn btn-default">Remove</button>`;
    songHTML +=   `</div>`;
    songHTML += `</div>`;

    songsEl.append(songHTML);

  });
}

