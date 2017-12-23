/* using the express library for requests for mongodb database */
var Printer = require('node-printer');
var options = { media: 'Custom.200*600mm', n:3};
var express=require('express');
var app=express();
var mongojs=require('mongojs');
var officegen = require('officegen');
var csvWriter = require('csv-write-stream')
var writer = csvWriter()
const assert = require('assert');
var FileReader = require('filereader'), fileReader = new FileReader();

var db=mongojs('restaurant',['images','feedbackmaster','orderfeedback','item','menu','service','category','resttypes','Kamat','Kamatorder','juiceorder','KamatOrder','user','tags','transaction','saleinvoice','mode','transactiondetail','batch','bank',
  'transactionSeriesInvoice','itemrate','item','menu','order','useritem','purity','uom','pct','labcal','useradj',
  'barcodesumm','stockpointmaster','configurations','inventorygroupmaster','salescategorymaster','itemtype','taxrate',
  'itemdata','tax','taxation','session','restaurantid','ChargesMaster','chargename','configurationmaster']);
var bodyParser=require('body-parser');
var fs = require('fs');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


app.use(express.static('public'));
app.use(bodyParser.json());  

Printer.list();



var imgPath = '/path/to/some/img.jpg';
var imgPath1 = '/path/to/some/dosa.jpg';

mongoose.connect('localhost', 'testing_storeImg');


// example schema
var schema = new Schema({
    img: { data: Buffer, contentType: String },
    itemname:String
});


// our model
var A = mongoose.model('A', schema);

mongoose.connection.on('open', function () {
  console.error('mongo is open'); 

  // empty the collection
  A.remove(function (err) {
    if (err) throw err;

    console.error('removed old docs');

    // store an img in binary in mongo
    var a = new A();
    a.img.data = fs.readFileSync(imgPath);
    a.img.contentType = 'image/png',
    a.itemname="MasalaDosa";

    a.save(function (err, a) {
      if (err) throw err;

    //  console.error('saved img to mongo');

    
      // start a demo server
      //var server = express.createServer();
      app.get('/img', function (req, res, next) {
       
         db.images.find(function(err,doc){
        //console.log(doc);
        res.json(doc);
        //console.log(doc)
       /* A.findById(a, function (err, doc) {
          if (err) return next(err);
          res.contentType(doc.img.contentType);
          res.send(doc);
          console.log(doc);*/

        });
      });

      /*app.on('close', function () {
        console.error('dropping db');
        mongoose.connection.db.dropDatabase(function () {
          console.error('closing db connection');
          mongoose.connection.close();
        });*/
      //});


      //console.error('saved img to mongo');
    });
  });
});
/*app.post('/item',function(req,res){
    var itemname=req.body.name;
    console.log(itemname);
    var count=req.body.count;
    console.log(count);
    var total=req.body.cal;
    console.log(total);
    var document={name:itemname,item:count,total:total};
    
    db.item.insert(document,{w:1},function(err,doc){
        
        res.json(doc);
        });
})*/
var count=0;
app.post('/item',function(req,res){
    count++;
    console.log("igot mobile number");
    var ph=req.body.mobile;
    console.log(ph);
    console.log(count)
    var document1={orderid:count,feeddes:[{"Fid":"FI1","rating":""},{"Fid":"FI2","rating":""},{"Fid":"FI3","rating":""}]}
    /*db.orderfeedback.insert(document1,{w:1})*/

    var document={mobile:ph,orderid:count,orderstatus:"NotSelected"};
    db.KamatOrder.insert(document,{w:1},function(err,doc){
        res.json(doc);
        //console.log(doc);
    })
    /*db.juiceorder.insert(document,{w:1});*/
})




app.get('/resttype',function(req,res)
{
    console.log("i received a get request from menu1");
//    db.resttypes.find(function(err,doc){
   db.POSMaster.find(function(err,doc){
        //console.log(doc);
        res.json(doc);
})
})

app.put('/restorder:restadd',function(req,res)
{
    console.log("i received a restaurant request for add");
    
    
    var str=req.params.restadd;
    console.log(str);
    var str_array=str.split(",");
    var mobile=str_array[0];
    console.log(mobile);
    var restname=str_array[1];
    console.log(restname);
    
    db.KamatOrder.update({"mobile":mobile},{$set:{orderstatus:"NotSelected"}},function(err,doc){
  
        //console.log(doc);
        res.json(doc);
})
})


app.get('/feedback',function(req,res)
{
    //console.log("i received a get request from feedback")
    db.feedbackmaster.find(function(err,doc)
    {
        res.json(doc);
    })
})
//db.SaleCategoryMaster.find({"SaleCategoryName":"Combo 3"},function(err,doc){
//    console.log("dhgfghjkl;kjhgfdsdfghjk")
//       //res.json(doc);
//         console.log(doc);
//})
app.get('/1234:hotel',function(req,res)
{ 
    console.log("hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh")
    console.log(req.params.hotel);
    var resmenus = req.params.hotel;
    console.log("i received a get request from kamat"+resmenus);
//    db.Kamat.find(function(err,doc){
//        //console.log(doc);
//        res.json(doc);
//        console.log(doc);
      
       db.SaleCategoryMaster.find({POSName:resmenus},function(err,doc){
       res.json(doc);
         console.log(doc);
})
})


app.get('/kichen',function(req,res)
{
    console.log("i received a get request from kamat");
    db.Kamatorder.find(function(err,doc){
        //console.log(doc);
        res.json(doc);
})
})
//app.get('/juice',function(req,res)
//{
//    console.log("i received a get request from juice");
//    db.Juice.find(function(err,doc){
//       // console.log(doc);
//        res.json(doc);
//})
//})
app.get('/KamathSimplySouth',function(req,res)
{
    console.log("i received a get request from juice");
    db.SaleCategoryMaster.find(function(err,doc){
       // console.log(doc);
        res.json(doc);
})
})
//app.get('/PunjabiFood',function(req,res)
//{
//    console.log("i received a get request from juice");
//    db.SaleCategoryMaster.find(function(err,doc){
//       // console.log(doc);
//        res.json(doc);
//})
//})
//app.get('/category',function(req,res)
//{
  //  console.log("i received a get request from menu1");
   // db.SaleCategoryMaster.find(function(err,doc){
        //console.log(doc);
      //  res.json(doc);
//})
//})
app.get('/service',function(req,res)
{
    console.log("i received a get request from service");
    db.service.find(function(err,doc){
       // console.log(doc);
        res.json(doc);
})
})


//kamatorderlistmob

app.get('/kamatorderlistmob:kmorder',function(req,res)
{
//    var rest=req.query.restauran;
//  console.log(rest)
    var str=req.params.kmorder;
    console.log(str);
    var str_array=str.split(",");
    
    var mobile=str_array[0];
    console.log(mobile)
    
    var restlog=str_array[1];
     console.log(restlog);
    
    console.log("i received $$$$$$$$$$$$$$$");
   
   // db.KamatOrder.find({"mobile" : mobile,"restaurant": restlog},function(err,doc){
    
  db.KamatOrder.find({"mobile" : mobile},function(err,doc){
        console.log(doc);
        res.json(doc);
       //console.log("response is"+doc); 
        console.log("*************************");

    })
})








app.get('/orderst:mp',function(req,res)
{
    var mobile=req.params.mp;

    console.log("i received a get request from kamat orderstatus1111111");
    console.log(mobile);
    db.KamatOrder.findOne({$and:[{mobile:mobile},{orderstatus:{$ne:"Delivered"}},{orderstatus:{$ne:"Cancelled"}}]},function(err,doc){
        //console.log(doc);
        res.json(doc);
        //console.log("response is");
       // console.log(doc);
})
})

