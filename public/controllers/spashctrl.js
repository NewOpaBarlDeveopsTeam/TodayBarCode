angular.module("myApp", ['ui.bootstrap'])
.controller("MyCtrl", function($scope, $modal) {
    console.log("hiiiii")
    $scope.showModal = function(){
        $modal.open({
              templateUrl: 'myModal.html',
              controller: 'ModalDialogController', 
         })
        .result.then(
            function () {
                alert("OK");
            }, 
            function () {
                alert("Cancel");
            }
        );
    }
})

.controller("ModalDialogController", function ($scope, $modalInstance) {
  $scope.ok = function () {
    $modalInstance.close();
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});