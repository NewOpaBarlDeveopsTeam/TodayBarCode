//for item.html
var myApp=angular.module('myApp',[]);

myApp.controller('ItemCntrl',['$scope','$http','$window',
function($scope,$http,$window){
  //alert("well come to ItemCntrl")
  $scope.itemdetails = []
  $scope.temp = [{"name":"1"},{"name":"2"},{"name":"3"},{"name":"4"}];
  $scope.ItemSKURate =[
                        // {
                        //   "ItemSKUID":"",
                        //   "SectionName":"",
                        //   "SaleRate":"",
                        //   "PurchaseRate":"",
                        //   "MRP":"",
                        // }

                      ]
  var duplicat = [];
  var duplicate = []
  var selectedrow = null;
 var editcheck = false;
$scope.loginres= window.sessionStorage.getItem("loginres1")

  $http.get('/getinventorygroupmaster').success(function(response){
      // console.log(response);
       $scope.inventorygroupmaster1 = response

    })
  $http.get('/getsectionmaster').success(function(response){
      // console.log(response);
       $scope.sectiondetails = response

    })

  $http.get('/getitemsku').success(function(response){
      // console.log(response);
       $scope.itemskudetails = response

    })


  $http.get('/getitemtype').success(function(response){
        console.log(response);
          $scope.itemtype1 = response
    })

  $http.get('/getsalescategorymaster/'+$scope.loginres).success(function(response){
       // console.log(response);
    $scope.salescategorymaster1 = response;
    console.log($scope.salescategorymaster1)
    console.log($scope.salescategorymaster1[0].SaleCategoryName)
    })


    $http.get('/gettaxwithinstate').success(function(response) {
     console.log(response);
     console.log(response.length);
    //for duplicates
        for (i=0;i<=response.length-1;i++){
            duplicat.push({
              'aliasname':response[i].aliasname,
              'taxname':response[i].taxname
            });

       }
          //for checking duplicates in object and removes
          function arrUnique(arr) {
               var cleaned = [];
               duplicat.forEach(function(itm) {
               var unique = true;
               cleaned.forEach(function(itm2) {
               if (_.isEqual(itm, itm2)) unique = false;
                });
               if (unique)  cleaned.push(itm);
                });
               return cleaned;
          }
      console.log(duplicat.length);
      var uniqueStandards = arrUnique(duplicat);
      console.log(uniqueStandards)
      console.log(uniqueStandards.length)
      $scope.withinstat = uniqueStandards;
      duplicat = []
 });
//};

//refresh();
 $http.get('/gettaxoutofstate').success(function(response) {
     console.log(response);
     console.log(response.length);
    //for duplicates
        for (i=0;i<=response.length-1;i++){
            duplicate.push({
              'aliasname':response[i].aliasname,
              'taxname':response[i].taxname
            });

       }
          //for checking duplicates in object and removes
          function arrUnique(arr) {
               var cleaned = [];
               duplicate.forEach(function(itm) {
               var unique = true;
               cleaned.forEach(function(itm2) {
               if (_.isEqual(itm, itm2)) unique = false;
                });
               if (unique)  cleaned.push(itm);
                });
               return cleaned;
          }
      console.log(duplicate.length);
      var uniqueStandards = arrUnique(duplicate);
      console.log(uniqueStandards)
      console.log(uniqueStandards.length)
      $scope.outofstat  = uniqueStandards;
      duplicate = []
 });
var itemdatafetch = function(){
   //alert("welcomr to item")
   console.log($scope.loginres)
   //alert(loginres);
  $http.get('/getitemdata/'+ $scope.loginres).success(function(response){
        console.log(response);
        $scope.itemdetails = response;
        console.log(response[0].itemType);
        console.log(response[0].saleCategory);
        // console.log($scope.itemdetails);
    })
}
 itemdatafetch();

// for new button

$scope.all = true
$scope.new = function(){
    console.log("i got new call")
    $scope.all = false
}

//for save item
//$scope.item1 = {}

$scope.saveitem = function(){

     console.log($scope.item1)
     if($scope.item1.comboItem == true){
        $scope.item1.comboItem = "yes"
        }else {
        $scope.item1.comboItem = "no"
     }
     if($scope.item1.marginReport == true){
        $scope.item1.marginReport = "yes"
        }else{
        $scope.item1.marginReport = "no"
     }
    //for editable
    if(editcheck == true){


      console.log($scope.item1)
      console.log($scope.item1.saleCategory);
     $http.put('/editeditem',$scope.item1).success(function(response)
                {
                 console.log(response)
                      itemdatafetch();
                   $scope.cancelitem()
                   editcheck = false
                })

    } else{
      $scope.item1.POSName = $scope.loginres;
    $http.post('/saveitempost',$scope.item1).success(function(response){
               alert($scope.item1.ChargeValue)
                itemdatafetch();
      console.log(response);
                $scope.cancelitem()

            })
  }
}
$scope.SaleRate =[];
$scope.saverate = function(){
   // alert("i got cancelitem call")
    alert("Save Rate function called");
    alert($scope.SaleRate.Amt);
    //console.log($scope.itemdetail2.SaleRate1);
    var itemskulength = $scope.itemskudetails.length;
    var sectionlength = $scope.sectiondetails.length;
    //var saleratelength = $scope.SaleRate[0].Amt;
    //alert("SaleRateLength "+saleratelength);
    var k = 0;
    alert(itemskulength+".."+sectionlength)
    for(i=0;i<itemskulength;i++)
    {  alert("i loop "+i);
       for(j=0;j<sectionlength;j++)
       {
         alert("J loop "+j)
         alert($scope.itemskudetails[i].UOMSize+".."+$scope.sectiondetails[j].SectionName);
         $scope.ItemSKURate.push({
                                  'ItemSKUID':$scope.itemskudetails[i].ItemSKUID,
                                  'SectionName': $scope.sectiondetails[j].SectionName,
                                  'SaleRate': $scope.SaleRate.Amt,
                                  'PurchaseRate':"",
                                  'MRP':""
                                  });
         k = k+1;
       }
    }
  alert("Out side for loop");
  $http.post('/saveitemskurate',$scope.ItemSKURate).success(function(response){

                //itemdatafetch();
      console.log(response);

                //$scope.cancelitem()

            })
  //alert($scope.ItemSKURate.length);
  //alert($scope.ItemSKURate);
  console.log($scope.ItemSKURate);
}

$scope.cancelitem = function(){
   // alert("i got cancelitem call")
    $scope.item1 =null

}
var RateArray = [
                [0,0],
                [1,1]
                ]
$scope.fetchRate = function(index1,index2,index3){
   //alert("fetch rate function called");
   RateArray[index1,index2] = index3;
   //alert(RateArray[0,0]);
   console.log(RateArray[0,0]);
}


$scope.filterchange = function(){

   console.log($scope.item1.filter)
  //  var item1filter =' '+$scope.item1.filter;
   var item1filter = $scope.item1.filter;
    console.log(item1filter);
      $http.get('/getfilter/'+item1filter).success(function(response){
         $scope.itemdetails = response
     })

}
$scope.selectrow = function(tag){
  console.log(tag)
  selectedrow = tag
  $scope.idSelectedVote = tag;
}
$scope.edititem = function(){
  editcheck = true
  $scope.new()
  console.log(selectedrow)
 // alert("edititem call")

   $scope.item1 = selectedrow
    if($scope.item1.comboItem == "yes"){
        $scope.item1.comboItem = true
        }else {
        $scope.item1.comboItem = false
     }
     if($scope.item1.marginReport == "yes"){
        $scope.item1.marginReport = true
        }else{
        $scope.item1.marginReport = false
     }

}


$scope.deleteitem = function(){

  console.log(selectedrow._id)
  $http.delete('/itemdelete/'+selectedrow._id).success(function(response)
            {
            });
   itemdatafetch();

}

$http.get('/getchargesmaster',{params:{"InvVoucherCla" : "Sale"}}).success(function(response){
       console.log(response);
       $scope.chargemaster = response;
      console.log($scope.chargemaster)
    })

    $http.get('/getfrequently',{params:{"frequently" : "frequently"}}).success(function(response){
           console.log(response);
           $scope.frequentadd = response;
          console.log($scope.frequentadd)
        })

}]);
