var myApp=angular.module('myApp',[]);

myApp.controller('EnterClosing',['$scope','$http','$window',
function($scope,$http,$window){
  $scope.date2 = {date1:new Date()}
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
  
  $scope.enterfunction=function(voucherdate){
    alert("enter");
    var  dates  = new Date(((new Date(voucherdate).toISOString().slice(0, 23))+"-05:30")).toISOString();
            var a = dates.split("T");
            var date = a[0];
            console.log(date)
             var stockinwordtype="Yes";
       var stockinvalue=date+","+$scope.stockidfound+","+stockinwordtype;
       console.log(stockinvalue)
       $http.get("/stockincalc"+stockinvalue).success(function(response){
         
         $scope.justcheck=response;
//         for(var s=0;s<response.length;s++)
//         {
//           $scope.itemcodecode = response[s]._id.itemcode;
//           console.log(response[s]._id.itemcode);
//        var itemidwithpos = response[s]._id.itemcode+","+$scope.loginresname;
//           
//   $http.get("/stockoutcalc"+$scope.itemcodecode).success(function(res){
//             console.log(res)
//          if(res.length !=0)
//            {
//              $scope.outpieces = res[0].pieces;
//              console.log($scope.outpieces)
//            }
//     else{
//              $scope.outpieces = 0;
//              console.log($scope.outpieces)
//       
//         }
//         })
//   $http.get("/itemnamefetchwithpos"+itemidwithpos).success(function(result){
//             console.log(result)
//             console.log(result[0].ItemName)
//         })
//           
//         }
         
       })//stockincalc
  }
  }]);
