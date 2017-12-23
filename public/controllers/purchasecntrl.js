var myApp=angular.module('myApp',[]);

myApp.controller('purchaseCntrl',['$scope','$http','$window','$filter',
function($scope,$http,$window,$filter){
  
  var purchaseitem = [];
  $scope.all = true;
  $scope.date2 = {date1:new Date()}
  $scope.selected = "Purchase";
 
  
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
  
    
    //console.log(res[0].partyId);
    
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
  })
  
  $http.get('/stockpointfetch'+$scope.loginresname).success(function(response){
  console.log(response);
    $scope.stockpointname = response;
  })
//  +$scope.loginresname
  $http.get('/itemdetailsfetch'+$scope.loginresname).success(function(response){
    console.log(response);
    console.log(response[0].POSID);
    $scope.posid = response[0].POSID;
    $scope.itemdetails = response;
  })
  
  $scope.itemdetailsfetch = function(itemcode){
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
      console.log(result.length)
      if(result.length != 0){
      console.log(result[0].ItemSKUID)
      var skuidfind = result[0].ItemSKUID;
      console.log(skuidfind)
      $http.get("/purchaseratefetch"+skuidfind).success(function(res){
        console.log(res[0])
        console.log(res[0].PurchaseRate)
        $scope.purchaserate = res[0].PurchaseRate;
      })
      }

    })
  }
  //$scope.purchaserate = 0
  $scope.ratecalc = function(umosize){
    //alert("haiii")
    alert(umosize)
    $scope.umosize  =umosize;
    $scope.pieceNo;
    alert($scope.pieceNo);
    alert($scope.purchaserate);
    $scope.purchaserate = $scope.pieceNo * $scope.purchaserate;
  }
  
  $scope.rate = function(){
    alert("haiiii")
    var obj = {};
    $scope.discountrate=0
    //$scope.type=Standard
    console.log($scope.pieceNo+"pieces")
    console.log($scope.purchaserate+"rate")
    console.log($scope.skuitemname+"item")
    console.log($scope.purchaserate+"value")
    console.log($scope.umosize+"umo")
    
    obj["item"]=$scope.skuitemname;
    obj["quantity"]=$scope.umosize;
    obj["pieces"]=$scope.pieceNo;
    obj["umo"]=$scope.umosize;
    obj["Rate"]=$scope.purchaserate;
    obj["discrate"] = $scope.discountrate;
    obj["disctype"] = $scope.type;
    obj["value"]= $scope.purchaserate;
    purchaseitem.push(obj);
    $scope.purchaseitem1 = purchaseitem;
    console.log($scope.purchaseitem1)  
  }
    $scope.stockdetailsave = function(vouchernumber,voucherdate,itemid){
    console.log(vouchernumber);
    console.log(voucherdate);
    itemid = $scope.itemidd;
    console.log(itemid)
    console.log($scope.itemidd);
    console.log($scope.umosize);
    console.log($scope.pieceNo)
    console.log($scope.purchaserate)
    console.log($scope.purchaserate)
    console.log($scope.umosize)
    var isCompositable = "undefined";
    var isSplittable = "undefined";
    var stockinward = "Yes";
    var parentstock = 0;
    var accno = 0;
    var posid1 = $scope.posid;
    alert("hai i got a save calll");
    var posname = $scope.loginresname;
    
    var  dates  = new Date(((new Date(voucherdate).toISOString().slice(0, 23))+"-05:30")).toISOString();
    console.log(dates)
      
    var allincluvalue = ($scope.pieceNo*$scope.purchaserate)
    console.log(allincluvalue);
      
    var purchasetran = vouchernumber+","+itemid+","+posname+","+isCompositable+","+isSplittable+","+stockinward+","+parentstock+","+accno+","+posid1+","+dates+","+$scope.pieceNo+","+$scope.purchaserate+","+$scope.umosize+","+allincluvalue;
     console.log(purchasetran);
    
      $http.post('/purchasepost'+purchasetran).success(function(response){
      console.log(response)
             }) 
    
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
        
        var stockbookheadre = vouchernumber+","+dates+","+$scope.partyidfound+","+$scope.transactiontype+","+$scope.hhmmsstt+","+accclosed 
     $http.post('/stockbookheadresave'+stockbookheadre).success(function(response){
       console.log(response)
             })
      
    }
      
  }]);
