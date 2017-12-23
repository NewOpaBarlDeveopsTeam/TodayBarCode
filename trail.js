var salecharge = "Sale";
var multicharge = [];
$http.get('/getChargedetails'+salecharge).success(function(response){
  console.log(response)
  $scope.getsaledetails = response;
  $scope.sale = function(sale){
    for(let s=0;s<$scope.getsaledetails.length;s++)
   {
     if($scope.getsaledetails[s].chargeName == sale)
     {
          var object9={};
          $scope.newfinaltotal=0;
          var a=0;
          var addsub = $scope.getsaledetails[s].AddSub;
          var chargeMethod = $scope.getsaledetails[s].ChargeMethod;
          $scope.salechargemethod = $scope.getsaledetails[s].ChargeMethod;
          var chargeValue = $scope.getsaledetails[s].ChargeValue;
          console.log(addsub+"addsub");
          console.log(chargeMethod+"chargemethod");
          console.log(chargeValue +"chargevalue");
          console.log($scope.getsaledetails[s].chargeName);
          console.log($scope.getsaledetails[s].ChargeValue);
          $scope.salechargeName = $scope.getsaledetails[s].chargeName;
          $scope.salechargevalue = $scope.getsaledetails[s].ChargeValue;
          var oldtotal = parseInt($scope.total);
          var oldtotquant = parseInt($scope.totquant)
          console.log(typeof($scope.totquant));
          console.log(typeof(oldtotal));
           if($scope.getsaledetails[s].Editable == true)
           {
           $scope.edit=false;
           $scope.myObj = {
           "background-color" : "white"
            }
            $scope.eidtfun=function(salechargevalue){
            alert(salechargevalue)
             console.log($scope.getsaledetails[s].chargeName);
          /////////for Amount///////////
         if(addsub == "Add" && chargeMethod == "Amount")
             {   
                 $scope.newfinaltotal = oldtotal+chargeValue;
             }
         if(addsub == "Sub" && chargeMethod == "Amount")
             {   
                 $scope.newfinaltotal = oldtotal-chargeValue;
             }
          /////////////////////for PerUnit/////////////
         if(addsub == "Add" && chargeMethod == "PerUnit")
             {   
                 $scope.newfinaltotal=oldtotal+(oldtotquant*chargeValue);
             }
         
         if(addsub == "Sub" && chargeMethod == "PerUnit")
             {   
                 $scope.newfinaltotal=oldtotal-(oldtotquant*chargeValue);
             }
       ////////////////////Percent////////////
         if(addsub == "Add" && chargeMethod == "Percent")
             {   

                $scope.newfinaltotal = oldtotal + (oldtotal*(chargeValue/100));
             }
         if(addsub == "Sub" && chargeMethod == "Percent")
             {   
                $scope.newfinaltotal = oldtotal - (oldtotal*(chargeValue/100));
             }
           
        }
       } 
         else
       {
           alert("non editablellll")
           $scope.edit=true;
           $scope.myObj = {
           "background-color" : " #FFA500"
         }
       }
         /////////for Amount///////////
         if(addsub == "Add" && chargeMethod == "Amount")
             {   
                 $scope.newfinaltotal = oldtotal+chargeValue;
             }
         if(addsub == "Sub" && chargeMethod == "Amount")
             {   
                 $scope.newfinaltotal = oldtotal-chargeValue;
             }
          /////////////////////for PerUnit/////////////
         if(addsub == "Add" && chargeMethod == "PerUnit")
             {   
                 $scope.newfinaltotal=oldtotal+(oldtotquant*chargeValue);
             }
         
         if(addsub == "Sub" && chargeMethod == "PerUnit")
             {   
                 $scope.newfinaltotal=oldtotal-(oldtotquant*chargeValue);
             }
       ////////////////////Percent////////////
         if(addsub == "Add" && chargeMethod == "Percent")
             {   

                $scope.newfinaltotal = oldtotal + (oldtotal*(chargeValue/100));
             }
         if(addsub == "Sub" && chargeMethod == "Percent")
             {   
                $scope.newfinaltotal = oldtotal - (oldtotal*(chargeValue/100));
             }
             object9["salechargeName"]=$scope.salechargeName;
             object9["salechargevalue"]=$scope.salechargevalue;
             object9["newfinaltotal"]=$scope.newfinaltotal;
             multicharge.push(object9);
             $scope.newmulticharge = multicharge;
             console.log(multicharge);
             for(var w=0; w<multicharge.length;w++)
             {
                a =multicharge[w].salechargevalue+a;
                console.log(a);
             }
              $scope.finalll = oldtotal+a;
              console.log($scope.finalll);
     }//if
   }//for
  }//sale function
});//getChargedetails
}])








