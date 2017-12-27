var myApp=angular.module('myApp',[]);
myApp.controller('IndexCntrl',['$scope','$http','$window',
function($scope,$http,$window){
    $scope.phoneNumbr = /^\+?\d{2}[- ]?\d{3}[- ]?\d{5}$/;

     $scope.mobile=function(mobile){
        var ph=mobile;
        console.log(ph);
        window.sessionStorage.setItem("ph",ph);
        alert(ph);

        if(mobile=="1111111111")
        {

            window.location.href="pos.html";
        }
        else if(mobile=="2222222222")
        {
            window.location.href="kichen.html";
        }

        else if(mobile=="3333333333")
        {
            window.location.href="counter.html";
        }


        else{

              var status1="NotSelected";
              var status2="Selected";
              var edit=mobile+","+status1+","+status2;
              alert(edit);
              $http.get('/orderlist'+edit).success(function(response)
              {
               $scope.orderlist=response;
               //alert("order list lenght is:"+$scope.orderlist.length);
               var orderlength=$scope.orderlist.length;
               //alert(orderlength);
               $scope.user.mobile=mobile;
               if(orderlength < 1)
               {
                 //alert("if block called");
                 $http.post('/item',$scope.user).success(function(response){
                 window.location.href="resttype.html";
               })
               }
               else {
                    //alert("else blocked called");
                    window.location.href="resttype.html";
                    }
              })

              }
 }

}]);

/////////////////////////////////CatCntrl//////////////////////////////

myApp.controller('CatCntrl',['$scope','$http','$window','$timeout',
function($scope,$http,$window,$timeout){
   /* var file=$scope.file.name;
    alert(file);*/
    console.log("HEllo from controller")
    var path="images/";
    var file="dosa.jpg";
    var data=path+file;
    //alert(data);

    $scope.thumbnail = [];
    // Read the image using the filereader
    $scope.fileReaderSupported = window.FileReader != null;
    $scope.photoChanged = function(files) {
      if (files != null) {
        var file = files[0];
        if ($scope.fileReaderSupported && file.type.indexOf('image') > -1) {
          $timeout(function() {
            var fileReader = new FileReader();
            fileReader.readAsDataURL(file); // convert the image to data url.
            fileReader.onload = function(e) {
              $timeout(function() {
                //alert(e.target.result)
                console.log(e.target.result)
                $scope.thumbnail.dataUrl = e.target.result; // Retrieve the image.
              });
             }
          });
        }
      }
    };
    //$scope.category=[];
   $scope.myFunction= function(){
    var x = document.getElementById("myFile").value;
    document.getElementById("demo").innerHTML = x;
    //var x="C:\path\dosa.jpg";
    var filename=x.replace(/\\/g, '/');
    /**/
    //alert(filename)
    var img=filename.split('/')
    var dirn=img[0];
    console.log(dirn);
    var foln=img[1];
    console.log(foln);
    var imgn=img[2];
    console.log(imgn);

}
    $scope.image=function(myFile)
    {
        var img=myFile;
        //alert(img)
        console.log(img)

       // alert($scope.myFile)
        //console.log($scope.myFile)
    //var image=$scope.img;
    }
    $scope.restname=function(name)
    {

         window.sessionStorage.setItem("Restname",name)
         console.log(name)
         var useph = window.sessionStorage.getItem("ph");
         var restadd=useph+","+name;
         console.log(restadd)
         alert(name)

//        $http.put('/restorder'+restadd).success(function(response)
//         {
//             console.log(response)
//         })


    }


//
//    $http.get('/category').success(function(response){
//        $scope.cat=response;
//        console.log($scope.cat)
//
//    });

         $http.get('/resttype').success(function(response){
         $scope.resttype=response;
         console.log($scope.resttype)
         });
    //var hotel = "Kamath Simply South";


    }]);
