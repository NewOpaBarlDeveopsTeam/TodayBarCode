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
  $http.get("/closingstockinfo").success(function(res1){
         console.log(res1)
    $scope.closingstockdate=res1[0].ClosingDate;
    console.log($scope.closingstockdate)
    })///closingstockinfo
  
  $scope.validation=function(todaydate)
  {
    var  dates  = new Date(((new Date(todaydate).toISOString().slice(0, 23))+"-05:30")).toISOString();
            var a = dates.split("T");
            var date = a[0];
            console.log(date)
    console.log($scope.closingstockdate)
    if($scope.stockid==null)
      {
        alert("Please Select Stock Point!!!!!")
      }
    else if($scope.sectionname==null)
      {
        alert("Please Select Price Section!!!!!")
      }
     else if(date == $scope.closingstockdate)
       {
         alert("Sorry Closing Stock Is Already Done For This Day!!!!!")
       }
    else
    {
      $scope.enterfunction($scope.date2.date1)
    }
  }
  
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
  
   $scope.objectpush=function()
    {
     
     var itemlength=closingstock.length;
      var obj={};
      obj["itemcode"]=$scope.objitemcode;
      obj["itemname"]=$scope.itemname;
      obj["itemskuid"]=$scope.skuid;
      obj["uom"]=$scope.uom;
      obj["inpieces"]=$scope.inpiecse;
      obj["outpieces"]=$scope.outpieces;
      obj["openingstock"]=$scope.closingvalue;
      $scope.bookqty=($scope.closingvalue+$scope.inpiecse)-$scope.outpieces;
      obj["bookqty"]=$scope.bookqty;
      obj["diffqty"]=$scope.diffqty;
      obj["sales"]=$scope.sales;
      obj["physicalqty"]=$scope.physicalqty;
      closingstock.push(obj);
      console.log(closingstock)
      $scope.notconfirm=closingstock;  
    }
   $scope.diffcalcfun=function(itemsku,section,physicalqty,bookqty)
  {
    $scope.diffqty=null;
    $scope.sales=null;
    var sectionratefetch=itemsku+","+section;
    $scope.diffqty=bookqty-physicalqty;
    $http.get("/sectionratefetch"+sectionratefetch).success(function(res9){
    console.log(res9)
        console.log(res9[0].SaleRate);
        console.log(res9[0].ItemSKUID);
        $scope.itemskuid=res9[0].ItemSKUID;
        $scope.salerate=res9[0].SaleRate;
        $scope.sales=$scope.diffqty*$scope.salerate;
     for( var s=0;s<=closingstock.length;s++)
         {
           if(closingstock[s].itemskuid==$scope.itemskuid)
              {
                var obj={};
                closingstock[s].diffqty=$scope.diffqty;
                closingstock[s].sales=$scope.sales;
                closingstock[s].physicalqty=physicalqty;
                
                break;
              }
         }//for
      })
  }
   $scope.closinstockfun=function(closingsave,closingdate)
   {
      console.log(closingsave);
      var closingstocklength=closingsave.length;
          $scope.closingstockid=0;
          var closingsfun = function(y)
          {
            if(y  < closingstocklength)
              {
                
                var  dates  = new Date(((new Date(closingdate).toISOString().slice(0, 23))+"-05:30")).toISOString();
            var a = dates.split("T");
            var date = a[0];
            console.log(date);
            $scope.closingstockid++;
          var closingitemvalue=$scope.stockidfound+","+date+","+closingsave[y].itemskuid+","+closingsave[y].openingstock+","+closingsave[y].inpieces+","+closingsave[y].outpieces+","+closingsave[y].itemcode+","+closingsave[y].physicalqty+","+$scope.closingstockid;
                
//       $http.get("/closingstockinfo").success(function(res1){
//         console.log(res1)
//       }) 
//                $http.post("/closingstocksave"+closingitemvalue).success(function(result99){
//            console.log(result99);
//            
//            closingsfun(y+1);
//          }) 
                
          }//ifclosingsfun
          }//closingsfun
          closingsfun(0);
   }
  }]);
