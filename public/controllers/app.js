angular.module('starter', ['ionic', "ion-datetime-picker"])

    .run(function ($ionicPlatform) {
        $ionicPlatform.ready(function () {
            if (window.cordova && window.cordova.plugins.Keyboard) {

                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);


                cordova.plugins.Keyboard.disableScroll(true);
            }
            if (window.StatusBar) {
                StatusBar.styleDefault();
            }
        })
    })
//.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
//   $ionicConfigProvider.tabs.position('top');
//  $stateProvider
//
//  .state('app', {
//    url: '/app',
//    abstract: true,
//    templateUrl: 'templates/menu.html',
//
//  })

//  .state('app.timetbl', {
//      url: '/timetbl',
//      views: {
//        'menuContent': {
//          templateUrl: 'templates/timetbl.html',
//          controller: 'TimetblCtrl'
//        }
//      }
//    });
//    $urlRouterProvider.otherwise('/sign-in');
//})


.factory('cordova', function () {
  return {
	  test: function(){
		  document.addEventListener("deviceready",this.ready, false);    // ab function to add add eventlistener event to ensure device ready
	  },
	  ready: function(){
		  //Save the world!
	  }

  }
});