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
//    else if($scope.name=="Juice Center")
//    {
//        //alert(name)
//        $http.get('/juice').success(function(response)
//        {
//            console.log(response)
//            $scope.category=response[0].cat[0].menu;
//            console.log($scope.category)
//        })
//    }
//    
//     else if($scope.name=="Kamath Simply South")
//    {
//        //alert(name)
//        $http.get('/KamathSimplySouth').success(function(response)
//        {
//            console.log(response)
//            $scope.category=response;
//            console.log($scope.category)
//        })
//    }
//    else if($scope.name=="Punjabi Food")
//    {
//        //alert(name)
//        $http.get('/PunjabiFood').success(function(response)
//        {
//            console.log(response)
//            $scope.category=response;
//            console.log($scope.category)
//        })
//    }
//     else if($scope.name=="AL Taj")
//    {
//        //alert(name)
//        $http.get('/KamathSimplySouth').success(function(response)
//        {
//            console.log(response)
//            $scope.category=response;
//            console.log($scope.category)
//        })
//    }
//     else if($scope.name=="Chowmein")
//    {
//        //alert(name)
//        $http.get('/KamathSimplySouth').success(function(response)
//        {
//            console.log(response)
//            $scope.category=response;
//            console.log($scope.category)
//        })
//    }
//    else if($scope.name=="Chat")
//    {
//        //alert(name)
//        $http.get('/KamathSimplySouth').success(function(response)
//        {
//            console.log(response)
//            $scope.category=response;
//            console.log($scope.category)
//        })
//    }
//    else if($scope.name=="Best-O-Best Juice")
//    {
//        //alert(name)
//        $http.get('/KamathSimplySouth').success(function(response)
//        {
//            console.log(response)
//            $scope.category=response;
//            console.log($scope.category)
//        })
//    }
//    
//    
    
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
         
         
            
         
         
         $http.get('/getitemdata').success(function(response){
        console.log(response);
        $scope.itemdetails = response
        console.log($scope.itemdetails);
    })
         $http.get('/freqadded').success(function(response){
                 console.log("login id sent")
               console.log(response); 
             $scope.frequently = response;
             console.log($scope.frequently)
             
             
    })
     
         
//         POSLOGIN
          $scope.pos12login = [];
         $scope.posslogin=function(resid){
             
             console.log("welcome to restau"+resid)
             $http.get('/poss'+resid).success(function(response){
                 console.log("login id sent")
               console.log(response);
                 
             $scope.pos12login = response;
             console.log($scope.pos12login[0].restaurant)
//                 var plogin = JSON.stringify(pos12login);
//                 console.log(plogin);
                 $scope.restaurant123 = $scope.pos12login[0].restaurant;
                 console.log($scope.restaurant123);
                 
         })
         }
         
         
         
         ///this is for configuration master
         $http.get('/configurationmaster').success(function(response){
             console.log(response);
             $scope.Taxinclusive = response[0].Taxexclusive;
//             $scope.Taxinclusive = response[1].Taxexclusive;
         })
         var loginres = null;
         $scope.login1233=function(resid){
             //alert("gottttttttt")
             console.log("welcome to restau"+resid.length)
             if(resid.length == 6)
                 {
                     //alert("i got 6666666666666")
                 
              $http.get('/poss'+resid).success(function(response){
                 console.log("login id sent")
               console.log(response);
                  $scope.login1234 = response;
                  console.log($scope.login1234[0].restaurant);
                  loginres = $scope.login1234[0].restaurant;
                  window.sessionStorage.setItem("loginres1",loginres)
                  
              })
              }      
             

         }
         
         
         
         
    loginres= window.sessionStorage.getItem("loginres1")
//         console.log(resid)
     console.log(loginres)
         $http.get('/1234'+loginres).success(function(response)
        { 
            console.log(response)
            $scope.category=response;
            console.log($scope.category)
        });
         


         
         
         $scope.getScoreData = function(SaleCategoryName) {
        
                 
             
             
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
            //console.log($scope.tax)
         console.log($scope.taxc[0].Rate)  
          taxs123 = $scope.taxc[0].Rate;
            //console.log(tax123)
            })   
         
         $http.get('/getcardtype').success(function(response)
        {
            console.log(response)
         $scope.cardtype=response;
            
            })   
               
