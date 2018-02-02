  var app=angular.module('myApp',[])
  app.controller('mainctrl',['$scope','$http','$window','$filter',
    function($scope,$http,$window,$filter){
              
             
var order=[];
var kotlist=[];


             var login = window.sessionStorage.getItem("loginres1")
             console.log(login);
 

 $http.get('/mainsection'+login).success(function(response){
      console.log(response);
      $scope.section=response;
     });     
     $http.get('/maincode'+login).success(function(response){
      console.log(response);
      $scope.codes = response;

      for(var v=0;v<response.length;v++)
      {
        console.log(response[v].UOMSize)
        $scope.uomfind=response[v].UOMSize;
        $http.get('/mainuom'+$scope.uomfind).success(function(result){
        console.log(result)
        })
      }


     

$scope.qty=1;

 var array=[];
$scope.getcode=function(cde,qty,section,tabname,waitername)
 {
                 
              // alert(section);
              $scope.section1=section;
              $scope.table1= tabname;
              $scope.waitername1= waitername;
              window.sessionStorage.setItem("sectionname",$scope.section1);
              window.sessionStorage.setItem("tabesname",$scope.table1);
              window.sessionStorage.setItem("waiternames",$scope.waitername1);
              // alert(tabname);
              // alert(waitername);
              // alert(cde);
              // alert(qty);

             $scope.itemcode = cde;
             window.sessionStorage.setItem("codename",$scope.itemcode);
            console.log($scope.itemcode);
            window.sessionStorage.setItem("itemcodes",$scope.itemcode);
                for(i=0;i<response.length;i++)
                       {
                         if($scope.itemcode== response[i].ItemCode)
                               {
                                  alert("match found")
                                    console.log(response[i].UOMSize)
                                    $scope.uosize=response[i].UOMSize;
                                     console.log($scope.uosize);
                                     $scope.itskuid=response[i].ItemSKUID;
                                     console.log($scope.itskuid);
                                     alert($scope.itskuid);
                                }

                        }
               for(a=0;a<response.length;a++)
                        {
                           if($scope.itemcode== response[a].ItemCode)
                               {
                               console.log(response[a].ItemName)
                                 $scope.itemname=response[a].ItemName;
                                 console.log($scope.itemname)
                               }

                         }
            
////////////////// // // FOR SALE RATE/////////////////////////
            console.log($scope.itemcode);
    $http.get("/getskid"+$scope.itemcode).success(function(response)
    {
          console.log(response);

          var itskuid=response[0].ItemSKUID;
          console.log(itskuid);
          console.log($scope.section1);
          var all = itskuid+","+$scope.section1
          $http.get("/mainskuid"+all).success(function(response){
          console.log(response);
          console.log(response[0].SaleRate);
          $scope.salerate1= response[0].SaleRate;

    
      $http.get('/getqty'+$scope.uosize).success(function(response)
           {
          console.log(response);
          console.log(response[0].BaseQty);
         // $scope.qty = response[0].BaseQty;
             
              var obj={}; 


              console.log($scope.itemcode);
              console.log($scope.itemname);
              console.log($scope.qty);
              console.log($scope.salerate1)
              console.log($scope.itskuid);

             obj["code1"]=$scope.itemcode;
             obj["itemname1"]=$scope.itemname;
             obj["qty1"] = $scope.qty;
             obj["slae1"] = $scope.salerate1;
             obj["itemskuid"]=$scope.itskuid;
             $scope.itemwiserate= $scope.salerate1*$scope.qty;
             obj["itemwiserate"] = $scope.itemwiserate;
             order.push(obj);
             $scope.allorders=order; //FOR MAIN ORDER
             console.log($scope.allorders);
             window.sessionStorage.setItem("response",$scope.allorders)
             console.log($scope.allorders.length);
             $scope.a=null;
             $scope.qty= 1;
   //           console.log(order.length);

   //       if(order.length==0)
   //          {
   //             var obj={};
   //             alert("first time")
   //           obj["code1"]=$scope.itemcode;
   //           obj["itemname1"]=$scope.itemname;
   //           obj["qty1"] = $scope.qty;
   //           obj["slae1"] = $scope.salerate1;
   //           $scope.itemwiserate= $scope.salerate1*$scope.qty;
   //           obj["itemwiserate"] = $scope.itemwiserate;

   //           order.push(obj);
   //           $scope.allorders=order;
   //           console.log($scope.allorders);
   //           console.log($scope.allorders.length);
   //           }
   //       else{
   //              for(v=0;v<order.length;v++)
   //             {  
   //                  alert(order[v].code1+"previous");
   //                  alert($scope.itemcode+"new one")
   //                    if( order[v].code1  == $scope.itemcode)
   //                    {   
   //                     var obj={};
   //                     alert("item code match")
   //                     order[v].qty1+=$scope.qty;
   //                    }
                        
   //                     else{
   //                             if($scope.itemcode != order[v].code1 && v== order.length-1)
   //                                {
   //                               var obj={}
   //                                  alert("new one")

   //                           obj["code1"]=$scope.itemcode;
   //                          obj["itemname1"]=$scope.itemname;
   //                          obj["qty1"] = $scope.qty;
   //                        obj["slae1"] = $scope.salerate1;
   //                     $scope.itemwiserate= $scope.salerate1*$scope.qty;
   //                     obj["itemwiserate"] = $scope.itemwiserate;

   //                        order.push(obj);
   //                    $scope.allorders=order;
   //                 console.log($scope.allorders);
   //                   console.log($scope.allorders.length);
   //                 }// iffffff

                         
   //             } //else 

                          
   //            }//// for

    // }///else


           // for(v=0;v<$scope.allorders.length;v++)
           // {

           //   if($scope.allorders.length==1)
           //   {
           //    alert(v)
           //     alert($scope.itemcode)
               
           //          if( $scope.itemcode == $scope.allorders[v].code1)
           //          {
           //           alert("itemcode match")
           //           $scope.allorders[v].qty1+=$scope.qty;
           //          }
           //      }
           //   }




             $scope.totalrate=0;
             for(var i=0;i<$scope.allorders.length;i++)
                       {
                     console.log($scope.allorders[i].itemwiserate);
                     $scope.totalrate+= $scope.allorders[i].itemwiserate;
                      $scope.itemcodess= $scope.allorders[i].code1;
                      console.log($scope.itemcodess)
                       $scope.quantitys= $scope.allorders[i].qty1;
                       console.log($scope.quantitys)
                        $scope.itemnames= $scope.allorders[i].itemname1;
                        console.log($scope.itemnames)

                      console.log($scope.totalrate);
                      }
            console.log($scope.totalrate);
            window.sessionStorage.setItem("allrate",$scope.totalrate);
            window.sessionStorage.setItem("codeit",$scope.itemcodess);
            window.sessionStorage.setItem("qtyitem",$scope.quantitys);
            window.sessionStorage.setItem("nameitem",$scope.itemnames);

             var obj={};
             obj["cd1"] = $scope.itemcodess;
             obj["qt1"] = $scope.quantitys;
             obj["it11"] = $scope.itemnames;

             array.push(obj);
            $scope.iqcall=array;

            window.sessionStorage.setItem("allre",JSON.stringify($scope.iqcall));




              
            })

       })
            })

       }


})

$http.get('/gettable').success(function(response){
      console.log(response);
      $scope.tablenames = response;

 
        $scope.tabname=function(tables){

          // alert(tables);
          var table1=tables

                   for(b=0;b<response.length;b++)
                       {
                         if(table1== response[b].TableName)
                               {
                                  // alert("match found")
                                    console.log(response[b].Section)
                                  $scope.Section1=response[b].Section;
                                  console.log($scope.Section1)
                                  // alert(login)
                   var namesec=login+","+$scope.Section1;                 
               $http.get("/getsec"+namesec).success(function(response){
                console.log(response);
                $scope.secid=response[0].SectionId;
                $scope.posid=response[0].POSID;
               })
 

                                }

                        }
                  for(w=0;w<response.length;w++)
                  {
                    if(table1== response[w].TableName)
                          {
                            console.log(response[w].TableId);
                            console.log(response[w].waiterId)
                            $scope.tabid=response[w].TableId;
                            $scope.waitid= response[w].waiterId;
                          }

                  }   
          }
})

      
    

     $http.get('/getkot'+login).success(function(response){
      console.log(response);
      $scope.kotno=response[0].invoiceNumber;
      window.sessionStorage.setItem("kot",$scope.kotno)

     })


  $http.get("/uoo").success(function(response12){
  console.log(response12)
  $scope.alluo=response12;

   
})   
 
$scope.setClickedRow=function(index,names,codes){

  alert(index);
  alert(names);
  alert(codes);
  var name1=names;
  console.log(name1);
    



  $scope.itcode123=codes;

   
  console.log($scope.itcode123.toString());
  $scope.a= $scope.itcode123.toString();
  console.log(typeof($scope.a));
  console.log(typeof($scope.itcode123));
  
  $scope.index1=index;
  // console.log($scope.allorders[0].code1);
  // console.log($scope.allorders[0].itemname1);
  // $scope.allorders[0].code1= itcode;
  // $scope.allorders[0].itemname1= name1;
 
  // var obj={}
 //      obj["itemname123"]=name1;
 //      obj["code123"] =$scope.itcode;
 //      order.push(obj);
 //      $scope.allorders=order;
 //      console.log($scope.allorders);
 //      console.log($scope.allorders[0].code123);
 //      $scope.codeitem= $scope.allorders[0].code123;
 //      console.log($scope.codeitem);



     $http.get('/getcodefor'+$scope.itcode123).success(function(response){
      console.log(response);
      $scope.codn=response[0].ItemCode;
      console.log($scope.codn)
       

     })


} 



$scope.clear=function(){
  alert("shhhhhhh");

   $scope.allorders=null;
  order=[];
}



$scope.print = function(a)
  {
    console.log(a);
    $scope.coddd=a;

           for(c=0;c<$scope.coddd.length;c++){
            console.log($scope.coddd[c].code1);
            console.log($scope.coddd[c].itemname1);
            console.log($scope.coddd[c].qty1);
            console.log($scope.coddd[c].itemskuid)
             $scope.kotitemcode=$scope.coddd[c].code1;
          $scope.kotitemname=$scope.coddd[c].itemname1;
          $scope.itemqty=$scope.coddd[c].qty1;
          $scope.kotpush();
        }
           
    window.sessionStorage.setItem("wholeres",$scope.coddd)
    console.log($scope.coddd)
    console.log($scope.tabid);
    console.log($scope.waitid);
    console.log($scope.realtablename);
 // var tn=
//   var tn = $scope.realtablename.split("");
//  var tname = a[0];
//  console.log(tname);
//  var tid = a[1];
// console.log(tid);

    var  dates  = new Date(((new Date().toISOString().slice(0, 23))+"-05:30")).toISOString();
     
    $scope.hhmmsstt = $filter('date')(new Date(), 'hh:mm:ss a');


    console.log($scope.coddd);
    for(var v =0;v<$scope.coddd.length;v++)
    {
    console.log($scope.coddd[v].code1);
    console.log($scope.coddd[v].qty1);
    console.log($scope.coddd[v].itemskuid);

    var itemlist = $scope.coddd[v].code1+","+$scope.coddd[v].qty1+","+$scope.kotno+","+$scope.coddd[v].itemskuid;

    $http.post("/tableiteminsert"+itemlist).success(function(result){
      console.log(result)
    
   var tabwait= $scope.tabid+","+$scope.waitid+","+$scope.kotno+","+dates+","+   $scope.hhmmsstt
               +","+$scope.secid;
    $http.post("/tablemast"+tabwait).success(function(response){
      console.log(response);
    })

    var tablcharge= $scope.tabid+","+ $scope.secid+","+$scope.posid+","+$scope.realtablename;

     $http.post("/tableee"+tablcharge).success(function(response){
      console.log(response);
    })

    })
  }
  console.log($scope.allorders);
  $scope.allorders=null;
  order=[];
//   for(y=0;y<$scope.allorders.length;y++)
// {
 
//  $scope.allorders[y].code1 = null;
//   $scope.allorders[y].itemname1 = null;
//    $scope.allorders[y].qty1 = null;
// }
 

  } 

 // $scope.save=function(co,na,qts)

 // {
 //    alert(co);
 //    alert(na);
 //    alert(qts); 

     
 // }

 $scope.ordertable=function(Sections){
  alert(Sections+"haaa");
  $scope.realtablename=Sections
  console.log($scope.realtablename);
  var tname=Sections
  $http.get("/orderedtable"+tname).success(function(response){
    console.log(response);

  var tabid=response[0].TableId;
  console.log(tabid);
  $http.get("/gettabid"+tabid).success(function(result){
    console.log(result);
    var kotid=result[0].KotNo;
    console.log(kotid);

  // $http.get("/getkotid"+kotid).success(function(response1){
  //  alert("uuuuuuuuu")
  //   console.log(response1);
  //              })  
  $http.get('/getnewkotid'+kotid).success(function(result9){
    console.log(result9);
      var kotlength=result9.length;
       var kotitemnamefetch=function(n)
       {
          if(n<kotlength)
          {
            $scope.kotitemcode=result9[n].ItemCode;
            $scope.itemqty=result9[n].qty;
            alert($scope.kotitemcode)
            alert(n);
            $http.get("/kotitemnamefetch"+$scope.kotitemcode).success(function(res1){
            console.log(res1)
            $scope.kotitemname=res1[0].ItemName;
            alert($scope.kotitemname)
            $scope.kotpush();
            kotitemnamefetch(n+1);
            })
            
          }//
       }//kotitemnamefetch
       kotitemnamefetch(0);

       })

        })
      })
   $scope.kotmama=null;
 kotlist=[];
  $scope.kotpush = function()
  {
      var obj9={};

      obj9["itemcode"]=$scope.kotitemcode;
      obj9["itemname"]=$scope.kotitemname;
      obj9["itemqty"]=$scope.itemqty;

      kotlist.push(obj9);
      console.log(kotlist);
      $scope.kotmama=kotlist;
      
      console.log($scope.kotmama[0].itemcode);
      console.log($scope.kotmama[0].itemname);
      console.log($scope.kotmama[0].itemqty);



  }

}
  $scope.myValue = true; //does not work
    $scope.myType =(typeof $scope.myValue);

 $scope.change=function(){
      
        alert("for table change")

        //var x = document.getElementById("myDialog").showModal();
        var x = document.getElementById("myDialog").showModal();
                         $scope.closeDialog = function() {
                                console.log("close function cald")
                           myDialog.close();
                            }


    }


$http.get("/changetable").success(function(response){
  console.log(response[0]._id.Tablename);
  $scope.ttnames=response;
  window.sessionStorage.setItem("ttttt",$scope.ttnames);
})

$scope.tttable=function(ttn){
  alert(ttn)

  $http.get("/changetable").success(function(response){
  console.log(response);
  $scope.tt=response;
  for(t=0;t<response.length;t++){
   $scope.ttid=response[t].TabId;
   console.log($scope.ttid);
}

})
}

$scope.changett=function(chan){
  alert(chan)
  var fortable=chan;

  $http.get("/foretable"+fortable).success(function(response){
  console.log(response);
   
  $scope.vinid=response[0].TableId;
  $scope.vintablename=response[0].TableName;
  console.log($scope.vintablename)
//  $scope.tt=response;
//    $scope.ttid=response[0].TabId;
//    console.log($scope.ttid);


})
}
 $scope.abhitable=function(){
   $window.location.reload();
  console.log($scope.vinid);
  console.log($scope.ttid);

    var alltables=$scope.ttid+","+$scope.vinid

    $http.put("/firstupdate"+alltables).success(function(response){
      console.log(response);
    })
    var alltab=$scope.ttid+","+$scope.vinid+","+$scope.vintablename;
$http.put("/secondupdate"+alltab).success(function(res){
      console.log(res);
    })

 

 }

   


    
  }])