app.get('/orderlist:edit',function(req,res)
{
    var str=req.params.edit;
    console.log(str);
    var str_array=str.split(",");
    var ph=str_array[0];
    var status1=str_array[1];
    var status2=str_array[2];    
    console.log("i received a get request from kamat orderstatus66666");
    console.log(ph);
    console.log(status1);
    console.log(status2);
    db.KamatOrder.find({"mobile":ph,$or:[{"orderstatus":status1},{"orderstatus":status2}]},function(err,doc){
        //console.log(doc);
        res.json(doc);
        console.log("response is 66666");
        console.log(doc);
})
})

//app.get('/kamatorderlistkitchen',function(req,res)
//{
//    console.log("kamat kichennnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn")
//    console.log("i received a get request from kamat orderstatus 33333");
//    //db.KamatOrder.find({$or:[{orderstatus:"Paid"},{orderstatus:"InProgress"}]},function(err,doc){
//    //db.KamatOrder.find({$or:[{orderstatus:"Paid"},{orderstatus:"InProgress"}]},function(err,doc){
//       db.KamatOrder.find({ "restaurant" : "Kamath Simply South",$or:[{ orderstatus:"Paid",orderstatus:"Ready"}]},function(err,doc){
//           //db.KamatOrder.find({"mobile":ph,$or:[{"orderstatus":status1},{"orderstatus":status2}]
//           
//        console.log(doc);
//        res.json(doc);
//          
//})
//})





app.get('/kamatorderlistkitchen',function(req,res)
{
    
    console.log("i received a get request from kamat orderstatus 33333");
    
    db.KamatOrder.find({$or:[{orderstatus:"Paid"},{orderstatus:"InProgress"},{orderstatus:"Ready"}]},function(err,doc){
        console.log(doc);
        res.json(doc);
        console.log("response is"); 
       // console.log(doc);
})
})

app.get('/kamatorderlistcounter',function(req,res)
{
    
    console.log("i received a get request from kamat orderstatus 5555");
    
    db.KamatOrder.find({orderstatus:"Ready"},function(err,doc){
        //console.log(doc);
        res.json(doc);
        console.log("response is"); 
       // console.log(doc);
})
})
app.get('/kamatorderlistpayment:redit',function(req,res)
{
    console.log("welcome to the world of scrpting")
    
    var str=req.params.redit;
    console.log(str);
    var str_array=str.split(",");
    var mobile1122=str_array[0];
    console.log(mobile1122);
    var restlogin=str_array[1];
    console.log(restlogin);
    
    
    
    
    console.log("i received a get request from kamat orderstatus11111111111111111111111111");
    //db.KamatOrder.find({"mobile" : mobile1122,"restaurant" : restlogin, "orderstatus":"Confirmed"},function(err,doc){
db.KamatOrder.find({"mobile" : mobile,"restaurant" : restlogin},function(err,doc){
        console.log(doc);
        res.json(doc);
        console.log("response is"); 
        //console.log(doc);
})
})



app.get('/itemlist',function(req,res)
{
    var ph=req.query.mobile;
    console.log("i received a get request from kamat orderstatus");
    db.KamatOrder.findOne({$and:[{mobile:ph},{orderstatus:"Selected"}]},function(err,doc){
       // console.log(doc);
        res.json(doc);
})
})
app.get('/itemlistcart',function(req,res)
{
    var ph=req.query.mobile;
    console.log(ph)
    var restt=req.query.restaurant;
    console.log(restt)
    
    console.log("i received a get request from kamat orderstatus itemlistcart");
    //i changed here 08:07
    
    
    //db.KamatOrder.findOne({$and:[{"mobile":ph,"restaurant": restt },{"orderstatus":"Selected"}]},function(err,doc){
        db.KamatOrder.find({"mobile":ph,"restaurant": restt },function(err,doc){
      console.log(doc);
        res.json(doc);
})
})
app.get('/itemlistcartconfirmed',function(req,res)
{
    var ph=req.query.mobile;
  console.log(ph)
  var restt=req.query.restaurant;
    console.log(restt)
    console.log("i received a get request from kamat orderstatus itemlistcart888888");
    console.log(ph);
    db.KamatOrder.find({"mobile":ph,"restaurant": restt },function(err,doc){
        console.log(doc);
//    db.KamatOrder.findOne({$and:[{"mobile":ph},{"orderstatus":"Confirmed"}]},function(err,doc){
//        console.log(doc);
       res.json(doc);

    })
//})
   })


app.get('/kamitems:item',function(req,res)
{
    console.log("i received a get request from item");
    var items=req.params.item;
   // console.log(items);   
    db.Kamat.find({"cat.name":items},{"cat.$":1},function(err,doc)
    {
        //console.log(doc);
        res.json(doc)
    })
})
app.get('/juiceitems:item',function(req,res)
{
    console.log("i received a get request from item");
    var items=req.params.item;
    //console.log(items);   
    db.Juice.find({"cat.name":items},{"cat.$":1},function(err,doc)
    {
        //console.log(doc);
        res.json(doc)
    })
})





app.put('/feedbdata/:data',function(req,res){
    console.log("I received a feedbackdata request")
    var str=req.params.data;
    console.log(str);
    var str_array=str.split(",");
    var fid=str_array[0];
    console.log(fid);
    var rating=str_array[1];
    console.log(rating);
    var orderid=str_array[2];
    console.log(orderid);
    var oid=parseFloat(orderid)
    
    db.orderfeedback.update({"orderid":oid,"feeddes.Fid":fid},{$set:{"feeddes.$.rating":rating}})
});
app.put('/status/:edit',function(req,res){
    console.log("I received a put request")
    var str=req.params.edit;
    console.log(str);
    var str_array=str.split(",");
    var mobile=str_array[0];
    console.log(mobile);
    var name=str_array[1];
    console.log(name);
    var status=str_array[2];
    console.log(status);
    
    db.Kamatorder.update({"mobile":mobile,"item.name":name},{$set:{"item.$.status":status}})
});


//kitchen ststus hard codedd here
app.put('/statuschange/:edit',function(req,res){
    console.log("I received a order status change request4444")
    var str=req.params.edit;
    console.log(str);
    var str_array=str.split(",");
    var mobile=str_array[0];
    console.log(mobile);
    
    var status=str_array[1];
    console.log(status);    
    db.KamatOrder.update({"mobile":mobile,"restaurant":"Kamath Simply South"},{$set:{"orderstatus":status}})
});

app.put('/order11status:edit',function(req,res){
    console.log("I received orderstatus request212121");
    var str=req.params.edit;
    console.log(str);
    var str_array=str.split(",");
    var mobile=str_array[0];
    console.log(mobile);
   var restaurant=str_array[1];
    console.log(restaurant);  
     
    var status=str_array[2];
    console.log(status);     
   // db.KamatOrder.update({"mobile":mobile,"restaurant":restnamee},{$set:{"orderstatus":status}})
    db.KamatOrder.update({"mobile" : mobile,"restaurant":restaurant},{$set:{"orderstatus":status}})
    console.log("orderstatus request function ends");
    });




//this is for all stsusses

