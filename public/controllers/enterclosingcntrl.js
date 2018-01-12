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
     //alert("stockid call");
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
  
  $http.get('/sectionnamefetch'+$scope.loginresname).success(function(response){
  console.log(response);
  $scope.sectioname = response;
  })//sectionnamefetch
  
  $http.get('/itemdetailsfetch'+$scope.loginresname).success(function(response){
    console.log(response);
    console.log(response[0].POSID);
    $scope.posid = response[0].POSID;
    $scope.itemdetails = response;
    for(var c=0;c<response.length;c++)
      {
        $scope.itemcode=response[c].ItemCode;
        $scope.itemname=response[c].ItemName;
        $scope.objectpush();
      }
  })

  $scope.enterfunction=function(voucherdate)
  {
    
    //alert("enter");
    var  dates  = new Date(((new Date(voucherdate).toISOString().slice(0, 23))+"-05:30")).toISOString();
            var a = dates.split("T");
            var date = a[0];
            console.log(date)
             var stockinwordtype="Yes";
       var stockinvalue=date+","+$scope.stockidfound+","+stockinwordtype;
       console.log(stockinvalue)
       $http.get("/stockincalc"+stockinvalue).success(function(response){
           console.log(response);
         if(response.length!=0)
           {
           console.log(response[0]._id.itemcode);
         
           $scope.justcheck=response;
         for(var k=0;k<response.length;k++)
           {
             $scope.itemcode=response[k]._id.itemcode;
             $scope.itemname=response[k]._id.itemname;
             $scope.uom=response[k]._id.uom;
            if(response[k]._id.stocktype=="Yes")
            {
              $scope.inpieces=response[k].netpieces;
              console.log($scope.inpieces)
            }
             else
             {
               $scope.inpieces=0;
             }
             if(response[k]._id.stocktype=="No")
               {
                 $scope.outpieces=response[k].netpieces;
                 console.log($scope.outpieces)
               }
             else
             {
               $scope.outpieces=0;
             }
             $scope.objectpush();
           }
             
           }//if
         else
         {
           alert("Stock is Empty for this Day!!!!...")
         }
         
          })//stockincalc
   }//enterfunction
  $scope.objectpush=function()
    {
      var obj={};
      //console.log($scope.itemcode)
      obj["itemcode"]=$scope.itemcode;
      obj["itemname"]=$scope.itemname;
      obj["uom"]=$scope.uom;
      obj["inpieces"]=$scope.inpieces;
      obj["outpieces"]=$scope.outpieces;
      $scope.bookqty=$scope.inpieces-$scope.outpieces;
      obj["bookqty"]=$scope.bookqty;
      closingstock.push(obj);
      $scope.notconfirm=closingstock;
      console.log($scope.notconfirm);
    }
  }]);
