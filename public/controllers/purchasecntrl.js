var myApp=angular.module('myApp',[]);

myApp.controller('purchaseCntrl',['$scope','$http','$window','$filter',
function($scope,$http,$window,$filter){ 
  var purchaseitem = [];
  var taxdefinition =[];
  $scope.all = true;
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
     $scope.finalrate = $scope.pieceNo * $scope.finalrate;
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
    alert(transactiontype)
    if(transactiontype == "Purchase")
    {
          alert("Purchase")
          $scope.all = true;
          $scope.stockinward = "Yes";
          $scope.SaleRate=0;
          $scope.sectionid=0;
          $scope.itemdetailsfetchfun = function(itemcode)
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
          })
          console.log(result.length)
          if(result.length != 0)
          {
            console.log(result[0].ItemSKUID)
            var skuidfind = result[0].ItemSKUID;
            console.log(skuidfind)
            $http.get("/purchaseratefetch"+skuidfind).success(function(res){
            console.log(res[0])
            console.log(res[0].PurchaseRate)
            $scope.purchaserate = res[0].PurchaseRate;
            $scope.finalrate = res[0].PurchaseRate
            })//purchaseratefetch 
          }//if
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
      }//end of itemdetailsfetch  
    }//end of sale
 }//end of transactioncall
$scope.itemtaxfun= function()
{
    //alert($scope.itemcode+"second function call")
  console.log($scope.purchaseitem1);
  for(var x1=0;x1<$scope.purchaseitem1.length;x1++)
  {
    console.log($scope.purchaseitem1[x1].itemcode);
    $scope.newfinalrate = $scope.purchaseitem1[x1].Rate;
    var itemcode = parseInt($scope.purchaseitem1[x1].itemcode);
    $http.get("/itemidfind"+itemcode).success(function(res){
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
                $scope.calculation();            
              }//if
            })//postaxs
        })//itemtaxfind
    })//itemidfind 
  }//for
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
    total = $scope.newfinalrate;
    console.log(total);
    $scope.hiddenvale = total/(1+totgstper);
    console.log($scope.hiddenvale);
    console.log(typeof($scope.hiddenvale))
    $scope.itemvalue = total-$scope.hiddenvale;
    console.log(typeof($scope.itemvalue))
