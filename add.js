// var addEl = document.getElementById('add--music');
// var viewEl = document.getElementById('list--music');
var addEl = $('#add--music');
var viewEl = $('#list--music');

//references to navigation menu items in DOM
// var linkView = document.getElementById('link--view');
// var linkAdd = document.getElementById('link--add');
var linkView = $('#link--view');
var linkAdd = $('#link--add');

//reference to button in dom
// var addBtnEl = document.getElementById('add--btn');
var addBtnEl = $('#add--btn');



// linkView.addEventListener('click', function() {
//   addEl.classList.remove("visible");
//   addEl.classList.add("hidden");
//   viewEl.classList.add("visible");
//   viewEl.classList.remove("hidden");

//   //change navbar active class
//   linkAdd.parentElement.classList.remove("active");
//   linkView.parentElement.classList.add("active");
// });
linkView.click(function(){
  addEl.removeClass('visible');
  addEl.addClass('hidden');
  viewEl.addClass('visible');
  viewEl.removeClass('hidden');

  linkAdd.removeClass('active');
  linkView.addClass('active');
})


// linkAdd.addEventListener('click', function() {
//   viewEl.classList.remove("visible");
//   viewEl.classList.add("hidden");
//   addEl.classList.add("visible");
//   addEl.classList.remove("hidden");

//   //change navbar active class
//   linkView.parentElement.classList.remove("active");
//   linkAdd.parentElement.classList.add("active");
// });
linkAdd.click(function(){
  viewEl.removeClass('visible');
  viewEl.addClass('hidden');
  addEl.addClass('visible');
  addEl.removeClass('hidden');

  linkView.removeClass('active');
  linkAdd.addClass('active');
})



var songTitle;
var artistTitle;
var AlbumTitle;

// songEl = document.getElementById('song-name');
// artistEl = document.getElementById('artist-name');
// albumEl = document.getElementById('album-name');
songEl = $('#song-name');
artistEl = $('#artist-name');
albumEl = $('#album-name');


//Add song to list view when button is clicked
// addBtnEl.addEventListener('click', function() {
//   songTitle = songEl.value;
//   artistTitle = artistEl.value;
//   albumTitle = albumEl.value;

//   addSong(songTitle, artistTitle, albumTitle);
// });
addBtnEl.click(function() {
  songTitle = songEl.val();
  artistTitle = artistEl.val();
  albumTitle = albumEl.val();

  addSong(songTitle, artistTitle, albumTitle);
})




//build up new song HTMl and add to innerHTML of main--content area
var addSongHTML;
var addSongElem;

function addSong(song, artist, album) {
  addSongHTML = "";

  addSongHTML += `<div class="row song">`;
  addSongHTML +=   `<div class="col-md-8 song"><header>${song}</header>`;
  addSongHTML +=     `<p>by ${artist} on the album ${album}</p>`;
  addSongHTML +=   `</div>`;
  addSongHTML +=   `<div class="col-md-4">`;
  addSongHTML +=     `<button class="remove btn btn-default">Remove</button>`;
  addSongHTML +=   `</div>`;
  addSongHTML += `</div>`;

  songsEl = $("#songs");
  songsEl.append(addSongHTML);


  songEl.val("");
  artistEl.val("");
  albumEl.val("");

  linkView.click();
}