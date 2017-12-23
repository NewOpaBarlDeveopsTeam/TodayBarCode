var myApp=angular.module('myApp',[]);
myApp.controller('ReportCntrl',['$scope','$http','$window',
function($scope,$http,$window){

  //alert("repyusds")
  console.log("hffdhj")
  var date= null;
  $scope.bit1 = {
       date2: new Date()
    };
    $scope.bit2 = {
        date1: new Date()
    };
    $scope.demodate= new Date();
    console.log($scope.demodate)

    var dateObject = window.sessionStorage.getItem("sesDate");
    console.log(dateObject)
    var sessionInDay =  window.sessionStorage.getItem("sessionInDay");

    console.log(sessionInDay)

    //date settings

   // $scope.preview(dateObject,dateObject)
    if(dateObject != null ){
      $scope.bit1 = {
             date2: new Date(dateObject)
             // console.log(date2)
       };
       $scope.session = sessionInDay ;
       // console.log()
        //$scope.summarySelection = "Itemwise";
     // alert(" iam ready")
     // $scope.preview(dateObject,dateObject)
     //console.log("b");
            var fromdate  = new Date(((new Date(dateObject).toISOString().slice(0, 23))+"-05:30")).toISOString();
             var todate = new Date(((new Date(dateObject).toISOString().slice(0, 23))+"-05:30")).toISOString();

             fromdate = fromdate.slice(0,10);
             fromdate = fromdate+"T00:00:00.000Z";

             todate = todate.slice(0,10)
             todate = todate+"T23:59:59.999Z";
             date= fromdate+","+todate+","+sessionInDay;
             //alert(date);
             $http.get('/dateBatchFind/'+date).success(function(response){
            // $scope.ddata=response;
            console.log(response);

            $http.get('/finalDataRequest').success(function(response){
                console.log(response);
                $scope.displayReport3 = response;
                var displayReport3 = response;
                 for (let b = displayReport3.length - 1; b >= 0; b--) {
                   if( displayReportary.indexOf(displayReport3[b].category) == -1) {
                            var obj3 = {};
                                obj3["category"] = displayReport3[b].category;
                                  displayReportary.push(displayReport3[b].category);
                                  displayReportaryfinalary.push(obj3);
                                  console.log(displayReportaryfinalary);
                                  //$scope.displayReport = displayReportaryfinalary;
                                  if (b==0) {
                                    arrangement();
                                  }
                     }else{
                          if (b==0) {
                                    arrangement();
                                  }
                     }
                 }
              })

               })
             //alert(date)
      //quantity1("a")

    // }

    }


  //   var date= null;
  // $scope.bit1 = {
  //      date2: new Date()
  //   };
  //   $scope.bit2 = {
  //       date1: new Date()
  //   };
  //   $scope.demodate= new Date();
  //   console.log($scope.demodate)

   var dateObject=window.sessionStorage.getItem("sessionrd");
      // var dateObject = window.sessionStorage.getItem("sesDate");
      console.log(dateObject)
  //   var sessionInDay =  window.sessionStorage.getItem("sessionInDay");

  //   console.log(sessionInDay)

    //date settings

   // $scope.preview(dateObject,dateObject)
   // REPORT  VIEWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW
    var currentsession=window.sessionStorage.getItem("sessionrs");
    console.log(currentsession)

     $scope.session1 = currentsession ;
      console.log(dateObject)
    if(dateObject != null ){

      $scope.bit1 = {
             date2: new Date(dateObject)
             // console.log(date2)
       };
             // $scope.session=currentsession;
             var fromdate  = new Date(((new Date(dateObject).toISOString().slice(0, 23))+"-05:30")).toISOString();
             var todate = new Date(((new Date(dateObject).toISOString().slice(0, 23))+"-05:30")).toISOString();

             fromdate = fromdate.slice(0,10);
             fromdate = fromdate+"T00:00:00.000Z";
             todate = todate.slice(0,10)
             todate = todate+"T23:59:59.999Z";
             date= fromdate+","+todate+","+currentsession;

             console.log(date);
             $http.get('/preview/'+date).success(function(response){
              alert("got the alert")
            // $scope.ddata=response;
             console.log(response);

            $http.get('/fulldata').success(function(response){
                console.log(response);
                $scope.displayReport1 = response;
                 alert(response.length)
                 $scope.qty=0;
                 $scope.itemTotal=0;
                 // console.log(response[0].itemTotal)
                 for(let i=0;i<response.length;i++)
                 {
                 // console.log(response[i].quantity)
                 $scope.qty=$scope.qty+response[i].quantity;
                 console.log($scope.qty)
                 // console.log(response[i].itemTotal)
                  $scope.itemTotal=$scope.itemTotal+response[i].itemTotal;
                  console.log( $scope.itemTotal)
                 }
                var displayReport1 = response;
                 for (let a = displayReport1.length - 1; a>= 0; a--) {
                   if( displayReportary.indexOf(displayReport1[a].category) == -1) {
                            var obj3 = {};
                                obj3["category"] = displayReport1[a].category;
                                  displayReportary.push(displayReport1[a].category);
                                  displayReportaryfinalary.push(obj3);
                                  console.log(displayReportaryfinalary);
                                  //$scope.displayReport = displayReportaryfinalary;
                                  if (a==0) {
                                    arrangement();
                                  }
                     }else{
                          if (a==0) {
                                    arrangement();
                                  }
                     }
                 }
              })

               })
             //alert(date)
      //quantity1("a")

    // }

    }
    var finalTotalItems = 0;
    var quantity1= function(receiveCategory) {
     // displayReport
     //console.log(receiveCategory)
      var quantityTotal = 0;
     // var itemTotal2 = 0;
      for (var f = displayReport.length - 1; f >= 0; f--) {
         //console.log(displayReport[f].category)
        if (displayReport[f].category== receiveCategory) {
           quantityTotal += displayReport[f].quantity;
           //itemTotal2 += displayReport[f].itemTotal;
           console.log(quantityTotal);
           if (f==0) {
            return quantityTotal;
           }
           //console.log(receiveCategory)
        }else{
          if (f==0) {
            return quantityTotal;
           }
        }
       // Things[i]
      }
      //return 10;
    }
    var itemTotal1= function(receiveCategory) {
     // displayReport
     //console.log(receiveCategory)
      //var quantityTotal = 0;
      var itemTotal2 = 0;
      for (var f = displayReport.length - 1; f >= 0; f--) {
         //console.log(displayReport[f].category)
        if (displayReport[f].category== receiveCategory) {
          // quantityTotal += displayReport[f].quantity;
           itemTotal2 += displayReport[f].itemTotal;
          // console.log(quantityTotal);
           if (f==0) {
            finalTotalItems += itemTotal2 ;
            console.log("finalTotalItems "+finalTotalItems)
            return itemTotal2;
           }
           //console.log(receiveCategory)
        }else{
          if (f==0) {
            finalTotalItems += itemTotal2 ;
             console.log("finalTotalItems "+finalTotalItems)
            return itemTotal2;

           }
        }
       // Things[i]
      }
      //return 10;
    }
    var displayReportary = [];
    var displayReportaryfinalary =[];
    var displayReport = null;
    var requiredFinalData = [];
    var requiredFinalOrder = [];
      var getFinalTotal = 0;
     var arrangement = function() {
       // alert("ghjsdfdfhj")
         $scope.getFinalTotal = displayReport.length - 1;
       for (let m = displayReportaryfinalary.length - 1; m >= 0; m--) {

         for (let j = displayReport3.length - 1; j >= 0; j--) {
           if(displayReportaryfinalary[m].category == displayReport3[j].category ){
              console.log(displayReport[j].category);

              if( requiredFinalOrder.indexOf(displayReport3[j].category) == -1) {
                            var obj3 = {};
                                obj3["category"] = displayReport3[j].category;
                                //op
                                obj3["itemTotal"] = itemTotal1(displayReport3[j].category);
                                obj3["quantity"] = quantity1(displayReport3[j].category);
                                requiredFinalData.push(obj3);
                                //console.log(requiredFinalData+"object 3 valueeeeee")
                                requiredFinalOrder.push(displayReport3[j].category);
                                var obj5 = {};
                                obj5["name"] = displayReport3[j].name;
                                obj5["quantity"] = displayReport3[j].quantity;
                                obj5["itemTotal"] = displayReport3[j].itemTotal;
                                requiredFinalData.push(obj5);
                                $scope.displayReport3 = requiredFinalData;

                                console.log($scope.displayReport)

                                  // displayReportary.push(displayReport[i].category);
                                  // displayReportaryfinalary.push(obj3);
                                  // console.log(displayReportaryfinalary);
                                  // $scope.displayReport = displayReportaryfinalary;
                                  if(getFinalTotal == 0 ){
                                    console.log("iam zero f "+finalTotalItems)
                                      var obj5 = {};
                                      obj5["itemTotal"] = finalTotalItems;
                                       obj5["category"] = "Total";

                                     requiredFinalData.push(obj5);
                                  }
                                  getFinalTotal-- ;
                                  console.log(getFinalTotal)
                     }else{
                             var obj4 = {};
                             obj4["name"] = displayReport3[j].name;
                             obj4["quantity"] = displayReport3[j].quantity;
                             obj4["itemTotal"] = displayReport3[j].itemTotal;
                             requiredFinalData.push(obj4);
                             $scope.displayReport = requiredFinalData;

                              if(getFinalTotal == 0 ){
                                    console.log(" e iam zero f "+finalTotalItems)
                                     var obj5 = {};
                                      obj5["itemTotal"] = finalTotalItems;
                                       obj5["category"] = "Total";

                                     requiredFinalData.push(obj5);

                                 }
                               getFinalTotal-- ;


                     }
           }


         }
       }
     }

    // $scope.preview = function(froDate,toDate){


    //   sessionInDay = 0;
    //    //alert(froDate+"  "+toDate)
    //   // console.log($scope.bit1.date2);
    //   // console.log($scope.bit2.date1);
    //   if(Date.parse(froDate) == Date.parse(toDate)){
    //          //alert("From Date and To Date are equal!")
    //          //alert($scope.bit1.date2)
    //          var fromdate  = new Date(((new Date(froDate).toISOString().slice(0, 23))+"-05:30")).toISOString();
    //          var todate = new Date(((new Date(toDate).toISOString().slice(0, 23))+"-05:30")).toISOString();

    //          fromdate = fromdate.slice(0,10);
    //          fromdate = fromdate+"T00:00:00.000Z";
    //          todate = todate.slice(0,10)
    //          todate = todate+"T23:59:59.999Z";
    //          date= fromdate+","+todate+","+ sessionInDay;
    //          alert(date)
    //    }else{

    //       var fromdate   = new Date(((new Date(froDate).toISOString().slice(0, 23))+"-05:30")).toISOString();
    //       // var fromdate   = new Date(((new Date("2017-10-10T00:00:00.000Z").toISOString().slice(0, 23))+"-05:30")).toISOString();
    //       //var fromdate   = "2017-10-10T00:00:00.000Z" ;
    //      console.log(fromdate)
    //         // alert('fromdate '+fromdate)
    //      //var todate = new Date(((new Date("2017-10-10T23:59:59.999Z").toISOString().slice(0, 23))+"-05:30")).toISOString();
    //       var todate = new Date(((new Date(toDate).toISOString().slice(0, 23))+"-05:30")).toISOString();
    //       //var todate = "2017-10-10T23:59:59.999Z" ;
    //        console.log(todate)
    //        fromdate = fromdate.slice(0,10);
    //          fromdate = fromdate+"T00:00:00.000Z";
    //          todate = todate.slice(0,10)
    //          todate = todate+"T23:59:59.999Z";
    //         // date= fromdate+","+todate;
    //         date= fromdate+","+todate+","+ sessionInDay;

    //    }


    //     $http.get('/prefind/'+date).success(function(response){
    //     // $scope.ddata=response;
    //       console.log(response);
    //        $http.get('/finalDataRequest').success(function(response){
    //             console.log(response)

    //               displayReport = response;
    //              for (let i = displayReport.length - 1; i >= 0; i--) {
    //                if( displayReportary.indexOf(displayReport[i].category) == -1) {
    //                         var obj3 = {};
    //                             obj3["category"] = displayReport[i].category;
    //                               displayReportary.push(displayReport[i].category);
    //                               displayReportaryfinalary.push(obj3);
    //                               console.log(displayReportaryfinalary);
    //                               //$scope.displayReport = displayReportaryfinalary;
    //                               if (i==0) {
    //                                 arrangement();
    //                               }
    //                  }else{
    //                       if (i==0) {
    //                                 arrangement();
    //                               }
    //                  }
    //              }


    //            // $scope.displayReport = response;
    //        })




    //   })
    //   // $scope.summarySelectionChange2("Day Wise");
    // }


//////////////////////ItemWise////////////////////////
$scope.summarySelectionItem = 'ItemWise';

var dayWiseFetch = function(day){
$scope.summarySelectionDay = day;
// console.log($scope.summarySelectionDay);
        if ($scope.summarySelectionDay == "Day Wise") {
        console.log("day");
        var fromdate  = new Date(((new Date(dateObject).toISOString().slice(0, 23))+"-05:30")).toISOString();
             var todate = new Date(((new Date(dateObject).toISOString().slice(0, 23))+"-05:30")).toISOString();
             fromdate = fromdate.slice(0,10);
             fromdate = fromdate+"T00:00:00.000Z";
             todate = todate.slice(0,10)
             todate = todate+"T23:59:59.999Z";
             date1= fromdate+","+todate+","+currentsession;
             console.log(date1)
             $http.get('/DayWiseFind/'+date1).success(function(response){
                      alert("daywisefind")
                       console.log(response)
                     $scope.dayreport = response ;
                     console.log($scope.dayreport);
                     $scope.setTotals()
             })
  }
}
//var day =
dayWiseFetch("Day Wise");

/////////////////////////totals//////////////
 $scope.setTotals = function(){
       $scope.invoiceTotal2 = 0;
      for (let i = $scope.dayreport.length - 1; i >= 0; i--) {
         console.log( $scope.dayreport[i].total);
         // ||$scope.displayReport[i]._id !='Cgst'||$scope.displayReport[i]._id !='Sgst'
         if ( $scope.dayreport[i]._id !='Cash' && $scope.dayreport[i]._id !='Cgst' && $scope.dayreport[i]._id !='Sgst' ) {
               console.log( $scope.invoiceTotal2);
              $scope.invoiceTotal2 += $scope.dayreport[i].total;
              console.log( $scope.invoiceTotal2);
               //$scope.invoiceTotal2;
         }

      }
     // display._id !='Cash'
 }

}])
///////print function////////////
// $scope.printToCart = function(printSectionId) {
//       var innerContents = document.getElementById(printSectionId).innerHTML;
//       var popupWinindow = window.open('', '_blank', 'width=600,height=700,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
//       popupWinindow.document.open();
//       popupWinindow.document.write('<html><head><link rel="stylesheet" type="text/css" href="style.css" /></head><body onload="window.print()">' + innerContents + '</html>');
//       popupWinindow.document.close();
//     }