app.put('/orderstatus:edit',function(req,res){
    console.log("I received orderstatus request22222");
    var str=req.params.edit;
    console.log(str);
    var str_array=str.split(",");
    var mobile=str_array[0];
    console.log(mobile);
   
     var session=str_array[1];
   var session11=parseInt(session)
    console.log(session11);
     var sessdate=str_array[2];
    console.log(sessdate);
    
    
   
    var restaurant=str_array[3];
    console.log(restaurant);  
     
    var status=str_array[4];
    console.log(status);     
   // db.KamatOrder.update({"mobile":mobile,"restaurant":restnamee},{$set:{"orderstatus":status}})
    db.KamatOrder.update({"mobile" : mobile,"restaurant":restaurant},{$set:{"Session":session11,"Sessiondate":sessdate,"orderstatus":status}})
    console.log("orderstatus request function ends");
    });








app.put('/sessionadd/:sessbind',function(req,res){
    console.log("session storage calleddddddddd");
    var str=req.params.sessbind;
    console.log(str);
    var str_array=str.split(",");
    var sesdate=str_array[0];
    console.log(sesdate);
    var session=str_array[1];
    console.log(session); 
    var mobile=str_array[2];
    console.log(mobile);
     var resta=str_array[3];
    console.log(resta);
        
    
    db.KamatOrder.update({"mobile" : mobile,"restaurant" : resta},{$set:{"sesdate":sesdate,"session":session}})
    
    console.log("session update ends");
    });

app.get('/restnamee:restdata',function(req,res){
    console.log("I received a put +++++++++++++++++++++++++++++++++++++++")
    var str=req.params.restdata;
    console.log(str);
    var str_array=str.split(",");
    var mp2=str_array[0]
    console.log(mp2);
    var restname1=str_array[1];
    console.log(restname1);
    
    var name3=str_array[2];
    console.log(name3);
    db.KamatOrder.find({"mp" : mp2},{item:[{"restname" : restname1,"name" : name3}]},function(err,doc){

        res.json(doc);
        console.log("529"+doc)
      });
  
});



app.get('/catrest:catdata',function(req, res){
    console.log("this is for to get category item");
    var catstr = req.params.catdata;
    console.log(catstr);
    var strarr= catstr.split(",");
    
    var mobil=strarr[0];
    console.log(mobil);
    var rest=strarr[1];
    console.log(rest);
    db.KamatOrder.find({"mobile" : mobil,"restaurant" : rest},function(err,doc){
        res.json(doc);
      })
})

app.post('/restinsert:restitemdata',function(req,res){
    console.log("I received a put ..............request............................")
    var str=req.params.restitemdata;
    console.log(str);
    var str_array=str.split(",");
    var name=str_array[0];
    console.log(name);
    var count=str_array[1];
    var a = parseInt(count)
    console.log(a);
    var cal=str_array[2];
    console.log(cal);
    var mobileno=str_array[3];
    console.log(mobileno);
    var restname=str_array[4];
    console.log(restname);
    var cprice=str_array[5];
    console.log(cprice);
    cprice = parseInt(cprice);
//    var pri = cprice * a;
//    console.log(pri)
    
    console.log("Item added details display ends here");
// if(categname = itemname22){a }, $inc: { 
     
db.KamatOrder.insert({"mobile" : mobileno,"restaurant" : restname,"item":[{"name" : name,"quan" : a, "total" :cal}],"orderstatus":"Selected"},function(err,doc){
   
//    db.KamatOrder.insert({"mobile" : "7795516061","restaurant" : "Kamath Simply South","item":{"name" : "Carrot Halwa","quan" : 2, //"total" : 100}})
//    db.KamatOrder.update({"mobile" : mobileno},{$set:{"restaurant" : restname,"item.name" : name,"item.quan" : a, "item.total" //:cprice}}, function(err, doc) {
//    res.json(doc);
//    
        res.json(doc);
    console.log("testaurant inserteddddddd"+doc)
    });


})



////this aug19

app.get('/kamatorderlist:kmorder',function(req,res)
{
//    var rest=req.query.restauran;
//  console.log(rest)
    var str=req.params.kmorder;
    console.log(str);
    var str_array=str.split(",");
    var restlog=str_array[0];
     console.log(restlog);
    var mobile=str_array[1];
    console.log(mobile)
    console.log("i received a get request from kamat orderstatus1111111");
   db.KamatOrder.find({orderstatus:"Paid"},function(err,doc){
//    db.KamatOrder.find({"restaurant": str,$or:[{orderstatus:"Confirmed"},{orderstatus:"Paid"},{orderstatus:"Selected"},{orderstatus:"NotSelected"}]},function(err,doc){
//    
        res.json(doc);
       //console.log("response is"+doc); 
        console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@");

    })
})
app.get('/freqadded',function(req, res){
 db.frequentlyOrdered.find(function(err,doc){
        res.json(doc);
      })
})

//30th aug

app.post('/postcart:poscartt',function(req,res){
     var catstr = req.params.poscartt;
    console.log(catstr);
     var str_array=catstr.split(",");
    var number=str_array[0];
    console.log(number);
    var name=str_array[1];
    console.log(name);
    
    var section=str_array[2];
    section = parseInt(section);
    console.log(section);
    var count=str_array[3];
     count = parseInt(count);
    console.log(count);
     var itemtotal=str_array[4];
     itemtotal = parseInt(itemtotal);
    console.log(itemtotal);
    
    var subtotal=str_array[5];
    subtotal = parseInt(subtotal);
    console.log(subtotal);
    var totalqan=str_array[6];
    totalqan = parseInt(totalqan);
    console.log(totalqan);
    var serchar=str_array[7];
    serchar = parseInt(serchar);
    console.log(serchar);
    var sercharc=str_array[8];
    sercharc = parseInt(sercharc);
    console.log(sercharc);
    var serchars=str_array[9];
    serchars = parseInt(serchars);
    console.log(serchars);
    console.log("welcom"+serchars)
    var totGst=str_array[10];
    totGst = parseInt(totGst);
    console.log(totGst);
      var finaltotal=str_array[11];
      finaltotal = parseInt(finaltotal);
    console.log(finaltotal);
      var selectpicker=str_array[12];
    console.log(selectpicker);
    
    var ii=str_array[13];
    console.log(ii);
     var comment=str_array[14];
    console.log(comment);
    var Change=str_array[15];
    Change = parseInt(Change);
    console.log(Change);
    var sdate=str_array[17];
    console.log(sdate);
     var session=str_array[18];
    session = parseInt(session);

    console.log("donweeeeeeeeeee"+session);
    
     
     var restaurant=str_array[19];
    console.log(restaurant);
    var itemtype=str_array[20];
    console.log(itemtype);
    
    
     

    if(ii=="0"){
    db.KamatOrder.insert({"mobile" : number,item:[{name : name,Price: section,quantity:count,itemtotal:itemtotal,Comment:comment,itemType:itemtype}],Subtotal:subtotal,TotalNoItems:totalqan,ServiceCharge:serchar,Cgst:sercharc,Sgst:serchars,TotalGst:totGst,FinalTotal:finaltotal,Sessiondate:sdate,session:session,ChangeAmount:Change,orderstatus:"Paid",posname:restaurant},function(err,doc){
//   Orderstatus:selectpicker,
        res.json(doc);
      })
    }
    else
        {
            db.KamatOrder.update({"mobile" : number},{$push:{item:{name:name,Price:section,quantity:count,itemtotal:itemtotal,Comment:comment,itemType:itemtype}}},function(err,doc){
        res.json(doc);
          console.log("Item added details display ends here");
      } );
        }
      
})


