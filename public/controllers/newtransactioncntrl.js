var myApp=angular.module('myApp',[]);

myApp.controller('purchaseCntrl',['$scope','$http','$window','$filter',
function($scope,$http,$window,$filter){ 
  var purchaseitem = [];
  var taxdefinition =[];
  $scope.transaction;
  $scope.all = true;
  $scope.qty = "Qty:";
  $scope.date2 = {date1:new Date()}
   
  $http.get('/transactionfetch').success(function(result){
  console.log(result);
  $scope.transactionType = result;
  })
  
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
     $scope.ratecalc = function(umosize){
     //alert("haiii")
     alert(umosize)
     $scope.umosize  =umosize;
     $scope.pieceNo;
     alert($scope.pieceNo);
     alert($scope.finalrate);
     //$scope.finalrate = $scope.pieceNo * $scope.finalrate;
     for(x = 0;x<response.length;x++){
      if($scope.umosize ==response[x].UOM ){
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
     $scope.stockpointid = function(stockid){
     alert("stockid call");
     console.log(stockid);
     $scope.stockid = stockid; 
      for(var m=0;m<response.length;m++){
       if($scope.stockid == response[m].StockPointName){
        console.log(response[m].StockPointID)
        $scope.stockidfound = response[m].StockPointID;
        }
       }
     }
    
    //console.log(res[0].partyId);
    
  })
//  +$scope.loginresname
  $http.get('/itemdetailsfetch'+$scope.loginresname).success(function(response){
    console.log(response);
    console.log(response[0].POSID);
    $scope.posid = response[0].POSID;
    $scope.itemdetails = response;
  })
  
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
//          $scope.netquantity=0
          $scope.itemdetailsfetchfun = function(itemcode,voucherdate)
          {
          $scope.pieceNo = 1;
          //$scope.discountname = "Discount";
          console.log($scope.pieces);
          console.log($scope.itemcode);
          console.log(typeof($scope.itemcode))
          var itemnew = parseInt($scope.itemcode);
          console.log(typeof(itemnew))
          $http.get("/skuitemnamefetch"+itemnew).success(function(result){
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
//          $http.get("/StdUOMID"+stduomid).success(function(result){
//          console.log(result[0].StdUOMID);
//          $scope.displayuomid = result[0].StdUOMID;
//          $http.get("/Displayuomfetch"+$scope.displayuomid).success(function(res){
//          console.log(res)
//          console.log(res[0].UOM);
//          console.log(res[0].UOMID)
//          $scope.uomid = res[0].UOMID
//          $scope.umosize = res[0].UOM; 
//          })//Displayuomfetch
//
//          })//StdUOMID 
          console.log(res[0].UOMSize);
          $scope.uomsize = res[0].UOMSize
          console.log(res[0].Qty);
          $scope.umoqty = res[0].Qty;
          console.log(res[0].UOMSizeMasterID);
          $scope.uomsizemasterid = res[0].UOMSizeMasterID
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
            console.log(res[0].UOMId)
            console.log(res[0].PurchaseRate)
            $scope.purchaserate =res[0].PurchaseRate;
            $scope.finalrate=res[0].PurchaseRate;
            })//purchaseratefetch 
          }//if
        })//skuitemnamefetch
//     $http.get("/itemquantityfetch"+itemnew).success(function(result1){
//      console.log(result1)
//      if(result1 != 0)
//      {
//      for(t=0;t<result1.length;t++)
//        {
//              console.log(result1[t].NetPieces)
//              $scope.netquantity += result1[t].NetPieces;
//        }
//      }//if
//      else{
//          $scope.netquantity = 0
//          alert("Sorry")
//          }
//        })//itemquantityfetch
      }//end of itemdetailsfetch
    }//end of purchase
     
   if(transactiontype == "Sale")
    {
             alert("sale")
             $scope.all = false;
             $scope.stockinward = "No";
             $scope.purchaserate=0;
             $scope.partyidfound=0;
             $scope.referenceno=0
             $scope.itemdetailsfetchfun = function(itemcode)
             {
             $scope.pieceNo = 1;
             console.log($scope.pieces);
             console.log($scope.itemcode);
             console.log(typeof($scope.itemcode))
             var itemnew = parseInt($scope.itemcode);
             console.log(typeof(itemnew))

             $http.get("/skuitemnamefetch"+itemnew).success(function(result){
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
             console.log(result[0]);
             console.log(result[0].StdUOMID);
             $scope.displayuomid = result[0].StdUOMID;
             $http.get("/Displayuomfetch"+$scope.displayuomid).success(function(res){
             console.log(res)
             console.log(res[0].UOM);
             console.log(res[0].UOMID)
             $scope.uomid = res[0].UOMID
             $scope.umosize = res[0].UOM; 
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
             $http.get("/purchaseratefetch"+skuidfind).success(function(res1){
             console.log(res1)
             console.log(res1[0].PurchaseRate)
             $scope.getsection=function(sectionnames)
             {  
                console.log($scope.sectionnames)
                console.log($scope.pieceNo);
                 for(var s=0;s<res1.length;s++)
                 {
                 if($scope.sectionnames == res1[s].SectionName)
                  {
                   console.log(res1[s].SaleRate)
                   $scope.finalrate = res1[s].SaleRate * $scope.pieceNo;
                   $scope.SaleRate  = res1[s].SaleRate;
                   $scope.sectionid = res1[s].SectionId;
                   console.log($scope.sectionid);
                  }
                }//for
              }//getsection
            })//purchaseratefetch      
          }//if
        })//skuitemnamefetch   
      $http.get("/itemquantityfetch"+itemnew).success(function(result1){
      console.log(result1)
      if(result1 != 0)
      {
      for(t=0;t<result1.length;t++)
        {
              console.log(result1[t].NetPieces)
              $scope.netquantity += result1[t].NetPieces;
        }
      }//if
      else{
          $scope.netquantity = 0
          alert("Sorry")
          }
          })//itemquantityfetch
               
      }//end of itemdetailsfetch  
    }//end of sale
  if( transactiontype == "Stock Transfer")
    {
      alert("Hai Iam Stock Transfer");
      $scope.itemdetailsfetchfun = function(itemcode)
      {
      alert(itemcode)
        var itemnwenew = parseInt(itemcode);
        console.log(typeof(itemnwenew));
         $http.get("/itemquantityfetch"+itemnwenew).success(function(result1){
      console.log(result1)
      if(result1 != 0)
      {
      for(t=0;t<result1.length;t++)
        {
              console.log(result1[t].NetPieces)
              $scope.netquantity += result1[t].NetPieces;
        }
      }//if
      else{
          $scope.netquantity = 0
          alert("Sorry")
          }
          })
      }//itemdetailsfetchfun
    }//Stock Transfer
  
  if( transactiontype == "Opening Stock")
    {
       $scope.pieceNo = 1;
       $scope.stockinward = "Yes";
       $scope.SaleRate=0;
       $scope.referenceno=0;
       $scope.sectionid=0;
       alert("hai i am Stock Transfer")
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
//          var stduomid = parseInt(res[0].UOMID);
//          $http.get("/StdUOMID"+stduomid).success(function(result){
//          console.log(result[0].StdUOMID);
//          //$scope.displayuomid = result[0].StdUOMID;
//          $http.get("/Displayuomfetch"+$scope.displayuomid).success(function(res){
//          console.log(res)
//          console.log(res[0].UOM);
//          console.log(res[0].UOMID)
//          $scope.uomid = res[0].UOMID
//          $scope.umosize = res[0].UOM; 
//          })//Displayuomfetch
//
//          })//StdUOMID 
          console.log(res[0].UOMSize);
          $scope.uomsize = res[0].UOMSize
          console.log(res[0].Qty);
          $scope.umoqty = res[0].Qty;
          console.log(res[0].UOMSizeMasterID);
          $scope.uomsizemasterid = res[0].UOMSizeMasterID
          })