//////////////////MenuCntrl/////////////////////
myApp.controller('MenuCntrl',['$scope','$http','$window',
function($scope,$http,$window){
    $scope.category = [];
    var salname = null;
    var category1 = [];

    console.log("HEllo from controller")
    $scope.resname=window.sessionStorage.getItem("Restname")
    console.log($scope.resname)
   // console.log($scope.name)
    var resname = $scope.resname;
    console.log(resname)
//      $http.get('/resmenu/'+SaleCategoryName).success(function(response)
//        {
//      })
    $http.get('/1234'+$scope.resname).success(function(response)
        {
            console.log(response)
            $scope.category=response;
            console.log($scope.category)
        });

    $http.get('/img').success(function(response){
        $scope.imgdata=response;
        console.log($scope.imgdata);
        //alert($scope.resttype)
    });

    if($scope.name==resname)
        {
            alert(resname)
        $http.get('/restuname').success(function(response)
        {
            console.log(response)
            $scope.category=response;
            console.log($scope.category)
        })
    }

    //need to edittt
    $scope.images=
    [{
        'img':'images/dosa.jpg'
    },
    {
        'img':'images/plaindosa.jpg'
    },
    {
        'img':'images/setdosa.jpg'
    },
    {
        'img':'images/ravadosa.jpg'
    }]
    //alert(name)
    $scope.count=0;

    $scope.catName=function(SaleCategoryName)
    {
alert(SaleCategoryName)
        salname = SaleCategoryName;
        alert(salname)
       window.sessionStorage.setItem("itemname",salname)
        $http.get('/resmenu/'+SaleCategoryName).success(function(response)
        {
            var cat=response;
            console.log(cat)

//            console.log($scope.cat.length)
//            console.log($scope.cat[0].name)
//            console.log($scope.cat[1].section)
//            console.log($scope.cat[2].name)
//            console.log($scope.category[3].name)
////            alert(category1[0].name)
////            alert(category1[1].name)
////            alert(category1[2].name)
////            alert(category1[3].name)
       //$scope.category = category1;

//          console.log(JSON.stringify(response));
//       console.log("category",cat);

//            alert($scope.category[1].name)
//            alert($scope.category[2].name)
//            alert($scope.category[3].name)

        })
//        for(i=0;i<$scope.category.length;i++){
//            alert(scope.category[i].name)
//        }





    }
    //$scope.category=[];
    /*$scope.restname=function(name)
    {*/
       /* $http.get('/kamat').success(function(response)
        {
            console.log(response)
            $scope.category=response[0].cat;
            console.log($scope.category)
        })*/

    //}


/*myApp.controller('OrderCntrl',['$scope','$http','$window',
function($scope,$http,$window){

}]);*/
//its for sweets

  var itemtt=window.sessionStorage.getItem("itemname");
    console.log(itemtt)
     $http.get('/resmenu1'+itemtt).success(function(response)
        {

            console.log(response)
            $scope.caory=response;
         console.log( $scope.caory)
           console.log($scope.caory.itemType)
            console.log($scope.caory)
         $scope.quant=function(name,section)
      {
         //alert(name)
               window.sessionStorage.setItem("cname",name)
                     console.log(name)
              window.sessionStorage.setItem("csection",section)
                     console.log(section)
     }

         })


}])
//////////////////////////////////PosCntrl////////////////////////////////////////
myApp.controller('PosCntrl',['$scope','$http','$window',
function($scope,$http,$window)
{
var fixdec = 2;
var resname5 = [];
var restname4 = [];
var taxs =[];
var taxc =[];
var catitem = [];
var total = [];
$scope.subtol=0;
$scope.serchar=0;
$scope.total=0;
$scope.change=0;
$scope.afterDiscount=0;
$scope.totquant = 0;
// $scope.round = 0;
$scope.chargevalue=0;
$scope.discountamt=0;
$scope.discountval=0;
$scope.chargemaster1=[];
$scope.chargecountval=0;
$scope.chargeamt=0;
$scope.chargecountvalitem=0;
$scope.chargecountvaltot=0;
$scope.taxcgst=0;
$scope.taxsgst=0;
                $http.get('/1').success(function(response)
                {
                    console.log(response);
                    $scope.itemdetails = response
                    console.log($scope.itemdetails);
                })
                frefetch= window.sessionStorage.getItem("loginres1")
                console.log(frefetch+"fretcchhhhhhhhhhhh")
                $http.get('/freqadded'+frefetch).success(function(response)
                {
                    console.log("login id sent")
                    console.log(response);
                    $scope.frequently = response;
                    console.log($scope.frequently)
                })
                //POSLOGIN
                $scope.pos12login = [];
                $scope.posslogin=function(resid,username,password)
                {
                   console.log("welcome to restau"+resid)
                    $http.get('/poss'+resid).success(function(response)
                    {
                        console.log("login id sent")
                        console.log(response);
                        $scope.pos12login = response;
                        console.log($scope.pos12login[0].restaurant)
                        $scope.restaurant123 = $scope.pos12login[0].restaurant;
                        console.log($scope.restaurant123);
                    })//poss
                    //logindetailsssssssss
                    var login = $scope.username+","+$scope.password;
                    // var edit=mobileNo+","+sesdate+
                    $http.get('/logindetails'+login).success(function(response)
                    {
                      console.log(response);
                      console.log(response[0].password);
                      if(response[0].userName == "Manager" && response[0].password == $scope.password )
                      {
                        window.location.href="welcomepage.html";
                      }
                      else if(response[0].userName == "Posuser" && response[0].password == $scope.password )
                      {
                        window.location.href="pos0.html";
                      }
                      else
                      {
                        alert("Please Enter Correct Credentials11111")
                      }

                })//logindetails
              }//poslogin close
                ///this is for configuration master
                $http.get('/configurationmaster').success(function(response)
                {
                    console.log(response);
                    $scope.Taxinclusive = response[0].Taxexclusive;
                    //$scope.Taxinclusive = response[1].Taxexclusive;
                })
                var loginres = null;
                $scope.login1233=function(resid)
                {
                    //alert("gottttttttt")
                    console.log("welcome to restau"+resid.length)
                    if(resid.length == 6)
                    {
                      console.log(resid+"residddddddddddddddddddd")
                       if(resid <= 777777)
                       {
                        //alert("i got 6666666666666")
                        $http.get('/poss'+resid).success(function(response)
                        {
                            console.log("login id sent")
                            console.log(response);
                            $scope.login1234 = response;
                            console.log($scope.login1234[0].restaurant);
                            loginres = $scope.login1234[0].restaurant;
                            window.sessionStorage.setItem("loginres1",loginres)
                        })
                     }
                     else 
                     {
                       alert("please enter the valid Restaurant ID!!!!!!!!!!!")
                     }
                   }
                 }
                  loginres= window.sessionStorage.getItem("loginres1")
                  console.log(loginres)
                  $scope.loginresname = loginres;
                  $http.get('/1234'+loginres).success(function(response)
                  {
                    console.log(response)
                    $scope.category=response;
                    console.log($scope.category)
                  });
                $scope.getScoreData = function(SaleCategoryName)
                {   
                     $http.get('/resmenu2'+SaleCategoryName).success(function(response)
                     {
                         //alert(SaleCategoryName)
                         $scope.scname= SaleCategoryName;
                         console.log(response)
                         $scope.caory=response;
                         console.log($scope.caory)
                      })
                }
                $http.get('/postaxc',{params:{"name" : "cgst"}}).success(function(response)
                {
                   console.log(response)
                   $scope.taxc=response;
                   //console.log($scope.tax)
                   console.log($scope.taxc[0].Rate)
                   taxc123 = $scope.taxc[0].Rate;
                   //console.log(tax123)
                })
                $http.get('/postaxs',{params:{"name" : "sgst"}}).success(function(response)
                {
                    console.log(response)
                    $scope.taxs=response;
                    console.log($scope.taxc[0].Rate)
                    taxs123 = $scope.taxc[0].Rate;
                })
                $http.get('/getcardtype').success(function(response)
                {
                    console.log(response)
                    $scope.cardtype=response;
                })
                $scope.checkname = function(name,index)
                {
                   $http.get('/getComments'+name).success(function(response)
                   {
                       console.log(response)
                       $scope.catitem1[index].select = response ;
                   })
                }
                $scope.taxrateee = function(taxrate)
                {
                    alert("taxxxxxxxxxxxxxxxxxxxx"+taxrate)
                    $http.get('/postaxs'+taxrate).success(function(response)
                    {
                        console.log("kjhgfdsfghjklkjhgfds"+taxrate)
                        console.log(response)
                        $scope.taxgst=response;
                        console.log($scope.taxgst[1].Rate)
                        console.log($scope.taxgst[0].Rate)
                        $scope.taxcgst = $scope.taxgst[0].Rate;
                        $scope.taxsgst = $scope.taxgst[1].Rate;
                        console.log(typeof($scope.taxcgst))
                        $scope.quant1(name,section,count,$scope.taxcgst)
                    })
                  }
                  var rcreditcharge;
                  $scope.chargecountval=0;
                  $scope.credit = function(rcreditcharge)
                  {
                      alert("hjkhghjk"+rcreditcharge)
                      $http.get('/getchargesmas2222'+rcreditcharge).success(function(response)
                      {
                          console.log(rcreditcharge)
                          console.log(response);
                          var chargelength = response.length;
                          console.log(chargelength)
                          console.log(response[0].Taxable)
                          var taxable = response[0].Taxable;
                          if(taxable=="Yes")
                          {
                              console.log(response[0].ChargeValue)
                              $scope.chargecountvalitem = response[0].ChargeValue;
                              $scope.quant1(name,section,count)
                              alert("taxablee===yes")
                          }
                          else
                          {
                              alert("taxablee===nooo")
                              $scope.chargecountvaltot = response[0].ChargeValue;
                              console.log($scope.chargecountvaltot)
                              $scope.quant1(name,section,count)
                          }
                      })
                  }
                var discountDetails = function(name,section,count)
                {
                    $http.get('/getitemrate'+name).success(function(response)
                    {
                         //alert(name)
                         console.log(response)
                         $scope.chargemaster = response;
                         var rcharge =response[0].ChargeValue;
                         rcreditcharge =response[0].ChargeName;
                         console.log(response[0].ChargeValue)
                         $scope.credit(rcreditcharge)
                         var taxrate = response[0].withinstate;
                         console.log(taxrate)
                         $scope.taxrateee(taxrate,name,section,count);
                         if(rcharge!=undefined)
                         {
                              //$scope.chargemaster[0].ChargeValue =0;
                              //alert( $scope.chargemaster[0].ChargeValue)
                              console.log($scope.chargemaster[0].ChargeValue)
                              var charge2 =  $scope.chargemaster[0].ChargeValue;
                              console.log(charge2)
                              $http.get('/getchargesmas'+charge2).success(function(response)
                              {
                                  // alert(charge2)
                                  console.log(response);
                                  $scope.chargemaster = response;
                                  console.log($scope.chargemaster[0].ChargeValue)
                                  $scope.chargevalue=$scope.chargemaster[0].ChargeValue;
                                  $scope.discountval = $scope.chargemaster[0].ChargeValue;
                                  $scope.quant1(name,section,count)
                              })
                          }
                          else
                          {
                              $scope.discountval =0;
                              $scope.quant1(name,section,count)
                          }
                    })
                }
                var totalgst;
                var taxcgst;
                var taxsgst;
                var discountamt;
                var itemmmmmmm;
                var charge;
                var charge2;
                var count =0;
                var name2 = null;
                var salename = null;
                var salevalue = null;
                var salemethod = null;
                $scope.quant=function(name,section,count)
                {
                    if($scope.Taxinclusive=="Yes")
                    {
                        console.log("yes");
                        $scope.coninclusive(name,section,count);
                        console.log("inclusive")
                        //alert("inclusive")
                    }
                    else
                    {
                        console.log("no")
                        discountDetails(name,section,count)
                    }
                }
                $scope.quant1=function(name,section,count)
                {
                    console.log(name);
                    console.log($scope.chargecountvaltot)
                    console.log($scope.chargecountvalitem)
                    name2=name;
                    window.sessionStorage.setItem("cname",name)
                    //console.log(name)discountDetails(name)
                    //discountDetails(name2)
                    window.sessionStorage.setItem("csection",section)
                    //console.log(section)
                    console.log($scope.taxcgst)
                    console.log($scope.taxsgst)
                    $scope.numLimit = 5;
                    console.log($scope.chargecountval)
                    console.log(catitem)
                    console.log(catitem.length);
                    var itemlength=catitem.length;
                    console.log(itemlength)
                    if(itemlength==0)
                    {
                        console.log("frist time null")
                        var obj = {};
                        obj["name"] = name;
                        obj["section"] = section;
                        obj["count"] = count;
                        obj["saleChargeName"]= salename;
                        obj["saleChargeValue"]= salevalue;
                        obj["saleChargeMethod"]= salemethod; 
                        console.log(count)
                        total = count * section;
                        console.log(total)
                        console.log($scope.chargecountvalitem)
                        $scope.chargeamt = total*$scope.chargecountvalitem/100;
                        obj["chargeamt"] = $scope.chargeamt;
                        console.log($scope.chargeamt)
                        console.log($scope.discountval)
                        $scope.discountamt = total*$scope.discountval/100;
                        console.log($scope.discountamt);
                        obj["discountamt"] = $scope.discountamt;
                        // total -= $scope.discountamt;
                        console.log($scope.chargecountvalitem)
                        console.log(total)
                        console.log($scope.taxcgst)
                        taxcgst = total * $scope.taxcgst/100;
                        console.log(taxcgst)
                        obj["taxcgst"] = taxcgst;
                        console.log($scope.taxcgst)
                        console.log($scope.taxsgst)
                        taxsgst = total * $scope.taxsgst/100;
                        console.log(taxsgst)
                        obj["taxsgst"] = taxsgst;
                        console.log($scope.taxsgst)
                        console.log(total)
                        totalgst =  taxcgst + taxsgst;
                        obj["totalgst"] = totalgst;
                        console.log(totalgst)
                        console.log(total)
                        total = (total + $scope.chargeamt - $scope.discountamt + totalgst);
                        console.log(total)
                        obj["total"] = total;
                        catitem.push(obj);
                        $scope.catitem1 = catitem;
                        console.log($scope.catitem1)
                    }
                    else
                    {
                        console.log(itemlength)
                        for(i=0;i<itemlength;i++)
                        {
                           console.log(name)
                           console.log(catitem[i].name)
                           //alert(i)
                           if(name == catitem[i].name)
                           {
                               console.log("exists"+catitem[i].name)
                               var obj = {};
                               console.log(count)
                               console.log(catitem)
                               catitem[i].count += count;
                               console.log(catitem[i].count)
                               console.log(section)
                               total = catitem[i].count * section;
                               console.log(total)
                               catitem[i].total = total;
                               console.log(catitem)
                               console.log($scope.discountval)
                               $scope.discountamt = total*$scope.discountval/100;
                               console.log(total)
                               console.log($scope.discountamt)
                               catitem[i].discountamt=$scope.discountamt;
                               console.log($scope.chargecountvalitem)
                               $scope.chargeamt = total*$scope.chargecountvalitem/100;
                               console.log(total)
                               catitem[i].taxcgst = total * $scope.taxcgst/100;
                               console.log(catitem[i].taxcgst)
                               catitem[i].taxsgst = total * $scope.taxsgst/100;
                               console.log(catitem[i].taxsgst)
                               catitem[i].totalgst = catitem[i].taxcgst + catitem[i].taxsgst;
                               console.log( catitem[i].totalgst)
                               console.log($scope.chargeamt)
                               catitem[i].chargeamt = $scope.chargeamt;
                               console.log(catitem);
                               console.log(catitem[i].chargeamt)
                               console.log(total)
                               total =  (catitem[i].total + catitem[i].chargeamt - catitem[i].discountamt + catitem[i].totalgst ) ;
                               console.log(total)
                               catitem[i].total = total;
                               break;
                            }//if
                            else
                            {
                                if(name != catitem[i].name && i==itemlength-1)
                                {
                                    console.log("not exists")
                                    var obj = {};
                                    obj["name"] = name;
                                    obj["section"] = section;
                                    obj["count"] = count;
                                    obj["saleChargeName"]= salename;
                                    obj["saleChargeValue"]= salevalue;
                                    obj["saleChargeMethod"]= salemethod;
                                    total = count * section;
                                    console.log(total)
                                    $scope.discountamt = total*$scope.discountval/100;
                                    console.log($scope.discountamt);
                                    obj["discountamt"] = $scope.discountamt;
                                    $scope.chargeamt = total*$scope.chargecountvalitem/100;
                                    obj["chargeamt"] = $scope.chargeamt;
                                    console.log($scope.chargeamt)
                                    console.log(total)
                                    taxcgst = total * $scope.taxcgst/100;
                                    console.log(taxcgst)
                                    obj["taxcgst"] = taxcgst;
                                    console.log($scope.taxcgst)
                                    taxsgst = total * $scope.taxsgst/100;
                                    console.log(taxsgst)
                                    obj["taxsgst"] = taxsgst;
                                    console.log($scope.taxsgst)
                                    totalgst =  taxcgst + taxsgst;
                                    obj["totalgst"] = totalgst;
                                    total = (total + $scope.chargeamt - $scope.discountamt + totalgst);
                                    obj["total"] = total;
                                    catitem.push(obj);
                                    $scope.catitem1 = catitem;
                                }//if
                            }//else
                        }//for
                    }//else
                    //console.log("========================================="+catitem)
                    $scope.catitem1 = catitem;
                    console.log($scope.catitem1);
                    console.log($scope.catitem1.length);
                    var catlength = $scope.catitem1.length;
                    console.log(catlength)
                    $scope.subtol=0;
                    $scope.serchar=0;
                    $scope.total=0;
                    $scope.totquant = 0;
                    //$scope.itemsordered="";
                    //taxvalue for no
                    console.log(catlength)
                    for(n=0;n<catlength;n++)
                    {
                        // console.log($scope.catitem1[n].total);
                        $scope.subtol += parseInt($scope.catitem1[n].total);
                        console.log($scope.subtol)
                        //console.log($scope.catitem1[n].count);
                        $scope.totquant += parseInt($scope.catitem1[n].count);
                        //console.log($scope.totquant)
                        $scope.serchar=$scope.subtol*0.1;
                        //console.log($scope.serchar)
                        $scope.sercharc=$scope.subtol*taxc123/100;
                        //console.log($scope.sercharc)
                        $scope.serchars=$scope.subtol*taxs123/100;
                        // console.log($scope.serchars)
                        $scope.totGst = $scope.sercharc + $scope.serchars;
                        // console.log($scope.totGst)
                        $scope.total=$scope.serchar+$scope.subtol+$scope.totGst;
                        //console.log($scope.total)
                    }
                }//quant1
                var rcreditcharge;
                ///taxinctlsive stars from here
                $scope.coninclusive=function(name,section,count)
                {
                    // alert("exclusive cald"+name)
                    // $scope.discountDetails1 = function(name,section,count){
                    $http.get('/getitemrate'+name).success(function(response)
                    {
                        //alert(name)
                        console.log(response)
                        $scope.chargemaster = response;
                        var rcharge =response[0].ChargeValue;
                        rcreditcharge =response[0].ChargeName;
                        $scope.itemtypee = response[0].saleCategory;
                        console.log($scope.itemtypee)
                        // $scope.credit(rcreditcharge);
                        var taxrate=0;
                        taxrate = response[0].withinstate;
                        //console.log(taxrate)
                        console.log(taxrate)
                        $scope.taxcgst = 0;
                        $scope.taxsgst = 0;
                        $scope.taxgst=0
                        $http.get('/postaxs'+taxrate).success(function(response)
                        {
                            console.log(taxrate)
                            console.log("kjhgfdsfghjklkjhgfds"+taxrate)
                            console.log(response)
                            $scope.taxgst=response;
                            if($scope.taxgst!=null)
                            {
                                //alert("gst cald")
                                console.log($scope.taxgst[1].Rate)
                                console.log($scope.taxgst[0].Rate)
                                $scope.taxcgst = $scope.taxgst[0].Rate;
                                $scope.taxsgst = $scope.taxgst[1].Rate;
                                console.log(typeof($scope.taxcgst))
                                $scope.quant2(name,section,count,$scope.taxcgst,$scope.itemtypee)
                            }
                            else
                            {
                                console.log("else cald")
                                $scope.quant2(name,section,count,$scope.taxcgst,$scope.itemtypee)
                            }
                        })
                    })
                }//coninclusive
                $scope.quant2=function(name,section,count)
                {
                    $scope.chargeamt = 0;
                    $scope.discountamt =0;
                    var sgst=0;
                    var cgst=0;
                    var tot;
                    var totgstper =0;
                    console.log(name);
                    console.log($scope.itemtypee)
                    name2=name;
                    window.sessionStorage.setItem("cname",name)
                    //console.log(name)discountDetails(name)
                    //discountDetails(name2)
                    window.sessionStorage.setItem("csection",section)
                    //console.log(section)
                    console.log($scope.taxcgst)
                    cgst = parseInt($scope.taxcgst);
                    console.log(cgst)
                    sgst = parseInt($scope.taxsgst);
                    console.log(sgst)
                    tot = cgst+sgst;
                    totgstper = tot/100;
                    console.log(total);
                    console.log(totgstper)
                    $scope.numLimit = 5;
                    console.log($scope.chargecountval)
                    //console.log($scope.chargemaster1)
                    console.log(catitem)
                    console.log(catitem.length);
                    var itemlength=catitem.length;
                    console.log(itemlength)
                    if(itemlength==0)
                    {
                        var obj = {};
                        obj["name"] = name;
                        obj["section"] = section;
                        obj["count"] = count;
                        obj["saleChargeName"]= salename;
                        obj["saleChargeValue"]= salevalue;
                        obj["saleChargeMethod"]= salemethod;
                        total = count * section;
                        console.log(total)
                        console.log(totgstper)
                        var hiddenvale = 0;
                        hiddenvale = total/(1+totgstper);
                        //alert(hiddenvale)
                        console.log(hiddenvale)
                        var itemvalue = 0;
                        itemvalue = total-hiddenvale;
                        console.log(itemvalue)
                        //var htotal =  total * totgstper;
                        //console.log(htotal)
                        var  taxcgst = itemvalue/2;
                        console.log(taxcgst)
                        var  taxsgst = itemvalue/2;
                        console.log(taxsgst)
                        //taxsgst = total * $scope.taxsgst/100;
                        //console.log(ide)
                        // obj["taxsgst"] = taxsgst.toFixed(fixdec);
                        // obj["taxcgst"] = taxcgst.toFixed(fixdec);
                        // obj["totalgst"] = itemvalue.toFixed(fixdec);
                        obj["taxsgst"] = taxsgst;
                        obj["taxcgst"] = taxcgst;
                        obj["totalgst"] = itemvalue;
                        obj["chargeamt"] = $scope.chargeamt;
                        obj["discountamt"] = $scope.discountamt;
                        obj["positemtype"] = $scope.itemtypee;
                        console.log($scope.itemtypee);
                        total = (hiddenvale + itemvalue);
                        console.log(total)
                        // obj["total"] = total.toFixed(fixdec);
                        obj["total"] = total;
                        catitem.push(obj);
                        console.log(catitem)
                        $scope.catitem1 = catitem;
                        calculation();
                    }
                    else
                    {
                        console.log(itemlength)
                        for(i=0;i<itemlength;i++)
                        {
                            console.log(name)
                            console.log(catitem[i].name)
                            //alert(i)
                            if(name == catitem[i].name)
                            {
                                console.log("exists"+catitem[i].name)
                                var obj = {};
                                console.log(count)
                                console.log(catitem)
                                catitem[i].count += count;
                                console.log(catitem[i].count)
                                console.log(section)
                                total = catitem[i].count * section;
                                console.log(total)
                                console.log(totgstper)
                                var htotal =  total * totgstper;
                                console.log(htotal)
                                var hiddenvale = 0;
                                hiddenvale = total/(1+totgstper);
                                // alert(hiddenvale)
                                console.log(hiddenvale)
                                var itemvalue = 0;
                                //item value is total gst ---valueee
                                itemvalue = total-hiddenvale;
                                console.log(itemvalue)
                                console.log("welcome")
                                var taxcgst  = itemvalue/2;
                                var taxsgst  = itemvalue/2;
                                //taxcgst = total * $scope.taxcgst/100;
                                catitem[i].taxcgst = taxcgst;
                                console.log(catitem[i].taxcgst)
                                //  catitem[i].taxsgst = taxsgst.toFixed(fixdec);
                                catitem[i].taxsgst = taxsgst;
                                console.log(catitem[i].taxsgst)
                                catitem[i].totalgst = itemvalue;
                                console.log(catitem[i].totalgst);
                                catitem[i].discountamt = $scope.discountamt;
                                catitem[i].chargeamt = $scope.chargeamt;
                                console.log(htotal)
                                catitem[i].total = itemvalue + hiddenvale;
                                console.log(catitem[i].total);
                                calculation();
                                break;
                            }
                            else
                            {
                                if(name != catitem[i].name && i==itemlength-1)
                                {
                                    //alert("newcreation if length>0+++++++++"+catitem[i].name+name)
                                    console.log("not exists")
                                    var obj = {};
                                    obj["name"] = name;
                                    obj["section"] = section;
                                    obj["count"] = count;
                                    obj["saleChargeName"]= salename;
                                    obj["saleChargeValue"]= salevalue;
                                    obj["saleChargeMethod"]= salemethod;
                                    total = count * section;
                                    console.log(total)
                                    console.log(totgstper)
                                    var hiddenvale = 0;
                                    hiddenvale = total/(1+totgstper);
                                    //alert(hiddenvale)
                                    console.log(hiddenvale)
                                    var itemvalue = 0;
                                    itemvalue = total-hiddenvale;
                                    console.log(itemvalue)
                                    var  taxcgst = itemvalue/2;
                                    console.log(taxcgst)
                                    var  taxsgst = itemvalue/2;
                                    console.log(taxsgst)
        //                          taxsgst = total * $scope.taxsgst/100;
        //                          console.log(taxsgst)
                //                  console.log($scope.taxsgst)
                //                  totalgst = sgst + cgst;
                //                  var totgst;
                //                  totgst = totalgst/100;
                //                  totalgst = totgst;
                //                  console.log(totalgst/100)
                //                  var itemhideen = totalgst/100;
                //                  console.log(itemhideen)
                //                  var ihr = total - itemhideen;
                //                  console.log(ihr)
                //                  var ide = ihr + itemhideen;
                //                  console.log(ide)
                          //        obj["taxsgst"] = taxsgst.toFixed(fixdec);
                          //        obj["taxcgst"] = taxcgst.toFixed(fixdec);
                          //        obj["totalgst"] = itemvalue.toFixed(fixdec);
                                    obj["taxsgst"] = taxsgst;
                                    obj["taxcgst"] = taxcgst;
                                    obj["totalgst"] = itemvalue;
        //                          var htotal1 =  total - totalgst;
        //                          var htotal =  total - totalgst;
        //                          console.log(htotal)
        //                          $scope.chargeamt = htotal*$scope.chargecountvalitem/100;
                                    obj["chargeamt"] = $scope.chargeamt;
                                    obj["discountamt"] = $scope.discountamt;
                                    total = (hiddenvale + itemvalue);
                                    console.log(total)
                                    obj["positemtype"] = $scope.itemtypee;
                                    console.log($scope.itemtypee);
                                    obj["total"] = total;
                                    catitem.push(obj);
                                    $scope.catitem1 = catitem;
                                    calculation();
                                }
                            }//else
                        }//for
                    }//else
                    $scope.itemcount = function(count,name,section)
                    {
                    //console.log(catitem);
                       // alert(count)
                        alert("count itemcount 2")
                        console.log(name,section)
                        var obj = {};
                        var countlength = catitem.length;
                        for(i=0;i<countlength;i++)
                        {
                            console.log(name)
                            // var array = [];
                            // var index = $scope.array.indexOf(item);
                            // $scope.array.splice(index, 1);
                            //alert(name)
                            if(name == catitem[i].name)
                            {
                                console.log(catitem[i].name)
                                console.log(catitem[i].count)
                                catitem[i].count -= count;
                                console.log(catitem[i].count)
                                total =  catitem[i].count * section;
                                console.log(total)
                                var htotal =  total * totgstper;
                                console.log(htotal)
                                var hiddenvale = 0;
                                hiddenvale = total/(1+totgstper);
                                // alert(hiddenvale)
                                console.log(hiddenvale)
                                var itemvalue = 0;
                                //item value is total gst ---valueee
                                itemvalue = total-hiddenvale;
                                console.log(itemvalue)
                                // catitem[i].totalgst = itemvalue.toFixed(fixdec);
                                catitem[i].totalgst = itemvalue;
                                var taxcgst  = itemvalue/2;
                                var taxsgst  = itemvalue/2;
                                catitem[i].taxcgst = taxcgst;
                                //  catitem[i].taxsgst = taxsgst.toFixed(fixdec);
                                catitem[i].taxsgst = taxsgst;
                                catitem[i].total = total;
                                // alert(catitem1[i].count);
                                console.log(catitem[i].count)
                                if(catitem[i].count == 0)
                                {
                                    var index = catitem.indexOf(catitem[i]);
                                    alert(index);
                                    catitem.splice(index, 1);
                                    $scope.catitem1 = catitem;
                                    console.log($scope.catitem1);
                                }
                                    console.log($scope.catitem1.length);
                                    if($scope.catitem1.length == 0)
                                    {
                                      $scope.subtol1=0;
                                      $scope.gst=0;
                                      $scope.decimals=0;
                                    }
                                    var catlength = $scope.catitem1.length;
                                    console.log(catlength)
                                    $scope.subtol=0;
                                    $scope.serchar=0;
                                    $scope.total=0;
                                    $scope.totGst = 0;
                                    $scope.totquant = 0;
                                    console.log(catlength)
                                    for(q=0;q<$scope.catitem1.length;q++)
                                    {
                                        console.log($scope.catitem1);
                                        $scope.subtol += parseInt($scope.catitem1[q].total);
                                        console.log($scope.subtol)
                                        //console.log($scope.catitem1[n].count);
                                         $scope.totquant += parseInt($scope.catitem1[q].count);
                    //                  console.log($scope.catitem1)
                    //                  console.log($scope.catitem1[n])
                    //                  $scope.serchar=$scope.subtol*0.1;
                    //                  $scope.sercharc=$scope.subtol*taxc123/100;
                             //         console.log($scope.sercharc)
                    //                  $scope.serchars=$scope.subtol*taxs123/100;
                            //          console.log($scope.serchars)
                                        $scope.totGst = catitem[q].totalgst;
                                        console.log($scope.totGst)
                                        $scope.total=$scope.subtol;
                                        console.log($scope.total)
                                        calculation();
                                    }//for
                                    return;
//                                }//if
                            }//if
                        }//for
                    } //itemcount
                }//quant2
var calculation = function(){
                  $scope.gst=0;
                  var dem=0;
                  $scope.catitem1 = catitem;
                  console.log($scope.catitem1);
                  console.log($scope.catitem1.length);
                  var catlength = $scope.catitem1.length;
                  console.log(catlength)
                  $scope.subtol=0;
                  $scope.subtol1=0;
                //  $scope.round=0;
                  $scope.serchar=0;
                  $scope.total=0;
                  $scope.totquant = 0;
    //            $scope.gst = 0;
                  for(var n=0;n<$scope.catitem1.length;n++)
                  {
                  // alert(catlength)
                  console.log($scope.catitem1[n].total);
                  $scope.subtol += parseInt($scope.catitem1[n].total);
                  console.log($scope.subtol)
                  $scope.totquant += parseInt($scope.catitem1[n].count);
                  console.log($scope.catitem1[n].totalgst)
                  console.log($scope.catitem1[n].totalgst)
                  dem +=parseFloat($scope.catitem1[n].totalgst);
                  console.log(dem)
//                alert(catlength)
                  $scope.gst += parseFloat($scope.catitem1[n].totalgst);
                  console.log($scope.gst)
                  $scope.subtol1 = $scope.subtol - $scope.gst;
                  console.log($scope.subtol1)
                   console.log(catlength)
                  $scope.itemlength=catlength;
//                $scope.totGst = tota;
//           //   console.log($scope.totGst)
                  //$scope.round = $scope.subtol;
                  $scope.total=$scope.subtol;
                  $scope.finalNetAmount($scope.total);
                  console.log($scope.total)
                    $scope.itemtotal = $scope.total;
                  }
}                 /////endddddddddddd
                  $scope.myFunc = function(amount) {
           //     alert(amount);
                  $scope.change = amount - $scope.newfinaltotal;
                  console.log(amount - $scope.newfinaltotal)
                  console.log($scope.change)
            }
            //////////////round off//////
      $scope.finalNetAmount = function (value){
         //alert("i got a final call");
         console.log($scope.roundOffMethod);
         console.log( $scope.roundOffValue);
        if($scope.roundOffValue !=0){
      //var value = 11.99;
      var n = 0;
      var roundoff = $scope.roundOffValue ;
      var modulus = value %  roundoff;

      if( $scope.roundOffMethod == "Nearest"){
          if( modulus > ( roundoff/2)){
             n= Math.ceil(value/roundoff) *  roundoff;
           }else{
             n= Math.floor(value/roundoff) *  roundoff;
           }
      }else if($scope.roundOffMethod == "Lower"){
           n= Math.floor(value/ roundoff) *  roundoff;

      }else if($scope.roundOffMethod == "Upper"){
         n= Math.ceil(value/ roundoff) *  roundoff;
      }
     if(n > value){
        $scope.decimals = Math.abs(modulus -roundoff);
        console.log($scope.decimals)
        window.sessionStorage.setItem("roundvalue",$scope.decimals);
        $scope.decimals = parseFloat ($scope.decimals).toFixed(fixdec);
        $scope.total = parseFloat (n).toFixed(fixdec);
        console.log($scope.total)
      }else if(n < value){
        // $scope.decimals = modulus -roundoff;
         $scope.decimals = n - value ;
         console.log($scope.decimals);
         $scope.decimals = parseFloat ($scope.decimals).toFixed(fixdec);
         $scope.total = parseFloat (n).toFixed(fixdec);
      }else if(n == value){
        $scope.decimals = 0;
        console.log($scope.decimals)
        window.sessionStorage.setItem("roundvalue",$scope.decimals);
        $scope.total = parseFloat (n).toFixed(fixdec);
      }
    }else{
        $scope.total = value;
    }
}
///////////end///////////////
//round config///////
$http.get('/roundOffConfiguration').success(function(response){
    console.log(response);
    $scope.roundOffMethod = response[0].roundOffMethod ;
    $scope.roundOffValue = response[0].roundOffValue ;
    console.log($scope.roundOffMethod);
    console.log( $scope.roundOffValue);
    //alert(" confi here")
  })
      console.log($scope.catitem1);
  
  $scope.chargenumber = null;
       $scope.poscart=function(mobile,catitem1,newfinaltotal,totquant,serchar,sercharc,serchars,gst,subtol,myVar,change,sesdate,session,totalgst,decimals,newmulticharge){
         $scope.newnewcharge = newmulticharge;
                 window.sessionStorage.setItem("mooob", mobile)
                 var restbill = window.sessionStorage.getItem("loginres1")
                 var cgst = gst/2;
                 var sgst = gst/2;
                 //console.log(mobile,catitem1,subtol,totquant,serchar,sercharc,serchars,gst,total,myVar,$scope.change,session,sesdate);
                 var rschange = $scope.change;
                 console.log(catitem1.length)
                 var catlen = catitem1.length
                 var lenCheck = 0 ;
                 console.log(catitem1)
                 //  var poscartt =mobile+","+catitem1[i].name+","+catitem1[i].section+","+catitem1[i].count+","
                 //   for(i=0;i<catlen;i++){
//              retrivedata(function(){
                 var processItems = function(i){
                   if( i < catlen ) {
                       //console.log(catitem1[i].saleChargeName);
                         var hidtot;
                          lenCheck = i;
                         hidtot = catitem1[i].total - catitem1[i].totalgst;
                         var poscartt =mobile+","+catitem1[i].name+","+catitem1[i].section+","+catitem1[i].count+","+catitem1[i].total+","+newfinaltotal+","+totquant+","+serchar+","+cgst+","+sgst+","+gst+","+subtol+","+myVar+","+i+","+catitem1[i].selected+","+rschange+","+change+","+sesdate+","+session+","+restbill+","+catitem1[i].positemtype+","+hidtot+","+catitem1[i].totalgst+","+lenCheck+","+catlen+","+decimals;
                         console.log(poscartt);
                         $http.post('/postcart'+poscartt).success( function(res) {
                          console.log(res);
                           if (i ==  catlen -1) {                
                             $window.location = "invoice.html"
                           }
                             processItems(i+1);
                             // i = i+1
                             console.log(res);
                           if(i==0)
                             {
                            console.log(res._id)
                            $scope.idfind = res._id;
                            idfind($scope.idfind)
                            }
                         })
                     
                }//for
              };
//        });

processItems(0);
         

var idfind = function(idfind){
  console.log(idfind);
  alert("hai")
  console.log(newmulticharge)
  console.log(newmulticharge.length);
                              for(var s = 0;s<newmulticharge.length;s++)
                                {
                                  //console.log(res._id)
                                  alert(s)
                               console.log(newmulticharge[s].salechargeName);
                               console.log(newmulticharge[s].salechargeMethod);
                               console.log(newmulticharge[s].applicableCharge);
                               var itemcharge  =newmulticharge[s].salechargeName+","+newmulticharge[s].salechargeMethod+","+newmulticharge[s].applicableCharge+","+idfind;
                                  console.log(idfind)
                                  console.log(itemcharge)
                                  $http.put('/chargesonitem'+itemcharge).success(function(result){
                                    console.log(result)
                                    
                                  })
                                }
  
}
          
           //window.location.reload();
//         }//close
//         retrivedata(newmulticharge)
//         function retrivedata(newmulticharge){
//          alert("hai")
//          $http.get('/fetchitemid').success(function(response){
//            console.log(response);     
//            console.log(newmulticharge.length);
//          for(var s = 0;s<newmulticharge.length;s++)
//          {
//         alert(s)
//         console.log(newmulticharge[s].salechargeName);
//         console.log(newmulticharge[s].salechargeMethod);
//         console.log(newmulticharge[s].applicableCharge);
//         var itemcharge  =newmulticharge[s].salechargeName+","+newmulticharge[s].salechargeMethod+","+newmulticharge[s].applicableCharge;
//         console.log(itemcharge)
//         $http.put('/chargesonitem'+itemcharge).success(function(result){
//          console.log(result)
//           })
//           } 
//           })
//           }
//           }//close
       
//       $scope.addcharge = function(newmulticharge)
//       {
//         alert(newmulticharge)
//         console.log(newmulticharge);
//         console.log($scope.chargenumber )
//       }
}//close

/////////////charges/////////////
var salecharge = "Sale";
var multicharge = [];
$scope.newfinaltotal=0;
$http.get('/getChargedetails'+salecharge).success(function(response){
  console.log(response)
  $scope.getsaledetails = response;
  $scope.sale = function(sale){
  alert(sale)
    for(let s=0;s<$scope.getsaledetails.length;s++)
   {
     if($scope.getsaledetails[s].chargeName == sale)
     {
          var object9={};
          var a=0;
          console.log($scope.getsaledetails[s].Editable);
          var addsub = $scope.getsaledetails[s].AddSub;
          var chargeMethod = $scope.getsaledetails[s].ChargeMethod;
          var chargeValue = $scope.getsaledetails[s].ChargeValue;
          console.log(addsub+"addsub");
          console.log(chargeMethod+"chargemethod");
          console.log(chargeValue +"chargevalue");
          console.log($scope.getsaledetails[s].chargeName);
          console.log($scope.getsaledetails[s].ChargeValue);
          $scope.salechargeName = $scope.getsaledetails[s].chargeName;
          $scope.salechargevalue = $scope.getsaledetails[s].ChargeValue;
          $scope.salechargemethod = $scope.getsaledetails[s].ChargeMethod;
          $scope.oldtotal = parseInt($scope.total);
          var oldoldtot = parseInt($scope.total);
          var oldtotquant = parseInt($scope.totquant)
          console.log(typeof($scope.totquant));
          console.log(typeof(oldtotal));
       if(addsub == "Add")
         {
           alert("add")
           if($scope.getsaledetails[s].Editable == true)
             {
               alert("edit call")
               $scope.edit=false;
               $scope.eidtfun=function(salechargevalue){
                 alert("editfunction")
                 var chargeValue = parseInt(salechargevalue)
                 console.log($scope.getsaledetails[s].chargeName);
                 if(chargeMethod == "Amount")
                   {
                     alert("Amount")
                     $scope.applicableCharge = chargeValue;
                     alert($scope.applicableCharge);
                   }
               if(chargeMethod == "PerUnit")
                   {
                     alert("PerUnit")
                     $scope.applicableCharge=(oldtotquant*chargeValue);
                     alert($scope.applicableCharge);
                   }
               if(chargeMethod == "Percent")
                   {
                     alert("Percent")
                     $scope.applicableCharge =(oldoldtot*(chargeValue/100));
                     alert($scope.applicableCharge);
                   }
                  console.log($scope.newmulticharge);
                 var x = 0;
                 for(var n = 0;n<$scope.newmulticharge.length;n++)
                   { 
                      x++;
                      if (x == $scope.newmulticharge.length)
                        {
                      console.log(parseInt($scope.newmulticharge[n].salechargevalue));
                      alert("inside edit function");
                      $scope.oldtotal= ($scope.oldtotal+$scope.applicableCharge)-$scope.newmulticharge[n].salechargevalue
                        }
//                     break;
                   }
                    console.log($scope.oldtotal)
                    $scope.newfinaltotal = $scope.oldtotal;
                    alert($scope.applicableCharge+"with in  editttt");
                        
               }//editfun
                if(chargeMethod == "Amount")
                   {
                     alert("Amount")
                     $scope.applicableCharge = chargeValue;
                     alert($scope.applicableCharge);
                   }
               if(chargeMethod == "PerUnit")
                   {
                     alert("PerUnit")
                     $scope.applicableCharge=(oldtotquant*chargeValue);
                     alert($scope.applicableCharge);
                   }
               if(chargeMethod == "Percent")
                   {
                     alert("Percent")
                     $scope.applicableCharge =(oldoldtot*(chargeValue/100));
                     alert($scope.applicableCharge);
                   }
               
             }//true
           if($scope.getsaledetails[s].Editable == false)
             {
               alert("non editable call");
                $scope.edit=true;
                   if(chargeMethod == "Amount")
                   {
                     alert("Amount")
                     $scope.applicableCharge = chargeValue;
                     alert($scope.applicableCharge);
                    }
                    if(chargeMethod == "PerUnit")
                    {
                      alert("PerUnit")
                      $scope.applicableCharge=(oldtotquant*chargeValue);
                      alert($scope.applicableCharge);
                    }
                    if(chargeMethod == "Percent")
                    {
                     alert("Percent")
                     $scope.applicableCharge =(oldoldtot*(chargeValue/100));
                     alert($scope.applicableCharge);
                    }
               
             }//edit falseeee
                     object9["salechargeName"]=$scope.salechargeName;
                     object9["salechargevalue"]=$scope.salechargevalue;
                     object9["applicableCharge"]=$scope.applicableCharge;
                     object9["isEditable"] = $scope.getsaledetails[s].Editable;
                     object9["salechargeMethod"]= $scope.salechargemethod;
                     multicharge.push(object9);
                     $scope.newmulticharge = multicharge;
                     console.log(multicharge);
                     alert(multicharge.length)
                     parseInt(multicharge.applicableCharge)
                     for(var w=0; w<multicharge.length;w++)
                    {
                      console.log($scope.oldtotal)
                      //$scope.oldtotal = oldoldtot;
                      $scope.oldtotal+= parseInt(multicharge[w].applicableCharge);   
                      alert($scope.oldtotal+"chargecalcu")
                      console.log($scope.oldtotal)
                      $scope.newfinaltotal = $scope.oldtotal;
                      //break;
                    }
                     alert($scope.oldtotal);
                 // }//applicablecharge
              }//add
       else if(addsub == "Sub")
         { 
          alert("sub")
         }

              $scope.newfinaltotal = $scope.oldtotal;
              alert($scope.newfinaltotal+"final")
     }//if
   }//for
  }//sale function
});//getChargedetails

    $scope.myValue = true; //does not work
    $scope.myType =(typeof $scope.myValue);
    $scope.logIt=function(){
        $scope.myType =(typeof $scope.myValue);
        alert("doneeee")

        //var x = document.getElementById("myDialog").showModal();
        var x = document.getElementById("myDialog").showModal();
                         $scope.closeDialog = function() {
                                console.log("close function cald")
                           myDialog.close();
                            }


    }
          var billrep = null;
          var restaurant = null;
          var taxc123 = null;
          var taxs123 = null;
      $scope.confirmpaid=function(mobileNo,session,sesdate,sercharc,serchars,totGst,total)
      {
        // alert(mobileNo,session,sesdate)
           alert(sercharc,serchars,totGst,total)
          var restttname = window.sessionStorage.getItem("loginres1")
         console.log(restttname)
      var edit=mobileNo+","+sesdate+","+session+","+restttname+","+"Paid";

          console.log(edit);
$http.put('/orderstatus'+edit).success(function(response)
         {
             console.log(response)
         })
//        }

          var restorepage = document.body.innerHTML;
           //var contents = document.getElementById("printarea").innerHTML;
        var contents = "<html><head></head<title><h1>Welcome to"+restttname+"</h1><h3>Ittegi Road Dharwad, ph:-12345  </h3><h3>Cash Bill</h3></title>"
        window.sessionStorage.setItem("restname",restttname);

       contents = contents + "</head><body>"
        //contents = contents+document.getElementById("printarea").innerHTML;
       contents=contents+"<table class=\"table table-striped\"><thead><tr><th>SL NO</th><th>Item Name</th><th>Quantity</th><th>Value</th></tr></thead>";
       var i=0;
       alert($scope.list.length)
        for(i=0;i<$scope.list.length;i++)
        {
            console.log("welcome")
            contents = contents+"<tr >;&nbsp"
            contents = contents+"<td>"+(i+1)+"</td>&nbsp"
            contents = contents+"<td>"+$scope.list[i].name+"</td>&nbsp"
            contents = contents+"<td>"+$scope.list[i].quan+"</td>&nbsp"
             contents = contents+"<td>"+$scope.list[i].total+"</td>&nbsp"

                      }

       contents = contents +"</body></html>"
           //contents = contents+"<td>+--------------------------------+</td>"
contents=contents+"<table class=\"table table-striped\"><thead><tr><th>Subtotal</th> <br> <th>Service charge</th> <br> <th>cgst</th> <br> <th>sgst</th> <br> <th>totalgst</th> <br> <th>Total</th></tr></thead>";

contents = contents+"<tr >";
           contents = contents+"<td>"+$scope.subtol+"</td>&nbsp"
           contents = contents+"<td>"+$scope.serchar+"</td>&nbsp"
           contents = contents+"<td>"+$scope.sercharc+"</td>&nbsp"
           contents = contents+"<td>"+$scope.serchars+"</td>&nbsp"
           contents = contents+"<td>"+$scope.totGst+"</td>&nbsp"
           contents = contents+"<td>"+$scope.total+"</td>&nbsp"

        document.write('<html><head><title>Print</title>');
        document.write('</head><body>');
        document.write(contents);
        document.write('</body></html>');
          console.log(contents)
          //$scope.content = contents;

          $http.post('/prn').success(function(response){
                alert("saved successfully");
                   console.log("in save button");
                  console.log(response);

             })


        return true;

           }


     $scope.logress =  window.sessionStorage.getItem("loginres1")
      console.log($scope.logress)
//      var mobb3 = window.sessionStorage.getItem("ph");
//    console.log(mobb3);

        var mobno =    window.sessionStorage.getItem("ph");
         console.log(mobno)
         var kmorder  = $scope.logress;
         console.log(kmorder)
         $http.get('/kamatorderlist'+kmorder).success(function(response)
        {
             console.log(response)
             $scope.orderlist=response;
             var billorder =  $scope.orderlist;
             console.log($scope.orderlist[0].restaurant)
             $scope.rest12222 = $scope.orderlist[0].restaurant;
             console.log($scope.rest12222)
             console.log(billorder[0].restaurant)
            })


         $scope.Payment=function(mobileNo)
      {
             console.log(mobileNo);
             $scope.mobble = mobileNo;
var logresspay =  window.sessionStorage.getItem("loginres1")
      console.log(logresspay)

        //tax
        $http.get('/postaxc',{params:{"name" : "cgst"}}).success(function(response)
        {
            console.log(response)
         $scope.taxc=response;
            //console.log($scope.tax)
          console.log($scope.taxc[0].Rate)
             taxc123 = $scope.taxc[0].Rate;
            //console.log(tax123)
            })

             $http.get('/postaxs',{params:{"name" : "sgst"}}).success(function(response)
        {
            console.log(response)
         $scope.taxs=response;
            //console.log($scope.tax)
         console.log($scope.taxc[0].Rate)
          taxs123 = $scope.taxc[0].Rate;
            //console.log(tax123)
            })

             console.log(mobileNo)
              window.sessionStorage.setItem("ressnumber",mobileNo)
            var res = [];
             var restname4 = [];
             var redit=mobileNo+","+logresspay;
             console.log(redit)
             console.log(kmorder)

             $http.get('/kamatorderlistmob'+redit).success(function(response)
        {
        console.log(response)
         $scope.data=response;


              console.log($scope.data[0].item)
        $scope.list=$scope.data[0].item;
        //alert($scope.list)
        console.log($scope.list)
        var ilength=$scope.list.length;



//         console.log("Length is"+$scope.orderdetails[0].item[0].name);
//         console.log($scope.orderdetails.length);
//        console.log($scope.orderdetails[0].item[0].restname);
//            window.sessionStorage.setItem("ressname",$scope.orderdetails[0].item[0].restname)
         //$scope.orderitemdetails=$scope.orderdetails[0].item;
         console.log("order list is");
         console.log($scope.list);


        var ilength=$scope.data.length;
            console.log(ilength);

        $scope.subtol=0;
        $scope.serchar=0;
        $scope.total=0;
        $scope.itemsordered="";


            console.log($scope.data[0].item.length)
            var ilength = $scope.data[0].item.length;
            console.log(ilength)
        for(n=0;n<ilength;n++)
        {
            console.log($scope.data[0].item[n])
                        restname4.push($scope.data[0].item[n])

                        console.log(restname4)
                        $scope.restnammmm = restname4;
                        console.log($scope.restnammmm)
            $scope.dataorder=$scope.data+$scope.data[0].item[n].name+"-"+$scope.data[0].item[n].quan+";";
            $scope.subtol+=parseFloat($scope.data[0].item[n].total);
            console.log($scope.subtol)
            $scope.serchar=$scope.subtol*0.1;

            console.log($scope.serchar)
            $scope.total=parseFloat($scope.subtol)+parseFloat($scope.serchar);
            //alert($scope.total)
        console.log(taxc123)
            console.log(taxs123)
        $scope.sercharc=$scope.subtol*taxc123/100;
         console.log($scope.sercharc)
              $scope.serchars=$scope.subtol*taxs123/100;
         console.log($scope.serchars)
            $scope.totGst = $scope.sercharc + $scope.serchars;
            console.log($scope.totGst)
        $scope.total=$scope.serchar+$scope.subtol+$scope.totGst;
            console.log($scope.total)
        }

        })



      }
//    $scope.restfieldsaddingd = function(cashmode){
//              alert(cashmode)
//           }

        //this to add multiple fields
    $scope.alert = function() {
    alert("weldone");
        var restnametot =  window.sessionStorage.getItem("loginres1")
      console.log(restnametot)
     var mobnumber =  window.sessionStorage.getItem("ressnumber")
      console.log(mobnumber)
         var restaurantedit=mobnumber+","+restnametot+","+$scope.subtol+","+$scope.sercharc+","+$scope.serchars+","+$scope.totGst+","+$scope.total;
        console.log(restaurantedit)


        $http.put('/reststatus1'+restaurantedit).success(function(response)
        {
            console.log(response)
//            alert("putcald")
        })

 };



         var login000 = [];
    $scope.loginnnn = window.sessionStorage.getItem("loginres1");
    //alert( $scope.loginnnn )
    $http.get('/prnsession'+$scope.loginnnn).success(function(response){
             console.log("in save button");
             console.log(response);
             $scope.session00 = response;
             $scope.sesdate =  $scope.session00[0].date;
             $scope.session =  $scope.session00[0].session;
             console.log($scope.session)
             console.log($scope.sesdate)
             window.sessionStorage.setItem("sessionrd",$scope.sesdate);
             window.sessionStorage.setItem("sessionrs",$scope.session);

            // var newDate = new Date(((new Date(new Date()).toISOString().slice(0, 23))+"-05:30")).toISOString();

            // if( $scope.sesdate1 != newDate ){
            //      $scope.sesdate = newDate;
            // }

        //  if($scope.sesdate = new Date){
        //      console.log($scope.sesdate)

        //  }
        //      else{
        //      $scope.sesdate  = new Date($scope.sesdate)
        // console.log($scope.sesdate);
        //    $scope.sesdate.setDate($scope.sesdate.getDate() + 1);
        //      console.log($scope.sesdate);
        //  }
            $scope.session =  $scope.session00[0].session;
            console.log($scope.session)
            console.log($scope.loginnnn)
             window.sessionStorage.setItem("loginres1",$scope.loginnnn);

     })

     var login000 = window.sessionStorage.getItem("loginres1");
      console.log(login000)
      var Sdate;
      var sess;
      $scope.closesession=function(sesdate,session){


         var binddate11 = login000+","+$scope.sesdate+","+session;
               console.log(  binddate11 )
              $http.post('/Increment'+binddate11).success(function(response){
                     console.log(response)
                     console.log("session  date working")

              })



                 $http.get('/kodetails').success(function(response){
                   alert("hey got a call")
                     console.log(response);
                     $scope.kamat = response;
                     console.log($scope.kamat.length)
                    for(var k=0;k<$scope.kamat.length;k++)
                     {

                     $http.post('/kamatdata',$scope.kamat).success(function(res){
                       console.log(res);
                       var current = res;
                       console.log(current.length)
                     })//kamatdata


                       alert( $scope.kamat[k]._id);
                       var current =  $scope.kamat[k]._id;
                       //alert(current)
                     $http.delete('/currentdelete/'+current).success(function(response)
                     {
                     console.log(response);
                   })
                 }

            })

              //posting data

              window.sessionStorage.setItem("sesDate",sesdate);
              window.sessionStorage.setItem("sessionInDay",session);
 //            $http.get('/checkstatus'+login000).success(function(response)
      }//session


         $scope.closeday=function(sesdate,session){
             console.log(login000)
             alert(session);
             //date and session  incerement
             var binddate11 = login000+","+$scope.sesdate;
             // console.log(  $scope.binddate11 )

             $http.post('/sesdatee'+binddate11).success(function(response){
                    console.log(response)
                    console.log("session  date working")

             })
              window.sessionStorage.setItem("sesDate",sesdate);
             window.sessionStorage.setItem("sessionInDay",session);
             // var currentDate = new Date($scope.sesdate);

         } //fun closeday

          var sessionn = window.sessionStorage.getItem("sessionrs");
          console.log(sessionn)

         $scope.checksess=function(){
             var sessdte = window.sessionStorage.getItem("sessionrd");
        console.log(sessdte)
          //   alert("report")
         console.log(sessdte);
              $http.get('/sessionreport',{params:{"Sessiondate" :sessdte}}).success(function(response)
        {
            console.log(response)
                  var sessionreport = response;
                  console.log(sessionreport.length)
                  var sesslenght = sessionreport.length
                  var i =0;
                  for(i=0; i<sesslenght;i++){
                      console.log(sessionreport[i].FinalTotal)
                  }

            })

         }


            $scope.loginsess=function(sesdate,session){
            console.log("loginsess")
//                $scope.sesdatee = new Date(((new Date(sesdate).toISOString().slice(0, 23))+"-05:30")).toISOString();
//                console.log(sesdatee)
//                alert(sesdatee)

    var loginrest = window.sessionStorage.getItem("loginres1");
                console.log(loginrest)
                var mp= window.sessionStorage.getItem("mobile");
                console.log(mp)
                var sessbind = sesdate +","+session+"," +mp+ ","+loginrest;
                console.log(sessbind)

                $http.put('/sessionadd/'+sessbind).success(function(response)
                {
                    console.log("session working")

                })
         }

              $scope.cancelorder=function(mobileNo,sesdate,session)
      {
                alert(mobileNo+sesdate+session)


     var cancelrest = window.sessionStorage.getItem("loginres1")
         console.log(cancelrest)
//        var edit=mobileNo+","+cancelrest+","+"Cancelled"+","+sesdate+","+session;
//        console.log(edit);

                  var edit=mobileNo+","+sesdate+","+session+","+cancelrest+","+"Cancelled";
          console.log(edit)

        $http.put('/orderstatus'+edit).success(function(response)
        {
        })
//           $scope.cancelorder = ""
       window.location.reload();
      }

            $scope.bill1 = window.sessionStorage.getItem("bill");
            console.log($scope.bill1)
}])
//////////////////////////CartCntrl///////////////////////////////////////
myApp.controller('CartCntrl',['$scope','$http','$window',
function($scope,$http,$window)
{
  var itemtot;
  $scope.datenew  = new Date;
  console.log($scope.datenew)
  var billarray = [];
  var taxarray = [];
  $scope.aliasname=[];
  var alias=[];
  var arrcon=[];
  var arrcon3=[];
  var count=0;
  $scope.total;
  var billcarlength = 0;
  var billlength = 0;
  var login00;
//  var Charge = 0;
  $scope.billcar = [];
  $scope.arrconn3=[];
  $scope.sumtax =[];
  var fx = 0;
  var mobile = window.sessionStorage.getItem("mooob");
  console.log(mobile)
  console.log(billlength)
  $http.get('/summery'+mobile).success(function(response)
  {
          console.log("inooooooooooo button");
          console.log(response);
          $scope.billsumm = response;
          console.log($scope.billsumm[0].Charge)
//          console.log($scope.billsumm[0].Charge.ChargeName)
//          console.log($scope.billsumm[0].Charge[0].ChargeValue)
          console.log($scope.billsumm[0].FinalTotal);
          var FinalTotal = $scope.billsumm[0].FinalTotal;
          var Subtotal = $scope.billsumm[0].Subtotal
          console.log($scope.billsumm[0].Subtotal)
          console.log($scope.billsumm[0].RoundOffValue)
          var RoundOffValue = $scope.billsumm[0].RoundOffValue
          $scope.ChargeValue = FinalTotal - (Subtotal+RoundOffValue);
          console.log($scope.billsumm[0].item.length)
          var billlength =  $scope.billsumm[0].item.length;
          console.log(billlength)
          var a = 0;
          fx=0;
          for(i=0;i<=billlength-1;i++)
          {
                console.log(fx)
                var aliasname;
                console.log(billlength)
                console.log($scope.billsumm[0].item[i].name)
                console.log($scope.billsumm[0].item[i].itemType)
//                console.log($scope.billsumm[0].Charge[i].ChargeName)
//                console.log($scope.billsumm[0].Charge[i].ChargeValue)
//                console.log($scope.billsumm[0].Charge[i])
                var itemname = $scope.billsumm[0].item[i].name;
                console.log(itemname)
                $http.get('/summitem'+itemname).success(function(response)
                {
                          console.log(response)
                          var kotitemtype = response;
                          console.log(kotitemtype[0].saleCategory)
                          console.log(kotitemtype[0].name)
                          console.log(billlength)
                          console.log(response[0].withinstate)
                          var taxname  = response[0].withinstate;
                          console.log(taxname);
                  $http.get('/summtax'+taxname).success(function(response)
                  {
                      console.log(response)
                      $scope.sumtax = response;
                      $scope.aliasname[i] = $scope.sumtax[0].aliasname;
                      console.log($scope.aliasname[i]);
                      $scope.allname = $scope.aliasname[i];
                      console.log($scope.allname);
                      $scope.bill = $scope.billsumm[0].item[a];
                      console.log($scope.billsumm[0].item[a].name)
                      console.log(kotitemtype[0].saleCategory)
                      console.log($scope.billsumm[0].Transactiontype)
//                   console.log($scope.billsum[0].ChargeName)
                    
                    a++;
                      login00 = window.sessionStorage.getItem("loginres1");
                      var obj = {};
                      obj["name"] = $scope.bill.name;
                      obj["Price"] = $scope.bill.Price;
                      obj["quantity"] = $scope.bill.quantity;
                      obj["roundNumber"] = $scope.billsumm[0].RoundOffValue;
                      obj["itemtotal"] = $scope.bill.itemtotal;
                      obj["subtotal"] = $scope.billsumm[0].Subtotal;
                      obj["FinalTotal"] = $scope.billsumm[0].FinalTotal;
                      obj["ServiceTax"] = $scope.billsumm[0].ServiceTax;
                      obj["mobile"] = $scope.billsumm[0].mobile;
                      obj["Cgst"] = $scope.billsumm[0].Cgst;
                      obj["Sgst"] = $scope.billsumm[0].Sgst;
                      obj["Charge"] = $scope.billsumm[0].Charge;
//                      obj["ChargeValue"] = $scope.billsumm[0].Charge[0].ChargeValue;
                      //obj["TotCharge"]=$scope.billsumm[0].Charge;
                      obj["TotalGst"] = $scope.billsumm[0].TotalGst;
                      obj["Orderstatus"] = $scope.billsumm[0].Transactiontype;
                      obj["date"] = $scope.datenew;
                      obj["restaurant"] = login00;
                      obj["alias"] =$scope.aliasname[i];
                      console.log(alias)
                      obj["tax"] =$scope.sumtax;
                      obj["itemtype"] =$scope.bill.itemType;
                      console.log($scope.bill.itemType);
                      obj["Orderid"] = $scope.billsumm[0].orderid;
                      billarray.push(obj);
                      $scope.billcar = billarray;
                      console.log($scope.billcar);
                      // console.log($scope.billcar.itemtype);
                      // console.log($scope.billcar.itemtype);
                      fx++;
                      if(billlength==fx)
                      {
                        alfunction();
                      }
                   })//summtax
                 })//summitem
           }//for
   })//summery
   var alfunction=function()
  {
              billcarlength = $scope.billcar.length;
              bilarrlength = billarray.length;
              console.log("sdfdsasdfgh"+bilarrlength)
              var ordernum = $scope.billcar[0].Orderid;
              console.log(ordernum)
              //ordernum = 1465
              var requiredobj1 = [];
              //for(let i=0;i<=bilarrlength-1;i++){
              $http.get('/datafetch'+ordernum).success(function(response)
              {
                    console.log("inooooooooooo button");
                    console.log(response);
                    console.log(response.length);
                    var aliasFound = function(i)
                        {
                          if(i<=response.length-1)
                          {
                        console.log(response[i].Gst);
                        console.log(response[i].itemtotal);
                        console.log(response[i].Hidden);
                        console.log(response[i]._id);
                        var gstfetch = response[i]._id;
                        console.log(gstfetch);
                        $http.get('/aliasfetch'+gstfetch).success(function(result){
                            console.log(result)
                            console.log(result[0].aliasname)
                            var obj1 = {};
                            obj1["_id"] = response[i]._id;
                            obj1["Hidden"] = response[i].Hidden;
                            obj1["Gst"] = response[i].Gst;
                            obj1["itemtotal"] = response[i].itemtotal;
                            obj1["aliasname"] = result[0].aliasname;
                            requiredobj1.push(obj1);
                            $scope.displayalias = requiredobj1;
                            console.log($scope.displayalias);
                            aliasFound(i+1);
                        })//aliasfetch
                      }//if
                };
                aliasFound(0);
                    // }//for
                    $http.get('/GstCsgtValues'+ordernum).success(function(res){
                        //console.log(res);
                        // console.log(res[0].Cgst);
                        $scope.sg = res[0].Cgst;
                        $scope.cg = res[0].Sgst;
                        //console.log(res[0].Sgst);
                    })
               })//datafetch
  //   }
              var duplicate = [];
              $scope.kottbill = [];
              var requriedobj= [];
              var doNotMatch = [];
              console.log($scope.billcar)
              for(a=0;a<$scope.billcar.length;a++)
              {
                  console.log($scope.billcar.length)
                  for(b=0;b<$scope.billcar.length;b++)
                  {
                        if($scope.billcar[a].itemtype == $scope.billcar[b].itemtype)
                        {
                              if(duplicate.indexOf($scope.billcar[b].itemtype)==-1)
                              {
                                  console.log($scope.billcar[b])
                                   duplicate.push($scope.billcar[b].itemtype);
                                    kotGeneration($scope.billcar[b])
                                    function kotGeneration(demo )
                                    {
                                          //var demo = $scope.billcar[b].itemtype;
                                          console.log(demo.itemtype)
                                          // console.log(demo[0].itemtype)
                                          $http.get('/fetch'+demo.itemtype).success(function(response)
                                          {
                                              console.log(response);
                                              console.log(response.prefix);
                                              $scope.kotitemv= response;
                                              console.log($scope.kotitemv[0].prefix)
                                              var Prefix = $scope.kotitemv[0].prefix;
                                              console.log($scope.kotitemv[0].number)
                                              var kotnumber = $scope.kotitemv[0].number;

                                              var object = {};
                                              object["itemtype"] = demo.itemtype;
                                              object["Prefix"] =Prefix;
                                              object["Kotnumber"] =kotnumber;
                                              object["name"] =demo.name;
                                              object["quantity"] = demo.quantity;
                                              requriedobj.push(object);
                                              console.log($scope.billcar[b])
                                              $scope.kottbill = requriedobj;
                                              console.log($scope.kottbill);
                                          })//fetch
                                      }  //kot generation
                               }//bill if duplicate
                         }//if compare
                   }//b loop
               }//a loop

                           for(c=0;c<$scope.kottbill.length;c++)
                           {
                             if(requriedobj.indexOf($scope.billcar[c].name)==-1)
                            {
                             doNotMatch.push($scope.billcar[c].name);
                             console.log(doNotMatch)
                            }//if
                           }//c
   }//al function
      //  window.location.href="poscart1.html"; 
}])

   

