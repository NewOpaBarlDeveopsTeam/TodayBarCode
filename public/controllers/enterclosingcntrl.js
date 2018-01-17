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
  $scope.enterfunction=function(voucherdate)
  {
            var  dates  = new Date(((new Date(voucherdate).toISOString().slice(0, 23))+"-05:30")).toISOString();
            var a = dates.split("T");
            var date = a[0];
            console.log(date)
            var stockinwordtype="Yes";
            $scope.inpieces=null;
            $scope.outpieces=null;
            $scope.closing=0;
            $http.get("/openingstock"+$scope.loginresname).success(function( result){
              console.log(result);
              var itemlength=result.length;
             var closingstockfun = function(r)
             {
               //alert(r);
               if( r < itemlength)
             {
                console.log(result[r]._id.itemname);
                console.log(result[r]._id.itemcode);
                $scope.objitemcode=result[r]._id.itemcode;
               $scope.itemname=result[r]._id.itemname;
               $scope.skuid=result[r]._id.skuid;
               console.log($scope.skuid)
                if(result[r]._id.closing !=null)
                  {
                    $scope.closingvalue=result[r]._id.closing;
                    console.log($scope.closingvalue);
                  }
                else
                {
                  $scope.closingvalue=0;
                  console.log($scope.closingvalue);
                } 
       var stockinvalue=date+","+$scope.stockidfound+","+stockinwordtype+","+$scope.objitemcode;
       $http.get("/stockincalc"+stockinvalue).success(function(response){
        console.log(response);
         if(response.length!=0)
           {
             console.log(response[0]._id.stocktype);
             console.log(response[0]._id.uom);
             $scope.uom=response[0]._id.uom;
             for(var c=0;c<response.length;c++)
               {
             if(response[c]._id.stocktype=="Yes")
               {
                console.log(response[c].netpieces);
                $scope.inpiecse=response[c].netpieces;
               }
              if(response[c]._id.stocktype=="No")
                {
                console.log(response[c].netpieces);
                $scope.outpieces=response[c].netpieces;  
                }
               }
           }
           else if(response.length==0)
           {
             $scope.inpiecse=0;
             $scope.outpieces=0;
             $scope.uom=null;
           }
         
          $scope.objectpush();
          closingstockfun (r+1);
          })//stockincalc
          }//if itemlength
          }//closingstockfun
          closingstockfun(0);
          })//openingstock
          }//enterfunction
  
  $scope.diffcalcfun=function(itemsku,section,physicalqty,bookqty)
  {
    alert("diff");
    alert(itemsku);
    alert(section);
    alert(physicalqty);
    alert(bookqty);
    var sectionratefetch=itemsku+","+section;
    $scope.diffqty=bookqty-physicalqty;
    $http.get("/sectionratefetch"+sectionratefetch).success(function(res9){
    console.log(res9)
    console.log(res9[0].SaleRate);
    console.log(res9[0].ItemSKUID);
    if(itemsku==res9[0].ItemSKUID)
      {
        alert("match")
     $scope.salerate=res9[0].SaleRate;
     $scope.sales=$scope.diffqty*$scope.salerate;
      }
    })
  }
   $scope.objectpush=function()
    {
      var obj={};
      //console.log($scope.itemcode)
      obj["itemcode"]=$scope.objitemcode;
      obj["itemname"]=$scope.itemname;
      obj["itemskuid"]=$scope.skuid;
      obj["uom"]=$scope.uom;
      obj["inpieces"]=$scope.inpiecse;
      obj["outpieces"]=$scope.outpieces;
      obj["openingstock"]=$scope.closingvalue;
      $scope.bookqty=($scope.closingvalue+$scope.inpiecse)-$scope.outpieces;
      obj["bookqty"]=$scope.bookqty;
      closingstock.push(obj);
     console.log(closingstock)
      $scope.notconfirm=closingstock;
    }
  }]);