app.get('/summery:mobile',function(req, res){
    console.log(req.params.mobile)
var mob = req.params.mobile;
    console.log("this is a numghjkl;lkjhgfghjkl;")
     db.KamatOrder.find({"mobile" : mob},function(err,doc){
        res.json(doc);
      })

})
app.get('/summitem:itemname',function(req, res){
    console.log(req.params.itemname)
var itemname = req.params.itemname;
    console.log("this is a numghjkl;lkjhgfghjkl;")
     db.itemdata.find({"name" : itemname},function(err,doc){
        res.json(doc);
      })

})


app.get('/summtax:taxname',function(req, res){
    console.log(req.params.taxname)
var taxname = req.params.taxname;
    console.log("this is a numghjkl;lkjhgfghjkl;")
     db.tax.find({"taxname" : taxname},function(err,doc){
        res.json(doc);
      })

})

app.get('/kotcat:kotfind',function(req, res){
    console.log(req.params.kotfind)
var kotbill = req.params.kotfind;
    console.log("this is a numghjkl;lkjhgfghjkl;")
     db.itemdata.find({"name" : kotbill},function(err,doc){
        res.json(doc);
      })

})

app.get('/kotcat:kottt',function(req, res){
    console.log(req.params.kottt)
var kotbill = req.params.kottt;
    console.log("this is a numghjkl;lkjhgfghjkl;")
     db.itemdata.find({"name" : kotbill},function(err,doc){
        res.json(doc);
      })

})


app.get('/taxinclusive',function(req, res){
db.configurationmaster.find(function(err,doc){
        res.json(doc);
      })
})






//db.products.update({ sku: "abc123" },
//   { $inc: { quantity: -2, "metrics.orders": 1 } }
//)

app.get('/cateitem:itemcat',function(req, res){
    console.log("this is for to get category item");
    var catstr = req.params.itemcat;
    console.log(catstr);
    var strarr= catstr.split(",");
    
    var mobil=strarr[0];
    //console.log(mobil);
    var catname=strarr[1];
    //console.log(catname);
    var restaurant=strarr[2];
    //console.log(restaurant);
    db.KamatOrder.find({"mobile" : mobil,"item.name" : catname, "restaurant":restaurant},function(err,doc){
        res.json(doc);
      })
})


app.put('/item/:itemdata',function(req,res){
    console.log("I received a put request77777777777777777777777777777777777777777777777777777777777777888888888333333333333333333333333333333333333333333333333333333333333")
    var str=req.params.itemdata;
    console.log(str);
    var str_array=str.split(",");
    var name=str_array[0];
    console.log(name);
    var count=str_array[1];
    var a = parseInt(count)
    console.log(a);
    var cal=str_array[2];
    console.log(cal);
    var mobileno=str_array[3];
    console.log(mobileno);
    var restname=str_array[4];
    console.log(restname);
    var cprice=str_array[5];
    console.log(cprice);
     cprice = parseInt(cprice);
    var pri = cprice * a;
    console.log(pri)
    
    

    
    
    
//    db.KamatOrder.findAndModify({ query: {"mobile" : mobileno,"item.name" : name,"restaurant" : restname}, update: { $inc: { "item.$.quan" : a, "item.$.total" : pri }}},function(err,doc){
//        res.json(doc);
      db.KamatOrder.findAndModify({ query: {"mobile" : mobileno,"item.name" : name, "restaurant" : restname}, update: { $inc: { "item.$.quan": a, "item.$.total" : pri  } } ,},function(err,doc){
        res.json(doc);
          console.log("Item added details display ends here");
      } );  
    
    console.log("this is aaaaaaaaaaaaaaaa")
    });
        
    


       
app.put('/item1/:itemdata',function(req,res){
    console.log("I received a find requestbnnnnnnnnnnzzzzzzzzzzzzzzzzzz")
    var str=req.params.itemdata;
    console.log(str);
    var str_array=str.split(",");
    var name=str_array[0];
    console.log(name);
    var count=str_array[1];
    var a = parseInt(count)
    console.log(a);
    var cal=str_array[2];
     var b = parseInt(cal)
    console.log(b);
    var mobileno=str_array[3];
    console.log(mobileno);
    var restname=str_array[4];
    console.log(restname);
//     var cprice=str_array[5];
//    console.log(cprice);
//    var pri = cprice * a;
//    console.log(pri)
    
    
    console.log("Item added details display ends here");

     
   // db.KamatOrder.findAndModify({ query: {"mobile" : mobileno,"item.name" : name}, update: { $inc: { "item.$.quan" : a } } ,});


//db.KamatOrder.findAndModify({ query: {"mobile" : mobileno,"item.name" : name}, update: { $inc: { "item.$.quan" : a } } ,});
 db.KamatOrder.update({"mobile":mobileno,"restaurant":restname},{$push:{item:{name:name,quan:a,total:b}}},function(err,doc){
        res.json(doc); 
    });
    db.KamatOrder.update({"mobile":mobileno,"restaurant":restname},{$set:{"orderstatus":"Selected"}});

        });

app.get('/postaxs:taxrate',function(req,res){
    var sgst = req.params.taxrate;
    console.log(sgst)
    console.log("taxxxxxxxxxxx")
     db.tax.find({"taxname": sgst},function(err,doc){
        res.json(doc);
      })
})






app.put('/subtol/:subcal',function(req,res)
{
    console.log("i received put request");
    var str=req.params.subcal;
    console.log(str);
    var str_array=str.split(",");
    var ph=str_array[0];
    var name=str_array[1];
    var subtol=str_array[2];
    var servchar=str_array[3];
    var total=str_array[4];
    db.item.update({"mobile":ph,"restname.name":name},{$set:{"restname.$.subtol":subtol,"restname.$.servchar":servchar,"restname.$.total":total}})
})

app.put('/itemedit/:edit',function(req,res)
{
    console.log("i received put request");
    var str=req.params.edit;
    console.log(str);
    var str_array=str.split(",");
    var ph=str_array[0];
    var name=str_array[1];
    var quan=str_array[2];
    var quant1 = parseInt(quan);
    var total=str_array[3];
    db.item.update({"mobile":ph,"item.name":name},{$set:{"item.$.quan":quant1,"item.$.total":total}})
})




app.get('/menu',function(req,res){
  console.log("I received a menu request");
  var pr=req.query.price;

  db.menu.findOne({name:pr},function(err,doc){
        res.json(doc);
      })
});
app.get('/itemlist',function(req,res){
  console.log("I received a username request for login");
  var ph=req.query.mobile;
  console.log(ph);
  
  db.KamatOrder.findOne({mobile:ph},function(err,doc){
    
        res.json(doc);
        //console.log(doc);
      })
});
app.get('/jcitemlist',function(req,res){
 // console.log("I received a username request for login");
  var ph=req.query.mobile;
  console.log(ph);
  
  db.juiceorder.findOne({mobile:ph},function(err,doc){
    
        res.json(doc);
        console.log(doc);
      })
});

app.delete('/item/:itemname',function(req,res)
{
    console.log("hi delete");
    var str=req.params.itemname;
    console.log(str);
    var str_array=str.split(",");
    var mp=str_array[0];
    console.log(mp);
    var iname=str_array[1];
    //var name=req.params.iname;
    console.log(iname);
    db.item.update({mobile:mp},{$pull:{item:{name:iname}}})
})
app.put('/item/:edit',function(req,res)
{
    console.log("hi edit");
    var str=req.params.edit;
    var str_array=str.split(",");
    var mp=str_array[0];
    var quan;
})

