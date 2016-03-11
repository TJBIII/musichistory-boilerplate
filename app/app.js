var app = angular.module("SongApp", ['ngRoute']);

app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'partials/login.html',
        controller: 'LoginCtrl'
      }).
      when('/songs', {
        templateUrl: 'partials/song-list.html',
        controller: 'SongCtrl'
      }).
      when('/songs/:songId', {
        templateUrl: 'partials/song-detail.html',
        controller: 'SongDetailCtrl'
      }).
      when('/add/', {
        templateUrl: 'partials/song-form.html',
        controller: 'SongAddCtrl'
      }).
      otherwise({
        redirectTo: '/'
      });
  }]);

// app.config(['$routeProvider',
  // function($routeProvider) {
  //   $routeProvider.
  //     when('/', {
  //       templateUrl: 'partials/login.html'
  //     })
  // }]);