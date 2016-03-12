"use strict";

app.controller("SongCtrl", [
  "$scope",
  "$http",
  "song-storage",

  function($scope, $http, songStorage) {
    $scope.selectedSearch = {name: "", artist: "", album: ""};
    $scope.query = "";
    $scope.songs = "";


    songStorage().then(
        function (songsArray) {
          console.log("promise resolved with data");
          // console.log("songsArray", songsArray);
          $scope.songs = songsArray;
        },
        function (error) {
          console.log("There was an error", error);
        }
      );

    $scope.removeSong = function (song) {
      console.log("remove song", song);
      let songIndex = $scope.songs.indexOf(song);
      if (songIndex >= 0) {
        $scope.songs.splice(songIndex, 1);
      }

      $.ajax({
        url: `https://amber-fire-2440.firebaseio.com/songs/${song.id}.json`,
        method: 'DELETE'
      })
      .done(function() {
        console.log("song deleted from firebase");
      })
      .fail(function() {
        console.log("error while deleting song from firebase");
      });
    };


  }]
);