//    var subtotal = ($scope.hiddenval) + ($scope.itemvalue)
//    console.log(subtotal)
    $scope.number = $scope.hiddenvale+$scope.itemvalue;
    console.log($scope.number)
    console.log($scope.itemvalue)
    var  taxcgst = $scope.itemvalue/2;
    console.log(taxcgst)
    var  taxsgst = $scope.itemvalue/2;
    console.log(taxsgst);
    $scope.discount = 0;
    $scope.charges=0;
    $scope.adjustment=0;
    obj9["taxablevalue"]=$scope.hiddenvale;
    obj9["tax"]=$scope.itemvalue;
    obj9["discount"]=$scope.discount;
    obj9["subtotal"]=$scope.number;
    obj9["charges"]=$scope.charges;
    obj9["invoicevalue"]=$scope.number;
    obj9["adjustment"]=$scope.adjustment;
    taxdefinition.push(obj9);
    $scope.taxdefinition1 = taxdefinition;
    console.log($scope.taxdefinition1)
    $scope.subtotal1=0;
    $scope.taxablevalue1=0;
    $scope.tax1=0;
    $scope.invoicevalue1=0;
    
    for(var t=0;t<$scope.taxdefinition1.length;t++)
      {
        $scope.subtotal1=$scope.subtotal1+$scope.taxdefinition1[t].subtotal;
        $scope.taxablevalue1=$scope.taxablevalue1+$scope.taxdefinition1[t].taxablevalue;
        $scope.tax1=$scope.tax1+$scope.taxdefinition1[t].tax;
        $scope.invoicevalue1=$scope.invoicevalue1+$scope.taxdefinition1[t].invoicevalue;
        
      }
  }

  $scope.rate = function(){
    
    alert("haiiii")
    var obj = {};
    $scope.discountrate=0
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
    obj["value"]= $scope.finalrate;
    obj["stockpointid"]= $scope.stockidfound;
    obj["uomid"] = $scope.uomid;
    obj["uomsizemasterid"]=$scope.uomsizemasterid;
    obj["salerate"]=$scope.SaleRate;
    obj["purchaserate"]=$scope.purchaserate;
    obj["itemcode"]=$scope.itemcode;
    purchaseitem.push(obj);
    $scope.purchaseitem1 = purchaseitem;
    console.log($scope.purchaseitem1) 
    $scope.totalitems=$scope.purchaseitem1.length
    $scope.finalvalue=0;
    $scope.piece=0;
    for(var s=0;s<$scope.purchaseitem1.length;s++)
    {
      
      console.log($scope.purchaseitem1[s].value);
      console.log($scope.purchaseitem1[s].pieces);

      $scope.finalvalue=$scope.finalvalue+$scope.purchaseitem1[s].value;
      $scope.piece=$scope.piece+$scope.purchaseitem1[s].pieces;
    }
    alert($scope.piece)
    $scope.itemcode = null;
    $scope.itemdetail = null;
    $scope.pieceNo = null;
    $scope.umosize = null;
    $scope.finalrate = null;
    $scope.sectionnames=null;
  }
  
  $http.get("/findcount").success(function(res){
    console.log(res);
    var bookid  = res;
    console.log(bookid)
    $scope.stockbookid = bookid;
    console.log($scope.stockbookid)
    
  })
  
    $scope.stockdetailsave = function(vouchernumber,voucherdate,purchaseitem1,referenceno){
    alert(referenceno+"referenceno")
    //alert(index+"indexxx")
    console.log(vouchernumber);
    console.log(voucherdate);
    itemid = $scope.itemidd;
    console.log(itemid) 
    console.log(purchaseitem1)
    console.log(purchaseitem1.length)
    alert($scope.stockbookid+"outsideforlopp$scope.stockbookid")
    $scope.newentryrowno = 0;
    for(var n=0;n<purchaseitem1.length;n++){
    $scope.stockbookid++;
    $scope.newentryrowno++;
    alert($scope.stockbookid+"insidesideforlopp$scope.stockbookid")
    alert($scope.newentryrowno+"insidesideforlopp$scope.$scope.newentryrowno")
    console.log(purchaseitem1[n].pieces)
    console.log(purchaseitem1[n].Rate)
    console.log(purchaseitem1[n].uomsizemasterid);
    console.log(purchaseitem1[n].itemid);
    console.log(purchaseitem1[n].stockpointid)
    console.log(purchaseitem1[n].uomid)
    //$scope.entryrowno = purchaseitem1[n].length;

    var isCompositable = "undefined";
    var isSplittable = "undefined";
    var parentstock = 0;
    var accno = 0;
    var posid1 = $scope.posid;
    alert("hai i got a save calll");
    var posname = $scope.loginresname;
    
    var  dates  = new Date(((new Date(voucherdate).toISOString().slice(0, 23))+"-05:30")).toISOString();
    console.log(dates)
      
    var allincluvalue = (purchaseitem1[n].pieces*purchaseitem1[n].Rate)
    console.log(allincluvalue);
    //alert($scope.stockbookid)
    var purchasetran = vouchernumber+","+purchaseitem1[n].itemid+","+posname+","+isCompositable+","+isSplittable+","+$scope.stockinward+","+parentstock+","+accno+","+posid1+","+dates+","+purchaseitem1[n].pieces+","+purchaseitem1[n].Rate+","+purchaseitem1[n].quantity+","+allincluvalue+","+purchaseitem1[n].uomsizemasterid+","+$scope.referenceno+","+purchaseitem1[n].stockpointid+","+purchaseitem1[n].uomid+","+$scope.invgroupname+","+$scope.stockbookid+","+$scope.newentryrowno+","+purchaseitem1[n].salerate+","+purchaseitem1[n].purchaserate;
     console.log(purchasetran);
    
      $http.post('/purchasepost'+purchasetran).success(function(response){
      console.log(response);
      }) 
      //$scope.stockbookid++;
//      $scope.stockbookid++;
//      console.log($scope.stockbookid)
//      alert($scope.stockbookid)
    }
  }
    
      $scope.stockbooksave = function(vouchernumber,voucherdate){
      alert(vouchernumber);
      alert(voucherdate);
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
