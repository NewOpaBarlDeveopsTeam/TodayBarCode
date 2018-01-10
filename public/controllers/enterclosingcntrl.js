var myApp=angular.module('myApp',[]);

myApp.controller('EnterClosing',['$scope','$http','$window',
function($scope,$http,$window){
  $scope.date2 = {date1:new Date()}
  var closingstock=[];
  var loginres= window.sessionStorage.getItem("loginres1")
   console.log(loginres)
   $scope.loginresname = loginres;
  $http.get('/stockpointfetch'+$scope.loginresname).success(function(response){
   console.log(response);
     $scope.stockpointname = response;
     console.log(response[0].StockPointName);
     $scope.stockpointfrom = function(stockid){
     alert("stockid call");
     console.log(stockid);
     $scope.stockid = stockid; 
      for(var m=0;m<response.length;m++){
       if($scope.stockid == response[m].StockPointName){
        console.log(response[m].StockPointID)
        $scope.fromstockidfound = response[m].StockPointID;
        console.log($scope.fromstockidfound)
        $scope.stockidfound = $scope.fromstockidfound;
        }
       }
     }
   })//stockpointfetch
  
  $scope.enterfunction=function(voucherdate)
  {
    var obj={};
    alert("enter");
    var  dates  = new Date(((new Date(voucherdate).toISOString().slice(0, 23))+"-05:30")).toISOString();
            var a = dates.split("T");
            var date = a[0];
            console.log(date)
             var stockinwordtype="Yes";
       var stockinvalue=date+","+$scope.stockidfound+","+stockinwordtype;
       console.log(stockinvalue)
       $http.get("/stockincalc"+stockinvalue).success(function(response){
           console.log(response);
           console.log(response.length);
          console.log(response[0]._id.itemcode); 
         $scope.incalcid=response[0]._id.itemcode;
          })//stockincalc  
        $http.get("/stockoutcalc"+stockinvalue).success(function(result){
              console.log(result);
              console.log(result.length);
          $scope.outcalcid=result[0]._id.itemcode;
          console.log($scope.incalcid)
          console.log($scope.outcalcid)
          })
   }//enterfunction
  }]);
