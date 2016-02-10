// var songs = [];

// songs[songs.length] = "Legs > by Z*ZTop on the album Eliminator";
// songs[songs.length] = "The Logical Song > by Supertr@amp on the album Breakfast in America";
// songs[songs.length] = "Another Brick in the Wall > by Pink Floyd on the album The Wall";
// songs[songs.length] = "Welco(me to the Jungle > by Guns & Roses on the album Appetite for Destruction";
// songs[songs.length] = "Ironi!c > by Alanis Moris*ette on the album Jagged Little Pill";

// songs.unshift("Nosetalgia > by Pusha T on the album My Name is My Name");
// songs.push("Juicy > by Notorious BIG on the album Ready to Die");

// console.log("songs", songs);

// var songHTML = "";

// for (var i = 0; i < songs.length; i++){
//   var currentSong = songs[i];
//   currentSong = currentSong.replace(/>/g, "-");
//   currentSong = currentSong.replace(/[^a-zA-Z\-\d\s]/g, "");
//   currentSong = currentSong.split("-");
//   songHTML += '<div class="song"><header>' + currentSong[0] +'</header>';
//   songHTML += '<p>' + currentSong[1] + '</p>';
// }

// console.log("songs", songs);
// document.getElementById('songs').innerHTML = songHTML; 

var songsEl = document.getElementById('songs');

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

