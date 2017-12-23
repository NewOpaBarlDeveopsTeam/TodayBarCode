var myApp=angular.module('myApp',[]);
myApp.controller('IndexCntrl',['$scope','$http','$window',
function($scope,$http,$window){
    $scope.phoneNumbr = /^\+?\d{2}[- ]?\d{3}[- ]?\d{5}$/; 
     $scope.mobile=function(mobile){
        var ph=mobile;
        console.log(ph);
        window.sessionStorage.setItem("ph",ph);
        //alert(ph);
        $http.post('/item',$scope.user).success(function(response){
        $scope.id=response._id;
        window.location.href="resttype.html";
    })
    }
}]);
myApp.controller('CatCntrl',['$scope','$http','$window',
function($scope,$http,$window){
    console.log("HEllo from controller")
    //$scope.category=[];
    $scope.restname=function(name)
    {
        window.sessionStorage.setItem("Restname",name)
    }
    $http.get('/category').success(function(response){
        $scope.cat=response;
    });

     $http.get('/resttype').success(function(response){
        $scope.resttype=response;
        //alert($scope.resttype)
    });
    }]);

myApp.controller('MenuCntrl',['$scope','$http','$window',
function($scope,$http,$window){
    console.log("HEllo from controller")
    var name=window.sessionStorage.getItem("Restname")
    if(name=="Kamat")
        {
            //alert(name)
        $http.get('/kamat').success(function(response)
        {
            console.log(response)
            $scope.category=response[0].cat[0];
            console.log($scope.category)
        })
    }
    else if(name=="Juice Center")
    {
        //alert(name)
        $http.get('/juice').success(function(response)
        {
            console.log(response)
            $scope.category=response[0].cat;
            console.log($scope.category)
        })
    }
    //alert(name)
    $scope.catName=function(name)
    {
        //alert(name)
    window.sessionStorage.setItem("Mname",name)
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
}])

     
myApp.controller('FirstCntrl',['$scope','$http','$window',
function($scope,$http,$window){
    var restname=window.sessionStorage.getItem("Restname")
    var item=window.sessionStorage.getItem("Mname")
    //alert("the item is"+item)
    //alert("the cat is"+restname)
    if(restname=="Kamat")
    {

    $http.get('/kamitems'+item).success(function(response)
    {
        $scope.items=response[0].cat[0].menu
        console.log($scope.items)
    })
}
else if(restname=="Juice Center")
{
    $http.get('/juiceitems'+item).success(function(response)
    {
        $scope.items=response[0].cat[0].menu
        console.log($scope.items)
    })
}
       
    $scope.itotal= window.sessionStorage.getItem("cal");
    //alert($scope.itotal);
    $scope.count=1;
    $scope.v1="0";
    
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
    
var mp= window.sessionStorage.getItem("ph");
/*var ical= window.sessionStorage.getItem("cal1");*/
//alert(ical);
/*console.log("Hello calculator"+ical);
$scope.t1=1;
$scope.t2=2;
$scope.to=$scope.t1*$scope.t2;

$scope.sc=ical*0.1;
if(ical==0)
{
    $scope.cal2=0;
}
else{
       

        $scope.cal2=parseFloat($scope.sc)+parseFloat(ical);
    }*/
    
        
    $http.get('/itemlist', {params:{"mobile":mp}}).success(function(response){
        console.log("entry for loop");
        $scope.itemlist=response.restname;
        console.log($scope.itemlist)
        
       /* $scope.tol=response.restname[1].item.total;
        console.log($scope.tol);*/
        //alert($scope.itemlist);
        var total1=response.restname.length;
        //alert(total1);

        console.log("the lenght is"+total1);
        //console.log(total);
        var subtol1=0
        for(i=0;i<total1;i++)
        {
            var subtol=0;
            //alert("main loop"+i)
            var rstnam=$scope.itemlist[i].name
            var itemlen=$scope.itemlist[i].item.length;
            //alert(itemlen)
        for(j=0;j<itemlen;j++)
        {
            //alert("sub loop"+j)
            //alert($scope.cal1)
            //alert($scope.itemlist[i].item[j].total)
            subtol += parseInt($scope.itemlist[i].item[j].total);

            //alert(subtol)
            //alert($scope.cal1)
        }
        //alert(subtol)
        $scope.sc=subtol*0.1;

        $scope.total=parseFloat($scope.sc)+parseFloat(subtol);
        var subcal=mp+","+rstnam+","+subtol+","+$scope.sc+","+$scope.total;
        $http.put('/subtol/'+subcal).success(function(response){
        $scope.id=response._id;
    })
    }

        
        //alert(rstnam)
        subtol1 += parseInt(subtol);
        //alert(subtol1)
         
        /*console.log("entered for loop")*/
           //$scope.cal1 += parseInt(response.item[i].total);
           //alert($scope.cal1);
           // window.sessionStorage.setItem("cal1",$scope.cal1);
           //$scope.sub=($scope.cal/100)*10;
           //alert($scope.sub);
       // console.log("subtotal is"+$scope.cal1);

        });

        //$scope.cal+=10;
        //($scope.cal);
        
        
/*alert($scope.total);
$scope.result = ($scope.total / 100) * $scope.per;
*/


        /*var total1=response.item[1].total;
        alert(total1);
        var total2=response.item[2].total;
        if (total2==null)
        {
            var total12="0"
            alert(total12);
        }
        else{
            var total12=total2;
            alert(total2);
        }
        alert(total2);
        var total3=response.item[3].total;
        alert(total3);
        var total4=response.item[4].total;
        alert(total4);
        $scope.cal=+total + +total1 + +total2  + +total3 + +total4;
        alert($scope.cal);*/
    
    $scope.hi="hiii";
   
   //alert($scope.Rs);
    console.log("hi there");
    
    /*$scope.count1=0;*/
    $scope.test = [];
    //window.sessionStorage.setItem("Order",$scope.test);

    //alert($scope.test);
    $scope.test1=[];
    console.log("Hello From FirstCntrl");
    $http.get('/contactlist').success(function(response)
    {
        var res=response;
        console.log(res);
    });
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
        window.location.reload();
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
        window.location.reload();
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
    $scope.additems=function()
    {
       var mp= window.sessionStorage.getItem("ph");
        var name=$scope.name;
        //alert(name);
        var count=$scope.count;
        //alert(count);
        var cal=$scope.cal;
        //alert(cal);
        var itemdata=name+","+count+","+cal+","+mp+","+restname;
        $http.put('/item/'+itemdata).success(function(response){
        $scope.id=response._id;
        //alert($scope.id);
        /*$http.put ('/item/'+itemdata).success(function(response){
        var username=response.name;*/
        })
        window.location.href="resttype.html";
    }


    $scope.count1=function(event){
        $scope.name= window.sessionStorage.getItem("Name");
   $scope.Rs=window.sessionStorage.getItem("RS");
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
        $scope.cal=$scope.Rs*$scope.count;
        //alert($scope.cal);
         window.sessionStorage.setItem("cal",$scope.cal);
        //alert($scope.count);
        //alert($scope.Rs);
        
        //alert(cal);
    }
    //alert($scope.count);
    //alert($scope.Rs);
    $scope.cal=$scope.Rs*$scope.count;
    }]);