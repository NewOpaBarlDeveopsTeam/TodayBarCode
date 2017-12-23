var app=angular.module('myapp',[])
app.controller('Tranctioncntrl',['$scope','$http','$window','$filter',
 	   function($scope,$http,$window,$filter){
 	   
 	   	
 $scope.date =window.sessionStorage.getItem("sessionrd");
 
 console.log($scope.date);
 $scope.date2 ={date1:new Date()}
           
var salereport=[];
$scope.all=true;
 
$http.get('/tranction').success(function(response)
        {
 	   	 
 	   		console.log(response);
  $scope.newtransaction = response;
  
// 	   		$scope.trsale=response[0].TransctionType;
// 	   		$scope.trsale1=response[1].TransctionType;
 	   	});

$http.get('/partyfetch').success(function(response)
      {

	 
	      console.log(response);
	      $scope.partynames=response;
     })
$http.get('/uomfetch').success(function(response)
      {
         console.log(response);
       $scope.uomsss=response;

	 
	    $scope.getuom=function(uom){
           alert(uom)
    $scope.uo = uom;
     console.log($scope.uo);
     for(u=0;u<response.length;u++){
      // console.log(response[u].UOM);
      if($scope.uo== response[u].UOM){
        console.log(response[u].UOMID)
        $scope.uomid=response[u].UOMID;
      }
     }

     

     
   }
	 })
$scope.login= window.sessionStorage.getItem("loginres1")
             console.log($scope.login);

$http.get('/sesfetch'+$scope.login).success(function(response)
      {
      console.log(response);
	  $scope.sesname=response;
	 
     })

$http.get('/stocktype'+$scope.login).success(function(response)
      {
 
	   console.log(response);
	   $scope.typename=response;
       $scope.getstockid=function(q1){
           alert(q1);
    $scope.typeid = q1;
     console.log($scope.typeid);
     for(t=0;t<response.length;t++){
      // console.log(response[u].UOM);
      if($scope.typeid== response[t].StockPointName)
      {
        console.log(response[t].StockPointID);
        $scope.uomid=response[t].StockPointID;
        console.log($scope.uomid);
       }
      }
    }

      })
$http.get('/itembar'+$scope.login).success(function(response)
     {
	console.log(response);
	$scope.itemname=response;
	$scope.posid=response[0].POSID;
	console.log($scope.posid);

	// for(var  v=0;v<$scope.itemname.length;v++)
	// { 
	// 	$scope.itemcodes = $scope.itemname[v].ItemCode;
	// 	console.log($scope.itemcodes);

	// }


})

 $scope.getcode=function(codes,uom,allres)

      { $scope.num=1
        console.log($scope.allres);

        	// alert(codes);
        	var code1=codes;
        	console.log(code1);

 $http.get('/getsku'+code1).success(function(response){
 	console.log(response);
 	console.log(response[0].ItemSKUID);
 	var skuid=response[0].ItemSKUID;
 	$scope.baritemname= response[0].ItemName;
 	$scope.itemidd=response[0].itemId;
    console.log($scope.itemidd);
 	console.log($scope.baritemname);
 	console.log(skuid);
   $scope.uomsize=response[0].UOMSize;
  console.log($scope.uomsize);

$http.get('allrate'+skuid).success(function(response){
	console.log(response);
	$scope.salerates=response;
})
$http.get ('/uomid'+$scope.uomsize).success(function(response){
  console.log(response);
  $scope.uomsizeno=response[0].UOMSize;
  console.log($scope.uomsizeno);
 }) 


 })


      }   


    


$scope.getsection=function(ratess,num)
{  
  alert(num)
	$scope.pieceno=num;
  console.log($scope.pieceno);
	alert(ratess);
	$scope.rate = ratess;
	console.log($scope.salerates)
	console.log($scope.salerates.length)
	console.log($scope.salerates.SectionName)
	for(var s=0;s<$scope.salerates.length;s++){

		//console.log($scope.salerates[s].SectionName)

	if($scope.rate == $scope.salerates[s].SectionName){


     console.log($scope.salerates[s])
     console.log($scope.salerates[s].SaleRate)
     $scope.sectionid=$scope.salerates[s].SectionId

      $scope.saleerate = $scope.salerates[s].SaleRate;
      console.log($scope.saleerate);
     $scope.saleerate12 = $scope.salerates[s].SaleRate*num;
     console.log($scope.saleerate12);

	 }
   }
}


 $scope.rats = function(itcode,saleerate12,num,sectionss,barrr){
   
    var obj = {};
    $scope.discountrate=0
    console.log($scope.pieceno+"pieces")
    console.log($scope.baritemname+"item")
    console.log( $scope.saleerate+"value")
    obj["item"]=$scope.baritemname;
     // obj["quantity"]=$scope.qunty;
    obj["pieces"]=$scope.pieceno;
    // obj["umo"]=$scope.umosize;
    obj["Rate"]=$scope.saleerate;
    obj["discrate"] = $scope.discountrate;
    obj["disctype"] = $scope.type;
    obj["value"]= $scope.saleerate12;
    obj["uomsize"]=$scope.uomsizeno;
    obj["uomname"]=$scope.uo;
    alert($scope.barrr+"barrrrrrr")
   alert($scope.num+"salepieces")
   alert($scope.uom+"uomuom")
   alert($scope.sectionss+"sectionsssectionss")
   alert($scope.saleerate12+"saleerate12saleerate12")
    salereport.push(obj);
    $scope.salereport1 = salereport;
    console.log($scope.salereport1)
    console.log($scope.salereport1.length);
    $scope.totalitems=$scope.salereport1.length
    $scope.finalvalue=0;
    $scope.piece=0;

    for(var s=0;s<$scope.salereport1.length;s++)
    {
      
      console.log($scope.salereport1[s].value);
      console.log($scope.salereport1[s].pieces);

      $scope.finalvalue=$scope.finalvalue+$scope.salereport1[s].value;
      $scope.piece=$scope.piece+$scope.salereport1[s].pieces;

    } 
    // $scope.saleerate12=null; 
   $scope.barrr = null;
   $scope.num = null;
   $scope.uom = null;
   $scope.sectionss = null;
   $scope.saleerate12 = null;
   
  }

$http.get('/getinvoice'+$scope.login).success(function(response){
	console.log(response);
	$scope.vocherno=response[0].invoiceNumber;
	console.log($scope.vocherno);
})

$scope.salesave = function(voucherdate,vclass,sectionnames){
  alert(sectionnames)
 
     console.log(voucherdate);
     var voucherclass=vclass;
     var section= sectionnames;

        
   
    var  dates  = new Date(((new Date(voucherdate).toISOString().slice(0, 23))+"-05:30")).toISOString();
    $scope.hhmmsstt = $filter('date')(new Date(), 'hh:mm:ss a');
    console.log($scope.hhmmsstt)
    itemid = $scope.itemidd
    console.log(itemid)
    console.log($scope.itemidd);
    alert("hai i got a save calll");
    var posname = $scope.login;
    var stockinword="No"
    
    var salereturn = $scope.vocherno+","+itemid+","+$scope.login+","+dates+","+$scope.posid+","+$scope.saleerate+","+$scope.pieceno+","+$scope.saleerate12+","+$scope.uomsize
                      +","+$scope.uomid+","+$scope.uomid+","+stockinword;
    console.log(salereturn);
    
    $http.post('/saledetail'+salereturn).success(function(response){
      console.log(response);

             }) 
     var salereturn12 = $scope.vocherno+","+itemid+","+$scope.login+","+dates+","+$scope.posid+","+voucherclass+","+section+","+$scope.hhmmsstt+","+$scope.sectionid;
     $http.post('/saleheader'+salereturn12).success(function(response){
      console.log(response);

             }) 
    
  }

  // $scope.total=function(num){
  //   alert(num);
  //   $scope.pieceno=num;
  //   console.log($scope.saleerate12)

  // }
  


}]);