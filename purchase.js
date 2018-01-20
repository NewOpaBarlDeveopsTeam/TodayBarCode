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
            $scope.ratecalc = function(umosize)
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
                 }
                else if($scope.umosize == Bottle )
                  {
                    alert(Bottle);
                    $scope.finalrate=$scope.finalrate2*$scope.baseqty;
                    $scope.calcstd = ($scope.pieceNo*$scope.stdqty)
                  $scope.calcbase = $scope.calcstd*$scope.baseqty;
                  $scope.calcpack = $scope.calcstd/$scope.packqty;  
                  }
                else if ($scope.umosize == Case)
                  {
                    alert(Case);
            $scope.finalrate=$scope.finalrate2*$scope.baseqty*$scope.packqty;
            $scope.calcstd = ($scope.pieceNo*$scope.stdqty)*$scope.packqty;
                  $scope.calcbase = $scope.calcstd*$scope.baseqty;
                  $scope.calcpack = $scope.calcstd/$scope.packqty;
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
                 }
                else if($scope.umosize == Bottle )
                  {
                    alert(Bottle);
                    $scope.finalrate = $scope.finalrate2;
                    $scope.calcstd = ($scope.pieceNo*$scope.stdqty)
                  $scope.calcbase = $scope.calcstd*$scope.baseqty;
                  $scope.calcpack = $scope.calcstd/$scope.packqty;  
                  }
                else if ($scope.umosize == Case)
                  {
                    alert(Case);
                    $scope.finalrate = $scope.finalrate2*$scope.packqty;
              $scope.calcstd = ($scope.pieceNo*$scope.stdqty)*$scope.packqty;
                  $scope.calcbase = $scope.calcstd*$scope.baseqty;
                  $scope.calcpack = $scope.calcstd/$scope.packqty;
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
                 }
                else if($scope.umosize == Bottle )
                  {
                    alert(Bottle);
                    $scope.finalrate = $scope.finalrate2/$scope.packqty;
                    $scope.calcstd = ($scope.pieceNo*$scope.stdqty)
                  $scope.calcbase = $scope.calcstd*$scope.baseqty;
                  $scope.calcpack = $scope.calcstd/$scope.packqty;  
                  }
                else if ($scope.umosize == Case)
                  {
                    alert(Case);
                    $scope.finalrate = $scope.finalrate2
              $scope.calcstd = ($scope.pieceNo*$scope.stdqty)*$scope.packqty;
                  $scope.calcbase = $scope.calcstd*$scope.baseqty;
                  $scope.calcpack = $scope.calcstd/$scope.packqty;
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
        })//skuitemnamefetch
      }//end of itemdetailsfetch
    }//end of purchase