//////////////////////////////////////ConfirmationCntrl////////////////////////
myApp.controller('ConfirmationCntrl',['$scope','$http','$window',
  function($scope,$http,$window)
     {
         var restname3 = [];
         var resttype = window.sessionStorage.getItem("Restname");
         console.log(resttype)
      var mp= window.sessionStorage.getItem("ph");
      //alert("Confirmation Controller Called");
      //alert(mp);



         //tax
        $http.get('/postaxc',{params:{"name" : "cgst"}}).success(function(response)
        {
            console.log(response)
         $scope.taxc=response;
            //console.log($scope.tax)
          console.log($scope.taxc[0].Rate)
             taxc123 = $scope.taxc[0].Rate;
            //console.log(tax123)
            })

             $http.get('/postaxs',{params:{"name" : "sgst"}}).success(function(response)
        {
            console.log(response)
         $scope.taxs=response;
            //console.log($scope.tax)
         console.log($scope.taxc[0].Rate)
          taxs123 = $scope.taxc[0].Rate;
            //console.log(tax123)
            })


      $http.get('/itemlistcartconfirmed', {params:{"mobile":mp,"restaurant":resttype}}).success(function(response){
        console.log("entry for loop");
          console.log(response)
        $scope.data=response;
          var restname1=window.sessionStorage.getItem("Restname");
 console.log(resttype)
       console.log($scope.data[0].item)
        $scope.list=$scope.data[0].item;
        console.log($scope.list)
        console.log($scope.list)
        var ilength=$scope.list.length;

          $scope.subtol=0;
             $scope.serchar=0;
        $scope.total=0;
        $scope.itemsordered="";
            for(m=0;m<ilength;m++){
                if(resttype == $scope.data[0].restaurant)
                    {
//                        console.log($scope.list[m].restname)
//                        restname3.push($scope.list[m])
//                        console.log(restname3)

            $scope.itemsordered=$scope.itemsordered+$scope.list[m].name+"-"+$scope.list[m].quan+";";
            $scope.subtol+=parseFloat($scope.list[m].total);

            console.log($scope.subtol)
            $scope.serchar=$scope.subtol*0.1;
                       $scope.sercharc=$scope.subtol*taxc123/100;
         console.log($scope.sercharc)
              $scope.serchars=$scope.subtol*taxs123/100;
         console.log($scope.serchars)
            $scope.totGst = $scope.sercharc + $scope.serchars;
            console.log($scope.totGst)
        $scope.total=$scope.serchar+$scope.subtol+$scope.totGst;

            console.log($scope.total)


      //$scope.total=parseFloat($scope.subtol)+parseFloat($scope.serchar);

                     }


            }






    })
     }])