app.post('/prn',function(req,res)
{
    console.log("print 1st time called -------------------------")
    
})


app.put('/reststatus1:restaurantedit',function(req,res)
{
   console.log("i got the addition value of the data itemmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm");
    var str=req.params.restaurantedit;
console.log(str)
var strarr= str.split(",");
    
    var mobil=strarr[0];
    console.log(mobil);
    var resttotname=strarr[1];
    console.log(resttotname);
    var subtotal=strarr[2];
     var subtotal=parseInt(subtotal)
    console.log(subtotal);
    var cgst=strarr[3];
     var cgst=parseInt(cgst)
//     var ab = sgst/2;
//    console.log(ab)
    console.log(cgst);
    var sgst=strarr[4];
     var sgst=parseInt(sgst)
//      var ac = sgst/2;
//    console.log(ac);
      var gsttot=strarr[5];
    var gsttot=parseInt(gsttot)
    console.log(gsttot);
    
    var finaltot=strarr[6];
     var finaltot=parseInt(finaltot)
    console.log(finaltot);
    
    
    db.KamatOrder.update({"mobile":mobil,"restaurant":resttotname},{$set:{"ItemTotal":subtotal,"Cgst":cgst,"Sgst":sgst,"Totalgst":gsttot,"ServiceCharge":"","FinalTotal":finaltot}},function(err, doc){
    res.json(doc);
    })
  

})

//sessionreport
app.get('/sessionreport',function(req,res){
     var sedate = req.body.sessdte;
    console.log(sedate)
    console.log("sgttttttttttttttttttttttttttttttttttttt")
     db.KamatOrder.find({"Sessiondate": req.body.sessdte},function(err,doc){
        res.json(doc);
      })
})


//configurationmaster
app.get('/configurationmaster',function(req,res){
     
    console.log("configurationnn masterrrr")
     db.configurationmaster.find(function(err,doc){
        res.json(doc);
      })
})



app.get('/postaxc',function(req,res){
     var cgst = req.body.name;
    console.log("sgttttttttttttttttttttttttttttttttttttt")
     db.tax.find({name: "cgst"},function(err,doc){
        res.json(doc);
      })
})
app.get('/postaxs',function(req,res){
    var sgst = req.body.postaxs;
     db.tax.find({name: "sgst"},function(err,doc){
        res.json(doc);
      })
})



app.get('/getcardtype',function(req,res){
   
     db.cardtype.find(function(err,doc){
        res.json(doc);
      })
})



app.get('/itemskurate',  function (req, res) {
  console.log("this is a item UOmmm request");
var itemskuid=req.query.ItemSKUID;
  console.log(itemskuid);
    var itemid=parseInt(itemskuid)
db.ItemSKURate.find({"ItemSKUID":itemid},function (err, doc) { 
  //db.ItemSKURate.find({"ItemSKUID":itemskuid},function (err, doc) { 
  res.json(doc);
  console.log("the item details are" +doc)
});
});











///session

app.get('/prnsession',function(req,res)
{
    db.session.find(function(err,doc){
        res.json(doc);
        console.log(doc)
})
})





///restaurant adddd

//app.put('/restautotal:restaurantedit',function(req,res)
//        orderstatus1
//app.put('/orderstatus1',function(req,res)
//{
//   console.log("i got the addition value of the data item");
//    var str=req.params.sendrate;
//console.log(str)
////  var rate =str.split(",")
////   
////   var id =rate[0];
////   console.log("id is"+id);
////   var code =rate[1];
////   console.log(code);
////   var section =rate[2];
////   console.log(section);
//   
//  
//   
//    //db.itemdata.update({_id: mongojs.ObjectId(id)}, {$set:{ code : code, section : section} }, function(err, docs) {
////})
//})










//checkstatus'+login000
app.get('/checkstatus:login000',function(req,res)
{
    var str = req.params.login000;
    console.log("hhhhhhhhhhhhhhhhhhhhhhhhhhhhhh"+str)
//    db.KamatOrder.find({"restaurant": str,$or:[{orderstatus:"Confirmed"},{orderstatus:"Paid"},{orderstatus:"Selected"},{orderstatus:"NotSelected"},{orderstatus:"InProgress"}]},function(err,doc){
        
         db.KamatOrder.find({orderstatus:"Paid"},function(err,doc){
        
        res.json(doc);
        console.log(doc)
})
})




app.post('/session:binddate',function(req,res)
{
        console.log("session insert called");
    var str = req.params.binddate;
    console.log(req.params.binddate)
    var ses =str.split(",")


   var date =ses[0];
   console.log(date);
  var session =ses[1]; 
    console.log(session)
var restlog = ses[2];
    console.log(restlog)
//    login000:restlog
    db.session.update({login000:restlog},{$set:{date:date,session:session}}, function(err, doc) {
    res.json(doc);
        console.log(doc)
  });
})

app.post('/sesdatee:binddate11',function(req,res)
{
        console.log("session insert updating");
    var str = req.params.binddate11;
    console.log(req.params.binddate11)
    var ses =str.split(",")


   var formdate =ses[0];
   console.log(formdate);
  var restaurant =ses[1]; 
    console.log(restaurant)
//    var sessionn =ses[1]; 
//    console.log(sessionn)

//    login000:restlog
    db.session.update({login000:restaurant},{$set:{date:formdate,session:"1"}}, function(err, doc) {
    res.json(doc);
        console.log(doc)
  });
})






//for item html get details
app.get('/getinventorygroupmaster',function(req,res)
{
    db.inventorygroupmaster.find(function(err,doc){
        res.json(doc);
})
})

app.get('/getsectionmaster',function(req,res)
{
    db.SectionMaster.find({"POSName":"Kamath Simply South"},function(err,doc){
        res.json(doc);
})
})
app.get('/getitemsku',function(req,res)
{
    db.ItemSKU.find({"POSName":"Kamath Simply South","ItemName":"Tea"},function(err,doc){
        res.json(doc);
})
})



//for item html get details
app.get('/getitemtype',function(req,res)
{
    db.itemtype.find(function(err,doc){
        res.json(doc);
})
})
//for item html get details
app.get('/getsalescategorymaster',function(req,res)
{
    db.SaleCategoryMaster.find(function(err,doc){
        res.json(doc);
})
})





///taxx
app.get('/gettaxwithinstate', function(req, res){
 console.log("i received a get request");
 db.tax.find({"withinstate":"yes"},function (err, docs) {
 //console.log(docs);db.tax.find({"withinstate":"yes"}).pretty()
 res.json(docs);
});
});

// in item page out of state
app.get('/gettaxoutofstate', function(req, res){
 console.log("i received a get request");
 db.tax.find({"outofstate":"yes"},function (err, docs) {
 //console.log(docs);db.tax.find({"withinstate":"yes"}).pretty()
 res.json(docs);
});
});
// frist page taxation

// for edit item 
app.put('/editeditem',function(req,res){
       var id = req.body._id
     db.itemdata.update({_id:mongojs.ObjectId(id)},{$set:{"name":req.body.name,"desc":req.body.desc ,"hsc":req.body.hsc ,"invGroupName":req.body.invGroupName,
         "outofstate":req.body.outofstate ,"withinstate":req.body.withinstate,"salesTax":req.body.salesTax,"comboItem":req.body.comboItem,"marginReport":req.body.marginReport,"itemType":req.body.itemType,"ChargeName":req.body.ChargeName,"ChargeValue":req.body.ChargeValue}},function(err,doc)
        {
            res.json(doc);
        
        });
})







