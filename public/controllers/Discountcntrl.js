var app=angular.module('myapp',[])
 
app.controller('myctrl',['$scope','$http',function($scope,$http){
	 $scope.date2 ={date1:new Date()}
     $scope.date1 ={date2:new Date()}

      $scope.sel=function(select,sel2)
     {
     	
     	console.log(sel2)
     	alert(select);

     }

     $scope.login= window.sessionStorage.getItem("loginres1")
     console.log($scope.login);
     
     $http.get('/dscname'+$scope.login).success(function(response){
          console.log(response);
          $scope.itename=response
          console.log($scope.itename);
           })


$scope.getitemid=function(names){
      
     alert(names)
     var name1=names;
var silly = name1.substr(1);
console.log(silly);


    

     $http.get('/getid'+silly).success(function(response){
          console.log(response);
           $scope.itemid=response[0].id;
          console.log($scope.itemid);
     })

}
  $scope.get=function(numb){
     alert(numb)
      $scope.getnumb=numb;
     console.log($scope.getnumb);
//      $scope.allres=$scope.per1+","+$scope.radio+","+$scope.getnumb+","+$scope.itemid;
// console.log($scope.allres);
// $http.post('/disbyitem'+$scope.allres).success(function(response){
//      console.log(response);
// })
                         }
  $scope.percent=function(per){
     alert(per)
     $scope.per1=per;
     console.log($scope.per1);
}
 $scope.amount=function(amo){
     alert(amo)
     $scope.amo1=amo;
     console.log($scope.amo1);
}
 $scope.getr1=function(r1){
     alert(r1);
     $scope.radio=r1;
     console.log($scope.radio);
}



//////////////////TODAY WORK//////////////////////

$scope.savediscount=function(){
     alert($scope.per1);
        $scope.allres=$scope.per1+","+$scope.radio+","+$scope.getnumb+","+$scope.itemid;
console.log($scope.allres);

//        $scope.allres=$scope.amo1+","+$scope.radio+","+$scope.getnumb+","+$scope.itemid;
// console.log($scope.allres);

$http.post('/disbyitem'+$scope.allres).success(function(response){
     console.log(response);
})

}



}]);

 
      
      
   
     
   
     
   


             

















 
 
	 


 

    
     
    

