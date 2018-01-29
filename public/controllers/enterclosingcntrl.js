var myApp=angular.module('myApp',[]);

myApp.controller('EnterClosing',['$scope','$http','$window',
function($scope,$http,$window){
  $scope.date2 = {date1:new Date()}
  var closingstock=[];
  $scope.isDisabled = false;
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
 $scope.datefindfun=function()
 {
//   var  dates  = new Date(((new Date($scope.date2.date1).toISOString().slice(0, 23))+"-05:30")).toISOString();
//            var a = dates.split("T");
//            var date = a[0];
//            console.log(date);
           var date = new Date(), d = date.getDate(), y = date.getFullYear(), m = date.getMonth();
           var predate = new Date(y,m,d);
           var premonth = new Date(y, m,d-1);
           var preyear = new Date(y, m + 1, 0);
//           console.log(predate)
           console.log(premonth)
//           console.log(preyear)
   
      var  dates  = new Date(((new Date(premonth).toISOString().slice(0, 23))+"-05:30")).toISOString();
            var a = dates.split("T");
            $scope.prevdate = a[0];
            console.log($scope.prevdate);

 }
 $scope.datefindfun();  
  $scope.validation=function(todaydate)
  {
    var  dates  = new Date(((new Date(todaydate).toISOString().slice(0, 23))+"-05:30")).toISOString();
            var a = dates.split("T");
            var date = a[0];
            console.log(date);
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
            console.log(date);
            $scope.isDisabled = true;
            var stockinwordtype="Yes";
            $scope.inpieces=null;
            $scope.outpieces=null;
            $scope.closing=0;
           var openingstockvalue=$scope.loginresname+","+$scope.fromstockidfound+","+$scope.prevdate;
            $http.get("/openingstock"+openingstockvalue).success(function( result){
              console.log(result);
              var itemlength=result.length;
               var closingstockfun = function(r)
             {
               if( r < itemlength)
             {
                console.log(result[r]._id.itemname);
                console.log(result[r]._id.itemcode);
                $scope.objitemcode=result[r]._id.itemcode;
                $scope.itemname=result[r]._id.itemname;
                $scope.skuid=result[r]._id.skuid;
                $scope.uombase=result[r]._id.baseqty;
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
         //$scope.notconfirm1=response;
         if(response.length!=0)
           {
             $scope.inpiecse=0;
             $scope.outpieces=0;
             console.log(response[0]._id.stocktype);
             console.log(response[0]._id.uom);
             console.log(response[0]._id.Yesstocktype);
             console.log(response[0]._id.Nostocktype)
             $scope.uom=response[0]._id.uom;
             for(var c=0;c<response.length;c++)
               {
                if(response[c]._id.Yesstocktype==true && response[c]._id.Nostocktype==false )
               {
                 //alert("Yestrue")
                 console.log(response[c].netpieces);
                 $scope.inpiecse=response[c].netpieces;
                 //$scope.outpieces=0
                 //console.log($scope.outpieces)
                 console.log($scope.inpiecse)
               }
               if(response[c]._id.Yesstocktype==false && response[c]._id.Nostocktype==true)
                {
                  //alert("hai")
                 console.log(response[c].netpieces);
                 $scope.outpieces=response[c].netpieces;
                 //$scope.inpiecse=0
                 console.log($scope.outpieces)
                 //console.log($scope.inpiecse)
                }
//              if(response[c]._id.Nostocktype==true)
//               {
//                 alert("Notrue")
//                 console.log(response[c].netpieces);
//                 $scope.outpieces=response[c].netpieces;  
//                 console.log($scope.outpieces)
//               }
//              else if(response[c]._id.Nostocktype==false)
//                {
//                  alert("Nofalse")
//                  $scope.outpieces=0;  
//                 console.log($scope.outpieces)
//                }
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
      obj["ItemCode"]=$scope.objitemcode;
      obj["ItemName"]=$scope.itemname;
      obj["ItemSKUId"]=$scope.skuid;
      obj["UOM"]=$scope.uombase;
      obj["In"]=$scope.inpiecse;
      obj["Out"]=$scope.outpieces;
      obj["Closing"]=$scope.closingvalue;
      $scope.bookqty=($scope.closingvalue+$scope.inpiecse)-$scope.outpieces;
      obj["BookQty"]=$scope.bookqty;
      obj["DiffQty"]=$scope.diffqty;
      obj["Sales"]=$scope.sales;
      obj["Opening"]=$scope.PhysicalQty;
      obj["OpeningBase"]=$scope.calcbase;
      obj["OpeningCase"]=$scope.calcpack;
      closingstock.push(obj);
      console.log(closingstock)
      $scope.notconfirm=closingstock;  
    }
  $scope.diffcalcfun=function(event,itemsku,section,PhysicalQty,bookqty,itemcode)
  {
    if(event.keyCode==13)
       {
    $scope.diffqty=null;
    $scope.sales=null;
//     $scope.calcbase;
//     obj["openinbcase"]=$scope.calcpack;
    var sectionratefetch=itemsku+","+section;
    $scope.diffqty=bookqty-PhysicalQty;
     $http.get("/skuitemnamefetch"+itemcode).success(function(result){
       console.log(result)
       console.log(result[0].UOMSize)
       $scope.umoumosize=result[0].UOMSize;
      $http.get("/openingconversion"+$scope.umoumosize).success(function(res2){
        console.log(res2);
        $scope.baseqty=res2[0].BaseQty;
        $scope.packqty=res2[0].PackQty;
        $scope.calcstd = PhysicalQty
        $scope.calcbase = $scope.calcstd*$scope.baseqty;
        $scope.calcpack = $scope.calcstd/$scope.packqty;
        console.log($scope.calcstd);
        console.log($scope.calcbase);
        console.log($scope.calcpack);
     
    $http.get("/sectionratefetch"+sectionratefetch).success(function(res9){
    console.log(res9)
        console.log(res9[0].SaleRate);
        console.log(res9[0].ItemSKUID);
        $scope.itemskuid=res9[0].ItemSKUID;
        $scope.salerate=res9[0].SaleRate;
        $scope.sales=$scope.diffqty*$scope.salerate;
     for( var s=0;s<=closingstock.length;s++)
         { 
           if(closingstock[s].ItemSKUId==$scope.itemskuid)
              {
                var obj={};
                closingstock[s].DiffQty=$scope.diffqty;
                closingstock[s].Sales=$scope.sales;
                closingstock[s].Opening=PhysicalQty;
                closingstock[s].OpeningBase=$scope.calcbase; 
                closingstock[s].OpeningCase=$scope.calcpack; 
                break;
              }
         }//for
       })//sectionratefetch
      })//openingconversion
     })//skuitemnamefetch
  }//ng-ketdown
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
          var closingitemvalue=$scope.stockidfound+","+date+","+closingsave[y].ItemSKUId+","+closingsave[y].Closing+","+closingsave[y].In+","+closingsave[y].Out+","+closingsave[y].ItemCode+","+closingsave[y].Opening+","+$scope.closingstockid+","+closingsave[y].OpeningBase+","+closingsave[y].OpeningCase;
                
    $http.post("/closingstocksave"+closingitemvalue).success(function(result99){
            console.log(result99);
            
            closingsfun(y+1);
          })
          $http.delete("/closingtallydelete").success(function(res29){
            console.log(res29)
          })
          }//ifclosingsfun
          }//closingsfun
          closingsfun(0);
   }
   
   
   $scope.closingtallyfun=function(closingsave,closingdate)
   {
      console.log(closingsave);
      var closingstocklength=closingsave.length;
          $scope.closingstocktally=0;
          var closingsfun = function(y)
          {
            if(y  < closingstocklength)
              {
                
                var  dates  = new Date(((new Date(closingdate).toISOString().slice(0, 23))+"-05:30")).toISOString();
            var a = dates.split("T");
            var date = a[0];
            console.log(date);
            $scope.closingstocktally++;
          var closingitemvalue=$scope.stockidfound+","+date+","+closingsave[y].ItemSKUId+","+closingsave[y].Closing+","+closingsave[y].In+","+closingsave[y].Out+","+closingsave[y].ItemCode+","+closingsave[y].Opening+","+closingsave[y].ItemName+","+closingsave[y].UOM+","+closingsave[y].DiffQty+","+closingsave[y].Sales+","+$scope.closingstocktally+","+closingsave[y].BookQty+","+closingsave[y].OpeningBase+","+closingsave[y].OpeningCase;
          console.log(closingitemvalue) 
    $http.post("/closingstocktallysave"+closingitemvalue).success(function(result99){
            console.log(result99);
            
            closingsfun(y+1);
          }) 
                
          }//ifclosingsfun
          }//closingsfun
          closingsfun(0);
   }
   
   $scope.closingtallywiew=function(tallydate,tallystockid)
   {
    alert(tallydate);
    alert(tallystockid);
    $scope.isDisabled = true;
     var  dates  = new Date(((new Date(tallydate).toISOString().slice(0, 23))+"-05:30")).toISOString();
            var a = dates.split("T");
            var date = a[0];
            console.log(date);
     var tallyvalue=date+","+$scope.fromstockidfound;
     
     $http.get("/closingtallydetail"+tallyvalue).success(function(response){
       console.log(response);
       var tallylength=response.length;
       var tallypush = function(z)
          {
          if( z  < tallylength)
           {
           $scope.objitemcode=response[z].ItemCode;
           $scope.itemname=response[z].ItemName;
           $scope.skuid=response[z].ItemSKUId;
           $scope.uombase=response[z].UOM;
           $scope.inpiecse=response[z].In;
           $scope.outpieces=response[z].Out;
           $scope.closingvalue=response[z].Closing;
           //$scope.bookqty=($scope.closingvalue+$scope.inpiecse)-$scope.outpieces;
           $scope.bookqty=response[z].BookQty;
           $scope.diffqty=response[z].DiffQty;
           $scope.sales=response[z].Sales;
           $scope.PhysicalQty=response[z].PhysicalQty;
           $scope.calcbase=response[z].OpeningBase;
           $scope.calcpack=response[z].OpeningCase;
           $scope.objectpush();
           tallypush(z+1)
  //       obj["Opening"]=$scope.PhysicalQty;
  //       obj["OpeningBase"]=$scope.calcbase;
  //       obj["OpeningCase"]=$scope.calcpack;
                
              }
          }
       tallypush(0);
     })
   }
//   $scope.checkcall=function(event,name)
//   {
//    if (event.keyCode==13)
//      {
//      alert(name)
//      }
//   }
  }]);