///////////////////////////KitchenCntrl///////////////////////
  myApp.controller('KitchenCntrl',['$scope','$http','$window',
  function($scope,$http,$window)
     {
       //alert("Kitchen Controller Called");
       $scope.status=["InProgress","Ready","Paid"];
       var status="Paid";
       $http.get('/kamatorderlistkitchen').success(function(response)
        {
         $scope.orderlist=response;
         console.log("order list is");
         console.log($scope.orderlist);
        })

    $scope.itemstatuschange=function(mobile,istatus)
    {
//        $scope.sesdate =  window.sessionStorage.getItem("Sdate")
//     console.log($scope.sesdate)
//
//        var session =   window.sessionStorage.getItem("sess")
//console.log(mobile,istatus)

        //alert("itemstatuschangefunctiona called");
        var edit=mobile+","+istatus;
        $http.put('/statuschange/'+edit).success(function(response)
        {
        })
    window.location.reload();
    }
     }])
////////////////////CounterCntrl////////////////////
myApp.controller('CounterCntrl',['$scope','$http','$window',
  function($scope,$http,$window)
     {
       //alert("Counter Controller Called");
       $scope.status=["Delivered"];
       var status="Paid";
       $http.get('/kamatorderlistcounter').success(function(response)
        {
         $scope.orderlist=response;
         console.log("order list is");
         console.log($scope.orderlist);
        })

    $scope.itemstatuschange=function(mobile,istatus)
    {
//        var sdate = window.sessionStorage.getItem("Sdate")
//           var sessi = window.sessionStorage.getItem("sess")
           //console.log(sdate,sessi)
        var edit=mobile+","+istatus;
        alert(edit);
        $http.put('/statuschange/'+edit).success(function(response)
        {
        })
     // window.location.reload();
    }
     }])
