'use strict';

app.factory("song-storage", function($q, $http) {

  function getSongList() {

    // Return a promise for our async XHR
    return $q(function(resolve, reject) {

      // Perform some asynchronous operation, resolve or reject 
      // the promise when appropriate.
      $http.get("https://amber-fire-2440.firebaseio.com/songs/.json")
      // $http.get('./songs.json')
      .success(
        function(songsObject) {
          let songsArray = [];
          for (let key in songsObject){
            songsObject[key].id = key;
            songsArray.push(songsObject[key]);
          }
          // console.log("songsArray", songsArray);
          resolve(songsArray);
        },function(error) {
          reject(error);
        }
      );

    });
  }

  return getSongList;
});