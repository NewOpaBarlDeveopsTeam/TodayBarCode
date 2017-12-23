var myApp=angular.module('myApp',[]);
myApp.controller('ReportCntrl2',['$scope','$http','$window',
function($scope,$http,window){

       $http.get('/forses').success(function(response){
        console.log(response)
        $scope.ses=response;
        console.log($scope.ses)
           });
  var dateObject = window.sessionStorage.getItem("sesDate");
  var sessionInDay =  window.sessionStorage.getItem("sessionInDay");
  console.log(sessionInDay)
  $scope.sesss=sessionInDay
 console.log($scope.newsession)

  var date= null;
  $scope.bit1 = {
       date2: new Date()
    };
    $scope.bit2 = {
        date1: new Date()
    };
 // alert($scope.session)
       console.log($scope.bit1.date2)
     console.log(Date.parse($scope.bit1.date2) )
      $scope.preview = function(froDate,toDate){


      sessionInDay = 0;
       //alert(froDate+"  "+toDate)
      // console.log($scope.bit1.date2);
      // console.log($scope.bit2.date1);
      if(Date.parse(froDate) == Date.parse(toDate)){
             //alert("From Date and To Date are equal!")
             //alert($scope.bit1.date2)
             var fromdate  = new Date(((new Date(froDate).toISOString().slice(0, 23))+"-05:30")).toISOString();
             var todate = new Date(((new Date(toDate).toISOString().slice(0, 23))+"-05:30")).toISOString();

             fromdate = fromdate.slice(0,10);
             fromdate = fromdate+"T00:00:00.000Z";
             todate = todate.slice(0,10)
             todate = todate+"T23:59:59.999Z";
             date= fromdate+","+todate+","+ sessionInDay;
             // alert(date)
       }else{

          var fromdate   = new Date(((new Date(froDate).toISOString().slice(0, 23))+"-05:30")).toISOString();
          // var fromdate   = new Date(((new Date("2017-10-10T00:00:00.000Z").toISOString().slice(0, 23))+"-05:30")).toISOString();
          //var fromdate   = "2017-10-10T00:00:00.000Z" ;
         console.log(fromdate)
            // alert('fromdate '+fromdate)
         //var todate = new Date(((new Date("2017-10-10T23:59:59.999Z").toISOString().slice(0, 23))+"-05:30")).toISOString();
          var todate = new Date(((new Date(toDate).toISOString().slice(0, 23))+"-05:30")).toISOString();
          //var todate = "2017-10-10T23:59:59.999Z" ;
           console.log(todate)
           fromdate = fromdate.slice(0,10);
             fromdate = fromdate+"T00:00:00.000Z";
             todate = todate.slice(0,10)
             todate = todate+"T23:59:59.999Z";
            // date= fromdate+","+todate;
            date= fromdate+","+todate+","+ sessionInDay;

       }


        $http.get('/prefind/'+date).success(function(response){
        // $scope.ddata=response;
          console.log(response);
           $http.get('/finalDataRequest').success(function(response){
                console.log(response)

                  displayReport = response;
                 for (let i = displayReport.length - 1; i >= 0; i--) {
                   if( displayReportary.indexOf(displayReport[i].category) == -1) {
                            var obj3 = {};
                                obj3["category"] = displayReport[i].category;
                                  displayReportary.push(displayReport[i].category);
                                  displayReportaryfinalary.push(obj3);
                                  console.log(displayReportaryfinalary);
                                  //$scope.displayReport = displayReportaryfinalary;
                                  if (i==0) {
                                    arrangement();
                                  }
                     }else{
                          if (i==0) {
                                    arrangement();
                                  }
                     }
                 }


               // $scope.displayReport = response;
           })




      })
      // $scope.summarySelectionChange2("Day Wise");
    }


 $scope.dateSearch=function(session){

      if (Date.parse($scope.bit1.date2) > Date.parse($scope.bit2.date1)) {
            alert("Invalid Date Range!\nFrom Date cannot be after To Date!")

        }

        else if(Date.parse($scope.bit1.date2) < Date.parse($scope.bit2.date1)){
          // alert("wetyyweryu")

       var fromdate  = new Date(((new Date($scope.bit1.date2).toISOString().slice(0, 23))+"-05:30")).toISOString();
       var  todate= new Date(((new Date($scope.bit2.date1).toISOString().slice(0, 23))+"-05:30")).toISOString();

             fromdate = fromdate.slice(0,10);
             fromdate = fromdate+"T00:00:00.000Z";

              todate= todate.slice(0,10);
             todate = todate+"T23:59:59.999Z";
             $scope.session = "all";
             date= fromdate+","+todate+","+$scope.session;

             // alert(fromdate+" "+todate)
             console.log(date)

       console.log("hiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii")
      $http.get('/kamtbatch/'+date).success(function(response){

      console.log(response);
        $http.get('/finalDataRequest').success(function(response){
                console.log(response)
           $scope.repo=response;
           console.log($scope.repo);
           //console.log(response[0].quantity)
           // alert(response.length)
           $scope.qty=0;
           $scope.itemTotal=0;
           // console.log(response[0].itemTotal)
           for(let i=0;i<response.length;i++)
           {
            // console.log(response[i].quantity)
            $scope.qty=$scope.qty+response[i].quantity;
            // console.log($scope.qty)
            // console.log(response[i].itemTotal)
              $scope.itemTotal=$scope.itemTotal+response[i].itemTotal;
              console.log( $scope.itemTotal)

           }
});
 });


        }
  else(Date.parse($scope.bit1.date2) == Date.parse($scope.bit2.date1))
        {



       var fromdate  = new Date(((new Date($scope.bit1.date2).toISOString().slice(0, 23))+"-05:30")).toISOString();
       var  todate= new Date(((new Date($scope.bit2.date1).toISOString().slice(0, 23))+"-05:30")).toISOString();

             fromdate = fromdate.slice(0,10);
             fromdate = fromdate+"T00:00:00.000Z";

              todate= todate.slice(0,10);
             todate = todate+"T23:59:59.999Z";
              // $scope.session = 0;
             date= fromdate+","+todate+","+$scope.session;

             // alert(fromdate+" "+todate)
             console.log(date)
             // alert($scope.session)
             var url= null;
             if($scope.session==undefined){
              url= '/kamtbatch/' ;
              // alert("ifffffffffffffffffffffffffffff"+$scope.session)
             }
             else{
              url= '/Batchfind/' ;
               // alert("elseeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee"+$scope.session)
             }

       // console.log("hiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii")
      $http.get(url +date).success(function(response){

           console.log(response);
           $http.get('/finalDataRequest').success(function(response){
           console.log(response)
           $scope.repo=response;
           console.log($scope.repo);
           //console.log(response[0].quantity)
           // alert(response.length)
           $scope.qty=0;
           $scope.itemTotal=0;
           // console.log(response[0].itemTotal)
           for(let i=0;i<response.length;i++)
           {
            // console.log(response[i].quantity)
            $scope.qty=$scope.qty+response[i].quantity;
            // console.log($scope.qty)
            // console.log(response[i].itemTotal)
              $scope.itemTotal=$scope.itemTotal+response[i].itemTotal;
              console.log( $scope.itemTotal)

           }
});
 });








        // var session=[];

















    }

    }




}]);






