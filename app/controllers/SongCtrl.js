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
        function (songsObject) {
          console.log("promise resolved with data");
          // console.log("songsObject", songsObject);
          $scope.songs = songsObject;
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
    };


  }]
);