// for save item 
app.post('/saveitempost',function(req,res){
     db.itemdata.insert(req.body,function(err,doc){
        res.json(doc);
      })
})

app.post('/saveitemskurate',function(req,res){
     db.ItemSKURate.insert(req.body,function(err,doc){
        res.json(doc);
      })
})

// for filter in item page
app.get('/getfilter/:update',function(req,res)
{
  var sale1 = req.params.update;
      //console.log(sale1)
      if(sale1 == " All" ){
        //console.log("entered into if loop loop")
         db.itemdata.find(function(err,doc){
        res.json(doc);
})

      }else{
     db.itemdata.find({saleCategory:sale1},function(err,doc)
    {
        res.json(doc);
    })
   }
})

// for delete in item page
app.delete('/itemdelete/:udelete',function(req,res)
{
   // console.log("i got the delete request");
    var id=req.params.udelete;
   
    db.itemdata.remove({_id: mongojs.ObjectId(id)}, function(err, docs) {
})
})



//itemcharge
app.get('/chargeitem', function(req, res){
 console.log("i received a chargeitem request");
 db.chargename.find(function (err, docs) {
 //console.log(docs);
 res.json(docs);
});
});

app.get('/chargetabb:chargename', function(req, res){
 console.log("i received a chargeitem request");
    console.log(req.params.chargename)
    var cname=req.params.chargename;
    console.log(cname)
 db.ChargesMaster.find({"InvVoucherCla":cname},function (err, docs) {
 //console.log(docs);
 res.json(docs);
});
});


// frist page taxation

app.get('/gettax', function(req, res){
 console.log("i received a get request");
 db.tax.find(function (err, docs) {
 //console.log(docs);
 res.json(docs);
});
});





app.delete('/opal/:id', function (req, res) {
  var id = req.params.id;
  console.log("this is delete"+id);
  db.taxation.remove({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
    console.log(doc);
  });
});
app.post('/opal1', function (req, res) {
   console.log("i got post opal1 opal1opal1 opal1 opal1 request");
//   console.log(req.body)
//   console.log(req.body.taxname);
  
  db.tax.insert(req.body,function(err, doc) {
    res.json(doc);

  });

});
app.delete('/opal1/:id', function (req, res) {
  var id = req.params.id;
  console.log("this is delete"+id);
  db.tax.remove({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
    console.log(doc);
  });
});


app.get('/editititem2',function (req, res) {
  console.log("this is  editititem2 editititem2 editititem2a put request");
var aliasname=req.query.aliasname;
var taxname=req.query.taxname;
console.log(taxname)
console.log(aliasname)
// var id = req.body.aliasname;
// var id = req.body.taxname;
// console.log(req.params.tax)
// var taxarr = req.params.tax
// console.log(taxarr)
// console.log(taxarr.taxname);
// console.log(taxarr.aliasname);
//db.tax.find({aliasname:"gst",taxname:"GST"})
db.tax.find({aliasname:aliasname,taxname:taxname}, function (err, doc) {
  res.json(doc);
  console.log("the edit details r" +doc)
});
});

app.get('/getitemtaxation', function(req, res){
   db.taxation.find(function (err, docs) {
    res.json(docs);
  });
});

app.post('/opalpost', function (req, res) {
  
  db.taxation.insert(req.body,function(err, doc) {
     res.json(doc);

  });
});
// 22/3 fetching data
  app.get('/purchase',  function (req, res) {
    
  db.taxerate.find(function (err, docs) {
 //console.log(docs);

 res.json(docs);
});

  });
//});
app.post('/opaltx', function (req, res) {
  // console.log("i got post request");
  console.log("iam done here")
  var tax = req.body.name;
  var tax1 = req.body.PurchaseAc;
  var tax2 = req.body.SaleAc; 
  var tax3 = req.body.Rate; 
  var tax4 = req.body.CessOn; 
   var tax5 = req.body.From; 
  var tax6= req.body.To; 
  var tax7 = req.body.Rate1; 
// console.log("name value " + tax);
// console.log("pur value  " + tax1);
//  console.log("sale value  " + tax2);
//   console.log("rate value  " + tax3);
//  console.log("CessOn value  " + tax4);
//  console.log("from value  " + tax5);
//   console.log("to value  " + tax6);
//    console.log("rate1 value  12 " + tax7);

 var document = {name: tax,PurchaseAc: tax1, SaleAc: tax2,Rate: tax3, CessOn: tax4,From: tax5,To: tax6, Rate1: tax7};
  db.taxtable2.insert(req.body,function(err, doc) {
   res.json(doc);
   });
  
});

//this another tax controller
app.post('/opalpost', function (req, res) {
  
  db.taxation.insert(req.body,function(err, doc) {
     res.json(doc);

  });
});

app.put('/updateedit:id', function (req, res) {
//app.put('/updateedit', function (req, res) {
  console.log("update  updateedit function updateedit updateedit update function")
  var id = req.body._id;
  console.log(id);
  db.tax.findAndModify({
    query: {_id: mongojs.ObjectId(id)},
    update: {$set: {taxname: req.body.taxname, aliasname: req.body.aliasname, displaydate: req.body.displaydate,Rate:req.body.Rate,
      name:req.body.name,outofstate: req.body.outofstate,withinstate: req.body.withinstate}},
    new: true}, function (err, doc) {

      res.json(doc);
    });
  });


app.delete('/opal/:id', function (req, res) {
  var id = req.params.id;
  console.log("this is delete"+id);
  db.taxation.remove({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
    console.log(doc);
  });
});

//for get details of saved items
app.get('/getitemdata',function(req,res)
{
    db.itemdata.find(function(err,doc){
        res.json(doc);
})
})
// for delete in item page
app.put('/rateadd/:sendrate',function(req,res)
{
   // console.log("i got the delete request");
    var str=req.params.sendrate;
  //console.log(str)
  var rate =str.split(",")
   
   var id =rate[0];
   console.log("id is"+id);
   var code =rate[1];
   console.log(code);
   var SaleRate =rate[2];
   console.log(SaleRate);
   
  
   
    db.itemdata.update({_id: mongojs.ObjectId(id)}, {$set:{ code : code, SaleRate : SaleRate} }, function(err, docs) {
       res.json(docs);
})
})

////for get cat items details of saved items
//app.get('/resmenu/:SaleCategoryName',function(req,res)
//{
//    console.log(req.params.SaleCategoryName);
//     console.log("i received ress request")
//  var itemname = req.params.SaleCategoryName;
//    var itemname1=" "+itemname;
//    console.log(itemname)
//// db.itemdata.find({ "itemType" : " Sweets"}).pretty()
//    db.itemdata.find({ "itemType" : itemname1}, function(err, docs){
//        res.json(docs);
//        console.log("hjvgkgvgkyuvsddsdsddaffdffddf")
//        console.log(docs);
//})
//})
////demo
app.get('/resmenu1:itemtt',function(req,res)
{
 console.log(req.params.itemtt);
     console.log("i received ress request")
  var itemname = req.params.itemtt;  
     var itemname1=" "+itemname;
   // console.log(itemname)
    db.itemdata.find({"itemType" : itemname1}, function(err,doc){
        res.json(doc);
        //console.log(res);
})
});

