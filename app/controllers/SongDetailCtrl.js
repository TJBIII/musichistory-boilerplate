"use strict";

app.controller("SongDetailCtrl", 
  ["$scope", 
  "$routeParams",
  "song-storage",
  
  function($scope, $routeParams, songStorage) {

    songStorage().then(
      function (songArray) {
        console.log("promise resolved with data");
        $scope.songs = songArray;

        //this will be needed later
        // $scope.songId = $routeParams.songId;
        $scope.selectedSong = $scope.songs.filter(function (s) {
          return s.id === $routeParams.songId;
        })[0];

      }, 
      function (error) {
        console.log("an error occured", error);
      });
  }


]);