if($scope.getsaledetails[s].Editable == true)
           {
           $scope.edit=false;
           $scope.myObj = {
           "background-color" : "white"
            }
            $scope.eidtfun=function(salechargevalue,salechargeName){
            var chargeValue = parseInt(salechargevalue);
              alert(typeof(chargeValue));
             alert(salechargeName)
//            chargeValue = parseInt(chargeValue);
//            console.log(chargeValue);
             console.log($scope.getsaledetails[s].chargeName);
          /////////for Amount///////////
         if(addsub == "Add" && chargeMethod == "Amount")
             {   
                 $scope.newfinaltotal = oldtotal+chargeValue;
             }
         if(addsub == "Sub" && chargeMethod == "Amount")
             {   
                 $scope.newfinaltotal = oldtotal-chargeValue;
             }
          /////////////////////for PerUnit/////////////
         if(addsub == "Add" && chargeMethod == "PerUnit")
             {   
                 $scope.newfinaltotal=oldtotal+(oldtotquant*chargeValue);
             }
         
         if(addsub == "Sub" && chargeMethod == "PerUnit")
             {   
                 $scope.newfinaltotal=oldtotal-(oldtotquant*chargeValue);
             }
       ////////////////////Percent////////////
         if(addsub == "Add" && chargeMethod == "Percent")
             {   

                $scope.newfinaltotal = oldtotal + (oldtotal*(chargeValue/100));
             }
         if(addsub == "Sub" && chargeMethod == "Percent")
             {   
                $scope.newfinaltotal = oldtotal - (oldtotal*(chargeValue/100));
             }
           
        }
       } 
         else
       {
           alert("non editablellll")
           $scope.edit=true;
           $scope.myObj = {
           "background-color" : " #FFA500"
         }
       }
         /////////for Amount///////////
         if(addsub == "Add" && chargeMethod == "Amount")
             {   
                 $scope.newfinaltotal = oldtotal+chargeValue;
             }
         if(addsub == "Sub" && chargeMethod == "Amount")
             {   
                 $scope.newfinaltotal = oldtotal-chargeValue;
             }
          /////////////////////for PerUnit/////////////
         if(addsub == "Add" && chargeMethod == "PerUnit")
             {   
                 $scope.newfinaltotal=oldtotal+(oldtotquant*chargeValue);
             }
         
         if(addsub == "Sub" && chargeMethod == "PerUnit")
             {   
                 $scope.newfinaltotal=oldtotal-(oldtotquant*chargeValue);
             }
       ////////////////////Percent////////////
         if(addsub == "Add" && chargeMethod == "Percent")
             {   

                $scope.newfinaltotal = oldtotal + (oldtotal*(chargeValue/100));
             }
         if(addsub == "Sub" && chargeMethod == "Percent")
             {   
                $scope.newfinaltotal = oldtotal - (oldtotal*(chargeValue/100));
             }
             object9["salechargeName"]=$scope.salechargeName;
             object9["salechargevalue"]=$scope.salechargevalue;
             object9["newfinaltotal"]=$scope.newfinaltotal;
             multicharge.push(object9);
             console.log(multicharge)
             console.log(multicharge.salechargevalue);
             parseInt(multicharge.salechargevalue)
             $scope.newmulticharge = multicharge;
             for(var w=0; w<multicharge.length;w++)
             {
                //console.log(multicharge[w].salechargevalue) 
                a =multicharge[w].salechargevalue+a;
                console.log(a);
             }
              $scope.finalll = oldtotal+a;
              console.log($scope.finalll)
//     
//             $scope.tot=0;
//             console.log($scope.newmulticharge.length)
//             for(var w=0;w<$scope.newmulticharge.length;w++)
//             {
//             alert("for loop"+w)
//             console.log($scope.newmulticharge[w].salechargevalue)
//             $scope.tot +=$scope.newmulticharge[w].salechargevalue;
//             console.log($scope.tot);
//             } 

//////////////////////////


       if(addsub == "Add")
         {
           alert("add")
           if($scope.getsaledetails[s].Editable == true)
             {
               alert("edit call")
               $scope.edit=false;
               $scope.myObj = {
               "background-color" : "white"
                }
               $scope.eidtfun=function(salechargevalue){
                 alert(salechargevalue)
                 console.log($scope.getsaledetails[s].chargeName);
                 if(chargeMethod == "Amount")
                   {
                     alert("amount")
                   }
                 
               }//editfun
             }//true
           if($scope.getsaledetails[s].Editable == false)
             {
               alert("non editable call");
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
             }//false
                     object9["salechargeName"]=$scope.salechargeName;
                     object9["salechargevalue"]=$scope.salechargevalue;
                     multicharge.push(object9);
                     $scope.newmulticharge = multicharge;
                     console.log(multicharge);
                    for(var w=0; w<multicharge.length;w++)
                    {
                         $scope.oldtotal+= parseInt($scope.applicableCharge);     
                    }
                     alert($scope.oldtotal);
      }//add