app.get('/resmenu2:SaleCategoryName',function(req,res)
{
 console.log(req.params.SaleCategoryName);
     console.log("i received ress request")
  var itemname = req.params.SaleCategoryName;  
     var itemname1=" "+itemname;
   // console.log(itemname)
    db.itemdata.find({"itemType" : itemname1}, function(err,doc){
        res.json(doc);
        //console.log(res);
})
});



app.get('/resmenuname:name',function(req,res)
{
 console.log(req.params.name);
     console.log("i received ress request")
  var itemname = req.params.name;  
     var itemname1=" "+itemname;
   console.log(itemname)
    //db.itemcommentmaster.find({"SaleCategoryName" : itemname}, function(err,doc){
         db.itemdata.find({"name" :  itemname}, function(err,doc){
        
        res.json(doc);
        //console.log(res);
})
});

app.get('/resmenu4:itemtype',function(req,res)
{
 console.log(req.params.itemtype);
     console.log("jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj")
  var itemname = req.params.itemtype;
    console.log(itemname.length)
    itemname.trim()
    itemname22 = itemname.replace(/\s/g,'');
    console.log(itemname22)
     var itemname1=" "+itemname;
    console.log(itemname1)
    console.log("comment second onnnnnnnnnnnnnnnnne")
//   "SaleCategoryName" : "Combo 3"
    db.itemcommentmaster.find({"SaleCategoryName" :itemname.trim()}, function(err,doc){
        res.json(doc);
        //console.log(res);
})
});

//app.get('/resmenu3:SaleCategoryName',function(req,res)
//{
// console.log(req.params.SaleCategoryName);
//     console.log("i received ress request")
//  var itemname = req.params.SaleCategoryName;  
////     var itemname1=" "+itemname;
////    console.log(itemname1)
////    console.log("comment")
//    db.itemcommentmaster.find({"SaleCategoryName" :itemname}, function(err,doc){
//        res.json(doc);
//        //console.log(res);
//})
//});





// for edit item 
app.put('/editeditem',function(req,res){
       var id = req.body._id
     db.items.update({_id:mongojs.ObjectId(id)},{$set:{"name":req.body.name,"desc":req.body.desc ,"hsc":req.body.hsc ,"invGroupName":req.body.invGroupName,
         "outofstate":req.body.outofstate ,"withinstate":req.body.withinstate,"salesTax":req.body.salesTax,"comboItem":req.body.comboItem,"marginReport":req.body.marginReport,"itemType":req.body.itemType}},function(err,doc)
        {
            res.json(doc);
        
        });
})
// in item page with in state


app.get('/gettaxwithinstate', function(req, res){
 console.log("i received a get request");
 db.tax.find({"withinstate":"yes"},function (err, docs) {
 //console.log(docs);db.tax.find({"withinstate":"yes"}).pretty()
 res.json(docs);
});
});

// in item page out of state
app.get('/gettaxoutofstate', function(req, res){
 console.log("i received a get request");
 db.tax.find({"outofstate":"yes"},function (err, docs) {
 //console.log(docs);db.tax.find({"withinstate":"yes"}).pretty()
 res.json(docs);
});
});
// for combo
app.get('/checkofcomboitem/:combo',  function (req, res) {
 // console.log("this is a put request");
var name = req.params.combo;
//console.log(id);
db.items.find({Name:name}, function (err, doc) {
  res.json(doc);
  //console.log("the edit details r" +doc)
});
});
// frist page taxation

// taxation project starts here

app.get('/getitemtaxation', function(req, res){
   db.taxation.find(function (err, docs) {
    res.json(docs);
  });
});

app.post('/opalpost', function (req, res) {
  
  db.taxation.insert(req.body,function(err, doc) {
     res.json(doc);

  });
});



app.delete('/opal/:id', function (req, res) {
  var id = req.params.id;
  console.log("this is delete"+id);
  db.taxation.remove({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
    console.log(doc);
  });
});

app.get('/item1/:id',  function (req, res) {
  console.log("this is a put request");
var id = req.params.id;
console.log(id);
db.taxation.findOne({_id: mongojs.ObjectId(id)}, function (err, doc) {
  res.json(doc);
  console.log("the edit details r" +doc)
});
});

//delete it rempeated 

//app.get('/itemlistcartconfirmed',function(req,res)
//{
//    var ph=req.query.mobile;
//  console.log(ph)
//  var restt=req.query.restaurant;
//    console.log(restt)
//    console.log("i received a get request from kamat orderstatus itemlistcart888888");
//    console.log(ph);
//    db.KamatOrder.find({"mobile":ph,"restaurant": restt },function(err,doc){
//        console.log(doc);
////    db.KamatOrder.findOne({$and:[{"mobile":ph},{"orderstatus":"Confirmed"}]},function(err,doc){
////        console.log(doc);
//       res.json(doc);
//
//    })
////})
//   })




//21-aug
app.get('/itemratesku',function (req, res) {
  console.log("this is a item gettt request");
var itemname=req.query.ItemName;
  console.log(itemname)

    db.ItemSKU.find({"ItemName":itemname},function (err, doc) { 
  res.json(doc);
  console.log("the item details are" +doc)
});
});






app.put('/opal/:id', function (req, res) {
  var id = req.params.id;
  console.log(req.body.name);
  db.taxation.findAndModify({
    query: {_id: mongojs.ObjectId(id)},
    update: {$set: {name: req.body.name, aliasname: req.body.aliasname, taxlevel: req.body.taxlevel}},
    new: true}, function (err, doc) {

      res.json(doc);
    });
});
////poslogin
//app.get('/poslogin', function(req, res){
// console.log("i poslogin a get request");
// db.restaurantid.find(function (err, docs) {
//// console.log(docs);
// res.json(docs);
//});
//});

app.get('/poss:resid', function(req, res){
 console.log("i poslogin llllllllllllllllllllllllllllllllllllllllllllllllllllllllllllll");
    console.log(req.params.resid);
    var loginid = req.params.resid;
    console.log("this restuarant iddddddddddddddddddddddddddddddddddddddddddddddddddddddd"+loginid)
     var lid=parseInt(loginid)
     console.log("welcome to thw"+lid)
 db.restaurantid.find({"resid":lid},function (err, doc) { 
console.log(doc);
 res.json(doc);
      
});
});

app.get('/getitemrate:name', function (req, res) {
     var itcharge = req.params.name;
  console.log(req.params.name);
    console.log("welllllllcome")
  db.itemdata.find({"name" : itcharge},function (err, docs) {
 //console.log(docs);

 res.json(docs);
});

  });







// frist page taxation

app.get('/gettax', function(req, res){
 console.log("i received a get request");
 db.tax.find(function (err, docs) {
 //console.log(docs);
 res.json(docs);
});
});

app.post('/opal1', function (req, res) {
   console.log("i got post opal1 opal1opal1 opal1 opal1 request");
   console.log(req.body)
   console.log(req.body.taxname);
  
  db.tax.insert(req.body,function(err, doc) {
    res.json(doc);

  });

});

app.delete('/opal1/:id', function (req, res) {
  var id = req.params.id;
  console.log("this is delete"+id);
  db.tax.remove({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
    console.log(doc);
  });
});

app.get('/editititem2',function (req, res) {
  console.log("this is  editititem2 editititem2 editititem2a put request");
var aliasname=req.query.aliasname;
var taxname=req.query.taxname;
console.log(taxname)
console.log(aliasname)
// var id = req.body.aliasname;
// var id = req.body.taxname;
// console.log(req.params.tax)
// var taxarr = req.params.tax
// console.log(taxarr)
// console.log(taxarr.taxname);
// console.log(taxarr.aliasname);
//db.tax.find({aliasname:"gst",taxname:"GST"})
db.tax.find({aliasname:aliasname,taxname:taxname}, function (err, doc) {
  res.json(doc);
  console.log("the edit details r" +doc)
});
});


