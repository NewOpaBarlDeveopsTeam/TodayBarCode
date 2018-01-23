var myApp=angular.module('myApp',[]);

myApp.controller('purchaseCntrl',['$scope','$http','$window','$filter',
function($scope,$http,$window,$filter){ 
  var purchaseitem = [];
  var taxdefinition =[];
  $scope.openingstockdate = "2018/01/18";
  console.log($scope.openingstockdate);
    $scope.yesnewNetpackage=0;
    $scope.yesnewNetbase=0;
    $scope.yesnewNetstandard=0;
    $scope.nonewNetpackage=0;
    $scope.nonewNetbase=0;
    $scope.nonewNetstandard=0;
  var  dates  = new Date(((new Date().toISOString().slice(0, 23))+"-05:30")).toISOString();
            var a = dates.split("T");
             $scope.date = a[0];
             console.log($scope.date)
  $scope.transaction;
  $scope.all = true;
//  $scope.qty = "Qty:";
  $scope.date2 = {date1:new Date()}
   
  $http.get('/transactionfetch').success(function(result){
  console.log(result);
  $scope.transactionType = result;
  })
  
  $http.get("/closingstockinfo").success(function(res1){
         console.log(res1)
    $scope.closingstockdate=res1[0].ClosingDate;
    console.log($scope.closingstockdate)
    });
   $scope.datefindfun=function()
 {

  var date = new Date(), d = date.getDate(), y = date.getFullYear(), m = date.getMonth();
  var premonth = new Date(y, m,d-1);
  console.log(premonth)
  var  dates  = new Date(((new Date(premonth).toISOString().slice(0, 23))+"-05:30")).toISOString();
            var a = dates.split("T");
            $scope.prevdate = a[0];
            console.log($scope.prevdate);
 }
 $scope.datefindfun();
  
  $http.get('/partynamefetch').success(function(res){
  console.log(res);
  $scope.partyname = res;
  $scope.partyid = function(party){
    alert("party call");
    console.log(party);
    $scope.party1 =party; 
    for(var y=0;y<res.length;y++){
      if($scope.party1 == res[y].partyName){
        console.log(res[y].partyId)
        $scope.partyidfound = res[y].partyId;
      }
    }    
  }
  
  })
  
   var loginres= window.sessionStorage.getItem("loginres1")
   console.log(loginres)
   $scope.loginresname = loginres;
  
  $http.get('/sectionnamefetch'+$scope.loginresname).success(function(response){
  console.log(response);
  $scope.sectioname = response;
  })
  
  $http.get('/vouchernumberfetch'+$scope.loginresname).success(function(response){
    console.log(response);
    console.log(response[0].invoiceNumber)
    $scope.vouchernumber = response[0].invoiceNumber;
    console.log(typeof($scope.vouchernumber));
    $scope.vouchernumber1 = parseInt($scope.vouchernumber);
    console.log(typeof($scope.vouchernumber1));
//    console.log($scope.vouchernumber);
  })
  
   $http.get('/umosizefetch').success(function(response){
   console.log(response);
      $scope.umosizefound = response;
      console.log($scope.umosizefound)
     $scope.ratecalc = function(umosize)
     {
      alert(umosize)
      $scope.umosize  =umosize;
      $scope.pieceNo;
//      alert($scope.pieceNo);
//      alert($scope.finalrate);
      for(x = 0;x<response.length;x++){
      if($scope.umosize ==response[x].UOM )
      {
       console.log(response[x].UOMID)  
        $scope.uomid = response[x].UOMID
        console.log($scope.uomid)
        }
         
    }      
     }
  })
  
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
    
   $scope.stockpointto = function(newstockid){
     alert("stockid call");
     console.log(newstockid);
     $scope.newstockid = newstockid; 
      for(var s=0;s<response.length;s++){
       if($scope.newstockid == response[s].StockPointName){
        console.log(response[s].StockPointID)
        $scope.tostockidfound = response[s].StockPointID;
         console.log($scope.tostockidfound)
        }
       }
     }
  })
//  +$scope.loginresname
  $http.get('/itemdetailsfetch'+$scope.loginresname).success(function(response){
    console.log(response);
    console.log(response[0].POSID);
    $scope.posid = response[0].POSID;
    $scope.itemdetails = response;
  })
  
  $scope.validationfunction=function(transactiontype)
  {
    if($scope.referenceno==null)
       {
       alert("Reference Number Is Required")
       }
    else if($scope.stockid==null)
      {
        alert("Please Select Stock Point!!!")
      }
    else if($scope.pieceNo == null)
      {
        alert("Please Select Pieces")
      }
    else
    {
      $scope.itemtaxfun();
    }
  }
$scope.transactioncall = function (transactiontype)
 {
    $scope.netquantity=0
    alert(transactiontype)
    if(transactiontype == "Purchase")
    {
       alert("Purchase")
          $scope.all = true;
          $scope.stockinward = "Yes";
          $scope.SaleRate=0;
          $scope.sectionid=0;
//        $scope.netquantity=0
          $scope.itemdetailsfetchfun = function(itemcode,voucherdate)
          {
          $scope.qty = "Qty:";
          $scope.pieceNo = 1;
          //$scope.discountname = "Discount";
          console.log($scope.pieces);
          console.log($scope.itemcode);
          console.log(typeof($scope.itemcode))
          var itemnew = parseInt($scope.itemcode);
          console.log(typeof(itemnew))
          $http.get("/skuitemnamefetch"+itemnew).success(function(result){
            if(result!=0)
            {
          console.log(result[0]);
          console.log(result[0].itemId);
          $scope.itemidd = result[0].itemId;
          console.log(result[0].ItemName);
          $scope.skuitemname = result[0].ItemName;
          console.log($scope.skuitemname)
          console.log(result[0].UOMSize); 
          var umosize = parseInt(result[0].UOMSize);
          console.log(typeof(umosize))
          console.log(umosize);
          $http.get("/itemuomqtyfetch"+umosize).success(function(res){
          console.log(res);
          console.log(res[0].UOMID);
          var stduomid = parseInt(res[0].UOMID); 
          console.log(res[0].UOMSize);
          $scope.uomsize = res[0].UOMSize
          console.log(res[0].Qty);
          $scope.umoqty = res[0].Qty;
          console.log(res[0].UOMSizeMasterID);
          $scope.uomsizemasterid = res[0].UOMSizeMasterID;        
          })
          console.log(result.length)
          if(result.length != 0)
          {
            var  dates  = new Date(((new Date(voucherdate).toISOString().slice(0, 23))+"-05:30")).toISOString();
            var a = dates.split("T");
            var date = a[0];
            console.log(date)
            console.log(result[0].ItemSKUID)
            var skuidfind = result[0].ItemSKUID;
            console.log($scope.itemcode)
            var newpurchaseratefind = $scope.transactiontype+","+$scope.itemcode+","+date;
            console.log(newpurchaseratefind)
          $http.get("/purchaseratefetch"+newpurchaseratefind).success(function(res){
            console.log(res);
            if(res.length!=0)
              {
            $scope.uomsizemasteridp=res[0].UOMSizeMasterId;
    $http.get('/stduomfetch'+$scope.uomsizemasteridp).success(function(res9){
       console.log(res9)
            if(res.length!=0)
              {
              console.log(res[0].UOMId)
              if(res[0].UOMId == 1)
              {
                alert("Ml")
                console.log(res[0].PurchaseRate)
                $scope.finalrate2 = res[0].PurchaseRate;
              }
            else if(res[0].UOMId == 2){
              alert("Bottle");
              $scope.finalrate2 = res[0].PurchaseRate;  
            }
                else if(res[0].UOMId == 3)
                  {
                    alert("Case")
                    $scope.finalrate2 = res[0].PurchaseRate; 
                  }
            console.log(res[0].PurchaseRate)
            $scope.purchaserate =res[0].PurchaseRate;
             
  var itemnewstockid = itemnew+","+$scope.fromstockidfound+","+$scope.prevdate+","+$scope.date;
               
        console.log(itemnewstockid);
        $http.get("/predayitemqtyfetch"+itemnewstockid).success(function(res19){ 
          console.log(res19[0]) 
          
        if(res19 !=0)
            {
          console.log(res19)
          $scope.closingbottle=res19[0].Closing;
          $scope.closingbase=res19[0].OpeningBase;
          $scope.closingcase=res19[0].OpeningCase;
          console.log($scope.closingbottle);
          console.log($scope.closingbase);
          console.log($scope.closingcase);    
//        })
    $http.get("/itemquantityfetch"+itemnewstockid).success(function(result1){
      console.log(result1);
      if(result1 != 0)
           {
           console.log(result1[0].UOMSizeMasterId);
           $scope.uomsizemasterid =result1[0].UOMSizeMasterId;
           $scope.stockinword = result1[0].stockInWord;
            for(var t=0;t<result1.length;t++)
             {
               var yes = "Yes";
               var No = "No"
               if(result1[t].stockInWord == yes)
               {
                 $scope.yesnewNetpackage+=result1[t].NetPackage;
                 $scope.yesnewNetbase+=result1[t].NetBase;
                 $scope.yesnewNetstandard+=result1[t].NetStandard;
                 console.log($scope.yesnewNetpackage);
                 console.log($scope.yesnewNetbase);
                 console.log($scope.yesnewNetstandard);
               }//yes
               else if(result1[t].stockInWord == No)
               {
                $scope.nonewNetpackage+=result1[t].NetPackage;
                 $scope.nonewNetbase+=result1[t].NetBase;
                 $scope.nonewNetstandard+=result1[t].NetStandard;
                 console.log($scope.nonewNetpackage);
                 console.log($scope.nonewNetbase);
                 console.log($scope.nonewNetstandard);
            }//no
            }  //for
            }//result1 !
            })//itemquantityfetch
            }//if
            })//predayitemqtyfetch   
            $scope.ratecalc = function(umosize)
            {
             alert(umosize);
          $scope.botnetqty=$scope.closingbottle+$scope.yesnewNetstandard-$scope.nonewNetstandard;
          $scope.casenetqty=$scope.closingcase+$scope.yesnewNetpackage-$scope.nonewNetpackage;
          $scope.mlnetqty=$scope.closingbase+$scope.yesnewNetbase-$scope.nonewNetbase;
             $scope.umosize =umosize;
             console.log($scope.umosize)
              var Case = "Case";
              var Bottle = "Bottle";
              var ml = "ML";
              $scope.baseqty = res9[0].BaseQty;
              $scope.packqty = res9[0].PackQty;
              $scope.stdqty = res9[0].StdQty;
            $http.get('/getuommid'+$scope.umosize).success(function(response){
              console.log(response);
              console.log(response[0].UOMID)
              $scope.uomid=response[0].UOMID; 
              console.log(response[0].UOM)
              console.log($scope.uomid);
              
              if(res[0].UOMId == 1)
              {
                alert("1")
                if($scope.umosize == ml )
                 {
                   alert(ml);
                   $scope.finalrate = $scope.finalrate2;
                   $scope.calcbase = $scope.pieceNo;
                   $scope.calcstd = $scope.calcbase/$scope.baseqty;
                   $scope.calcpack =$scope.calcstd/$scope.packqty;
                   $scope.newnetquantity =$scope.mlnetqty;
                 }
                else if($scope.umosize == Bottle )
                  {
                  alert(Bottle);
                  $scope.finalrate=$scope.finalrate2*$scope.baseqty;
                  $scope.calcstd = ($scope.pieceNo*$scope.stdqty)
                  $scope.calcbase = $scope.calcstd*$scope.baseqty;
                  $scope.calcpack = $scope.calcstd/$scope.packqty;
                  $scope.newnetquantity =$scope.botnetqty;
                  }
                else if ($scope.umosize == Case)
                  {
                    alert(Case);
            $scope.finalrate=$scope.finalrate2*$scope.baseqty*$scope.packqty;
            $scope.calcstd = ($scope.pieceNo*$scope.stdqty)*$scope.packqty;
                  $scope.calcbase = $scope.calcstd*$scope.baseqty;
                  $scope.calcpack = $scope.calcstd/$scope.packqty;
                  $scope.newnetquantity =$scope.casenetqty;
                  }
                  }//ml close
              
              else if(res[0].UOMId == 2)
              {
                alert("2")
                if($scope.umosize == ml)
                 {
                   alert(ml);
                   $scope.finalrate = $scope.finalrate2/$scope.baseqty;
                   $scope.calcbase = $scope.pieceNo;
                  $scope.calcstd = $scope.calcbase/$scope.baseqty;
                  $scope.calcpack =$scope.calcstd/$scope.packqty;
                  $scope.newnetquantity =$scope.mlnetqty; 
                 }
                else if($scope.umosize == Bottle )
                  {
                  alert(Bottle);
                  $scope.finalrate = $scope.finalrate2;
                  $scope.calcstd = ($scope.pieceNo*$scope.stdqty)
                  $scope.calcbase = $scope.calcstd*$scope.baseqty;
                  $scope.calcpack = $scope.calcstd/$scope.packqty;
                  $scope.newnetquantity =$scope.botnetqty;    
                  }
                else if ($scope.umosize == Case)
                  {
                    alert(Case);
                    $scope.finalrate = $scope.finalrate2*$scope.packqty;
              $scope.calcstd = ($scope.pieceNo*$scope.stdqty)*$scope.packqty;
                  $scope.calcbase = $scope.calcstd*$scope.baseqty;
                  $scope.calcpack = $scope.calcstd/$scope.packqty;
                  $scope.newnetquantity =$scope.casenetqty;  
                  }
              }//bottle close
              
              else if(res[0].UOMId == 3)
              {
                alert("3")
                if($scope.umosize == ml)
                 {
                   alert(ml);
        $scope.finalrate = ($scope.finalrate2/$scope.packqty)/$scope.baseqty;
                   $scope.calcbase = $scope.pieceNo;
                  $scope.calcstd = $scope.calcbase/$scope.baseqty;
                  $scope.calcpack =$scope.calcstd/$scope.packqty;
                  $scope.newnetquantity =$scope.mlnetqty; 
                 }
                else if($scope.umosize == Bottle )
                  {
                  alert(Bottle);
                  $scope.finalrate = $scope.finalrate2/$scope.packqty;
                  $scope.calcstd = ($scope.pieceNo*$scope.stdqty)
                  $scope.calcbase = $scope.calcstd*$scope.baseqty;
                  $scope.calcpack = $scope.calcstd/$scope.packqty;
                  $scope.newnetquantity =$scope.botnetqty;
                  }
                else if ($scope.umosize == Case)
                  {
                    alert(Case);
                    $scope.finalrate = $scope.finalrate2
              $scope.calcstd = ($scope.pieceNo*$scope.stdqty)*$scope.packqty;
                  $scope.calcbase = $scope.calcstd*$scope.baseqty;
                  $scope.calcpack = $scope.calcstd/$scope.packqty;
                  $scope.newnetquantity =$scope.casenetqty;  
                  }
                 }//case close
               })//getuommid
             }//$scope.ratecalc
            
             }//if
            else{
              alert("Rate for this itemcode doesnot defined")
             }
             })//stduomfetch
              }//res end of if
            else {
              alert("opening stock of this item not be Done!!!!")
            }
            })//purchaseratefetch 
          }//if 
          }//if
            else
            {
              alert("Please Enter a valid Item Code!!!")  
            }
        })//skuitemnamefetch
      }//end of itemdetailsfetch   
    }//end of purchase
     
   if(transactiontype == "Sale")
    {
             alert("sale")
             $scope.all = false;
             $scope.stockinward = "No";
             $scope.purchaserate=0;
             $scope.partyidfound=0;
             $scope.referenceno=0;
             $scope.yesbottleqty=0;
             $scope.yescaseqty=0;
             $scope.nobottleqty=0;
             $scope.nocaseqty=0;
//             $scope.qty = "Qty:";
             $scope.itemdetailsfetchfun = function(itemcode)
             {
              $scope.qty = "Qty:";
              $scope.pieceNo = 1;
              $scope.yesnewNetpackage=0;
              $scope.yesnewNetbase=0;
              $scope.yesnewNetstandard=0;
              $scope.nonewNetpackage=0;
              $scope.nonewNetbase=0;
              $scope.nonewNetstandard=0;
//             console.log($scope.pieces);
             console.log($scope.itemcode);
             console.log(typeof($scope.itemcode))
             var itemnew = parseInt($scope.itemcode);
             console.log(typeof(itemnew))
             $http.get("/skuitemnamefetch"+itemnew).success(function(result){
            if(result!=0)
              {
             console.log(result[0]);
             console.log(result[0].itemId);
             $scope.itemidd = result[0].itemId;
             console.log(result[0].ItemName)
             $scope.skuitemname = result[0].ItemName;
             console.log($scope.skuitemname)
             console.log(result[0].UOMSize); 
             var umosize = parseInt(result[0].UOMSize);
             console.log(typeof(umosize))
             console.log(umosize);

             $http.get("/itemuomqtyfetch"+umosize).success(function(res){
             console.log(res);
             console.log(res[0].UOMID);
             var stduomid = parseInt(res[0].UOMID);

             $http.get("/StdUOMID"+stduomid).success(function(result){
             console.log(result);
             console.log(result[0].StdUOMID);
             $scope.displayuomid = result[0].StdUOMID;
             $http.get("/Displayuomfetch"+$scope.displayuomid).success(function(res){
             console.log(res)
             console.log(res[0].UOM);
             console.log(res[0].UOMID)
             $scope.uomid = res[0].UOMID
             //$scope.umosize = res[0].UOM; 
              })//Displayuomfetch

              })//StdUOMID

             console.log(res[0].UOMSize);
             $scope.uomsize = res[0].UOMSize
             console.log(res[0].Qty);
             $scope.umoqty = res[0].Qty;
             console.log(res[0].UOMSizeMasterID);
             $scope.uomsizemasterid = res[0].UOMSizeMasterID
             })//itemuomqtyfetch

             console.log(result.length)
             if(result.length != 0)
             {
             console.log(result[0].ItemSKUID)
             var skuidfind = result[0].ItemSKUID;
             console.log(skuidfind)
             $http.get("/saleratefetch"+skuidfind).success(function(res1){
             console.log(res1)
             //console.log(res1[0].PurchaseRate)
             $scope.getsection=function(sectionnames)
             {  
                console.log($scope.sectionnames)
                console.log($scope.pieceNo);
                 for(var s=0;s<res1.length;s++)
                 {
                 if($scope.sectionnames == res1[s].SectionName)
                  {
                   console.log(res1[s].SaleRate)
                   $scope.finalrate = res1[s].SaleRate;
                   $scope.SaleRate  = res1[s].SaleRate;
                   $scope.sectionid = res1[s].SectionId;
                   console.log($scope.sectionid);
                  }
                }//for
              }//getsection
            })//saleratefetch      
          }//if
      alert($scope.date+"$scope.date");
     $http.get("/itemwisediscfetch"+$scope.itemidd).success(function(res99){
        console.log(res99);
       if(res99.length != 0)
         {
           console.log(res99[0].Discount);
           console.log(res99[0].DiscountByItemId);
           $scope.discountamt=res99[0].Discount;
           $scope.discounttype=res99[0].DiscountByItemId;
           $scope.discountcalfun($scope.discounttype,$scope.discountamt); 
         }
         })
        }//if
        else
        {
        alert("Please Enter Item Code!!!")  
        }
         })//skuitemnamefetch 
        var itemnewstockid = itemnew+","+$scope.fromstockidfound+","+$scope.prevdate+","+$scope.date;
               
        console.log(itemnewstockid);
        $http.get("/predayitemqtyfetch"+itemnewstockid).success(function(res19){
          if(res19 !=0)
            {
          console.log(res19)
          $scope.closingbottle=res19[0].Closing;
          $scope.closingbase=res19[0].OpeningBase;
          $scope.closingcase=res19[0].OpeningCase;
          console.log($scope.closingbottle);
//        })
    $http.get("/itemquantityfetch"+itemnewstockid).success(function(result1){
      console.log(result1);
      if(result1 != 0)
           {
           console.log(result1[0].UOMSizeMasterId);
           $scope.uomsizemasterid =result1[0].UOMSizeMasterId;
           $scope.stockinword = result1[0].stockInWord;
            for(var t=0;t<result1.length;t++)
             {
               var yes = "Yes";
               var No = "No"
               if(result1[t].stockInWord == yes)
               {
                 $scope.yesnewNetpackage+=result1[t].NetPackage;
                 $scope.yesnewNetbase+=result1[t].NetBase;
                 $scope.yesnewNetstandard+=result1[t].NetStandard;
                 console.log($scope.yesnewNetpackage);
                 console.log($scope.yesnewNetbase);
                 console.log($scope.yesnewNetstandard);
               }//yes
               else if(result1[t].stockInWord == No)
               {
                $scope.nonewNetpackage+=result1[t].NetPackage;
                 $scope.nonewNetbase+=result1[t].NetBase;
                 $scope.nonewNetstandard+=result1[t].NetStandard;
                 console.log($scope.nonewNetpackage);
                 console.log($scope.nonewNetbase);
                 console.log($scope.nonewNetstandard);
               }//no
            }  //for
           }
         $scope.ratecalc=function(umosize)
         {
           alert($scope.itemclosingvalue+"$scope.itemclosingvalue")
           alert(umosize)
           $scope.founduom = umosize;
          $scope.botnetqty=$scope.closingbottle+$scope.yesnewNetstandard-$scope.nonewNetstandard;
          $scope.casenetqty=$scope.closingcase+$scope.yesnewNetpackage-$scope.nonewNetpackage;
          $scope.mlnetqty=$scope.closingbase+$scope.yesnewNetbase-$scope.nonewNetbase;
               if(umosize == "Bottle" && $scope.botnetqty >0)
                 {
                   alert("bottle")
                   $scope.newnetquantity =$scope.botnetqty;
                   $scope.uomid=2;
                   alert($scope.uomid)
                   
                 }
               else if (umosize == "Bottle")
                 {
                   alert("Quantity is Zero")
                    $scope.newnetquantity = 0;
                 }
               if(umosize == "Case" && $scope.casenetqty > 1)
                 {
                   $scope.newnetquantity =$scope.casenetqty;
                   $scope.uomid=3;
                   alert($scope.uomid)
                 }
           else if(umosize == "Case")
               {
                 alert("Quantity is less than a case!!! Please Sale with other UOM!!!")
                  $scope.newnetquantity = 0;
               }
              if(umosize == "ML" && $scope.mlnetqty > 0 )
               {
               $scope.newnetquantity =$scope.mlnetqty;
                 $scope.uomid=1;
               }
              else if(umosize == "ML")
              {
               alert("Sorry!!!Stock is Empty!!!Sale Can't be Done For this ItemCode")
                $scope.newnetquantity = 0;
              }
             }//$scope.ratecalc
//           }//if
//      else{
//          $scope.netquantity = 0
//          alert("Stock is Empty at this StockPoint!!!")
//          }  
    $http.get('/stduomfetch'+$scope.uomsizemasterid).success(function(res9){
       console.log(res9)
            if(res9.length!=0)
              {
            $scope.stockcalculation= function(umosize,piece)
            {
              alert(umosize+"from umosizeumosize")
              alert(piece+"piecepiece")
              $scope.umosize =umosize;
              console.log($scope.umosize)
              var Case = "Case";
              var Bottle = "Bottle";
              var ml = "ML";
              $scope.baseqty = res9[0].BaseQty;
              $scope.packqty = res9[0].PackQty;
              $scope.stdqty = res9[0].StdQty;
            $http.get('/getuommid'+$scope.umosize).success(function(response){
              console.log(response);
              console.log(response[0].UOMID)
              $scope.uomid=response[0].UOMID; 
              console.log(response[0].UOM)
              console.log($scope.uomid);
               if($scope.umosize == Case)
                {
                  alert($scope.pieceNo)
                  $scope.calcstd = ($scope.pieceNo*$scope.stdqty)*$scope.packqty;
                  $scope.calcbase = $scope.calcstd*$scope.baseqty;
                  $scope.calcpack = $scope.calcstd/$scope.packqty;
                }
              else if($scope.umosize == Bottle)
                {
                  alert($scope.pieceNo)
                  $scope.calcstd = ($scope.pieceNo*$scope.stdqty)
                  $scope.calcbase = $scope.calcstd*$scope.baseqty;
                  $scope.calcpack = $scope.calcstd/$scope.packqty; 
                }
              else if($scope.umosize == ml)
                {
                  alert("ML");
                  $scope.calcbase = $scope.pieceNo;
                  $scope.calcstd = $scope.calcbase/$scope.baseqty;
                  $scope.calcpack =$scope.calcstd/$scope.packqty;
                  alert($scope.calcbase+"$scope.calcbase")
                  alert($scope.calcstd+"$scope.calcstd")
                  alert($scope.calcpack+"$scope.calcpack")
                }
            })
          }//$scope.stockcalculation
            //$scope.finalrate=res[0].PurchaseRate;
          }//if
            else{
              alert("Rate for this itemcode doesnot defined")
            }
         })//stduomfetch
        })//itemquantityfetch 
        }
        })//predayitemqtyfetch
      }//end of itemdetailsfetch  
    }//end of sale
  
  if( transactiontype == "Stock Transfer")
    {
      alert("Hai Iam Stock Transfer");
      $scope.partyidfound=0;
      $scope.sectionid=0;
      $scope.SaleRate=0;
      $scope.purchaserate=0;
      $scope.referenceno=0;
      $scope.yesnetquantity=0;
      $scope.nonetquantity=0;
      $scope.stockinward = "No";
      $scope.tostockinward="Yes";
      //$scope.finalrate=0;
      $scope.itemdetailsfetchfun = function(itemcode)
      {
        $scope.qty = "Qty:";
        $scope.finalrate=0;
        $scope.yesnewNetpackage=0;
        $scope.yesnewNetbase=0;
        $scope.yesnewNetstandard=0;
        $scope.nonewNetpackage=0;
        $scope.nonewNetbase=0;
       $scope.nonewNetstandard=0;
        alert(itemcode)
        var itemnwenew = parseInt(itemcode);
        console.log(typeof(itemnwenew));
        $http.get("/skuitemnamefetch"+itemnwenew).success(function(result){
          console.log(result[0]);
          console.log(result[0].itemId);
          $scope.itemidd = result[0].itemId;
          console.log(result[0].ItemName);
          $scope.skuitemname = result[0].ItemName;
          console.log($scope.skuitemname)
          console.log(result[0].UOMSize); 
          var umosize = parseInt(result[0].UOMSize);
          console.log(typeof(umosize))
          console.log(umosize);
          $http.get("/itemuomqtyfetch"+umosize).success(function(res){
          console.log(res);
          console.log(res[0].UOMID);
          //var stduomid = parseInt(res[0].UOMID);
          console.log(res[0].UOMSize);
          $scope.uomsize = res[0].UOMSize;
          console.log(res[0].Qty);
          $scope.umoqty = res[0].Qty;
          console.log(res[0].UOMSizeMasterID);
          $scope.uomsizemasterid = res[0].UOMSizeMasterID
          })
          })
         var itemnewstockid = itemnwenew+","+$scope.fromstockidfound+","+$scope.prevdate;
        console.log(itemnewstockid);
         $http.get("/predayitemqtyfetch"+itemnewstockid).success(function(res19){
           if(res19 !=0)
            {
          console.log(res19)
          $scope.closingbottle=res19[0].Closing;
          $scope.closingbase=res19[0].OpeningBase;
          $scope.closingcase=res19[0].OpeningCase;
          
//        })//predayitemqtyfetch
    $http.get("/itemquantityfetch"+itemnewstockid).success(function(result1){
           console.log(result1);
      if(result1 != 0)
           {
           console.log(result1[0].UOMSizeMasterId);
           $scope.uomsizemasterid =result1[0].UOMSizeMasterId;
           $scope.stockinword = result1[0].stockInWord;
            for(var t=0;t<result1.length;t++)
             {
               var yes = "Yes";
               var No = "No"
               if(result1[t].stockInWord == yes)
               {
                 $scope.yesnewNetpackage+=result1[t].NetPackage;
                 $scope.yesnewNetbase+=result1[t].NetBase;
                 $scope.yesnewNetstandard+=result1[t].NetStandard;
                 console.log($scope.yesnewNetpackage);
                 console.log($scope.yesnewNetbase);
                 console.log($scope.yesnewNetstandard);
               }//yes
               else if(result1[t].stockInWord == No)
               {
                $scope.nonewNetpackage+=result1[t].NetPackage;
                 $scope.nonewNetbase+=result1[t].NetBase;
                 $scope.nonewNetstandard+=result1[t].NetStandard;
                 console.log($scope.nonewNetpackage);
                 console.log($scope.nonewNetbase);
                 console.log($scope.nonewNetstandard);
               }//no
            }  //for
           }
          
         $scope.ratecalc=function(umosize)
         {
           console.log($scope.closingbottle);
              console.log($scope.closingbase)
              console.log($scope.closingcase)
           $scope.founduom = umosize;
          $scope.botnetqty=$scope.closingbottle+$scope.yesnewNetstandard-$scope.nonewNetstandard;
          $scope.casenetqty=$scope.closingcase+$scope.yesnewNetpackage-$scope.nonewNetpackage;
          $scope.mlnetqty=$scope.closingbase+$scope.yesnewNetbase-$scope.nonewNetbase;
               if(umosize == "Bottle" && $scope.botnetqty >0)
                 {
                   alert("bottle")
                   $scope.newnetquantity =$scope.botnetqty;
                   $scope.uomid=2;
                   alert($scope.uomid)
                   
                 }
               else if (umosize == "Bottle")
                 {
                   alert("Quantity is Zero")
                    $scope.newnetquantity = 0;
                 }
               if(umosize == "Case" && $scope.casenetqty > 1)
                 {
                   $scope.newnetquantity =$scope.casenetqty;
                   $scope.uomid=3;
                   alert($scope.uomid)
                 }
               else if(umosize == "Case")
               {
                 alert("Quantity is less than a case!!! Please Transfer with other UOM!!!")
                  $scope.newnetquantity = 0;
               }
              if(umosize == "ML" && $scope.mlnetqty > 0)
               {
               $scope.newnetquantity =$scope.mlnetqty;
                 $scope.uomid=1;
               }
              else if(umosize == "ML")
              {
               alert("Sorry!!!Stock Transfer Can't be Done For this ItemCode")
                $scope.newnetquantity = 0;
              }
           //alert($scope.pieceNo+"beforestock call")
           //if($scope.pieceNo!=null)
             //{
//             $scope.stockcalculation($scope.founduom);
            // }
            }//$scope.ratecalc
//           }//if
//      else{
//          $scope.netquantity = 0
//          alert("Stock is Empty at this StockPoint!!!")
//          }  
    $http.get('/stduomfetch'+$scope.uomsizemasterid).success(function(res9){
       console.log(res9)
            if(res9.length!=0)
              {
            $scope.stockcalculation= function(umosize,piece)
            {
              alert(umosize+"from umosizeumosize")
              alert(piece+"piecepiece")
             $scope.umosize =umosize;
             console.log($scope.umosize)
              var Case = "Case";
              var Bottle = "Bottle";
              var ml= "ML";
              $scope.baseqty = res9[0].BaseQty;
              $scope.packqty = res9[0].PackQty;
              $scope.stdqty = res9[0].StdQty;
            $http.get('/getuommid'+$scope.umosize).success(function(response){
              console.log(response);
              console.log(response[0].UOMID)
              $scope.uomid=response[0].UOMID; 
              console.log(response[0].UOM)
              console.log($scope.uomid);
               if($scope.umosize == Case)
                {
                  alert($scope.pieceNo)
                  $scope.calcstd = ($scope.pieceNo*$scope.stdqty)*$scope.packqty;
                  $scope.calcbase = $scope.calcstd*$scope.baseqty;
                  $scope.calcpack = $scope.calcstd/$scope.packqty;
                }
              else if($scope.umosize == Bottle)
                {
                  alert($scope.pieceNo)
                  $scope.calcstd = ($scope.pieceNo*$scope.stdqty)
                  $scope.calcbase = $scope.calcstd*$scope.baseqty;
                  $scope.calcpack = $scope.calcstd/$scope.packqty; 
                }
              else if($scope.umosize == ml)
                {
                  alert("ML");
                  $scope.calcbase = $scope.pieceNo;
                  $scope.calcstd = $scope.calcbase/$scope.baseqty;
                  $scope.calcpack =$scope.calcstd/$scope.packqty;
                  alert($scope.calcbase+"$scope.calcbase")
                  alert($scope.calcstd+"$scope.calcstd")
                  alert($scope.calcpack+"$scope.calcpack")
                }
            })
          }//$scope.stockcalculation
            //$scope.finalrate=res[0].PurchaseRate;
          }//if
            else{
              alert("Rate for this itemcode doesnot defined")
            }
         })//stduomfetch
        })//itemquantityfetch
        }//if
      })//predayitemqtyfetch
      }//itemdetailsfetchfun
    }//Stock Transfer
  
  if( transactiontype == "Opening Stock" && $scope.openingstockdate >! $scope.date)
    {
       $scope.pieceNo = 1;
       $scope.stockinward = "Yes";
       $scope.SaleRate=0;
       $scope.referenceno=0;
       $scope.sectionid=0;
       $scope.onlyopeningstock = "Opening Stock";
       $scope.itemdetailsfetchfun=function(itemcode){
        alert(itemcode)
        var itemmnew = parseInt(itemcode);
         $http.get("/skuitemnamefetch"+itemmnew).success(function(result){
          console.log(result[0]);
          console.log(result[0].itemId);
          $scope.itemidd = result[0].itemId;
          console.log(result[0].ItemName)
          $scope.skuitemname = result[0].ItemName;
          console.log($scope.skuitemname)
          console.log(result[0].UOMSize); 
          var umosize = parseInt(result[0].UOMSize);
          console.log(typeof(umosize))
          console.log(umosize);
          $http.get("/itemuomqtyfetch"+umosize).success(function(res){
          console.log(res);
          console.log(res[0].UOMID); 
          console.log(res[0].UOMSize);
          $scope.uomsize = res[0].UOMSize
          console.log(res[0].Qty);
          $scope.umoqty = res[0].Qty;
          console.log(res[0].UOMSizeMasterID);
          $scope.uomsizemasterid = res[0].UOMSizeMasterID;
            $http.get('/stduomfetch'+$scope.uomsizemasterid).success(function(res9){
       console.log(res9)
            if(res9.length!=0)
              {
            $scope.stockcalculation = function(umosize)
            {
             alert(umosize)
             $scope.umosize =umosize;
             console.log($scope.umosize)
              var Case = "Case";
              var Bottle = "Bottle";
              var ml = "ML";
              $scope.baseqty = res9[0].BaseQty;
              $scope.packqty = res9[0].PackQty;
              $scope.stdqty = res9[0].StdQty;
            $http.get('/getuommid'+$scope.umosize).success(function(response){
              console.log(response);
              console.log(response[0].UOMID)
              $scope.uomid=response[0].UOMID; 
              console.log(response[0].UOM)
              console.log($scope.uomid);
              if(res[0].UOMId == response[0].UOMID){
                $scope.finalrate = $scope.finalrate2;
                if(response[0].UOM == Case )
                  {
                    alert($scope.pieceNo)
                    $scope.calcstd = ($scope.pieceNo*$scope.stdqty)*$scope.packqty;
                  $scope.calcbase = $scope.calcstd*$scope.baseqty;
                  $scope.calcpack = $scope.calcstd/$scope.packqty;
                  }
                else if(response[0].UOM ==Bottle )
                  {
                    alert($scope.pieceNo)
                  $scope.calcstd = ($scope.pieceNo*$scope.stdqty)
                  $scope.calcbase = $scope.calcstd*$scope.baseqty;
                  $scope.calcpack = $scope.calcstd/$scope.packqty;   
                  }
              }
              else if($scope.umosize == Case)
                {
                  alert($scope.pieceNo)
                  $scope.finalrate = $scope.finalrate2*10;
                  $scope.calcstd = ($scope.pieceNo*$scope.stdqty)*$scope.packqty;
                  $scope.calcbase = $scope.calcstd*$scope.baseqty;
                  $scope.calcpack = $scope.calcstd/$scope.packqty;
                }
              else if($scope.umosize == Bottle)
                {
                  alert($scope.pieceNo)
                  $scope.finalrate = $scope.finalrate2/10;
                  $scope.calcstd = ($scope.pieceNo*$scope.stdqty)
                  $scope.calcbase = $scope.calcstd*$scope.baseqty;
                  $scope.calcpack = $scope.calcstd/$scope.packqty; 
                }
              else if($scope.umosize == ml){
                  alert(ml+"inside if");
                  alert($scope.pieceNo);
                  $scope.calcbase = $scope.pieceNo;
                  $scope.calcstd = $scope.calcbase/$scope.baseqty;
                  $scope.calcpack =$scope.calcstd/$scope.packqty;
                  alert($scope.calcbase+"$scope.calcbase")
                  alert($scope.calcstd+"$scope.calcstd")
                  alert($scope.calcpack+"$scope.calcpack")
                
              }
             })
      
          }//stockcalculation
          }//if
            else{
              alert("Rate for this itemcode doesnot defined")
            }
           })//stduomfetch
          })
        })//skuitemnamefetch
      }//itemdetailsfetchfun
    }//Opening Stock
  else if( transactiontype == "Opening Stock")
  {
    alert("Opening Stock is already done on"+" "+$scope.openingstockdate);
  }
 }//end of transactioncall

$scope.discountcalfun = function(type,amount)
{
  alert(type);
  alert(amount);
  console.log(type);
  console.log(amount);
  var Amount = "Amount";
  
  if(type == "Amount")
  {
    alert("amount")
  }
  
  else if(type == "Percent")
    {
      alert("Percent")
    }
  
}

$scope.itemtaxfun= function()
{
   console.log($scope.itemcode)
    $http.get("/itemidfind"+$scope.itemcode).success(function(res){
        console.log(res)
      if(res.length!=0)
      {
        var itemposname = res[0].POSName;
        var itemid = res[0].itemId;
        var merge = itemposname+","+itemid;
        $http.get("/itemtaxfind"+merge).success(function(result)
        {
            console.log(result)
            console.log(result[0].invGroupName)
            $scope.invgroupname = result[0].invGroupName;
            console.log(result[0].withinstate);
            var taxrate = result[0].withinstate 
            $http.get('/postaxs'+taxrate).success(function(response)
            {
              console.log(response)
              $scope.taxgst=response;
              if($scope.taxgst!=null)
              {
                console.log($scope.taxgst[1].Rate)
                console.log($scope.taxgst[0].Rate)
                $scope.taxcgst = $scope.taxgst[0].Rate;
                $scope.taxsgst = $scope.taxgst[1].Rate;
                alert("calculationcalculationcalculation");
                $scope.calculation();  
           }//if
         })//postaxs
       })//itemtaxfind
      }//if
      else{
        alert("please Enter the Valid Item Code!! Or Item Code Cant be Null")
      }
     })//itemidfind 
}//itemtaxfun

  $scope.calculation=function(){
    alert("i got calculation calll");
    var sgst=0;
    var cgst=0;
    var tot;
    var totgstper =0;
    var total = 0;
    var hiddenvale = 0;
    var itemvalue = 0;
    var obj9={}
    $scope.limit = 3;
    console.log($scope.taxcgst);
    console.log($scope.taxsgst);
    cgst = parseInt($scope.taxcgst);
    console.log(cgst)
    sgst = parseInt($scope.taxsgst);
    console.log(sgst)
    tot = cgst+sgst;
    totgstper = tot/100;
    console.log(totgstper);
    $scope.newfinalvalue = $scope.pieceNo*$scope.finalrate;
    total = $scope.newfinalvalue;
    console.log(total);
    $scope.hiddenvale = total/(1+totgstper);
    console.log($scope.hiddenvale);
    console.log(typeof($scope.hiddenvale))
    $scope.itemvalue = total-$scope.hiddenvale;
    console.log(typeof($scope.itemvalue))
    $scope.number = $scope.hiddenvale+$scope.itemvalue;
    console.log($scope.number)
    console.log($scope.itemvalue)
    var  taxcgst = $scope.itemvalue/2;
    console.log(taxcgst)
    $scope.fintaxcgst = taxcgst;
    var  taxsgst = $scope.itemvalue/2;
    console.log(taxsgst);
    $scope.fintaxsgst = taxsgst;
    $scope.rate();
  }//$scope.calculation=function

    $scope.rate = function(finalrate){  
    alert("haiiii")
    console.log(parseInt($scope.finalrate));
    $scope.purchaserate = $scope.finalrate;
    var obj = {};
    $scope.discountrate=0;
    $scope.discount = 0;
    $scope.charges=0;
    $scope.adjustment=0;
    //$scope.type=Standard
    console.log($scope.pieceNo+"pieces")
    console.log($scope.finalrate+"rate")
    console.log($scope.skuitemname+"item")
    console.log($scope.finalrate+"value")
    console.log($scope.umosize+"umo")
    console.log($scope.uomid)
    //console.log($scope.finalrate.length)
   
      obj["item"]=$scope.skuitemname+$scope.uomsize;
      obj["itemid"]= $scope.itemidd;
      obj["quantity"]=$scope.umoqty;
      obj["pieces"]=$scope.pieceNo;
      obj["umo"]=$scope.umosize;
      obj["Rate"]=$scope.finalrate;
//      $scope.newfinalvalue = $scope.pieceNo*$scope.finalrate;
      obj["value"]= $scope.newfinalvalue;
      obj["stockpointid"]= $scope.stockidfound;
      obj["uomid"] = $scope.uomid;
      obj["uomsizemasterid"]=$scope.uomsizemasterid;
      obj["salerate"]=$scope.SaleRate;
      obj["purchaserate"]=$scope.purchaserate;
      obj["itemcode"]=$scope.itemcode;
      obj["taxablevalue"]=$scope.hiddenvale;
      obj["cgst"]= $scope.fintaxcgst;
      obj["sgst"]=$scope.fintaxsgst;
      obj["tax"]=$scope.itemvalue;
      obj["discount"]=$scope.discount;
      obj["subtotal"]=$scope.number;
      obj["charges"]=$scope.charges;
      obj["invoicevalue"]=$scope.number;
      obj["adjustment"]=$scope.adjustment;
      obj["base"]=$scope.calcbase;          
      obj["std"]=$scope.calcstd;
      obj["pack"]=$scope.calcpack;
      obj["discountamt"]=$scope.discountamt;
      obj["discounttype"]=$scope.discounttype;
      purchaseitem.push(obj);
      $scope.purchaseitem1 = purchaseitem;
      console.log($scope.purchaseitem1) 
      $scope.totalitems=$scope.purchaseitem1.length
      $scope.finalvalue=0;
      $scope.piece=0;
      $scope.subtotal1=0;
      $scope.taxablevalue1=0;
      $scope.tax1=0;
      $scope.invoicevalue1=0;
      for(var s=0;s<$scope.purchaseitem1.length;s++)
    {
      
      console.log(parseInt($scope.purchaseitem1[s].value));
      console.log($scope.purchaseitem1[s].pieces);
      $scope.finalvalue+=$scope.purchaseitem1[s].value;
      $scope.piece+=$scope.purchaseitem1[s].pieces;
      $scope.subtotal1+=$scope.purchaseitem1[s].subtotal;
      $scope.taxablevalue1+=$scope.purchaseitem1[s].taxablevalue;
      $scope.tax1+=$scope.purchaseitem1[s].tax;
      $scope.invoicevalue1+=$scope.purchaseitem1[s].invoicevalue;
    }
//    alert($scope.piece)
    $scope.itemcode = null;
    $scope.itemdetail = null;
    $scope.pieceNo = null;
    $scope.umosize = null;
    $scope.finalrate = null;
    $scope.sectionnames=null;
    $scope.netquantity=null;
    $scope.skuitemname=null;
    $scope.uomsize=null;
    $scope.qty=null;
    $scope.newnetquantity=null;
    $scope.netquantity=null;
    $scope.bottleqty=null;
    $scope.caseqty=null;
    $scope.calcbase=null;          
    $scope.calcstd=null;
    $scope.calcpack=null;
  }
  
  $http.get("/findcount").success(function(res){
    console.log(res);
    var bookid  = res;
    console.log(bookid)
    $scope.stockbookid = bookid;
    console.log($scope.stockbookid)
    
  })
  
    $scope.stockdetailsave = function(vouchernumber,voucherdate,purchaseitem1,referenceno){
    //alert(referenceno+"referenceno")
    //alert(index+"indexxx")
    console.log(vouchernumber);
    console.log(voucherdate);
    itemid = $scope.itemidd;
    console.log(itemid) 
    console.log(purchaseitem1)
    //console.log(purchaseitem1.length);
      if(purchaseitem1.length !=0)
        {
      var catlen = purchaseitem1.length;
      alert(catlen+"catlen")
      $scope.newentryrowno = 0;
//    for(var n=0;n<purchaseitem1.length;n++){
      var transactionsavefun = function(n)
      {
      if( n < catlen)
        {
       alert(n+"inside transactionsavefun")
//       $scope.stockbookid++;
//       $scope.newentryrowno++;
    //alert($scope.stockbookid+"insidesideforlopp$scope.stockbookid")
    //alert($scope.newentryrowno+"insidesideforlopp$scope.$scope.newentryrowno")
    console.log(purchaseitem1[n].itemcode+"itemcode")
    console.log(purchaseitem1[n].pieces+"pieces")
    console.log(purchaseitem1[n].Rate+"Rate")
    console.log(purchaseitem1[n].uomsizemasterid+"uomsizemasterid");
    console.log(purchaseitem1[n].itemid+"itemid");
    console.log(purchaseitem1[n].stockpointid+"stockpointid")
    console.log(purchaseitem1[n].uomid+"uomid")

    var isCompositable = "undefined";
    var isSplittable = "undefined";
    var parentstock = 0;
    var accno = 0;
    var posid1 = $scope.posid;
    alert("hai i got a save calll");
    var posname = $scope.loginresname;
    
    var  dates  = new Date(((new Date(voucherdate).toISOString().slice(0, 23))+"-05:30")).toISOString();
          var a = dates.split("T");
          var date = a[0];
          console.log(date)
          var time = a[1]
          console.log(dates)
      
    var allincluvalue = (purchaseitem1[n].pieces*purchaseitem1[n].Rate)
    console.log(allincluvalue);
    //alert($scope.stockbookid)
    var purchasetran = vouchernumber+","+purchaseitem1[n].itemid+","+posname+","+isCompositable+","+isSplittable+","+$scope.stockinward+","+parentstock+","+accno+","+posid1+","+date+","+purchaseitem1[n].pieces+","+purchaseitem1[n].Rate+","+purchaseitem1[n].quantity+","+allincluvalue+","+purchaseitem1[n].uomsizemasterid+","+$scope.referenceno+","+purchaseitem1[n].stockpointid+","+purchaseitem1[n].uomid+","+$scope.invgroupname+","+$scope.stockbookid+","+$scope.newentryrowno+","+purchaseitem1[n].salerate+","+purchaseitem1[n].purchaserate+","+purchaseitem1[n].taxablevalue+","+purchaseitem1[n].cgst+","+purchaseitem1[n].sgst+","+purchaseitem1[n].tax+","+purchaseitem1[n].itemcode+","+$scope.transactiontype;
     console.log(purchasetran);
          alert(purchaseitem1[n].uomid)
//      $scope.onlyopeningstock = "Opening Stock";
      var getstockdetail = $scope.onlyopeningstock+","+purchaseitem1[n].itemcode+","+purchaseitem1[n].stockpointid+","+purchaseitem1[n].uomid;
      console.log(getstockdetail);
      alert("yashwanthoutside get");
          
     $http.get('/getstockbookdetail'+getstockdetail).success(function(result){
         console.log(result);
         alert("first")
        if(result.length==1)
        {
          alert("item alredy exist")
          console.log(result[0]._id);
          console.log(purchasetran);
          var purchasetranupdate =purchasetran+","+result[0]._id+","+purchaseitem1[n].base+","+purchaseitem1[n].std+","+purchaseitem1[n].pack;
          console.log(purchasetranupdate);
        $http.put('/purchasetranupdate'+purchasetranupdate).success(function(response){
              console.log(response);
          })
          
        }//if
       else
       {
             $scope.stockbookid++;
             $scope.newentryrowno++;
  purchasetran=purchasetran+","+$scope.newentryrowno+","+$scope.stockbookid+","+$scope.tostockidfound+","+$scope.tostockinward+","+purchaseitem1[n].base+","+purchaseitem1[n].std+","+purchaseitem1[n].pack;
             alert("item not exist");
          $http.post('/purchasepost'+purchasetran).success(function(response){
             console.log(response);
           })
         
           }//else
          alert(n+"second")
          transactionsavefun(n+1);
         })//getstockbookdetail
        }//if
      };//transactionsavefun    
    transactionsavefun(0);
    }//if
      else{
        alert("hai")
      }
  }
    
      $scope.stockbooksave = function(vouchernumber){
      alert(vouchernumber);
      alert($scope.date2.date1);
      var voucherdate = $scope.date2.date1;
      var  dates  = new Date(((new Date(voucherdate).toISOString().slice(0, 23))+"-05:30")).toISOString();
      console.log(dates)
      console.log($scope.partyidfound);
      alert("stock book header call");
      console.log($scope.transactiontype);
      var accclosed=0;
        $scope.hhmmsstt = $filter('date')(new Date(), 'hh:mm:ss a');
        console.log($scope.hhmmsstt)
        
        var stockbookheadre = vouchernumber+","+dates+","+$scope.partyidfound+","+$scope.transactiontype+","+$scope.hhmmsstt+","+accclosed+","+$scope.sectionid 
         $http.post('/stockbookheadresave'+stockbookheadre).success(function(response){
             console.log(response)
             }) 
         }
      
  }]);
