//for item.html
var myApp=angular.module('myApp',[]);

myApp.controller('rateCntrl',['$scope','$http','$window',
function($scope,$http,$window){
  //alert("well come to ItemCntrl")
  $scope.itemdetails = []
  var duplicat = [];
  var duplicate = []
  var selectedrow = null;
 var editcheck = false;
 $scope.loginres= window.sessionStorage.getItem("loginres1")
  $http.get('/getinventorygroupmaster').success(function(response){
      console.log(response);
       $scope.inventorygroupmaster1 = response

    })

  $http.get('/getitemtype').success(function(response){
        //console.log(response);
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
  $http.get('/getitemdata/'+$scope.loginres).success(function(response){
        console.log(response);
        $scope.itemdetails = response
        // console.log($scope.itemdetails);
    })
}
 itemdatafetch();

 $http.get('/itemumosize').success(function(res){
   console.log(res);
   $scope.itemumo = res;
 })

 $http.get('/itemsectionfetch/'+$scope.loginres).success(function(res){
   console.log(res);
   $scope.sectionfetch = res;
 })

// for new button

$scope.all = true
$scope.new = function(){
    console.log("i got new call")
    $scope.all = false
}

$scope.cancelitem = function(){
   // alert("i got cancelitem call")
    $scope.item1 =null

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
   console.log(tag.name)
   var itemname = tag.name;
   console.log(itemname)
   $http.get('/itemratesku',{params:{"ItemName":itemname}}).success(function(response)
            {
    console.log(response)
    alert(response[0].ItemSKUID);
    $scope.itemskurate = response;
    //console.log($scope.itemsku[0].ItemSKUID,$scope.itemsku[0].UOMSize)
    $scope.itemskuid =$scope.itemskurate[0].ItemSKUID;
//  var itemskusize =$scope.itemsku[0].UOMSize;
    console.log( $scope.itemskuid)

    $http.get('/itemskurate',{params:{"ItemSKUID":$scope.itemskuid}}).success(function(response)
            {
        console.log("itemsku excuted and cald")
        console.log(response)
        $scope.itemsku = response;
            });
    });


alert("selectrow call")
  selectedrow = tag
  $scope.idSelectedVote = tag;
}
$scope.edititem = function(){

  editcheck = true
  $scope.new()
  console.log(selectedrow)

//  console.log($scope.itemsku)


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

$scope.saverate = function(ItemSKUID,UmoSize,SectionName,SaleRate){
  if(editcheck == true) {
  console.log(selectedrow._id)
  var sendrate = selectedrow._id +","+ ItemSKUID +","+ UmoSize+","+ SectionName+","+ SaleRate;
  alert(sendrate)
  $http.put('/rateadd/'+sendrate).success(function(response)
            {
      console.log(response);

     itemdatafetch();
  });

  $scope.item1="";
  $scope.itemsku="";

}//if
else{
  // console.log($scope.item1);
  // console.log($scope.item1.ItemSKUID);
  $scope.item1.ItemSKUID = parseInt($scope.item1.ItemSKUID)
  // alert(typeof($scope.item1.ItemSKUID))
  // console.log($scope.item1.SaleRate);
  $scope.item1.SaleRate = parseInt($scope.item1.SaleRate)
  $http.post('/newskudefine',$scope.item1).success(function(response){
  console.log(response);
})

}//else
itemdatafetch();
}//saverate

}]);