//   var myApp=angular.module('myApp',[]);
// myApp.controller('ReportCntrl2',['$scope','$http','$window',
// function($scope,$http,window){


//   var dateObject = window.sessionStorage.getItem("sesDate");
//   var sessionInDay =  window.sessionStorage.getItem("sessionInDay");
//   console.log(sessionInDay)
//   $scope.sesss=sessionInDay
//  console.log($scope.newsession)

//   var date= null;
//   $scope.bit1 = {
//        date2: new Date()
//     };
//     $scope.bit2 = {
//         date1: new Date()
//     };

//  $scope.dateSearch=function(session){
//     alert($scope.session)
//        console.log($scope.bit1.date2)
//      console.log(Date.parse($scope.bit1.date2) )
//       if (Date.parse($scope.bit1.date2) > Date.parse($scope.bit2.date1)) {
//             alert("Invalid Date Range!\nFrom Date cannot be after To Date!")

//         }



//  else if(Date.parse($scope.bit1.date2) < Date.parse($scope.bit2.date1))
//  {
//   var fromdate  = new Date(((new Date($scope.bit1.date2).toISOString().slice(0, 23))+"-05:30")).toISOString();
//        var  todate= new Date(((new Date($scope.bit2.date1).toISOString().slice(0, 23))+"-05:30")).toISOString();

//              fromdate = fromdate.slice(0,10);
//              fromdate = fromdate+"T00:00:00.000Z";

//               todate= todate.slice(0,10);
//              todate = todate+"T23:59:59.999Z";
//              date= fromdate+","+todate+","+$scope.session;

//              alert(fromdate+" "+todate)
//              console.log(date)

//               $http.get('/dateBatchFind/'+date).success(function(response){

//       console.log(response);
//         $http.get('/finalDataRequest').success(function(response){
//                 console.log(response)
//            $scope.repo=response;
//            console.log($scope.repo);
//            //console.log(response[0].quantity)
//            alert(response.length)
//            $scope.qty=0;
//            $scope.itemTotal=0;
//            // console.log(response[0].itemTotal)
//            for(let i=0;i<response.length;i++)
//            {
//             // console.log(response[i].quantity)
//             $scope.qty=$scope.qty+response[i].quantity;
//             // console.log($scope.qty)
//             // console.log(response[i].itemTotal)
//               $scope.itemTotal=$scope.itemTotal+response[i].itemTotal;
//               console.log( $scope.itemTotal)

//            }
// });
//   });

//  }
//       else if(Date.parse($scope.bit1.date2) < Date.parse($scope.bit2.date1)){



//        var fromdate  = new Date(((new Date($scope.bit1.date2).toISOString().slice(0, 23))+"-05:30")).toISOString();
//        var  todate= new Date(((new Date($scope.bit2.date1).toISOString().slice(0, 23))+"-05:30")).toISOString();

//              fromdate = fromdate.slice(0,10);
//              fromdate = fromdate+"T00:00:00.000Z";

//               todate= todate.slice(0,10);
//              todate = todate+"T23:59:59.999Z";
//              date= fromdate+","+todate+","+$scope.session;

//              alert(fromdate+" "+todate)
//              console.log(date)

//        // console.log("hiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii")
//       $http.get('/dateBatchFind/'+date).success(function(response){

//       console.log(response);
//         $http.get('/finalDataRequest').success(function(response){
//                 console.log(response)
//            $scope.repo=response;
//            console.log($scope.repo);
//            //console.log(response[0].quantity)
//            alert(response.length)
//            $scope.qty=0;
//            $scope.itemTotal=0;
//            // console.log(response[0].itemTotal)
//            for(let i=0;i<response.length;i++)
//            {
//             // console.log(response[i].quantity)
//             $scope.qty=$scope.qty+response[i].quantity;
//             // console.log($scope.qty)
//             // console.log(response[i].itemTotal)
//               $scope.itemTotal=$scope.itemTotal+response[i].itemTotal;
//               console.log( $scope.itemTotal)

//            }
// });
//  });






//         // var session=[];
//         $http.get('/forses').success(function(response){
//   console.log(response)
//   $scope.ses=response;
//   console.log($scope.ses)
// });

//     }

//     }
// }]);