///////////////////////////  FOR MAIN SALE ORDER///////////////
/////////////////// FOR MAIN SALE HTML////////////////////////


var app1=angular.module('myapp',[])
  app1.controller('mainsalectrl',['$scope','$http','$window',
    function($scope,$http,$window){     

var bills=[]; 
var waiterlist=[];
var allorder=[];
var shivaorder=[];
var sectionname = window.sessionStorage.getItem("sectionname");
   console.log(sectionname);
    $scope.tablename = window.sessionStorage.getItem("tabesname");
    console.log($scope.tablename);

      $scope.waitername = window.sessionStorage.getItem("waiternames");
     console.log($scope.waitername);
     
     var itemcode1 = window.sessionStorage.getItem("itemcodes");
   console.log(itemcode1);

      $scope.wholerate= window.sessionStorage.getItem("allrate");
        console.log( $scope.wholerate);



 // $scope.tabn=window.sessionStorage.getItem("ttttt");
 // console.log($scope.tabn);
 
$http.get("/runningtable").success(function(response){
  console.log(response[0]._id.Tablename);
  $scope.ttnames=response;
  console.log($scope.ttnames);
  window.sessionStorage.setItem("ttttt",$scope.ttnames);
})
 

 var tabls=[];

$scope.listtab=function(tabs){
   $scope.tableresult=null;
  alert(tabs);
  var nametab=tabs;
  $scope.listtablename=tabs;


$http.get("/runtables"+nametab).success(function(response){
  console.log(response);

  var tabsid=response[0].TabId
  console.log(tabsid);

$http.get("/machtab"+tabsid).success(function(result){
  console.log(result);
  var resuldate=result[0].KotDate;
     var dates=resuldate.split("T");
     var date1=dates[0];


  var resid=result[0].SectionId;

  var login = window.sessionStorage.getItem("loginres1")
  var both=resid+","+login
$http.get("/forsecid"+both).success(function(res){
  console.log(res);
  var sesname=res[0].SectionName;



    

     var obj={}


     obj["runtab"]=nametab;
     obj["resuldate"]=resuldate;
     obj["sesname"] = sesname;
     tabls.push(obj);
     $scope.tableresult=tabls;
     console.log($scope.tableresult)

     
  })  

})



})

}
 $scope.listtable=function(tabs){
  alert(tabs+"haaa");
  $scope.realtablename=tabs
  console.log($scope.realtablename);
  var tname=tabs
  $http.get("/orderedtable"+tname).success(function(response){
    console.log(response);

  var tabid=response[0].TableId;
  console.log(tabid);
  $http.get("/gettabid"+tabid).success(function(result){
    console.log(result);
    var kotid=result[0].KotNo;
    console.log(kotid);

  // $http.get("/getkotid"+kotid).success(function(response1){
  //  alert("uuuuuuuuu")
  //   console.log(response1);
  //              })  
  $http.get('/getnewkotid'+kotid).success(function(result9){
    console.log(result9);
      var kotlength=result9.length;
       var kotitemnamefetch=function(n)
       {
          if(n<kotlength)
          {
            $scope.kotitemcode=result9[n].ItemCode;
            $scope.itemqty=result9[n].qty;
            $scope.Kotno=result9[n].KotNo;
            alert($scope.kotitemcode)
            alert(n);
            $http.get("/kotitemnamefetch"+$scope.kotitemcode).success(function(res1){
            console.log(res1)
            $scope.kotitemname=res1[0].ItemName;
            alert($scope.kotitemname)
            $scope.kotpush();
            kotitemnamefetch(n+1);
            })
            
          }//
       }//kotitemnamefetch
       kotitemnamefetch(0);

       })

        })
      })
   $scope.kotmama=null;
 kotlist=[];
  $scope.kotpush = function()
  {
      var obj9={};

      obj9["itemcode"]=$scope.kotitemcode;
      obj9["itemname"]=$scope.kotitemname;
      obj9["itemqty"]=$scope.itemqty;
        obj9["itemkotno"]= $scope.Kotno;
      kotlist.push(obj9);
      console.log(kotlist);
      $scope.kotmama=kotlist;
      
      console.log($scope.kotmama[0].itemcode);
      console.log($scope.kotmama[0].itemname);
      console.log($scope.kotmama[0].itemqty);



  }

}


///////// MAIN BILL  CONCEPT////////////////////////



 

$http.get("/tabres").success(function(response){
  console.log(response);
  console.log(response.length);
  $scope.salerate=0;
  for(var n=0;n<response.length;n++)
  {
    console.log(response[n]._id.Table);
    $scope.tabname=response[n]._id.Table;
    console.log(response[n]._id.waitername);
    $scope.waname=response[n]._id.waitername;
    console.log(response[n].rate);
    console.log(response[n].qqq);
    var qunty=response[n].qqq
    console.log(qunty+"ggggggggggggg")
    $scope.salerate=response[n].rate;
    console.log($scope.salerate);
     $scope.waiterpush();
  }
})
//  var waiterlength=allresult.length;
//  var waitername=function(n)
//        {
//            if(n<waiterlength)
//            {
//              $scope.onlytables=response99[n]._id.Tablename;
//              alert($scope.onlytables);
//              $http.get("/idget"+$scope.onlytables).success(function(res1){
//              console.log(res1);
//              for(r=0;r<res1.length;r++)
//              {
//                     console.log(res1[r].TableId)
//                     var tabsid=res1[r].TableId
//                     $http.get("finaltab"+tabsid).success(function(result){
//                      console.log(result);
//                      // console.log(result[0]._id.kotno)

//                       for(l=0;l<result.length;l++)
//                            {
//                                 var kottno=result[l]._id.kotno
//                                 console.log(kottno);
                                
//                            }


//                     })
//              }
            
//              console.log(res1[0].WaiterName);
//              $scope.waitername=res1[0].WaiterName;

//              $scope.waiterpush();
//              waitername(n+1);
//              })
          
//            }//
//        }
//        waitername(0);





// }
// })
 $scope.waiterpush = function()
   {
    // alert("yash")
      var obj123={};
      console.log($scope.onlytables);
        console.log($scope.waitername);

        obj123["tablename"]=$scope.tabname;
        obj123["waitername"]=$scope.waname;
        obj123["allrateqty"]=$scope.salerate;

        shivaorder.push(obj123);
        $scope.shivanew=shivaorder;
        console.log($scope.shivanew);
      
      

 
  }


// $http.get("/billtable").success(function(response99){

//  console.log(response99[0])
   
//  $scope.onlytables=response99;
//  console.log($scope.onlytables);
//  console.log(response99.length);
//      var waiterlength=response99.length;
//  console.log( waiterlength);
// var waitername=function(n)
//        {
//            if(n<waiterlength)
//            {
//              $scope.onlytables=response99[n]._id.Tablename;
//              alert($scope.onlytables);
//              $http.get("/idget"+$scope.onlytables).success(function(res1){
//              console.log(res1);
//              for(r=0;r<res1.length;r++)
//              {
//                     console.log(res1[r].TableId)
//                     var tabsid=res1[r].TableId
//                     $http.get("finaltab"+tabsid).success(function(result){
//                      console.log(result);
//                      // console.log(result[0]._id.kotno)

//                       for(l=0;l<result.length;l++)
//                            {
//                                 var kottno=result[l]._id.kotno
//                                 console.log(kottno);
                                
//                            }


//                     })
//              }
            
//              console.log(res1[0].WaiterName);
//              $scope.waitername=res1[0].WaiterName;

//              $scope.waiterpush();
//              waitername(n+1);
//              })
          
//            }//
//        }
//        waitername(0);

// })

 
// $scope.waiterpush = function()
//   {
//    alert("yash")
//      var obj123={};
//      console.log($scope.onlytables);
//         console.log($scope.waitername);

//         obj123["tablename"]=$scope.onlytables;
//         obj123["waitername"]=$scope.waitername;

//         shivaorder.push(obj123);
//         $scope.shivanew=shivaorder;
//         console.log()
      
      

 
//   }

// $http.get("/billtable").success(function(response99){

//  console.log(response99[0])
   
//  $scope.onlytables=response99;
//  console.log($scope.onlytables);
//  console.log(response99.length);
//      var waiterlength=response99.length;
//  console.log( waiterlength);
// var waitername=function(n)
//        {
//            if(n<waiterlength)
//            {
//              $scope.onlytables=response99[n]._id.Tablename;
//              alert($scope.onlytables);
//              $http.get("/idget"+$scope.onlytables).success(function(res1){
//              console.log(res1);
//              for(r=0;r<res1.length;r++)
//              {
//                     console.log(res1[r].TableId)
//                     var tabsid=res1[r].TableId
//                     $http.get("finaltab"+tabsid).success(function(result){
//                      console.log(result);
//                      // console.log(result[0]._id.kotno)

//                       for(l=0;l<result.length;l++)
//                            {
//                                 var kottno=result[l]._id.kotno
//                                 console.log(kottno);
                                
//                            }


//                     })
//              }
            
//              console.log(res1[0].WaiterName);
//              $scope.waitername=res1[0].WaiterName;

//              $scope.waiterpush();
//              waitername(n+1);
//              })
          
//            }//
//        }
//        waitername(0);

// })

 
// $scope.waiterpush = function()
//   {
//    alert("yash")
//      var obj123={};
//      console.log($scope.onlytables);
//         console.log($scope.waitername);

//         obj123["tablename"]=$scope.onlytables;
//         obj123["waitername"]=$scope.waitername;

//         shivaorder.push(obj123);
//         $scope.shivanew=shivaorder;
//         console.log()
      
      

 
//   }
//////////////////////////for select row
$scope.setClickedRow=function(index,tname){

  alert(index); 
  alert(tname); 
  $scope.tablename=tname;
  $scope.index1=index;

  window.sessionStorage.setItem("tablename",$scope.tablename);
    }




    }]);