myApp.controller('ServiceCtrl',['$scope','$http','$window',
  function($scope,$http,$window)
     {


       $http.get('/chargeitem').success(function(response)
        {
         $scope.chargeitem=response;
         console.log("order list is");
         console.log($scope.chargeitem);
        })

    $scope.chargename=function(chargename)
    {

        alert(chargename);
        $http.get('/chargetabb'+chargename).success(function(response)
        {
            console.log(response)
       $scope.itname=response;
            $scope.itnamee=$scope.itname;
            console.log($scope.itname)
            $scope.itadd=response;
            console.log($scope.itadd)


            })


    }

    $scope.edit = function(id) {
  console.log(id);
  $http.get('/editable/' + id).success(function(response) {
    $scope.contact = response;
      alert(response)
  });
    }


//    $scope.taxable=function(checked)
//    {
//        alert(checked);
//    }
//
    }])


////////////////////FirstCntrl////////////////////////
myApp.controller('FirstCntrl',['$scope','$http','$window',
function($scope,$http,$window){
     $scope.status=["Confirmed","In progress","Ready", "Delivered"]
     $scope.istatus="Confirmed";
     var itemdataArray=[];
   var restname = null;
    var catll;
     var itemdataLength=0;

    var sesdate=window.sessionStorage.getItem("Sdate");
  var session=window.sessionStorage.getItem("sess");
    console.log(sesdate);
    console.log(session);


     //$scope.status="Confirmed";
     $scope.orderid=window.sessionStorage.getItem("orderid")
     var mp= window.sessionStorage.getItem("ph");
     $scope.ph=mp;
      $scope.restname=window.sessionStorage.getItem("Restname");
 console.log($scope.restname)
     var restname1 = $scope.restname;
    console.log(restname1)

     var item=window.sessionStorage.getItem("cname")
     $scope.price=window.sessionStorage.getItem("csection")
     $scope.itemname=item;
     $scope.itemstatus="Confirmed";

    //tax
        $http.get('/postaxc',{params:{"name" : "cgst"}}).success(function(response)
        {
            console.log(response)
         $scope.taxc=response;
            //console.log($scope.tax)
          console.log($scope.taxc[0].Rate)
             taxc123 = $scope.taxc[0].Rate;
            //console.log(tax123)
            })

             $http.get('/postaxs',{params:{"name" : "sgst"}}).success(function(response)
        {
            console.log(response)
         $scope.taxs=response;
            //console.log($scope.tax)
         console.log($scope.taxc[0].Rate)
          taxs123 = $scope.taxc[0].Rate;
            //console.log(tax123)
            })



    $http.get('/kichen').success(function(response)
    {
        $scope.ordereditem=response;
    })


    $http.get('/orderst'+mp).success(function(response)
    {
        $scope.orderst=response.item;
        var ordid=response.orderid
        //alert(ordid);
        window.sessionStorage.setItem("orderid",ordid);
        console.log("order is")
        //console.log($scope.orderst)
    })


    var restname2 = [];
    $scope.itemstatus=function($index,mobile,istatus,name)
    {

       // alert(mobile+istatus+name)
        console.log(mobile+istatus+name)
        var edit=mobile+","+name+","+istatus;
        $http.put('/status/'+edit).success(function(response)
        {
        })
    }



   /* $http.get('/itemlist').success(function(response){
        console.log("entry for loop");
        //var data=response;
        //console.log(data);
        $scope.ordereditem=response;
        console.log("ordered item")
        console.log($scope.ordereditem)
    })*/
    //alert("the item is"+item)
    //alert("the cat is"+restname)
var restname=window.sessionStorage.getItem("Restname")
console.log(restname)

     if($scope.restname==restname)
    {
    $http.get('/KamathSimplySouth'+item).success(function(response)
    {
        $scope.items=response[0].cat[0].menu;
        console.log($scope.items)
    })
    }
       //welcome
    $scope.itotal= window.sessionStorage.getItem("cal");
    //alert($scope.itotal);
    $scope.count=1;
    $scope.v1="0";
    taxc123 = 0;
    $scope.name= window.sessionStorage.getItem("Name");
    $scope.Rs=window.sessionStorage.getItem("RS");


    $http.get('/service').success(function(response){
        $scope.tax=1;
        $scope.tax1=parseInt($scope.tax)
        //alert("service tax is"+$scope.tax1);
    });

    console.log("HI FROMMMMMMM");
    $scope.cal1=0;
    console.log($scope.cal1);

    $scope.tal="hihi";

   $scope.restnamecaps=restname.toUpperCase();





    if($scope.restname==restname){
        $http.get('/itemlistcart', {params:{"mobile":mp, "restaurant":restname}}).success(function(response){
        console.log("entry for loop");
            console.log(response)
            console.log(response.length)
         $scope.data=response;

      //console.log($scope.data[0].restaurant);
             var restname1=window.sessionStorage.getItem("Restname");
 console.log(restname1)
        $scope.list=$scope.data[0].item;



     console.log($scope.list)
        var ilength=$scope.list.length;
            console.log(ilength)

            $scope.subtol=0;
             $scope.serchar=0;
        $scope.total=0;
        $scope.itemsordered="";
            for(m=0;m<ilength;m++){
                console.log(restname1)
           //console.log($scope.data[m].restaurant)
                if(restname1 == $scope.data[0].restaurant)
                    {
                        console.log("welcome")
                      console.log($scope.list[m].restaurant)
                        restname2.push($scope.list[m])
                       console.log(restname2)


//                        //new procedure
//                        $scope.subtol=0;

//                        var subchar = 0;
//                        var subtotal = 0;
//                        var itemsordered = 0;
//                     for(m=0;m<ilength;m++){
            //alert($scope.list[i].total)
            $scope.itemsordered=$scope.itemsordered+$scope.list[m].name+"-"+$scope.list[m].quan+";";
                        console.log($scope.itemsordered)
            $scope.subtol+=parseFloat($scope.list[m].total);


           console.log($scope.subtol)
            $scope.serchar=$scope.subtol*0.1;
                        console.log($scope.serchar)
//            $scope.sercharc=$scope.subtol*taxc123/100;
//         console.log($scope.sercharc)
//              $scope.serchars=$scope.subtol*taxs123/100;
//         console.log($scope.serchars)
//            $scope.totGst = $scope.sercharc + $scope.serchars;
//            console.log($scope.totGst)
        $scope.total=$scope.serchar+$scope.subtol+$scope.totGst;
            console.log($scope.total)
                        $scope.total=$scope.serchar+$scope.subtol;
            console.log($scope.total)
//            $scope.total=parseFloat($scope.subtol)+parseFloat($scope.serchar);
                       // console.log($scope.total)

                     }


            }


    })
}


    $scope.hi="hiii";

   //alert($scope.Rs);
    console.log("hi there");

    /*$scope.count1=0;*/
    $scope.test = [];
    //window.sessionStorage.setItem("Order",$scope.test);

    //alert($scope.test);
    $scope.test1=[];
    console.log("Hello From FirstCntrl");
//    $http.get('/contactlist').success(function(response)
//    {
//        var res=response;
//        console.log(res);
//    });
    $scope.edit=function(name,quan){
        //alert(name+quan);
        var mp= window.sessionStorage.getItem("ph");
        var quant=quan;
        var iname=name;
        //alert(quant);
        $http.get('/menu', {params:{"price":iname}}).success(function(response){
        var price=response.price;
        var total=quan*price;
        //alert(total);
        var edit=mp+","+iname+","+quant+","+total;
        $http.put('/itemedit/'+edit).success(function(response)
        {
        $scope.result=response;
        console.log($scope.result);
        //window.location.reload();
        })
        });
        //$http.put('/itemedit/'+edit);

    }
    $scope.delete=function(name)
    {
        //alert("hi")
        var mp= window.sessionStorage.getItem("ph");
        var iname=name;
        var itemname=mp+","+iname;
        //alert(iname);
        $http.delete('/item/'+itemname);
       // window.location.reload();
    }

    $scope.quantity=function(name,price){

        $scope.v=name;
        $scope.v1=price;
        //alert($scope.v1);
        window.sessionStorage.setItem("Name",$scope.v);
        window.sessionStorage.setItem("RS",$scope.v1);
        /* $scope.quantity1=function(Name,rs){
        var v2=Name;
        var v3=rs;
        window.sessionStorage.setItem("Order1",v2);*/
        //alert(v+v1);

$scope.test.push($scope.v);
//alert($scope.test);
//$scope.test1.push(v1);
//$scope.tes=["hi","hello"];
window.sessionStorage.setItem("Order",JSON.stringify($scope.test));
//window.sessionStorage.setItem("Order1",$scope.test1);
//alert($scope.order);
        $scope.count++;
    }

   // window.sessionStorage.setItem("Name",$scope.v);

    $scope.confirmorder=function()
    {
        var restname1=window.sessionStorage.getItem("Restname");
        console.log(restname1)

       //alert("confirm method called");
       var mp= window.sessionStorage.getItem("ph");
       //alert(mp);
       var edit=mp+","+restname1+","+"Confirmed";
        console.log(edit)
        $http.put('/order11status'+edit).success(function(response)
        {
        })

    }

    console.log(mp)
//this is category items

    var citem = window.sessionStorage.getItem("cname")
  console.log(citem);
     var itemcat=mp+","+citem+","+restname;
    console.log(itemcat)
    $http.get('/cateitem'+itemcat).success(function(response)
        {
        console.log(response)
       catll = response.length;
        console.log(catll)
        })
    var itemdata;
  var itemname22 = [];
var itemname3 = [];
    var catlrl= [];
    $scope.additems=function()
    {
         console.log(catll)
//        if(catll == 0){
//            console.log("push")
//            itemname22.push("push")
//    console.log(itemname22)
//        }
//        else
//            {
//                console.log("findAndModify")
//                itemname22.push("findAndModify")
//    console.log(itemname22)
//            }



       alert("additem function called");
         var restname=window.sessionStorage.getItem("Restname")
        alert(restname)
      var mp= window.sessionStorage.getItem("ph");

        console.log($scope.restname)
        if($scope.restname==restname)
        {
        var name=$scope.itemname;
        alert(name);
////            ///////////////////////////////////////////////////
//           window.sessionStorage.setItem("itemname",name);
//            var restdata=mp+","+restname+","+name;
//            console.log(restdata)
//            $http.get('/restnamee'+restdata).success(function(response)
//        {
//        var itemname =  window.sessionStorage.getItem("itemname")
//        console.log(itemname)
//                window.sessionStorage.getItem("ph")
//                console.log(response)
//                $scope.data = response;
//                 $scope.list=$scope.data[0].item;
//                console.log($scope.list)
//                var ilength=$scope.list.length;
//            console.log(ilength)
//                for(m=0;m<ilength;m++){
//                    if(itemname == $scope.list[m].name)
//                    {
//                        console.log($scope.list[m].name)
//                        itemname3.push($scope.list[m])
//                        console.log(itemname3)
//                }
//                }
//                 })
//

        var count=$scope.count;
       console.log(count);
        var cal=$scope.tol;
        var restname=$scope.restname;
        // var status1="NotSelected";
        // var status2="Selected";
        // var edit=mp+","+status1+","+status2;
        //alert(edit);
        // $http.get('/orderlist'+edit).success(function(response)
        // {
        //  $scope.orderlist=response;
        //  //alert("order list lenght is:"+$scope.orderlist.length);
        //  console.log($scope.orderlist);
        //  var noOforders=$scope.orderlist.length;
        //  var orderid=$scope.orderlist[0]._id;
         //alert(orderid);
             var price22=window.sessionStorage.getItem("csection")
            //console.log(price22)
         var catdata=mp+","+restname;
            console.log(catdata)



            $http.get('/catrest'+catdata).success(function(response)
        {
        console.log(response)
     catlrl = response.length;
        console.log(catlrl)
    // })





      var restitemdata=name+","+count+","+cal+","+mp+","+restname+","+price22;
            console.log(restitemdata);

            if(catlrl == 0){
                alert("rest length[000000000000000000] ============0")
                console.log("rest length[000000000000000000] restcheck present#####################")
                 $http.post('/restinsert'+restitemdata).success(function(response){
                     console.log(response)
             $scope.id=response._id;
                     //window.location.href="menucopy.html";
                 })
            }
            else{


            console.log(catll)
            if(catll == 0){
                  alert("item length=0"+catlrl)


                itemdata=name+","+count+","+cal+","+mp+","+restname+","+price22;
            console.log(itemdata);
           console.log("push")
                $http.put('/item1/'+itemdata).success(function(response){
             $scope.id=response._id;
                    console.log(response)
                 window.location.href="menucopy.html";
             })


            }
        else
            {
                alert("find and modify alertttttttttttttttttt"+catll)
                console.log("findAndModify")
       itemdata=name+","+count+","+cal+","+mp+","+restname+","+price22;
            console.log(itemdata);
            $http.put('/item/'+itemdata).success(function(response){
             console.log(response)
                console.log("its working")
               window.location.href="menucopy.html";
             })
            }
            }
                })
          // })
          // if(noOforders < 1)
          // {
          //   alert("else block called");
          //   $scope.user.mobile=window.sessionStorage.getItem("ph");
          //   $http.post('/item',$scope.user).success(function(response){
          // })
          // }
        //var status="Confirmed";
        //alert(cal);

        //alert($scope.id);
        /*$http.put ('/item/'+itemdata).success(function(response){
        var username=response.name;*/
        // })

       // window.location.href="menu.html";
    }
//    else if($scope.restname=="Juice Center")
//    {
//        //alert($scope.restname)
//        var name=$scope.itemname;
//        //alert(name);
//        var count=$scope.count;
//        //alert(count);
//        var cal=$scope.tol;
//        //alert(cal);
//        var itemdata=name+","+count+","+cal+","+mp+","+restname;
//
//        var itemdata=name+","+count+","+cal+","+mp+","+restname;
//        $http.put('/jcitem/'+itemdata).success(function(response){
//        $scope.id=response._id;
//        //alert($scope.id);
//        /*$http.put ('/item/'+itemdata).success(function(response){
//        var username=response.name;*/
//        })
//    }
}

$scope.tol=$scope.price;
//alert($scope.cal)
    $scope.count1=function(event){
        $scope.name= window.sessionStorage.getItem("cname");

   $scope.Rs=window.sessionStorage.getItem("csection");
        //alert(event.target.id);
        var id=event.target.id;
        if(id=="hi")
        {
            var count=$scope.count++;
        }
        else if(id=="hello")
        {
            if($scope.count==1)
            {
            var count=$scope.count;
        }else
        {
            var count=$scope.count--;
        }
        }
        //alert($scope.count);
        //alert($scope.Rs);
        $scope.tol=$scope.Rs*$scope.count;
        //alert($scope.cal);
         window.sessionStorage.setItem("cal",$scope.tol);
        //alert($scope.count);
        //alert($scope.Rs);

        //alert(cal);
    }
    //alert($scope.count);
    //alert($scope.Rs);
    $scope.cal=$scope.Rs*$scope.count;
    }]);

