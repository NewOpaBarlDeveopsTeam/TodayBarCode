 function openingBalanceCall() {
    //  console.log("openingBalanceCall");
      return new Promise(function (resolve,reject) { 
         db.transactiondetail.aggregate([
      {$match:
          {date: { $gt:(fromdate), $lt: (reportdate)},stockInward:{  $ne: null },barcode:{ $exists: true} }
      },    
      {  $group:
     
         {_id: { SaleCategory:"$SaleCategory", stockInward:"$stockInward"},incount: { $sum: 1 },ingwt:{$sum:"$gwt"},ingpcs:{$sum:"$gpcs"}  }
      },
      
       {
          $project:{  SaleCategory: 1,stockInward: 1, incount: 1, ingwt:1,  ingpcs:1, cmpToYes: {  $cmp: [ "yes","$_id.stockInward" ] },    }
              
     },
     {$match:
                {cmpToYes:0}
     },
  ],function(err,doc1){         
    
      // console.log(doc1[0]);   
       db.transactiondetail.aggregate([
{$match:
      {date: { $gt:(fromdate), $lt: (reportdate) },stockInward:{  $ne: null },barcode:{ $exists: true} }
},    
      {  $group:
     
         {_id: { SaleCategory:"$SaleCategory", stockInward:"$stockInward"},incount: { $sum: 1 },ingwt:{$sum:"$gwt"},ingpcs:{$sum:"$gpcs"}  }
      },
       {
          $project:{SaleCategory: 1,stockInward: 1, incount: 1,  ingwt:1, ingpcs:1, cmpToNo: { $cmp: [ "no","$_id.stockInward" ] },}
       },
      {$match:{cmpToNo:0}
       },
     //     {
     //      $project:{  SaleCategory: 1,stockInward: 1, incount: 1, ingwt:1,  ingpcs:1, cmpToYes: {  $cmp: [ "yes","$_id.stockInward" ] },    }
              
     // },
     // {$match:
     //            {cmpToYes:0}
     // },
     
],function(err,doc){
       // console.log("doc");
       // console.log(doc[0]);
           function compareStockInwardYes(m) {
           
             compareStockInwardYesLength =  doc1.length;
             compareStockInwardNoLength =  doc.length;
              if (m< compareStockInwardYesLength) {
                   // console.log(doc1[m]._id.SaleCategory +" m "+m);
                   
                    function compareStockInwardNo(n) {
                      if (n< compareStockInwardNoLength) {
                             if (doc[n]._id.SaleCategory == doc1[m]._id.SaleCategory) {
                                  
                                   var obj = {"_id":{SaleCategory:doc1[m]._id.SaleCategory},opcount:doc1[m].incount - doc[n].incount ,
                                   opgwt:doc1[m].ingwt - doc[n].ingwt ,opgpcs:doc1[m]. ingpcs - doc[n]. ingpcs , };
                             
                                      newArray.push(obj);
                                     

                             }//if (doc[n]._id.SaleCategory
                              
                             compareStockInwardNo(n+1)
                      }//n< compareStockInwardNoLength
                        else{
                               // console.log(" m "+m+" n "+n);
                        
                               compareStockInwardYes(m+1);
                               
                                if (m == compareStockInwardYesLength-1 ) {
                                  // console.log(newArray);
                                   // console.log(" m "+m);
                                   if(newArray.length == 0){
                                    res.json(newArray)
                                    }
                                     resolve(newArray)
                                     openingBalance = newArray;
                                      console.log(" m "+m+ " openingBalance "+ openingBalance.length);
                                }//m == compareStockInwardYesLength-1
                                    
                            }
                    }//compareStockInwardNo
                    compareStockInwardNo(0);
              }
                  
           }//compareStockInwardYes()
       compareStockInwardYes(0)
       // res.json(doc1);
    })//doc
  })//doc1
    })//promise close
  }//openingBalanceCall






   console.log($scope.voucherid.length);
                                   $scope.availableGroups = (function () {
                                    var assignedGroupsIds = {};
                                    var groupsIds = {};
                                    var result = [];
                                      console.log("available");
                                    $scope.userit.forEach(function (el, i) {
                                      console.log("userit");
                                      assignedGroupsIds[el._id] = $scope.userit[i];
                                       console.log(assignedGroupsIds);
                                    });

                                    $scope.voucherid.forEach(function (el, i) {
                                      console.log("voucherid"+$scope.voucherid[i]);
                                      groupsIds[el.id] = $scope.voucherid[i];
                                      console.log(groupsIds);
                                    });

                                    for (var i in groupsIds) {
                                        if (assignedGroupsIds.hasOwnProperty(i)) {
                                          console.log("hi");
                                            result.push(assignedGroupsIds[i]);
                                            console.log(result);
                                             window.sessionStorage.setItem('myapp',JSON.stringify('result'));
                                        }
                                    }
                                      console.log("end"+result);
                                  return result;    
                                }())