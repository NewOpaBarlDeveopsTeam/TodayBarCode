angular.module('starter').controller("myctrl", ['$scope', '$http','$window','$state', function ($scope, $http,$window,$state)
    {
//       alert("WELCOME TO  RETAIL WINESHOP");
//
//        alert("CLICK OK TO ENTER CLOSING STOCK");
 var openingstack=[];        
var obj = {};
        
$scope.date2={date1:new Date()}  
        console.log($scope.date2);
        
        
        
$http.get('http://192.168.1.11:7000/abhi').success(function (response) {

            console.log(response);
//            console.log(response.length);
     $scope.stockpointname=response;
     
     
////             $scope.rr3 = response[4].ItemCode;
////     
////     
//     console.log($scope.rr1)
//     console.log($scope.rr2)
//     console.log($scope.rr3)
})

$scope.check = function (res147,Voucherdate) {
            alert("CHECK FUNCTION  CALLED");

            var res147 = res147;
            // var res258 = res258;
            // var datetimeValue = datetimeValue;

            console.log(res147);
           console.log(Voucherdate);
    
    var dates=new Date(((new Date(Voucherdate).toISOString().slice(0,23))+"-05:30")).toISOString();
    
    var a=dates.split("T");
    var date=a[0]
    console.log(date);
    var vochertype="Purchase";
    
//         var arr=[];
//     obj['sp']=res147;
//    obj['date']=date;
//    
//    arr.push(obj);
//    console.log(arr)
//    
    var vdata=res147+","+date+","+vochertype;
    

$http.get('http://192.168.1.11:7000/withincheck' + vdata).success(function (response) {
                console.log(response);
    $scope.openingstockkk =response;
//    for(var s=0;s<response.length;s++)
//        {
//          console.log(response[s].pieces);
//          console.log(response[s]._id.itemcode);
//            $scope.itemcode = response[s]._id.itemcode;
//            $scope.totalqty = response[s].pieces;
//        }
         
//    
//          for(var i=0;i<responsngth;i++)
//              {
//                  obj["itemcode"]=response[i].ItemCode;
//                  obj["totalpiece"]=response[i].NetPieces;
//                  openingstack.push(obj);
//                  console.log(openingstack)
//                  $scope.opening=openingstack;
//                  console.log($scope.opening);
//                  console.log(openingstack.length)
//                  for(s=0;s<openingstack.length;s++)
//                      {
//  if(openingstack[s].ItemCode==response[i].ItemCode)
//                      {
//                       alert("i got")   
//                          
//                      }
//                      }//end of s forloop
//                  
//                  
//                  
//                  
//                  
//              }
                
           })

        } // check() end


////$http.get('http://192.168.1.9:8000/transactionfetch').success(function(result){
////  console.log(result);
//// $scope.transactionType = result;
////    console.log($scope.transactionType);
////$scope.r=$scope.transactionType[0].transactionType;
////    $scope.r1=$scope.transactionType[0].TransctionTypeName;
////    $scope.r2=$scope.transactionType[1].transactionType;
//////    console.log($scope.r)
////    $scope.r3=$scope.transactionType[1].TransctionTypeName;
////    
//////    $scope.ty=$scope.transactionType[0];
//////    console.log(ty)
////    
////    
////  })
// $scope.p=function(r,r1,r2,r3)
//    {
//        
//        alert("post() called");
//        console.log(r);
//     console.log(r1);
//     console.log(r2);
//     console.log(r3);
//     
////     var a=r;
////     var b=r1;
////     var h=r2;
////     var i=r1;
////     
////     var all=a+','+r1+','+r2+","+r3;
////     
//     
//       var com=[];
//     
//     console.log(com);
//     
//     var obj={};
//     obj['a']=r;
//     obj['b']=r1;
//     obj['c']=r2;
//     obj['d']=r3;
//     
//     com.push(obj);
//     console.log(obj);
//     
//     var cat=obj['a']+','+obj['b']+','+obj['c']+','+obj['d'];
//     console.log(cat);
//     
//    
//
//    $http.post('http://192.168.1.9:8000/tr' +cat).success(function(response)
//    {
//         console.log(response);
//     })
//        
//                                                        
//        
////       $scope.a=$scope.TransctionType;
////        console.log($scope.a)
////        $scope.rt1=TransctionTypeName;
////        console.log($scope.rt);
////         console.log($scope.rt1);
//        
//    }  // end of p()
// $http.get('http://192.168.1.11:7000/abhishek').success(function(response)
//    {
//        console.log(response);
//
//        $scope.res12=response;
//
//    })
//
//    $scope.post=function(a,b,c)
//    {
//        console.log(a);
//        console.log(b);
//       console.log(c);
//        
//        
//        
//
// $http.post('http://192.168.1.11:7000/abhishek/pdata' +a).success(function(response)
//        {
//            console.log(response);
//        })
//
//    }
//    




}]);