//         $scope.itemcomment=[];
          $scope.itemcommen = {}
         $scope.checkname = function(name,index) {
                alert("selectgvvvvvvvvvvvvvvv"+index)
             
             $http.get('/resmenuname'+name).success(function(response)
        { 
                 alert(name)
                 console.log(response)
                 $scope.itemtype=response[0].itemType;
                 console.log($scope.itemtype)
//                 itemmm = $scope.itemtype;
            
                 
               
             
             $http.get('/resmenu4'+$scope.itemtype).success(function(response)
        {
//                 alert(itemmm)
//               console.log(itemmm)
         
            console.log(response)
          $scope.itemcomment=response[0].Comments;
                 $scope.catitem1[index].selected = response[0].Comments;
                 $scope.itemcommen = $scope.itemcomment;
                 console.log($scope.itemcommen)
                 console.log($scope.itemcomment)
              })
                   })
                  }
         
         
       
         
          $scope.taxrateee = function(taxrate){
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
          $scope.credit = function(rcreditcharge){
              alert("hjkhghjk"+rcreditcharge)
         $http.get('/getchargesmas2222'+rcreditcharge).success(function(response){
               console.log(rcreditcharge)
       console.log(response);
             var chargelength = response.length;
             console.log(chargelength)
             console.log(response[0].Taxable)
                        var taxable = response[0].Taxable;
              if(taxable=="Yes"){ 
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
         
         
          var discountDetails = function(name,section,count){
                   $http.get('/getitemrate'+name).success(function(response){
    alert(name)
    console.log(response)
                       $scope.chargemaster = response;
                       var rcharge =response[0].ChargeValue;
                       rcreditcharge =response[0].ChargeName;
                       console.log(response[0].ChargeValue)
                     $scope.credit(rcreditcharge)
                       var taxrate = response[0].withinstate;
                       console.log(taxrate)
                       $scope.taxrateee(taxrate,name,section,count);
                       
                       if(rcharge!=undefined){ 
                           //$scope.chargemaster[0].ChargeValue =0;
                                     
                       //alert( $scope.chargemaster[0].ChargeValue)
                       console.log($scope.chargemaster[0].ChargeValue)
                       var charge2 =  $scope.chargemaster[0].ChargeValue;
                      console.log(charge2)
                           
                       $http.get('/getchargesmas'+charge2).success(function(response){
                    // alert(charge2)
       console.log(response);

                          $scope.chargemaster = response;

                            
      console.log($scope.chargemaster[0].ChargeValue)
                $scope.chargevalue=$scope.chargemaster[0].ChargeValue;
         $scope.discountval = $scope.chargemaster[0].ChargeValue;
                       $scope.quant1(name,section,count)
                       })
                           
                          
                           
                           
                           
                           }
                       else{
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
        // var coninclusive;
         var name2 = null;

          //$scope.totquant = 100;
        
         $scope.quant=function(name,section,count){
             //$scope.Taxinclusive=="yes";
//                  
//                       $http.get('/taxinclusive').success(function(response){
//                           console.log(response);
//                           $scope.taxexclusive = response;
//                           console.log($scope.taxexclusive[0].Taxexclusive)
//                           $scope.taxcalc = $scope.taxexclusive[0].Taxexclusive;
//                           console.log($scope.taxcalc)
//                           console.log("hello")
//                           
//                       })
//                   
             
             
             if($scope.Taxinclusive=="Yes"){
                 console.log("yes");
          $scope.coninclusive(name,section,count);
                 console.log("inclusive")
                 //alert("inclusive")
             }
             else{
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
                 
                 $scope.numLimit = 6;
  //demo               
console.log($scope.chargecountval)
  //console.log($scope.chargemaster1)
             console.log(catitem)
            console.log(catitem.length);
             var itemlength=catitem.length;
             console.log(itemlength)
             if(itemlength==0){
                 console.log("frist time null")
                 var obj = {};
            obj["name"] = name;
             obj["section"] = section;
             obj["count"] = count;
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
             } else {
                 
            console.log(itemlength)
                
             for(i=0;i<itemlength;i++){
                 console.log(name)
                 console.log(catitem[i].name)
                 //alert(i)
             if(name == catitem[i].name){
                //alert("correctionnnnnn")
                 
//                 alert("if loop",name+catitem[i].name)
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
                   //total -= $scope.discountamt;
                 console.log(total)
             total =  (catitem[i].total + catitem[i].chargeamt - catitem[i].discountamt + catitem[i].totalgst ) ;
                console.log(total)
                 catitem[i].total = total;
                 break;
             } 
                 
             else{
                 if(name != catitem[i].name && i==itemlength-1){
                  //alert("newcreation if length>0+++++++++"+catitem[i].name+name)
                 console.log("not exists")
                 var obj = {};
            obj["name"] = name;
             obj["section"] = section;
             obj["count"] = count;
             total = count * section;
             console.log(total)
                      $scope.discountamt = total*$scope.discountval/100;
                 console.log($scope.discountamt);
                      obj["discountamt"] = $scope.discountamt;
                
                      $scope.chargeamt = total*$scope.chargecountvalitem/100;
                
              
                      obj["chargeamt"] = $scope.chargeamt;
                      console.log($scope.chargeamt)
                     //total +=  $scope.chargeamt;
                      //total -= $scope.discountamt;
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
                 }
            }
             }
             }
         $scope.itemcount = function(count,name,section) {
               // alert(count)
             console.log(name,section)
             var obj = {};
              var countlength = catitem.length;

        for(i=0;i<countlength;i++){
            console.log(name)
            //alert(name)
            if(name == catitem[i].name){
            console.log(catitem[i].name)

            catitem[i].count -= count;
                 
            console.log(catitem[i].count)
              total = catitem[i].count * section;
                  console.log(total)
                  catitem[i].total = total;
                console.log(catitem[i].total)
////                console.log("fdfghjikjhgfdsdfghjikolkiujhgfd"+total)
                
                 console.log($scope.discountval)
                  $scope.discountamt = total*$scope.discountval/100;
                 console.log(total)
                 console.log($scope.discountamt)
                  catitem[i].discountamt=$scope.discountamt;
                
                
                $scope.chargeamt = catitem[i].total*$scope.chargecountvalitem/100;
                 console.log($scope.chargeamt)
               catitem[i].chargeamt =  $scope.chargeamt;
                console.log($scope.discountamt)
                

             catitem[i].taxcgst = total * $scope.taxcgst/100;
                 console.log(catitem[i].taxcgst)
                  catitem[i].taxsgst = total * $scope.taxsgst/100;
                 console.log(catitem[i].taxsgst)
                 catitem[i].totalgst = catitem[i].taxcgst + catitem[i].taxsgst;
                  console.log( catitem[i].totalgst)
                 console.log(total)
                
                total = (catitem[i].total + catitem[i].chargeamt - catitem[i].discountamt + catitem[i].totalgst)
                
                 catitem[i].total = total;
             
                
                 $scope.catitem1 = catitem;
             console.log($scope.catitem1);
             
             console.log($scope.catitem1.length);
             var catlength = $scope.catitem1.length;
             console.log(catlength)
             $scope.subtol=0;
        $scope.serchar=0;
        $scope.total=0;
                $scope.totGst =0;
             $scope.totquant = 0;
        //$scope.itemsordered="";  
            
            

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
                
                
    }

        }
         } 
  
         
   
         
         
         
         
//          var subtotal = $scope.subtol;
//         obj["subtotal"] = subtotal;
            //catitem.push(obj);
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
            
//             taxvalue for no
             
             
             
             
             
             
            

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
            
        

        }  
        var rcreditcharge;
         
         $scope.coninclusive=function(name,section,count){
            // alert("exclusive cald"+name)
           //alert("welcome to the world")
             //console.log(name,section,count)
        //$scope.discountDetails1(name,section,count)
             
             
           // $scope.discountDetails1 = function(name,section,count){
                   $http.get('/getitemrate'+name).success(function(response){
                      // alert(name)
                       console.log(response)
                
                       $scope.chargemaster = response;
                       var rcharge =response[0].ChargeValue;
                       rcreditcharge =response[0].ChargeName;
                       
                       $scope.itemtypee = response[0].itemType;
                       console.log($scope.itemtypee)
                   // $scope.credit(rcreditcharge);
                       var taxrate=0;
                       taxrate = response[0].withinstate;
//                       console.log(taxrate)
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
                 if($scope.taxgst!=null){
                    // alert("gst cald")
           console.log($scope.taxgst[1].Rate)
         console.log($scope.taxgst[0].Rate)
               $scope.taxcgst = $scope.taxgst[0].Rate;
                  $scope.taxsgst = $scope.taxgst[1].Rate;
                  console.log(typeof($scope.taxcgst))
                
                  $scope.quant2(name,section,count,$scope.taxcgst,$scope.itemtypee)
                 }
                 else{
                     console.log("else cald")
                      $scope.quant2(name,section,count,$scope.taxcgst,$scope.itemtypee)
                 }
            })   
                       
//                       $scope.taxrateee(taxrate,name,section,count)
//                       $scope.quant2(name,section,count)
//                       console.log(rcharge)
//                       if(rcharge!=undefined){ 
//                           //$scope.chargemaster[0].ChargeValue =0;
//                                     
//                       //alert( $scope.chargemaster[0].ChargeValue)
//                       console.log($scope.chargemaster[0].ChargeValue)
//                       var charge2 =  $scope.chargemaster[0].ChargeValue;
//                      console.log(charge2)
//                           
////                       $http.get('/getchargesmas'+charge2).success(function(response){
////                    // alert(charge2)
////       console.log(response);
////                           $scope.chargemaster = response;
////                           console.log($scope.chargemaster[0].ChargeValue)
////                $scope.chargevalue=$scope.chargemaster[0].ChargeValue;
////         $scope.discountval = $scope.chargemaster[0].ChargeValue;
////                     $scope.quant2(name,section,count)
////                       })
//                           
//                          
//                           
//                           
//                           
//                           }
//                       else{
//                           $scope.discountval =0;
//                          $scope.quant2(name,section,count)
//                       }
                   })

          }
             
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
//                var htotal =  total * totgstper;
//              console.log(htotal)
//              var ith = total/htotal;
//              console.log(ith)
//                 console.log(htotal/100)
              
            
              
                 
                 $scope.numLimit = 6;
  //demo               
console.log($scope.chargecountval)
  //console.log($scope.chargemaster1)
             console.log(catitem)
            console.log(catitem.length);
             var itemlength=catitem.length;
             console.log(itemlength)
             if(itemlength==0){

                     
            var obj = {};
            obj["name"] = name;
             obj["section"] = section;
             obj["count"] = count;
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
                 
//                  var htotal =  total * totgstper;
//                 console.log(htotal)
                 
                
                 
           var  taxcgst = itemvalue/2;
                 console.log(taxcgst)
                 var  taxsgst = itemvalue/2;
                 console.log(taxsgst)
//                taxsgst = total * $scope.taxsgst/100;
//                
//                 console.log(taxsgst)
//                  console.log($scope.taxsgst)
//                 totalgst = sgst + cgst;
//                 var totgst;
//                 totgst = totalgst/100;
//                 totalgst = totgst;
//                 console.log(totalgst/100)
//                 var itemhideen = totalgst/100;
//                 console.log(itemhideen)
//                 
//                 var ihr = total - itemhideen;
//                 console.log(ihr)
//                 var ide = ihr + itemhideen;
//                 console.log(ide)
               
                 

                  obj["taxsgst"] = taxsgst.toFixed(fixdec);
                 obj["taxcgst"] = taxcgst.toFixed(fixdec);
                  obj["totalgst"] = itemvalue.toFixed(fixdec);
//                 var htotal1 =  total - totalgst;
//                  var htotal =  total - totalgst;
//                 console.log(htotal)
//                 $scope.chargeamt = htotal*$scope.chargecountvalitem/100;
                 
                 obj["chargeamt"] = $scope.chargeamt;
                 
                 obj["discountamt"] = $scope.discountamt;
                    
                 obj["positemtype"] = $scope.itemtypee;

              
                 total = (hiddenvale + itemvalue);
                 console.log(total)
                

                 
              obj["total"] = total.toFixed(fixdec);
                 catitem.push(obj);
                  $scope.catitem1 = catitem;
                 calculation();
             } else {
                 
            console.log(itemlength)
                
             for(i=0;i<itemlength;i++){
                 console.log(name)
                 console.log(catitem[i].name)
                 //alert(i)
             if(name == catitem[i].name){
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
                 
//             taxcgst = total * $scope.taxcgst/100;
//                 console.log(taxcgst)
//                taxsgst = total * $scope.taxsgst/100;
//                
//                 console.log(taxsgst)
//                  console.log($scope.taxsgst)
//                 totalgst = sgst + cgst;
//                 console.log(totalgst/100)
//                 var itemhideen = totalgst/100;
//                 console.log(itemhideen)
                 
//                 var ihr = total - itemhideen;
//                 console.log(ihr)
//                 var ide = ihr + itemhideen;
//                 console.log(ide)

                 
                   catitem[i].taxcgst = taxcgst.toFixed(fixdec);
                 console.log(catitem[i].taxcgst)
                
               catitem[i].taxsgst = taxsgst.toFixed(fixdec);
                 console.log(catitem[i].taxsgst)
                  
                  //console.log(totalgst)
               
                 catitem[i].totalgst = itemvalue.toFixed(fixdec);
                 console.log(catitem[i].totalgst);
                   
//                  var htotal = total - catitem[i].totalgst;                 
//                 console.log(htotal)
               

              catitem[i].discountamt = $scope.discountamt;

                 catitem[i].chargeamt = $scope.chargeamt;
                 console.log(htotal)
              
                    catitem[i].total = itemvalue + hiddenvale;
                 console.log(catitem[i].total);
                 calculation();
                 break;
             } 
                 
             else{
                  if(name != catitem[i].name && i==itemlength-1){
                  //alert("newcreation if length>0+++++++++"+catitem[i].name+name)
                 console.log("not exists")
                 var obj = {};
            obj["name"] = name;
             obj["section"] = section;
             obj["count"] = count;
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
                 
//                  var htotal =  total * totgstper;
//                 console.log(htotal)
                 
                
                 
           var  taxcgst = itemvalue/2;
                 console.log(taxcgst)
                 var  taxsgst = itemvalue/2;
                 console.log(taxsgst)
//                taxsgst = total * $scope.taxsgst/100;
//                
//                 console.log(taxsgst)
//                  console.log($scope.taxsgst)
//                 totalgst = sgst + cgst;
//                 var totgst;
//                 totgst = totalgst/100;
//                 totalgst = totgst;
//                 console.log(totalgst/100)
//                 var itemhideen = totalgst/100;
//                 console.log(itemhideen)
//                 
//                 var ihr = total - itemhideen;
//                 console.log(ihr)
//                 var ide = ihr + itemhideen;
//                 console.log(ide)
               
                 

                  obj["taxsgst"] = taxsgst.toFixed(fixdec);
                 obj["taxcgst"] = taxcgst.toFixed(fixdec);
                  obj["totalgst"] = itemvalue.toFixed(fixdec);
//                 var htotal1 =  total - totalgst;
//                  var htotal =  total - totalgst;
//                 console.log(htotal)
//                 $scope.chargeamt = htotal*$scope.chargecountvalitem/100;
                 
                 obj["chargeamt"] = $scope.chargeamt;
                 
                 obj["discountamt"] = $scope.discountamt;
                    


              
                 total = (hiddenvale + itemvalue);
                 console.log(total)
                obj["positemtype"] = $scope.itemtypee;

                 
              obj["total"] = total;
                 catitem.push(obj);
                  $scope.catitem1 = catitem;
                      calculation();
                 }
                 
            }
             }
             }
         $scope.itemcount = function(count,name,section) {
               // alert(count)
             console.log(name,section)
             var obj = {};
              var countlength = catitem.length;

        for(i=0;i<countlength;i++){
            console.log(name)
            //alert(name)
            if(name == catitem[i].name){
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
                catitem[i].totalgst = itemvalue.toFixed(fixdec);
                
                 var taxcgst  = itemvalue/2;
                 var taxsgst  = itemvalue/2;
                
                 catitem[i].taxcgst = taxcgst.toFixed(fixdec);
                
                 catitem[i].taxsgst = taxsgst.toFixed(fixdec);
                

              
                 catitem[i].total = total;
                
                
                
                
                
                
                
                 $scope.catitem1 = catitem;
             console.log($scope.catitem1);
             
             console.log($scope.catitem1.length);
             var catlength = $scope.catitem1.length;
             console.log(catlength)
             $scope.subtol=0;
        $scope.serchar=0;
        $scope.total=0;
                $scope.totGst = 0;
             $scope.totquant = 0;
        //$scope.itemsordered="";  
            
            

            console.log(catlength)
             for(q=0;q<catlength;q++)
        {
            
            
           // console.log($scope.catitem1[n].total);
      $scope.subtol += parseInt($scope.catitem1[q].total);
            console.log($scope.subtol)
             //console.log($scope.catitem1[n].count);
          $scope.totquant += parseInt($scope.catitem1[q].count);
//            console.log($scope.catitem1)
//                        
//                         console.log($scope.catitem1[n])
                        
//            $scope.serchar=$scope.subtol*0.1;
            
            
//            $scope.sercharc=$scope.subtol*taxc123/100;
         //console.log($scope.sercharc)
//              $scope.serchars=$scope.subtol*taxs123/100;
        // console.log($scope.serchars)
           $scope.totGst = catitem[q].totalgst;
           // console.log($scope.totGst)
        $scope.total=$scope.subtol;
          console.log($scope.total)
             calculation();
            
             }
                
                
    }

        }
         } 
  
         
    }
         
         
         
        
var calculation = function(){
     $scope.gst=0;
          var dem=0;
    $scope.catitem1 = catitem;
             console.log($scope.catitem1);
             
             console.log($scope.catitem1.length);
             var catlength = $scope.catitem1.length;
             console.log(catlength)
             $scope.subtol=0;
        $scope.serchar=0;
        $scope.total=0;
             $scope.totquant = 0;
//              $scope.gst = 0;           
             
             
             
            
 
             for(let n=0;n<catlength;n++)
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
            
            
//             alert(catlength)
            $scope.gst += parseFloat($scope.catitem1[n].totalgst);
            console.log($scope.gst)
            

            console.log(catlength)
//           $scope.totGst = tota;
//           // console.log($scope.totGst)
            $scope.total=$scope.subtol;
           console.log($scope.total)
             
            
             }
            
        

}
          
          
        /////endddddddddddd  
             
       
         
 $scope.myFunc = function(amount) {
           // alert(amount);
    $scope.change = amount - $scope.total;
             console.log(amount - $scope.total)
     console.log($scope.change)  
            }
 
    
         
       $scope.poscart=function(mobile,catitem1,total,totquant,serchar,sercharc,serchars,gst,subtol,myVar,change,sesdate,session,totalgst){
                 //  alert("function working")
                 window.sessionStorage.setItem("mooob", mobile)
                 var restbill = window.sessionStorage.getItem("loginres1")
                 // console.log(restbill) 
                 // console.log(gst)
                 var cgst = gst/2;
                 var sgst = gst/2;
                 // console.log()

                 //console.log(mobile,catitem1,subtol,totquant,serchar,sercharc,serchars,gst,total,myVar,$scope.change,session,sesdate);
                 var rschange = $scope.change;
                 //console.log(catitem1.length)
                 var catlen = catitem1.length
                 var lenCheck = 0 ;
                 for(i=0;i<catlen;i++){
                         // console.log(catitem1)
                         // console.log(catitem1[i].selected)                
                         // console.log(myVar)
                         // console.log(catitem1[i].total)
                         var hidtot;
                          lenCheck = i;
                         // console.log(catitem1[i].totalgst);
                         // console.log(totalgst)
                         hidtot = catitem1[i].total - catitem1[i].totalgst;
                         //console.log(hidtot)
                         var poscartt =mobile+","+catitem1[i].name+","+catitem1[i].section+","+catitem1[i].count+","+catitem1[i].total+","+total+","+totquant+","+serchar+","+cgst+","+sgst+","+gst+","+subtol+","+myVar+","+i+","+catitem1[i].selected+","+rschange+","+change+","+sesdate+","+session+","+restbill+","+catitem1[i].positemtype+","+hidtot+","+catitem1[i].totalgst+","+lenCheck+","+catlen;
                         console.log(poscartt)
             
                         $http.post('/postcart'+poscartt).success(function(response){
                                 // lenCheck ++ ;
                                  //console.log("in save button");
                                  //  console.log(response);
                                  // alert("lenCheck "+lenCheck+" catlen "+catlen);
                            
                                  // if (lenCheck == catlen  ) {
                                  //            //alert("lenCheck comn "+lenCheck+" catlen "+catlen);
                                  //            $http.post('/accountMapping'+mobile).success(function(response){
                                
                                  //                    console.log(response);
                                
                                  //            })
                                  // }
                                  
                                 //$scope.billfunction(mobile) 
                         })                
                } 
           
             
            
             
             
           //window.location.reload(); 
         }//close
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
    
         
        

             
         
         
         
//workstart here
//            $scope.mobb = window.sessionStorage.getItem("mobile");
//    console.log($scope.mobb);  
      
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
          
    
       
// var restorepage = document.body.innerHTML;
//           //var contents = document.getElementById("printarea").innerHTML;
//          
//          
//        var contents = "<html><head></head<title><h1>Welcome to"+$scope.restaurant+"</h1><h3>Ittegi Road Dharwad, ph:-12345  </h3><h3>Cash Bill</h3></title>"
//       contents = contents + "</head><body>"
//        //contents = contents+document.getElementById("printarea").innerHTML;
//       contents=contents+"<table class=\"table table-striped\"><thead><tr><th>SL NO</th><th>Item Name</th><th>Quantity</th><th>Value</th></tr></thead>";
// var i=0;
//       alert($scope.data.length)
//        for(i=0;i<$scope.orderitemdetails.length;i++)
//        {
//            contents = contents+"<tr >";
//            contents = contents+"<td>"+(i+1)+"</td>"
//            contents = contents+"<td>"+$scope.orderitemdetails[i].name+"</td>"
//            contents = contents+"<td>"+$scope.orderitemdetails[i].quan+"</td>"
//            contents = contents+"<td>"+$scope.orderitemdetails[i].total+"</td></tr>"
//
//           
//            
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
          
          
         // contents = contents+"<td>"+$scope.total+"</td>"
          

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
             window.sessionStorage.setItem("sesDate",sesdate);
             window.sessionStorage.setItem("sessionInDay",session);
//            $http.get('/checkstatus'+login000).success(function(response)
//        {
//         //$scope.orderlist=response;
//         console.log(response);
//             F   $scope.orderstatus = response;
//      console.log($scope.orderstatus.length);
//                 var sesslength = $scope.orderstatus.length;
//                 console.log(sesslength)
//                 for(i=0;i<sesslength;i++){
//                     console.log($scope.orderstatus[i].orderstatus)
//                     
//                     if($scope.orderstatus[i].orderstatus == "Selected"){
//                         console.log("doing what i want heree")
//                         alert("oneorder with slecected and not confirmed")
//                         
//                     } else {
//                     
//                     
//                            $http.post('/session'+binddate).success(function(response)
//        {
//                
//                 console.log(response)
//                 $scope.session123 = response;
//                 //console.log($scope.session123.date)
//                  window.sessionStorage.setItem("Sdate",sesdate)            
//              window.sessionStorage.setItem("sess",session)        
//        })
//             
//                     }
//                    $scope.session++; 
//                 }
//                 
//        }) 
              
             
             // var login000 = window.sessionStorage.getItem("loginres1");
             // console.log(login000)
             // $http.get('/checkstatus'+login000).success(function(response) {
             //             // alert("alert")
             //             //$scope.orderlist=response;
             //             console.log(response);
             //             $scope.orderstatus = response;
             //             console.log($scope.orderstatus.length)
             //             var orlength = $scope.orderstatus.length;
             //             console.log(orlength)

             //             for(i=0;i<=orlength;i++){
             //                 console.log($scope.orderstatus.length)
             //                 if(orlength != 0){
             //                    //if ($scope.orderstatus[i].orderstatus === "NotSelected" || $scope.orderstatus[i].orderstatus === "Selected" || $scope.orderstatus[i].orderstatus === "Confirmed" )               {
             //                    var orderid = "yes";
             //                    console.log("doing what i want heree")
             //                      //   alert("oneorder with slecected and not confirmed")
             //                     var x = document.getElementById("myDialog").showModal();
             //                     $scope.closeDialog = function() { 
             //                            console.log("close function cald")
             //                             myDialog.close(); 
             //                     } 
             //                     //myDialog.showModal();
             //                 }
             //                    else {
             //                           console.log("else cald")
             //                           var orderid = 2;
             //                           console.log(orderid)

             //                           var binddate = sesdate +","+session+ ","+login000; 
             //                           console.log(binddate)
             //                           $http.post('/session'+binddate).success(function(response) {
                
             //                                 console.log(response)
                
             //                                 $scope.session123 = response;
             //                                 //console.log($scope.session123.date)
             //                                 window.sessionStorage.setItem("Sdate",sesdate)            
             //                                 window.sessionStorage.setItem("sess",session)        
             //                           })
             //                           $scope.session++ 
             //                        }
         
             //             }
                                                 
     
             //    })    
             
             
             

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
             // //alert(currentDate)
             // var followingDay = new Date(currentDate.getTime() + 86400000);
             // //var nextDate = currentDate.setDate(currentDate.getDate() + 1);
             // //alert(followingDay)
             // $scope.sesdate = followingDay ;
             // $scope.session = 1;
             // var login111 = window.sessionStorage.getItem("loginres1");
             // console.log(login111)
             //  $http.get('/checkstatus'+login000).success(function(response){
             //            //$scope.orderlist=response;
             //             console.log(response);
             //             $scope.orderstatus = response;
             //             console.log($scope.orderstatus.length)
             //             var orlength = $scope.orderstatus.length;
             //             console.log(orlength)

             //             for(i=0;i<=orlength;i++){
             //                 console.log($scope.orderstatus.length)
             //                 if(orlength != 0){
             //                     var x = document.getElementById("myDialog").showModal();
             //                     $scope.closeDialog = function() { 
             //                             console.log("close function cald")
             //                             myDialog.close(); 
             //                     } 
             //                     //myDialog.showModal();
             //                }
             //                 else{          
              
             //                        $scope.sesdate  = new Date($scope.sesdate)
             //                        console.log($scope.sesdate);
             
             //                        if($scope.sesdate = new Date){
             //                            $scope.sesdate.setDate($scope.sesdate.getDate() + 1);
             //                            console.log($scope.sesdate)
             //                            window.sessionStorage.setItem("datereq1",$scope.sesdate);
             //                            $scope.session = "1";
             //                         }
             

             //                         console.log($scope.sesdate);
             //                         window.sessionStorage.setItem("datereq1",$scope.sesdate);
             //                     }
             //             }
             //  })
             
             
             // var datereq = window.sessionStorage.getItem("sessreq1");
             // console.log(datereq)
             // $scope.binddate11 = datereq+","+login111+","+session;
             // console.log($scope.binddate11)
             
             // $http.post('/sesdatee'+binddate11).success(function(response){
             //        console.log(response)
             //        console.log("session  date working")
                   
             // })   
             
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
         $scope.billcar = [];
         $scope.arrconn3=[];
         $scope.sumtax =[];
        var fx = 0;
         var mobile = window.sessionStorage.getItem("mooob");
         console.log(mobile)
         
         
              //console.log(billcarlength)
         console.log(billlength)
         
         $http.get('/summery'+mobile).success(function(response){
              // alert("saved successfully"+mobile);
                   console.log("inooooooooooo button");
                  console.log(response);
                 $scope.billsumm = response;
                 console.log($scope.billsumm[0].item.length)
             
                 
                 var billlength =  $scope.billsumm[0].item.length;
            console.log(billlength)
                 var a = 0;
              fx=0;
             for(i=0;i<=billlength-1;i++){
                 console.log(fx)
                
               
      var aliasname;

                  console.log(billlength)
                    console.log($scope.billsumm[0].item[i].name)
                 console.log($scope.billsumm[0].item[i])
                      var itemname = $scope.billsumm[0].item[i].name;
                     console.log(itemname)
                     
                     $http.get('/summitem'+itemname).success(function(response){
                      console.log(response)
                         
                          var kotitemtype = response;
                console.log(kotitemtype[0].itemType)
                         console.log(kotitemtype[0].name)
                          console.log(billlength)
                          console.log(response[0].withinstate)
                          var taxname  = response[0].withinstate;
                          console.log(taxname); 
                         $http.get('/summtax'+taxname).success(function(response){
                        console.log(response)
                        $scope.sumtax = response;
//                             console.log($scope.sumtax[i].Rate)
//                             console.log($scope.sumtax[0].Rate)
//                             // console.log($scope.sumtax[i].Rate)
//                             console.log($scope.sumtax[0].taxname)

                              $scope.aliasname[i] = $scope.sumtax[0].aliasname;
                          
                             // console.log($scope.aliasname[i]);
                             $scope.bill = $scope.billsumm[0].item[a];
                            console.log($scope.billsumm[0].Transactiontype)
                             a++;
                             //alert($scope.bill+a)
                
login00 = window.sessionStorage.getItem("loginres1");
             //console.log(login00)
            // console.log($scope.aliasname[i]);     
                     
                      
             var obj = {};
            obj["name"] = $scope.bill.name;
             obj["Price"] = $scope.bill.Price;
             obj["quantity"] = $scope.bill.quantity;
             obj["itemtotal"] = $scope.bill.itemtotal;
            obj["subtotal"] = $scope.billsumm[0].Subtotal; 
             obj["FinalTotal"] = $scope.billsumm[0].FinalTotal;
             obj["ServiceTax"] = $scope.billsumm[0].ServiceTax;
             obj["mobile"] = $scope.billsumm[0].mobile;
             obj["Cgst"] = $scope.billsumm[0].Cgst;
             obj["Sgst"] = $scope.billsumm[0].Sgst;
            
                     obj["TotalGst"] = $scope.billsumm[0].TotalGst;
                     obj["Orderstatus"] = $scope.billsumm[0].Transactiontype;
                      obj["date"] = $scope.datenew;
                    obj["restaurant"] = login00;
                  obj["alias"] =$scope.aliasname[i];
                     obj["tax"] =$scope.sumtax; 
                     obj["itemtype"] =kotitemtype[0].itemType;
                       obj["Orderid"] = $scope.billsumm[0].orderid;       
                            
                    //console.log(taxcar)
                      billarray.push(obj);
                  $scope.billcar = billarray;
       console.log($scope.billcar);
                            // alert("length"+billlength)
                          //var alfunction;
                              fx++;
                             if(billlength==fx)
                             {
                             alfunction();
                                 //alert(fx+"hgjkjhg"+billlength)
                             }
                             
                       
                         })
                     })
             }
            
 })
                            var alfunction=function(){
                              
                              billcarlength = $scope.billcar.length;
                          
                             bilarrlength = billarray.length;
                              console.log("sdfdsasdfgh"+bilarrlength)
                    
                         $http.get('/datafetch'+mobile).success(function(response){
             //alert(mobile)
                   console.log("inooooooooooo button");
                  console.log(response);
                             $scope.displayalias = response;
//                             console.log($scope.displayalias[0].Gst)
//                             console.log($scope.displayalias[0]._id.itemgroup)
                         })
                                
//                             for(j=0;j<=billcarlength-1;j++){
//                                
//                                 if(arrcon.indexOf($scope.billcar[j].alias)==-1){
//                                  
//                                         console.log($scope.billcar[j].alias)
//                                        arrcon.push(billarray[j].alias);
//                                    console.log(billarray[j].alias)
//                                     var obj1={};
//                                       
//                                
//                                        $scope.alias = billarray[j].alias;
//                                        obj1["alias1"] = billarray[j].alias;
//                                     
//                                      
//                                     
//                                      obj1["itemtota"] = billarray[j].itemtotal;
//                                    
//                                     console.log(billarray[j].tax[0].taxname)
//                                      obj1["taxname"] = billarray[j].tax[0].taxname;
//                                    
//                                        arrcon3.push(obj1);
//                                        $scope.arrcon5=arrcon3;
//                                    
//                                        console.log($scope.arrcon5.alias1)
//                             
//                                     $scope.tgst=0;
//                                     var hidrate=0;
//                                     var hidgst=0;
//                                     $scope.kotbill;
//                                    var TGst = 0;
//                                     
//                                     for(h=0;h<=billcarlength-1;h++){
//                                          console.log($scope.arrcon5)
//                                         console.log($scope.arrcon5[j].alias1)
//                                         var aralias = $scope.arrcon5[j].alias1;
//          
//                                       
////                                         if(h!=billcarlength-1){
////                                    console.log($scope.billcar[j].tax[j].Rate)
////                                       var Cgst = parseInt($scope.billcar[j].tax[j].Rate);
////                                     var Sgst = parseInt($scope.billcar[j].tax[j].Rate);
////                                       
////                                          Tgst  =   Cgst + Sgst;
////                                             console.log(Tgst)
////                             var htotal =   $scope.arrcon5[j].itemtota * Tgst;
////                 console.log(htotal)
////                 
////                 var hiddenvale = 0;
////                 hiddenvale = $scope.arrcon5[j].itemtota/(1+Tgst);
////                // alert(hiddenvale)
////                 console.log(hiddenvale)
////                 var itemvalue = 0;
////                 //item value is total gst ---valueee
////                 itemvalue =  $scope.arrcon5[j].itemtota-hiddenvale;
////                 console.log(itemvalue)
////                 console.log("welcome")
////                 
////                 var taxcgst  = itemvalue/2;
////                 var taxsgst  = itemvalue/2;
//////                                          
////                                          obj1["hidgst"] = hidgst;
////                                          obj1["hidrate"] = hidrate;
////                                             console.log(hidgst)
////                                             console.log(hidrate)
//                                             
//                     
//                 
//                                             
////                                         }
//                                         
//                                    
//                                 }
//                                 }
////                                 } else{
//                               
//                                      var alibill = $scope.billcar[j].alias;
//                                     //console.log(billcarlength)
//                                    for(m=0;m<=$scope.arrcon5.length-1;m++){
//                                            var total = 0;
//                                          console.log($scope.arrcon5[m].itemtota)
//                                        
//
//                                        
//                                        
//                                           for(n=0;n<=billcarlength-1;n++){
//                                           console.log($scope.arrcon5[m].alias1)
//                                        
////                                               if($scope.arrcon5[m].alias1 == $scope.billcar[n].alias){
////                                                // alert("welcome")
////                                            total+= parseInt($scope.billcar[n].itemtotal);
////                                                 console.log($scope.billcar[n].itemtotal);
////                                                 $scope.arrcon5[m].itemtota= total;
////                                                  console.log($scope.arrcon5[m].itemtota) 
////                                                   var hhgst;
////                                                  
////                                                   console.log($scope.tgst)
////                                                  
////                                                   
////                                                   $scope.arrcon5[m].hidgst = hidgst;
////                                                    
////                                                
////                                                   }
//                                              
//                                                     var totl=0;
//                                              var cg=0;
//                                              var sg=0;
//                                              for(a=0;a<=$scope.arrcon5.length-1;a++){
//                                            // console.log(a)
//                                               
//                                                 totl  +=  $scope.arrcon5[a].hidgst;
//                                                 // console.log(totl) 
//                                                  cg = totl /2;
//                                                  sg = totl /2;
//                                              
//                                                  $scope.cg = cg;
//                                                  $scope.sg = sg;
//                                              $scope.cg    = cg;
//                                                 $scope.sg  = sg;
//                                 }
//                             }
//                            }
//                                      
//                                     
//                                 }
                                 
                            
                                 
                                 
//                             }
                               
                                var duplicate = [];
                                $scope.kottbill = [];
                                var requriedobj= [];
                                var doNotMatch = [];
                                console.log($scope.billcar)
                                for(a=0;a<$scope.billcar.length;a++){
                                    console.log($scope.billcar[a].itemtype)
                                    for(b=0;b<$scope.billcar.length;b++){
                                        if($scope.billcar[a].itemtype == $scope.billcar[b].itemtype){
                                            if(duplicate.indexOf($scope.billcar[b].itemtype)==-1){
                                                var object = {};
                                                 object["itemtype"] = $scope.billcar[b].itemtype;
                                                 object["name"] = $scope.billcar[b].name;
                                                 object["quantity"] = $scope.billcar[b].quantity;
                                                duplicate.push($scope.billcar[b].itemtype);
                                                requriedobj.push(object);
                                                console.log(requriedobj)
                                                $scope.kottbill = requriedobj;
                                                }
                                        }

                                               }
                                }
                                    
                                        for(c=0;c<$scope.kottbill.length;c++){
                                         if(requriedobj.indexOf($scope.billcar[c].name)==-1){
                                                doNotMatch.push($scope.billcar[c].name);
                                                console.log(doNotMatch)
                                            }
                                        }
                            }
                                 }])
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