//app.put('/updateedit/:id', function (req, res) {
app.put('/updateedit', function (req, res) {
  console.log("update  updateedit function updateedit updateedit update function")
  var id = req.body._id;
  console.log(id);
  db.tax.findAndModify({
    query: {_id: mongojs.ObjectId(id)},
    update: {$set: {taxname: req.body.taxname, aliasname: req.body.aliasname, displaydate: req.body.displaydate,Rate:req.body.Rate,
      name:req.body.name,outofstate: req.body.outofstate,withinstate: req.body.withinstate}},
    new: true}, function (err, doc) {

      res.json(doc);
    });
  });
  // 22/3 fetching data
  app.get('/purchase',  function (req, res) {
    
  db.taxerate.find(function (err, docs) {
 //console.log(docs);

 res.json(docs);
});

  });
//});

app.get('/getchargesmas2222:rcreditcharge', function (req, res) {
 var chargecr = req.params.rcreditcharge;
       console.log(req.params.rcreditcharge)
console.log("gggggggggggggggggggggggggggggggggg")


  db.ChargesMaster.find({"Charge" : chargecr},function (err, docs) {
 //console.log(docs);

 res.json(docs);
});   
});
    



app.get('/getchargesmaster', function (req, res) {
     var charge1 = req.query.InvVoucherCla;
    
    console.log("charge"+charge1)
   // "InvVoucherCla" : "Sale"
  db.ChargesMaster.find({"InvVoucherCla": charge1},function (err, docs) {
 //console.log(docs);

 res.json(docs);
});

  });

//chargemaster
app.get('/getchargesmaster:charge', function (req, res) {

    var str=req.params.charge;
    console.log(str);
    var str_array=str.split(",");
    var charge1=str_array[0];
    console.log(charge1);
    var charge2=str_array[1];
  db.ChargesMaster.find({"Charge" : charge1},function (err, docs) {
 //console.log(docs);

 res.json(docs);
});
    });

app.get('/getchargesmas:charge2', function (req, res) {
 var charge2 = req.params.charge2;
       
console.log("hhhhhhhhhhhhhhhhhhhhhhhhhhhh")

  db.ChargesMaster.find({"Discount" : charge2},function (err, docs) {
 //console.log(docs);

 res.json(docs);
});   
});
// var salescategorymasterdata = null;
var saleCategoryData = function() {
   db.salescategorymaster.find(function(err,doc){
        var salescategorymasterdata = doc;
        var salescategorylength = salescategorymasterdata.length;
         //console.log( salescategorylength);
        for (let i = salescategorylength - 1; i >= 0; i--) {
            //console.log(salescategorymasterdata[i].SaleCategoryName);
            db.itemdata.find({"itemType" :salescategorymasterdata[i].SaleCategoryName,"name" : { $exists: true }},function (err, docs) {
                     //console.log(docs.length);
                     var itemDataLength = docs.length-1;
                     //console.log(docs[0].itemType);
                     //console.log(docs);
                     for (let m = itemDataLength ; m >= 0; m--) {
                         //console.log(docs[m]+"viik")
                         if (docs[m]!= undefined) {
                            console.log("type "+docs[m].itemType+" name"+docs[m].name);
                            //console.log(docs[m].itemType)
                         }
                         // console.log(itemDataLength[m].itemType)
                         
                     }
 
            }); 
        }

    })
} ();


//date
app.get('/dateBatchFind/:date',function(req,res)
{
  
    var str=req.params.date;
    var str_array=str.split(",");
    var fdate=str_array[0];
    var tdate=str_array[1];
     db.salescategorymaster.find(function(err,doc){
        var salescategorymasterdata = doc;
        var salescategorylength = salescategorymasterdata.length;
         //console.log( salescategorylength);
        for (let i = salescategorylength - 1; i >= 0; i--) {
            //console.log(salescategorymasterdata[i].SaleCategoryName);
            db.itemdata.find({"itemType" :salescategorymasterdata[i].SaleCategoryName,"name" : { $exists: true }},function (err, docs) {
                     //console.log(docs.length);
                     var itemDataLength = docs.length-1;
                     //console.log(docs[0].itemType);
                     //console.log(docs);
                     for (let m = itemDataLength ; m >= 0; m--) {
                         //console.log(docs[m]+"viik")
                         if (docs[m]!= undefined) {
                            console.log("type "+docs[m].itemType+" name"+docs[m].name);
                            //console.log(docs[m].itemType)
                            db.KamatOrder.find({Sessiondate: { $gt:(fdate), $lt: (tdate)}, "item.itemType" : " Beverages","item.name" : "Nescafe"},{item: {$elemMatch: {name: "Nescafe"}},_id:0  },function(err,response){
                               // , "item.itemType" : " Beverages"},{item: {$elemMatch: {name: "Tea"}} 
      //var a = 100;
      console.log(response.length)
      var resLength = response.length ;
      var price = 0;
      var quantity = 0;
      var itemTotal = 0;
      var name = "Nescafe" ;
      var category = " Beverages"; 

      //console.log(response[0].item[0].name);
      console.log(resLength);
      //console.log(response[1].item[1].Price);
      for(let v = 0;v<=resLength-1 ; v++){
           
            // console.log("itemTotal "+itemTotal);
            if(response[v].item != undefined){
              price += response[v].item[0].Price ;
            quantity += response[v].item[0].quantity ;
            itemTotal += response[v].item[0].itemtotal ;
                // console.log(" price undefined v"+ response[v].item);
                //  console.log(" price undefined v"+ response[v]); 
                //   console.log(" price undefined v"+ response[v].item);
              console.log("v "+v+" quantity "+quantity+" price "+ price+" itemTotal "+itemTotal);
              if (v== resLength-1) {
                var data ={
                    'category':category,
                    'name':name,
                    'price': price,
                    'quantity':quantity,
                    'itemTotal':itemTotal
                }
                 res.json(data);
              }
            }
            
      }
     

    })
                         }
                         // console.log(itemDataLength[m].itemType)
                         
                     }
 
            }); 
        }

    })
    
})




// posting data

app.post('/opaltx', function (req, res) {
  // console.log("i got post request");
  console.log("iam done here")
  var tax = req.body.name;
  var tax1 = req.body.PurchaseAc;
  var tax2 = req.body.SaleAc; 
  var tax3 = req.body.Rate; 
  var tax4 = req.body.CessOn; 
   var tax5 = req.body.From; 
  var tax6= req.body.To; 
  var tax7 = req.body.Rate1; 
 console.log("name value " + tax);
 console.log("pur value  " + tax1);
  console.log("sale value  " + tax2);
   console.log("rate value  " + tax3);
  console.log("CessOn value  " + tax4);
  console.log("from value  " + tax5);
   console.log("to value  " + tax6);
    console.log("rate1 value  12 " + tax7);

 var document = {name: tax,PurchaseAc: tax1, SaleAc: tax2,Rate: tax3, CessOn: tax4,From: tax5,To: tax6, Rate1: tax7};
  db.taxtable2.insert(req.body,function(err, doc) {
   res.json(doc);
   });
  
});

app.listen(7000);
console.log("server running on port 7000");