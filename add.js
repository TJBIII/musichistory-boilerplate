var addEl = document.getElementById('add--music');
var viewEl = document.getElementById('list--music');

//references to navigation menu items in DOM
var linkView = document.getElementById('link--view');
var linkAdd = document.getElementById('link--add');

//reference to button in dom
var addBtnEl = document.getElementById('add--btn');



linkView.addEventListener('click', function() {
  addEl.classList.remove("visible");
  addEl.classList.add("hidden");
  viewEl.classList.add("visible");
  viewEl.classList.remove("hidden");

  //change navbar active class
  linkAdd.parentElement.classList.remove("active");
  linkView.parentElement.classList.add("active");
});


linkAdd.addEventListener('click', function() {
  viewEl.classList.remove("visible");
  viewEl.classList.add("hidden");
  addEl.classList.add("visible");
  addEl.classList.remove("hidden");

  //change navbar active class
  linkView.parentElement.classList.remove("active");
  linkAdd.parentElement.classList.add("active");

});


var songTitle;
var artistTitle;
var AlbumTitle;

songEl = document.getElementById('song-name');
artistEl = document.getElementById('artist-name');
albumEl = document.getElementById('album-name');

//Add song to list view when button is clicked
addBtnEl.addEventListener('click', function() {
  songTitle = songEl.value;
  artistTitle = artistEl.value;
  albumTitle = albumEl.value;

  addSong(songTitle, artistTitle, albumTitle);
});


//build up new song HTMl and add to innerHTML of main--content area
var songAdditionHTML;

function addSong(song, artist, album) {

  songAdditionHTML = `<div class="song fade-in one"><header>${song}</header><p>by ${artist} on the album ${album}</p>`;

  document.getElementById('songs').innerHTML += songAdditionHTML;

  songEl.value = "";
  artistEl.value = "";
  albumEl.value = "";

  linkView.click();
}