/////////////////////////// THIRD NG CONTROLLER/////////////////////

var app2=angular.module('myapp1',[])
  app2.controller('kotctrl',['$scope','$http','$window',
    function($scope,$http,$window){ 
      $scope.name="bababbababababaab";

     var arr=[];
      var date1 = new Date(((new Date().toISOString().slice(0, 23))+"-05:30")).toISOString();
       var a = date1.split("T");
      $scope.date = a[0];
      console.log($scope.date);
      $scope.date2={date1:new Date()};

 
 $scope.kot=window.sessionStorage.getItem("kot")
 console.log($scope.kot);

             // $scope.allresponse=window.sessionStorage.getItem("wholeres");
             // console.log($scope.allresponse);
             
             // obj["nanu"]=$scope.allresponse;
             // arr.push(obj);
             // $scope.allres=arr;
 

         $scope.codeall =window.sessionStorage.getItem("codeit");
         console.log($scope.codeall);

        $scope.qtyall = window.sessionStorage.getItem("qtyitem");
        console.log($scope.qtyall );
         $scope.nameall = window.sessionStorage.getItem("nameitem");
         console.log($scope.nameall);

    


 $scope.allres1= window.sessionStorage.getItem("allre")
$scope.qys=0;
  $scope.arrogant=JSON.parse($scope.allres1)
   console.log( $scope.arrogant)
   $scope.length= $scope.arrogant.length;
    for(q=0;q< $scope.length;q++)
    {  
      $scope.qys+=$scope.arrogant[q].qt1
      console.log($scope.qys)

    }




// $scope.yash=function()
// {
//  alert("alert")
// }

    }]);