///////////charge///////

 chargecalculation($scope.applicableCharge)
                     function chargecalculation (applicablecharge){
                     alert(applicablecharge+"calcu")
                     object9["salechargeName"]=$scope.salechargeName;
                     object9["salechargevalue"]=$scope.salechargevalue;
                     object9["applicableCharge"]=$scope.applicableCharge;
                     object9["isEditable"] = $scope.getsaledetails[s].Editable;
                     multicharge.push(object9);
                     $scope.newmulticharge = multicharge;
                     console.log(multicharge);
                     console.log( $scope.newmulticharge); 
                     alert(multicharge.length)
                     parseInt(multicharge.applicableCharge)
                     for(var w=0; w<multicharge.length;w++)
                    {
                      $scope.oldtotal+= parseInt(multicharge[w].applicableCharge);     
                    }
                       alert($scope.oldtotal);
                       $scope.newfinaltotal = $scope.oldtotal;
                       alert($scope.newfinaltotal+"final")
                }//chargecalculation

//////////discussed with sir////////
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
               $scope.myObj = {
               "background-color" : "white"
                }
               $scope.eidtfun=function(salechargevalue){
                 alert("editfunction")
                 var chargeValue = parseInt(salechargevalue)
                 console.log($scope.getsaledetails[s].chargeName);
                 if(chargeMethod == "Amount")
                   {
                     alert("Amount")
                     $scope.applicableCharge = chargeValue;
                     alert($scope.applicableCharge);
                    // chargecalculation($scope.applicableCharge,oldoldtot)
                   }
               if(chargeMethod == "PerUnit")
                   {
                     alert("PerUnit")
                     $scope.applicableCharge=(oldtotquant*chargeValue);
                     alert($scope.applicableCharge);
                     //chargecalculation($scope.applicableCharge,oldoldtot)
                     //console.log(oldoldtot)
                   }
               if(chargeMethod == "Percent")
                   {
                     alert("Percent")
                     $scope.applicableCharge =(oldoldtot*(chargeValue/100));
                     alert($scope.applicableCharge);
                     //chargecalculation($scope.applicableCharge,oldoldtot)
                   }
                        
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
                $scope.myObj = {
                "background-color" : " #FFA500"
                }
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
             }//false
                     object9["salechargeName"]=$scope.salechargeName;
                     object9["salechargevalue"]=$scope.salechargevalue;
                     object9["applicableCharge"]=$scope.applicableCharge;
                     object9["isEditable"] = $scope.getsaledetails[s].Editable;
                     multicharge.push(object9);
                     $scope.newmulticharge = multicharge;
                     console.log(multicharge);
                     alert(multicharge.length)
                     parseInt(multicharge.applicableCharge)
//                     chargecalculation($scope.applicableCharge,$scope.oldtotal)
//                     function chargecalculation (applicablecharge,oldoldtot){
                     for(var w=0; w<multicharge.length;w++)
                    {
                      //$scope.oldtotal = oldoldtot;
                      $scope.oldtotal+= parseInt(multicharge[w].applicableCharge);   
                      alert($scope.oldtotal+"chargecalcu")
                      console.log($scope.oldtotal)
                     // $scope.newfinaltotal = $scope.oldtotal;
                    }
                     alert($scope.oldtotal);
                  //}//applicablecharge
      }//add
              $scope.newfinaltotal = $scope.oldtotal;
              alert($scope.newfinaltotal+"final")
     }//if
   }//for
  }//sale function
});//getChargedetails

//noneditable//////////

  if($scope.getsaledetails[s].Editable == true)
             {
               alert("edit call")
               $scope.edit=false;
               $scope.myObj = {
               "background-color" : "white"
                }
               $scope.eidtfun=function(salechargevalue){
                 alert("editfunction")
                 var chargeValue = parseInt(salechargevalue)
                 console.log($scope.getsaledetails[s].chargeName);
                 if(chargeMethod == "Amount")
                   {
                     alert("Amount")
                     $scope.applicableCharge = chargeValue;
                     alert($scope.applicableCharge);
                     chargecalculation($scope.applicableCharge,oldoldtot)
                   }
               if(chargeMethod == "PerUnit")
                   {
                     alert("PerUnit")
                     $scope.applicableCharge=(oldtotquant*chargeValue);
                     alert($scope.applicableCharge);
                     chargecalculation($scope.applicableCharge,oldoldtot)
                     console.log(oldoldtot)
                   }
               if(chargeMethod == "Percent")
                   {
                     alert("Percent")
                     $scope.applicableCharge =(oldoldtot*(chargeValue/100));
                     alert($scope.applicableCharge);
                     chargecalculation($scope.applicableCharge,oldoldtot)
                   }
                        
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
