myApp.controller('StarCtrl', ['$scope','$http','$window', function ($scope,$http,$window) {
    $scope.orderid=window.sessionStorage.getItem("orderid")
    //alert($scope.orderid)
    $scope.rating = 1;
    $scope.ratings = [{
        current: 1,
        max: 5
    }];

   /* var data="1";
    $http.put('/feedbdata/'+data).success(function(response)
        {
         $scope.fdata=response;
        })*/

   $http.get('/feedback').success(function(response)
    {
        $scope.feeddes=response;
        console.log($scope.feeddes);
    })

    $scope.starrating = function (Fid,current) {
        var rating=current+1;
        var data=Fid+","+rating+","+$scope.orderid;
        console.log(data);

        $http.put('/feedbdata/'+data).success(function(response)
        {
         $scope.fdata=response;
        })
    }
}]);

myApp.directive('starRating', function () {
    return {
        restrict: 'A',
        template: '<ul class="rating">' +
            '<li ng-repeat="star in stars" ng-class="star" ng-click="toggle($index)">' +
            '\u2605' +
            '</li>' +
            '</ul>',
        scope: {
            ratingValue: '=',
            max: '=',
            onRatingSelected: '&'
        },
        link: function (scope, elem, attrs) {

            var updateStars = function () {
                scope.stars = [];
                for (var i = 0; i < scope.max; i++) {
                    scope.stars.push({
                        filled: i < scope.ratingValue
                    });
                }
            };

            scope.toggle = function (index) {
                scope.ratingValue = index + 1;
                scope.onRatingSelected({
                    rating: index + 1
                });
            };

            scope.$watch('ratingValue', function (oldVal, newVal) {
                if (newVal) {
                    updateStars();
                }
            });
        }
    }
});
