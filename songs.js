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

    //create node to append so that eventlisteners are not lost
    songElem = document.createElement("div");
    songElem.className = "row";

    songHTML +=   `<div class="col-md-8 song"><header>${title}</header>`;
    songHTML +=     `<p>by ${artist} on the album ${album}</p>`;
    songHTML +=   `</div>`;
    songHTML +=   `<div class="col-md-4">`;
    songHTML +=     `<button class="remove btn btn-default">Remove</button>`;
    songHTML +=   `</div>`;

    songElem.innerHTML = songHTML;
    songsEl.appendChild(songElem);

    //add eventlistener to remove button just created
    removeClassArr = document.getElementsByClassName("remove");
    removeClassArr[removeClassArr.length - 1].addEventListener("click", function(event) {
      removeRow(event);
    })

  });
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

    //create node to append so that eventlisteners are not lost
    songElem = document.createElement("div");
    songElem.className = "row";

    songHTML +=   `<div class="col-md-8 song"><header>${title}</header>`;
    songHTML +=     `<p>by ${artist} on the album ${album}</p>`;
    songHTML +=   `</div>`;
    songHTML +=   `<div class="col-md-4">`;
    songHTML +=     `<button class="remove btn btn-default">Remove</button>`;
    songHTML +=   `</div>`;

    songElem.innerHTML = songHTML;
    songsEl.appendChild(songElem);

    //add eventlistener to remove button just created
    removeClassArr = document.getElementsByClassName("remove");
    removeClassArr[removeClassArr.length - 1].addEventListener("click", function(event) {
      removeRow(event);
    })

  });
}


