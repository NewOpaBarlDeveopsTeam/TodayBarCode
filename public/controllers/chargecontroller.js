var myApp=angular.module('myApp',[]);

myApp.controller('ChargeCntrl',['$scope','$http','$window',
function($scope,$http,$window){
  // var charge= null;
  var editcheck = false;
  var data;
    $scope.all = true;
    $scope.disable = function(){
    alert($scope.selected + "form disable")
    $scope.all = false;
  }
  
  $http.get('/chargeConfigure').success(function(res){
        console.log(res);
        $scope.chargeConfigure = res; 
        //  function.......
        $scope.selectrow = function(InvVoucherCla,index){
        alert(index+"indexxx");
        alert(InvVoucherCla+"InvVoucherCla")
        $scope.index1 = index;
        $scope.getInvVoucher = InvVoucherCla;
        console.log($scope.getInvVoucher);

        //details fetch........
        var detailsfetch = function(){
        var voucher = $scope.getInvVoucher;
        $http.get('/getchargedata/'+ voucher).success(function(response){
        console.log(response);
        $scope.chargedetails = response;
        console.log(1+$scope.chargedetails[($scope.chargedetails.length - 1)].RowNo);
        $scope.newrow = 1+$scope.chargedetails[($scope.chargedetails.length - 1)].RowNo;
      })
     }
      detailsfetch();//detailsfetch
       //new function.......
        $scope.addNew = function(details){
        $scope.chargedetails.push({
          'chargeName':"",
          'accountName':"" ,
          'AddSub':"",
          'ChargeValue':"",
          'valueIn':"",
          'Editable':"",
          'Taxable':"",
        });//chargedetails
      };//addnew function
  }//selectrow
})//chargeConfigure
  
$http.get('/valuation').success(function(result){
  console.log(result[0].valueIn)
  $scope.value = result;
})
  
$http.get('/ledgerdetails').success(function(response){
    console.log(response[0].accountName)
  $scope.account = response;
 })
  
 $http.get('/getaddsub').success(function(response){
     console.log(response[0].addsub)
    $scope.addsub = response;
  })
  
//accountFetch
  $scope.accountFetch = function(name)
  {
    alert(name)
    var account = name;
      // $http.get('/getchargedata/'+ voucher).success(function(response){
    $http.get('/getaccountNo/'+ name).success(function(res){
    console.log(res[0].AcNo);
    $scope.accNo = res[0].AcNo;
    console.log($scope.accNo);
   })
  }
  
    $scope.saveitem = function(){


  //       if($scope.bitem.composite == true){
  //     $scope.bitem.composite = "yes"
  //  }else if($scope.bitem.composite == false || $scope.bitem.composite == undefined ){
  //     $scope.bitem.composite = "no"
  //  }

        if(editcheck == true){
          //console.log($scope.selected);

       $http.put('/putaccountdetails',$scope.selected).success(function(response){
               console.log(response);
          })
        }//if
        else{
          alert("hai")

          console.log($scope.chargedetails);
          var x = 0;
          for(let i=0;i<$scope.chargedetails.length;i++)
          {
            x++;
            if (x == $scope.chargedetails.length) {
              alert($scope.newrow+"rowwwwwwww");
              $scope.chargedetails[i].InvVoucherCla =$scope.getInvVoucher;
              $scope.chargedetails[i].RowNo = $scope.newrow;
              $scope.chargedetails[i].AcNo=$scope.accNo
              alert("ready")
              alert(x)
              $http.post('/chargesave',$scope.chargedetails[i]).success(function(response){
                console.log(response);
            })//chargesave
          }//if
        }//for
      }//else
    }//saveitem
        var charge;
        $scope.seldetails = function(data,index){
          console.log(data)
          alert(index+"index")
          $scope.indexx = index;
          $scope.data1 = data;
          charge=$scope.data1;
          alert(charge._id);
          alert($scope.data1);
          $scope.selected = data;
          console.log($scope.selected);
        }
      //  edit function
//        if($scope.indexx != null){
             $scope.edititem = function(){
             alert($scope.indexx+"i got call edit call")
             console.log(charge);
             $scope.selected = charge;
          }
//        }

          //delete function
          $scope.deleteitem = function(){
            console.log(charge._id)
            $http.delete('/chargedelete/'+charge._id).success(function(response)
                      {
                        console.log(response);
                        alert("i got a call")
                        // window.location.reload();
                      });

          }
          


  }]);
