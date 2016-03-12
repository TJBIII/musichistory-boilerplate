"use strict";


app.controller("SongAddCtrl", [
  "$scope",
  "$location",

  function($scope, $location) {
    $scope.newSong = {name: "", artist: "", album: ""};

    $scope.addSong = function () {
      console.log("$scope.newSong", $scope.newSong);
      let newSong = JSON.stringify($scope.newSong);

      $.ajax({
        url: 'https://amber-fire-2440.firebaseio.com/songs.json',
        type: 'POST',
        data: newSong
      })
      .done(function() {
        console.log("success");
        // console.log("$location.path", $location.path());
        // $location.path('#/songs').replace();

      })
      .fail(function() {
        console.log("error");
      });

    };

  }]
);