//          console.log(result.length)
//          if(result.length != 0)
//          {
//            console.log(result[0].ItemSKUID)
//            var skuidfind = result[0].ItemSKUID;
//            console.log(skuidfind)
//            $http.get("/purchaseratefetch"+skuidfind).success(function(res){
//            console.log(res[0])
//            console.log(res[0].PurchaseRate)
//            $scope.purchaserate = res[0].PurchaseRate;
//            //$scope.finalrate = res[0].PurchaseRate
//            })//purchaseratefetch 
//          }//if
        })//skuitemnamefetch
        
        
      }//itemdetailsfetchfun
    }//Opening Stock
 }//end of transactioncall

$scope.itemtaxfun= function()
{
    $http.get("/itemidfind"+$scope.itemcode).success(function(res){
        console.log(res)
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
    //total = $scope.finalrate;
    //total = $scope.newfinalrate;
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
//    $scope.discount = 0;
//    $scope.charges=0;
//    $scope.adjustment=0;
//    obj9["taxablevalue"]=$scope.hiddenvale;
//    obj9["tax"]=$scope.itemvalue;
//    obj9["discount"]=$scope.discount;
//    obj9["subtotal"]=$scope.number;
//    obj9["charges"]=$scope.charges;
//    obj9["invoicevalue"]=$scope.number;
//    obj9["adjustment"]=$scope.adjustment;
//    taxdefinition.push(obj9);
//    $scope.taxdefinition1 = taxdefinition;
//    console.log($scope.taxdefinition1)
//    $scope.subtotal1=0;
//    $scope.taxablevalue1=0;
//    $scope.tax1=0;
//    $scope.invoicevalue1=0;
//    
//    for(var t=0;t<$scope.taxdefinition1.length;t++)
//      {
//        $scope.subtotal1=$scope.subtotal1+$scope.taxdefinition1[t].subtotal;
//        $scope.taxablevalue1=$scope.taxablevalue1+$scope.taxdefinition1[t].taxablevalue;
//        $scope.tax1=$scope.tax1+$scope.taxdefinition1[t].tax;
//        $scope.invoicevalue1=$scope.invoicevalue1+$scope.taxdefinition1[t].invoicevalue;
//        
//      }
//    $scope.itemcode = null;
//    $scope.itemdetail = null;
//    $scope.pieceNo = null;
//    $scope.umosize = null;
//    $scope.finalrate = null;
//    $scope.sectionnames=null;
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
   
      obj["item"]=$scope.skuitemname+$scope.uomsize;
      obj["itemid"]= $scope.itemidd;
      obj["quantity"]=$scope.umoqty;
      obj["pieces"]=$scope.pieceNo;
      obj["umo"]=$scope.umosize;
      obj["Rate"]=$scope.finalrate;
      obj["discrate"] = $scope.discountrate;
      obj["disctype"] = $scope.type;
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
    console.log(purchaseitem1.length)
    var catlen = purchaseitem1.length;
      alert(catlen+"catlen")
    //alert($scope.stockbookid+"outsideforlopp$scope.stockbookid")
    $scope.newentryrowno = 0;
//    for(var n=0;n<purchaseitem1.length;n++){
      var transactionsavefun = function(n)
      {
      if( n < catlen )
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
      var getstockdetail = $scope.transactiontype+","+purchaseitem1[n].itemcode+","+purchaseitem1[n].stockpointid;
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
          var purchasetranupdate =purchasetran+","+result[0]._id;
          console.log(purchasetranupdate);
        $http.put('/purchasetranupdate'+purchasetranupdate).success(function(response){
              console.log(response);
          })
          
        }//if
       else{
             $scope.stockbookid++;
             $scope.newentryrowno++;
             purchasetran=purchasetran+","+$scope.newentryrowno+","+$scope.stockbookid;
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
