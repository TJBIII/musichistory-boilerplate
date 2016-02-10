var songsEl = document.getElementById('songs');
var moreBtnEl = document.getElementById('more');

var songsRequest = new XMLHttpRequest();
songsRequest.addEventListener("load", populatePage);
songsRequest.open("GET", "songs.json");
songsRequest.send();


var title;
var artist;
var album;

var songHTML;
var removeClassArr;

function populatePage(){
  var songsData = JSON.parse(songsRequest.responseText).songs;
  //console.log("songsData", songsData);

  songsData.forEach(function(currentSong){
    songHTML = "";

    title = currentSong.title;
    artist = currentSong.artist;
    album = currentSong.album;

    songHTML += `<div class="row">`;
    songHTML +=   `<div class="col-md-8 song"><header>${title}</header>`;
    songHTML +=     `<p>by ${artist} on the album ${album}</p>`;
    songHTML +=   `</div>`;
    songHTML +=   `<div class="col-md-4">`;
    songHTML +=     `<button class="remove btn btn-default">Remove</button>`;
    songHTML +=   `</div>`;
    songHTML += `</div>`;

    songsEl.innerHTML += songHTML;
  });

  enableRemoveButtons();
}

function enableRemoveButtons() {
    removeClassArr = document.getElementsByClassName("remove");
    for (var i = 0; i < removeClassArr.length; i++){
      removeClassArr[i].addEventListener("click", function(event) {
        //console.log("clicked");
        removeRow(event);
      });
  }
}


function removeRow(event){
  //console.log("event.target", event.target.parentNode.parentNode);
  var row = event.target.parentNode.parentNode;
  row.remove();
}



moreBtnEl.addEventListener("click", function() {
  //end of songs available so disable button
  moreBtnEl.disabled = "true";
  loadMore();

});

var moreSongsRequest;

function loadMore() {
  moreSongsRequest = new XMLHttpRequest();
  moreSongsRequest.addEventListener("load", addMore);
  moreSongsRequest.open("GET", "moreSongs.json");
  moreSongsRequest.send();
}

function addMore() {
  var songsData = JSON.parse(moreSongsRequest.responseText).songs;
  //console.log("songsData", songsData);

  songsData.forEach(function(currentSong){
    songHTML = "";

    title = currentSong.title;
    artist = currentSong.artist;
    album = currentSong.album;

    songHTML += `<div class="row">`;
    songHTML +=   `<div class="col-md-8 song"><header>${title}</header>`;
    songHTML +=     `<p>by ${artist} on the album ${album}</p>`;
    songHTML +=   `</div>`;
    songHTML +=   `<div class="col-md-4">`;
    songHTML +=     `<button class="remove btn btn-default">Remove</button>`;
    songHTML +=   `</div>`;
    songHTML += `</div>`;

    songsEl.innerHTML += songHTML;
  });

  enableRemoveButtons();
}

