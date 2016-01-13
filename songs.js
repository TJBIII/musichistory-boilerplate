var songs = [];

songs[songs.length] = "Legs > by Z*ZTop on the album Eliminator";
songs[songs.length] = "The Logical Song > by Supertr@amp on the album Breakfast in America";
songs[songs.length] = "Another Brick in the Wall > by Pink Floyd on the album The Wall";
songs[songs.length] = "Welco(me to the Jungle > by Guns & Roses on the album Appetite for Destruction";
songs[songs.length] = "Ironi!c > by Alanis Moris*ette on the album Jagged Little Pill";

songs.unshift("Nosetalgia > by Pusha T on the album My Name is My Name");
songs.push("Juicy > by Notorious BIG on the album Ready to Die");

console.log("songs", songs);

var songHTML = "";

for (var i = 0; i < songs.length; i++){
  var currentSong = songs[i];
  currentSong = currentSong.replace(/>/g, "-");
  currentSong = currentSong.replace(/[^a-zA-Z\-\d\s]/g, "");
  currentSong = currentSong.split("-");
  songHTML += '<div class="song"><header>' + currentSong[0] +'</header>';
  songHTML += '<p>' + currentSong[1] + '</p>';
}

console.log("songs", songs);
document.getElementById('main--content').innerHTML = songHTML; 