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
});


linkAdd.addEventListener('click', function() {
  viewEl.classList.remove("visible");
  viewEl.classList.add("hidden");
  addEl.classList.add("visible");
  addEl.classList.remove("hidden");
});


var songTitle;
var artistTitle;
var AlbumTitle;


addBtnEl.addEventListener('click', function() {
  songTitle = document.getElementById('song-name').value;
  artistTitle = document.getElementById('artist-name').value;
  albumTitle = document.getElementById('album-name').value;

  addSong(songTitle, artistTitle, albumTitle);
});


var songAdditionHTML;
function addSong(song, artist, album) {

  songAdditionHTML = `<div class="song"><header>${song}</header><p>by ${artist} on the album ${album}</p>`;

  document.getElementById('main--content').innerHTML += songAdditionHTML;

  alert("Your song has been added");


}