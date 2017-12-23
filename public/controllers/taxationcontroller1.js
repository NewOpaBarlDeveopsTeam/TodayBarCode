
var myApp = angular.module('myApp', []);
myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http,$localStorage,$sessionStorage, $window) {
    console.log("Hello World from controller display");
 
var refresh = function() {
$http.get('/getitemtaxation').success(function(response) {
 	console.log("i get the data i requested");
  	$scope.res = response;
    console.log(response);

  });
};

refresh();
//  my -part dddddddddddddddddddddddddddddddddddd
// here is original
$scope.addnew = function() {
  console.log("i am add" + $scope.user.name, $scope.user.aliasname, $scope.user.taxlevel);
  $http.post('/opalpost', $scope.user).success(function(response) {
    console.log(response);
   refresh();
           });
    $scope.user = ""
};
// writing code here eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
// here iam doing


// my part endssssssssssssssssssssssssssssssssssssssssssss
$scope.remove = function(id) {
  console.log("remove call"+id);

  console.log("this is delete"+id);
$http.delete('/opal/' + id).success(function(response) {
    refresh();
  });
};


$scope.edit = function(id) {
  console.log("edit call" +id);
  console.log("this is " +id);
  // var uid=id;
  $http.get('/item1/' + id).success(function(response) {
     $scope.user = response;

  });

};  

$scope.update = function() {
  console.log($scope.user._id);
   $http.put('/opal/' + $scope.user._id, $scope.user).success (function(response) {
  refresh();
  });
   $scope.user = ""
};

$scope.deselect = function() {
  $scope.user = ""
}

}]);