///////////////////////////billing screen

var app3=angular.module('myapp2',[])
  app3.controller('billctrl',['$scope','$http','$window',
    function($scope,$http,$window){ 
      $scope.name="bababbababababaab";

  $scope.date2={date1:new Date()};


  $http.get("/billingtable").success(function(response){
  console.log(response[0]._id.Tablename);
  $scope.billtables=response;
  console.log($scope.billtables);
 
})
    
        $scope.tablename=window.sessionStorage.getItem("tablename");

$scope.billtable=function(tables){
  alert(tables+"haaa");
  $scope.realtablename=tables
  console.log($scope.realtablename);
  var tname=tables
  $http.get("/billtab"+tname).success(function(response){
    console.log(response);

  var tabid=response[0].TableId;
  console.log(tabid);
  $http.get("/gotabid"+tabid).success(function(result){
    console.log(result);
    var kotid=result[0].KotNo;
    console.log(kotid);

  // $http.get("/getkotid"+kotid).success(function(response1){
  //  alert("uuuuuuuuu")
  //   console.log(response1);
  //              })

  $http.get('/gotkotid'+kotid).success(function(result9){
    console.log(result9);
      var kotlength=result9.length;
      $scope.totalitems=kotlength;
      console.log($scope.totalitems);
      $scope.totalqty=0;
      $scope.totaluom=0;
      $scope.itemvaluetotal=0;  

       var billfetch=function(n)
       {
          if(n<kotlength)
          {
            $scope.kotitemcode=result9[n].ItemCode;
            $scope.itemqty=parseInt(result9[n].qty);


            $scope.totalqty+=$scope.itemqty;
            $scope.Kotno=result9[n].KotNo;
            alert($scope.kotitemcode)
            alert(n);
  $http.get("/kotitemnamefetch"+$scope.kotitemcode).success(function(res1){
            console.log(res1)
            $scope.kotitemname=res1[0].ItemName;
            console.log($scope.kotitemname);
            $scope.kotitemskuid=res1[0].ItemSKUID;
            console.log($scope.kotitemskuid);
 $http.get("kotitemskuid"+$scope.kotitemskuid).success(function(res12){
            console.log(res12)

            $scope.mrp=res12[0].rate.SaleRate;
            $scope.uom= res12[0].uom.BaseQty; 
            $scope.totaluom+=$scope.uom
            $scope.uomlcase=res12[0].uomid.UOM;


                $scope.itemvalue=$scope.itemqty*$scope.mrp
                $scope.itemvaluetotal+=$scope.itemvalue
            console.log($scope.mrp);
            alert($scope.kotitemname)
            $scope.kotpush();
            billfetch(n+1);
              })
             
            })
          }//
       }//kotitemnamefetch
       billfetch(0);

       })

        })
      })
   $scope.kotmama=null;
 kotlist=[];
  $scope.kotpush = function()
  {
      var obj9={};

      obj9["itemcode"]=$scope.kotitemcode;
      obj9["itemname"]=$scope.kotitemname;
      obj9["itemqty"]=$scope.itemqty;
        obj9["itemkotno"]= $scope.Kotno;
        obj9["uom"]     =$scope.uom;
        obj9["mrp"]= $scope.mrp;
        obj9["uomcase"]=$scope.uomlcase;
        obj9["itemvalue"]=$scope.itemvalue;
        obj9["totalitems"]=$scope.totalitems;
        obj9["totalqty"]=$scope.totalqty;
        obj9["totaluom"]=$scope.totaluom;
        obj9["itemvaluetotal"]=$scope.itemvaluetotal;
      kotlist.push(obj9);
      console.log(kotlist);
      $scope.kotmama=kotlist;
      
      console.log($scope.kotmama[0].itemcode);
      console.log($scope.kotmama[0].itemname);
      console.log($scope.kotmama[0].itemqty);



  }

}





}]);
