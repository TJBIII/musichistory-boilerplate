app.controller("SongCtrl", [
  "$scope",
  "$http",
  "song-storage",

  function($scope, $http, songStorage) {
    $scope.selectedSearch = {name: "", artist: "", album: ""};
    $scope.query = "";
    $scope.songs = "";


    songStorage.then(
        function (songArray) {
          console.log("promise resolved with data");
          $scope.songs = songArray;
          // console.log("$scope.songs", $scope.songs);
        },
        function (error) {
          console.log("There was an error", error);
        }
      );
  }]
);