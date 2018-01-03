/* using the express library for requests for mongodb database */
var Printer = require('node-printer');
var options = { media: 'Custom.200*600mm', n:3};
var express=require('express');
var app=express();
var mongojs=require('mongojs');
var officegen = require('officegen');
var Q = require('q');
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
    //a.img.data = fs.readFileSync(imgPath);
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
   // console.log("i received a get request from kamat"+resmenus);
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


        app.get('/fetch:kotnum',function(req,res){
        console.log(req.params.kotnum+"newkottttttttttttttttttttttttt")
        var kotnum = req.params.kotnum;
        var kotnum1 = ''+kotnum;
          
        console.log(kotnum1);
        db.invoiceSequence.find({"SaleCategoryName" : kotnum1},function(err,doc){
          console.log(doc)
          res.json(doc)
        console.log(doc.length+"kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk");
        var number1 = doc[0].number+1;
        console.log(number1)
        db.invoiceSequence.update({"SaleCategoryName" : kotnum1},{$set:{"number":number1}}, function(err,doc){
        if(err) throw err;

           })
      });
      // require('child_process').exec(__dirname + "/RunMe.bat", function (err, stdout, stderr) {
      //
      //                   if (err) {
      //                     return console.log(err);
      //                    }
      //
      //                  console.log(stdout);
      //             });

    })





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
{ $and: [ { price: { $ne: 1.99 } }, { price: { $exists: true } } ] } 
app.get('/freqadded:frefetch',function(req, res){
  var frefetch1 = req.params.frefetch;
  console.log(frefetch1+"freeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee");
 db.itemdata.find({$and:[{"POSName": frefetch1 },{"frequently" : "Yes"}] },function(err,doc){
        res.json(doc);
      })
})
// app.get('/freqadded:frefetch',function(req, res){
//   var frefetch1 = req.params.frefetch;
//   console.log(frefetch1+"freeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee");
//  db.frequentlyOrdered.find({"posName":frefetch1},function(err,doc){
//         res.json(doc);
//       })
// })

// app.get('/postaxc',function(req,res){
//      var cgst = req.body.name;
//     console.log("sgttttttttttttttttttttttttttttttttttttt")
//      db.tax.find({name: "cgst"},function(err,doc){
//         res.json(doc);
//       })
// })
// app.post('/datatry',function(req,res){
// //  var catstr = req.query.params;
//   console.log("lenth isssssssssssssssssssssssssssssssssssssssssssssssss ");
// //console.log( req.query.params);
// console.log( req.body);
// var datacheck = req.body;
// console.log("datacheck datacheck "+datacheck.length);
// var id = null;
// for (var i = 0; i < datacheck.length; i++) {
//   console.log("datacheck datacheck "+datacheck[i].total);
//   console.log("datacheck datacheck "+datacheck[i].name);
//
//
//   if ( i == 0) {
//     console.log("i is if  "+i);
//     db.KamatOrder.insert(req.body,function (err,doc) {
//         console.log(doc)
//       console.log(doc._id)
//       id = doc._id;
//     })
//   }else{
//     console.log("i is else "+i+" id"+id);
//
//     db.KamatOrder.update({_id: mongojs.ObjectId(id)},{$push:{item:{name:"varun",Price:"20"}}},function (err,doc) {
//     //  console.log(doc._id)
//     })
//   }
//
//   // db.KamatOrder.insert({"mobile" : number,item:[{name : name,Price: section,quantity:count,itemtotal:itemtotal,Comment:comment,itemType:itemtype,Hiddentot:hidtotal,HiddenGst:hidgst}],
//   // Subtotal:subtotal,TotalNoItems:totalqan,ServiceCharge:serchar,Cgst:sercharc,Sgst:serchars,TotalGst:totGst,FinalTotal:finaltotal,Sessiondate:sdate,
//   // session:session,ChangeAmount:Change,orderstatus:"Paid",posname:restaurant,
//   // "Transactiontype" : selectpicker,orderid:invoice},function(err,doc){
//
// }
//
// })

//30th aug
var idPass = null;
//var invoice = 1000;
app.post('/postcart:poscartt',function(req,res){
  //  invoice++;
//app.post('/postcart:poscartt',function(req,res){
    var catstr = req.params.poscartt;
    console.log(catstr+"catstrrrrrrrrrr");
    var str_array=catstr.split(",");
    var number=str_array[0];
    console.log(number);
    var name=str_array[1];
    console.log(name);
    var section=str_array[2];
    section = parseFloat(section);
    console.log(section);
    var count=str_array[3];
    count = parseFloat(count);
    console.log(count);
    var itemtotal=str_array[4];
    itemtotal = parseFloat(itemtotal);
    console.log(itemtotal);
    var subtotal=str_array[5];
    subtotal = parseFloat(subtotal);
    console.log(subtotal);
    var totalqan=str_array[6];
    totalqan = parseFloat(totalqan);
    console.log(totalqan);
    var serchar=str_array[7];
    serchar = parseFloat(serchar);
    console.log(serchar);
    var sercharc=str_array[8];
    sercharc = parseFloat(sercharc);
    console.log(sercharc);
    var serchars=str_array[9];
    serchars = parseFloat(serchars);
    console.log(serchars);
    console.log("welcom"+serchars)
    var totGst=str_array[10];
    totGst = parseFloat(totGst);
    console.log(totGst);
    var finaltotal=str_array[11];
    finaltotal = parseFloat(finaltotal);
    console.log(finaltotal);
    var selectpicker=str_array[12];
    console.log(selectpicker);
    var ii=str_array[13];
    console.log(ii);
    var comment=str_array[14];
    console.log(comment);
    var Change=str_array[15];
    Change = parseFloat(Change);
    console.log(Change);
    var sdate=str_array[17];
    console.log(sdate);
    var session=str_array[18];
    session = parseInt(session);
    console.log("donweeeeeeeeeee"+session);
    var restaurant=str_array[19];
    console.log(restaurant+"restauranttttttttttt");
    var itemtype=str_array[20];
    console.log(itemtype);
    var hidtotal=str_array[21];
    hidtotal = parseFloat(hidtotal);
    var hidgst=str_array[22];
    hidgst =parseFloat(hidgst);
    var lenCheck=str_array[23];
    lenCheck = parseInt(lenCheck);
    var catlen=str_array[24];
    catlen = parseInt(catlen);
    var roundv = str_array[25];
    roundv = parseInt(roundv);
    console.log(roundv+"roundvalueeeeeeeeeeeeeee");
//    var newmulticharge = str_array[26];
//    console.log(newmulticharge+"newmultichargeeeeeeeeeeccccccc");
//     console.log(newmulticharge.length+"lengthhhhhhhhhhhhhhhhhhh")
//    var salechargevalue = str_array[27];
//    salechargevalue = parseInt(salechargevalue);
//    console.log(salechargevalue+"salechargevalue");
//    var salechargemethod = str_array[28];
//    console.log(salechargemethod+"salechargemethod")
    //console.log(" lenCheck lengthChecklenCheck lenCheck "+lenCheck+" catlen catlen catlen "+catlen)
    // if(ii=="0"){
    // db.KamatOrder.insert({"mobile" : number,item:[{name : name,Price: section,quantity:count,itemtotal:itemtotal,Comment:comment,itemType:itemtype,Hiddentot:hidtotal,HiddenGst:hidgst}],Subtotal:subtotal,TotalNoItems:totalqan,ServiceCharge:serchar,Cgst:sercharc,Sgst:serchars,TotalGst:totGst,FinalTotal:finaltotal,Sessiondate:sdate,session:session,ChangeAmount:Change,orderstatus:"Paid",posname:restaurant,"Transactiontype" : selectpicker},function(err,doc){

     if(ii=="0"){
       console.log("haiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii");
       var posnamee = restaurant;
       console.log(posnamee+"i got posnameeeeeeeeee");
       db.invoiceDetails.find({"POSName":posnamee}, function(err, result){
           if(err) throw err;
           console.log(result[0]+"resultttttttttttttttt");
           console.log(result[0].POSName)
           console.log(result[0].invoiceNumber+"invoiceeeeeeeeeeeeee");
           var invoice = result[0].invoiceNumber;
           //invoice++;
          // res.json(result);

  //var invoice = 1000;
         
         db.currentOrder.insert({"mobile" : number,item:[{name : name,Price: section,quantity:count,itemtotal:itemtotal,Comment:comment,itemType:itemtype,Hiddentot:hidtotal,HiddenGst:hidgst}],Subtotal:subtotal,TotalNoItems:totalqan,ServiceCharge:serchar,Cgst:sercharc,Sgst:serchars,TotalGst:totGst,FinalTotal:finaltotal,Sessiondate:sdate,session:session,ChangeAmount:Change,orderstatus:"Paid",posname:restaurant,"Transactiontype" : selectpicker,orderid:invoice,RoundOffValue:roundv},function(err,doc1){
            res.json(doc1);
            console.log(doc1)
          console.log("kamart order "+doc1.orderid);
          var invoice1 = doc1.orderid+1;

        //  invoice = invoice1;
        //  invoice++;
         db.invoiceDetails.update({"POSName":posnamee},{$set:{"invoiceNumber":invoice1}}, function(err,res){
           if(err) throw err;
           //console.log(updated);
          })
         console.log("id is "+doc1._id)
       // console.log("id is "+doc._id)
        idPass = doc1._id ;
      // console.log("name "+name);
       if (lenCheck == catlen-1) {
             //console.log("lenCheck == catlen-1 ii  == 0");
             checkCall(idPass);
       }
      })

    })
  }

    else
        {
          console.log("elseeeeeeeeeeeeeeeeeeee looppppppppppp")
          //  db.KamatOrder.update({"mobile" : number},{$push:{item:{name:name,Price:section,quantity:count,itemtotal:itemtotal,Comment:comment,itemType:itemtype,Hiddentot:hidtotal,HiddenGst:hidgst}}},function(err,doc){
          db.currentOrder.update({_id: mongojs.ObjectId(idPass)},{$push:{item:{name:name,Price:section,quantity:count,itemtotal:itemtotal,Comment:comment,itemType:itemtype,Hiddentot:hidtotal,HiddenGst:hidgst,RoundOffValue:roundv}}},function(err,doc){

        res.json(doc);
         // console.log("Item added details display ends here");

         if (lenCheck == catlen-1) {
             //console.log("lenCheck == catlen-1 ii not 0");
             checkCall(idPass);
       }


            })

        }//else

})
//           app.put('/item/:itemdata',function(req,res){
           
            app.put('/chargesonitem:itemcharge',function(req,res){
            var itemchargee = req.params.itemcharge;
            console.log(itemchargee+"itemchargeeeeeeeeee");
            var str_array=itemchargee.split(",");
            var salechargename=str_array[0];
            console.log(salechargename);
            var salechargemethod=str_array[1];
            console.log(salechargemethod);
            var applicablecharge=str_array[2];
            applicablecharge = parseInt(applicablecharge);
            console.log(applicablecharge);
            var mongoid=str_array[3];
            console.log(mongoid+"mongoooooidddddoooiddd");
//            var chargeid = doc1._id;
//            console.log(chargeid+"chargeidchargeid");
              //{_id:mongojs.ObjectId(id)}
            db.currentOrder.update({_id:mongojs.ObjectId(mongoid)},{$push:{Charge:{ChargeName:salechargename,ChargeValue:applicablecharge,ChargeMethod:salechargemethod}}}, function(err,res){
              console.log(res);
              
            })
           })
// var id = 1476;
// db.KamatOrder.find({"orderid" :id},function(req, doc){
//     //res.json(doc)
//     console.log(doc[0])
//
// })

app.get('/GstCsgtValues:ordernum',function(req, res){
    console.log(req.params.ordernum+"nummmmnummmmnummmmnummmmnummmnumhumnmfgg")
    var id1 = req.params.ordernum;
    id1 = parseInt(id1);
    //console.log(typeof(id1)+"11111111111111111111111999999999999999999999");
   //var id  = 1476;
    db.currentOrder.find({"orderid" :id1},function(req, doc){
        res.json(doc)

    })
})

app.get('/getComments:name',function(req, res){
    console.log(req.params.name+"nmaeeeeeeeeeeeeeeeeee")
    db.itemdata.aggregate([
     {$match:{"name" : req.params.name}},
      { "$lookup": {
                            "from": "itemcommentmaster",
                            "localField":  "SaleCategoryName",
                            "foreignField": "saleCategory",
                            "as": "itemcomment"
                         }},
                           {$unwind:"$itemcomment"},
                        {$project:{ "itemcomment.Comments":1 , cmpTo: { $cmp: [ "$saleCategory", "$itemcomment.SaleCategoryName" ] }}},
                        {$match:{"cmpTo" : 0}},
             {$unwind:"$itemcomment.Comments"},
             {$group:{_id:"$itemcomment.Comments"}}
     ],function(req, doc){
        res.json(doc)

     })
})
app.get('/aliasfetch:gstfetch',function(req,res){
  console.log(req.params.gstfetch)
  var gstfetch1 = req.params.gstfetch;
  console.log(gstfetch1+"id9id9id9id9id9id9id9id9id9id9id9id9")
  console.log(typeof(gstfetch1)+"99999999999999999999999999999999999999999999999999999999999999999999999999")
    //db.tax.find({"taxname" : "Gst1"},function(err,doc){
  db.tax.find({"taxname" : gstfetch1},function(err,doc){
     res.json(doc);
     console.log(doc[0].aliasname+"cccccccccccccccccccccccccccccccccccccccccccccccc")
   })
})

app.get('/datafetch:ordernum',function(req, res){
    console.log(req.params.ordernum)
    var id1 = req.params.ordernum;
    console.log("this is a numghjkl;lkjhgfghjkl;")
    //console.log(req.params.ordernum+"sssssssssssss")
    //console.log(typeof(id1)+"11111111111111111111111999999999999999999999");
    id1 = parseInt(id1);
    //console.log(typeof(id1)+"11111111111111111111111999999999999999999999");
      db.currentOrder.aggregate([
            // { "$match": { "_id": { "$in": ids } } }
            {"$match":{ "orderid" : id1}},
            {$unwind:"$item"},
            { "$lookup": {
                            "from": "itemdata",
                            "localField": "name",
                            "foreignField": "item.name",
                            "as": "itemdata"
                         },
            },
            {$unwind:"$itemdata"},
            //{$unwind:"$item"},

            { "$project" :{"itemdata.withinstate":1,"item.name":1,"itemdata.name":1,"item.HiddenGst":1, "item.Hiddentot":1,"item.itemtotal":1, cmpTo250: { $cmp: [ "$item.name", "$itemdata.name" ] },
            _id: 0}},

            {$match:{"cmpTo250" : 0}},

               {$group:{_id:"$itemdata.withinstate","Gst": { $sum: "$item.HiddenGst" },"Hidden": { $sum: "$item.Hiddentot" },"itemtotal": { $sum: "$item.itemtotal" }}},



      ],function(err,doc){
          res.json(doc);
        //console.log(reso[0]._id+"oooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo")
      }
                                              )

})
//////////round off///////
app.get('/roundOffConfiguration',function(req,res)
{
    db.roundOffConfig.find(function(err,doc){
        res.json(doc);
})
})
/////////////chargeconfiguration/////////
app.get('/getChargedetails:charge',function(req,res){
  var charge1 = req.params.charge;
  console.log(charge1+"cahrge111111111111111111");
  db.ChargesMaster.find({"InvVoucherCla":charge1},function(err,doc){
    res.json(doc);
  })
})
///////close////////
app.get('/summery:mobile',function(req, res){
    console.log(req.params.mobile)
var mob = req.params.mobile;
    console.log("this is a numghjkl;lkjhgfghjkl;")

    db.currentOrder.find({_id: mongojs.ObjectId(idPass)},function(err,doc){

  //   db.KamatOrder.find({"mobile" : mob},function(err,doc){
        res.json(doc);
        //console.log(doc[0]+"resssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss");
      })

})
app.get('/summitem:itemname',function(req, res){
    console.log(req.params.itemname)
var itemname = req.params.itemname;
    console.log("this is a numghjkl;lkjhgfghjkl;")
     db.itemdata.find({"name" : itemname},function(err,doc){
        res.json(doc);
        console.log(doc[0].saleCategory+"1234");
      })

})

// app.get('/fetch:kotnum',function(req,res){
//   console.log(req.params.kotnum)
//   var kotnum = req.params.kotnum;
//   var kotnum1 = ''+kotnum;
//   console.log(kotnum1);
//   db.invoiceSequence.find({"SaleCategoryName" : kotnum1},function(err,doc){
//       console.log(doc[0]+"kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk");
//   });
// })


app.get('/summtax:taxname',function(req, res){
    console.log(req.params.taxname)
var taxname = req.params.taxname;
    console.log("this is a numghjkl;lkjhgfghjkl;")
     db.tax.find({"taxname" : taxname},function(err,doc){
        res.json(doc);
        console.log(doc[0].aliasname+"aliassssssssssssssssssssssssssssssssssssssssssssss")
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

app.get('/getReportDetails',function(req, res){
db.reportDetails.find(function(err,doc){
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

app.get('/prnsession:login000',function(req,res)
{
    var restaurant = req.params.login000;
    console.log("prnsession:login000 "+restaurant)
    //  db.batch.find({count:count,"stats" : "Inprogress"}).sort({_id:-1}).limit(1,function(err,doc)
    // {
    //db.session.find().sort({_id:-1}).limit(1,function(err,doc){
      db.session.find({login000:restaurant},function(err,doc){

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


// function trail1() {
//   //var kotnum = RiceDelight;
//   db..find({"SaleCategoryName" : "RiceDelight" },function(err,doc){
//       console.log(doc[0].prefix+"kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk");
// })
// }
// trail1();







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


   var  restaurant =ses[0];
   console.log(formdate);
  var formdate =ses[1];
    console.log(restaurant)
    formdate = new Date(formdate);
             //alert(currentDate)
   var nextDay = new Date(formdate.getTime() + 86400000);
   var session =ses[2];
//    var sessionn =ses[1];
//    console.log(sessionn)

//    login000:restlog
    db.session.update({login000:restaurant},{$set:{date:nextDay,session:"1"}}, function(err, doc) {
        res.json(doc);
        console.log(doc)
  });
     // db.session.insert({}, function(err, doc) {

     // })
})

app.post('/Increment:binddate',function(req,res){
        console.log("session insert updating----------------------------------------------------------------------------------------");
    var str = req.params.binddate;
    console.log(req.params.binddate11)
    var ses =str.split(",")


   var  restaurant =ses[0];
   console.log(formdate);
  var formdate =ses[1];
    console.log(restaurant)
    formdate = new Date(formdate);
             //alert(currentDate)
   var nextDay = new Date(formdate.getTime() + 86400000);
   var session =ses[2];
   session =  parseInt(session)
   session++ ;
   console.log(session)
//    var sessionn =ses[1];
//    console.log(sessionn)

//    login000:restlog
    db.session.update({login000:restaurant},{$set:{session:session}}, function(err, doc) {
        res.json(doc);
        console.log(doc)
    });
     // db.session.insert({}, function(err, doc) {

     // })
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
app.get('/getsalescategorymaster/:salefetch',function(req,res)
{
  var salefetch1 = req.params.salefetch;
    db.SaleCategoryMaster.find({"POSName":salefetch1},function(err,doc){
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
      //  console.log(id.);
       console.log(id+"iddddddddddddddd");
       console.log(req.body.saleCategory+"saleeeeeeeeeee");
         db.itemdata.update({_id:mongojs.ObjectId(id)},{$set:{"name":req.body.name,"desc":req.body.desc ,"hsc":req.body.hsc ,"invGroupName":req.body.invGroupName,
         "outofstate":req.body.outofstate ,"withinstate":req.body.withinstate,"salesTax":req.body.salesTax,"comboItem":req.body.comboItem,"section":req.body.section,"frequently":req.body.frequently,"marginReport":req.body.marginReport,"itemType":req.body.itemType,"saleCategory":req.body.saleCategory,"ChargeName":req.body.ChargeName,"ChargeValue":req.body.ChargeValue}},function(err,doc)
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
      console.log(sale1+"updateeeeeeeeeeee")
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
//for umofetch
app.get('/itemumosize',function(req,res){
  db.UOMSizeMaster.find(function(err,doc){
    res.json(doc);
  })
})

//for get details of saved items
app.get('/getitemdata/:loginres',function(req,res)
{
  var logg = req.params.loginres;
  console.log(logg+"logggggg");
    db.itemdata.find({"POSName": logg },function(err,doc){
        res.json(doc);
})
})

//for ratesection fetch
app.get('/itemsectionfetch/:sectionnamee',function(req,res)
{
  var sectionnamee1 = req.params.sectionnamee;
  console.log(sectionnamee1+"logggggg");
    db.SectionMaster.find({"POSName": sectionnamee1 },function(err,doc){
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
   var umo =rate[2];
   console.log(umo);
   var sectionname = rate[3];
   console.log(sectionname);
   var salerate = rate[4];
   console.log(salerate);

    db.itemdata.update({_id: mongojs.ObjectId(id)}, {$set:{ ItemSKUID : code, UOMSize : umo,SectionName : sectionname,SaleRate:salerate,} }, function(err, docs) {
    res.json(docs);
})
});
//new skudefine.....
app.post('/newskudefine',function(req,res){
     db.ItemSKURate.insert(req.body,function(err,doc){
        res.json(doc);
      })
})




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
    db.itemdata.find({"saleCategory" : itemname1}, function(err,doc){
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
// app.put('/editeditem',function(req,res){
//        var id = req.body._id
//      db.items.update({_id:mongojs.ObjectId(id)},{$set:{"name":req.body.name,"desc":req.body.desc ,"hsc":req.body.hsc ,"invGroupName":req.body.invGroupName,
//          "outofstate":req.body.outofstate ,"withinstate":req.body.withinstate,"salesTax":req.body.salesTax,"comboItem":req.body.comboItem,"marginReport":req.body.marginReport,"itemType":req.body.itemType}},function(err,doc)
//         {
//             res.json(doc);
//
//         });
// })
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
// app.get('/getchargesmaster:charge', function (req, res) {
//
//     var str=req.params.charge;
//     console.log(str);
//     var str_array=str.split(",");
//     var charge1=str_array[0];
//     console.log(charge1);
//     var charge2=str_array[1];
//   db.ChargesMaster.find({"Charge" : charge1},function (err, docs) {
//  //console.log(docs);
//
//  res.json(docs);
// });
//     });

//logindeatils
app.get('/logindetails:login', function(req, res){
console.log("i got requestttttttttt login deatils");
console.log(req.params.login);
var login = req.params.login;
console.log(login+"login");
var str_array=login.split(",");
var username=str_array[0];
console.log(username);
var password=str_array[1];
console.log(password);
db.loginDetails.find({"userName":username,"password":password},function (err, doc) {
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

  //frequentlyfetch

  app.get('/getfrequently', function (req, res) {
       var freq = req.query.frequently;
       console.log("frequentlyyyyy"+freq)
     // "InvVoucherCla" : "Sale"
    db.frequently.find({"frequently": freq},function (err, docs) {
   console.log(docs);

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
// var saleCategoryData = function() {
//    db.salescategorymaster.find(function(err,doc){
//         var salescategorymasterdata = doc;
//         var salescategorylength = salescategorymasterdata.length;
//          //console.log( salescategorylength);
//         for (let i = salescategorylength - 1; i >= 0; i--) {
//             //console.log(salescategorymasterdata[i].SaleCategoryName);
//             db.itemdata.find({"itemType" :salescategorymasterdata[i].SaleCategoryName,"name" : { $exists: true }},function (err, docs) {
//                      //console.log(docs.length);
//                      var itemDataLength = docs.length-1;
//                      //console.log(docs[0].itemType);
//                      //console.log(docs);
//                      for (let m = itemDataLength ; m >= 0; m--) {
//                          //console.log(docs[m]+"viik")
//                          if (docs[m]!= undefined) {
//                             console.log("type "+docs[m].itemType+" name"+docs[m].name);
//                             //console.log(docs[m].itemType)
//                          }
//                          // console.log(itemDataLength[m].itemType)

//                      }

//             });
//         }

//     })
// };


//
//  REPORT GENRATIONNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNN
app.get('/finalDataRequest',function(req,res){
    console.log("finalDataRequest")
    //console.log(finaldata)
    res.json(finaldata);

})
 var finaldata = []

app.get('/dateBatchFind/:date',function(req,res){
    finaldata = [];
    var check = 0;
    //console.log("dateBatchFind"+"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    var str=req.params.date;
    console.log(str+"strrrrrrrrrrrrrrrrrrrrrr")
    var str_array=str.split(",");
    var fdate=str_array[0];
    console.log(fdate+"fromdateeeeeeeeeeee");
    var tdate=str_array[1];
    console.log(tdate+"todateeeeeeeeeeee");
    var sessionInDay=str_array[2];
    console.log(sessionInDay+"sessiondayyyyyyyyy")
    console.log(sessionInDay+"dayyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy")
    sessionInDay = Number(sessionInDay);
    console.log("sessionInDay "+sessionInDay);
    //if(sessionInDay != 0){
        console.log("for sessionInDay to display ")
        //per day and session calculation
        db.salescategorymaster.find(function(err,doc){
        var salescategorymasterdata = doc;
        //console.log(salescategorymasterdata.POSName+"salescategoryyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy");
        var salescategorylength = salescategorymasterdata.length;
        //xCall = salescategorylength - 1 ;
         //console.log( salescategorylength);
       for (var x = salescategorylength - 1; x >= 0; x--) {
            (function(x) {
             //console.log("x "+x+" salescategorymasterdata[x].SaleCategoryName "+salescategorymasterdata[x].SaleCategoryName);
            //console.log(salescategorymasterdata[x].POSName);
            db.itemdata.find({"saleCategory" :salescategorymasterdata[x].SaleCategoryName,"name" : { $exists: true }},function (err, docs) {
                     //console.log(docs[0].invGroupName);
                    // xCall --;
                     var itemDataLength = docs.length-1;
                     //console.log(docs[0].itemType);
                     //console.log(itemDataLength);
                     //mCall = itemDataLength ;
                     for (let m = itemDataLength ; m >= 0; m--) {
                         (function(m) {
                         //console.log("x "+x+"m "+m+" docs[m].itemType "+docs[m].itemType+" docs[m].name "+docs[m].name);
                         //console.log(docs[m]+"viik")
                        // mCall -- ;
                         if (docs[m]!= undefined) {
                            // console.log("type "+docs[m].itemType+" name"+docs[m].name);
                            //console.log(docs[m].itemType)
                            //console.log(docs[m].name+"nameeeeeeeeeeeeeeeeee")
                            //console.log( "fdate "+fdate+" tdate "+tdate+" docs[m].itemType "+docs[m].itemType+" docs[m].name "+docs[m].name)
                             // db.KamatOrder.find({Sessiondate: { $gt:"2017-10-10T00:00:00.000Z", $lt: "2017-10-10T23:59:59.999Z"}, "item.itemType" : docs[m].itemType,"item.name" : docs[m].name},{item: {$elemMatch: {name: docs[m].name}},_id:0  },function(err,response){

                            db.KamatOrder.find({Sessiondate: { $gt:(fdate), $lt: (tdate)},RoundOffValue:{$ne: NaN}, session:sessionInDay,"item.itemType" : docs[m].saleCategory,"item.name" : docs[m].name},{item: {$elemMatch: {name: docs[m].name}},_id:0  },function(err,response){
                            //  console.log(response[0]+"responseeeeeeeeeeee");
                              //console.log(response[m].Subtotal+"responseeeeeeeeeeeeeeeeeeeee")
                            //db.KamatOrder.find({Sessiondate: { $gt:"2017-10-10T00:00:00.000Z", $lt: "2017-10-10T23:59:59.999Z" } , "item.itemType" : " South Indian Meals","item.name" : "Full Meals"},{item: {$elemMatch: {name:"Full Meals"}},_id:0},function(err,response){

                             // db.KamatOrder.find({Sessiondate: { $gt:"2017-10-10T00:00:00.000Z", $lt: "2017-10-10T23:59:59.999Z" } , "item.itemType" : " South Indian Meals","item.name" : "Full Meals"},{item: {$elemMatch: {name:"Full Meals"}},_id:0},function(err,response){

                                    // , "item.itemType" : " Beverages"},{item: {$elemMatch: {name: "Tea"}}
                                    //var a = 100;
                                    //console.log("r "+response[0].item[0].name)

                                    //console.log("r zero "+response.length)
                                     //console.log( "fdate "+fdate+" tdate "+tdate+" response.length "+response.length)
                                    //console.log(" x "+x+" m "+m)
                                    var resLength = response.length ;
                                    //console.log(response.length+"response")
                                    if(resLength != 0){
                                   // console.log("r not zero "+response.length)
                                    //var price = 0;
                                    var quantity = 0;
                                    var itemTotal = 0;
                                    var name = docs[m].name ;
                                    console.log(docs[m].name+"nameeeeeeeeeeeeeee")
                                    var category = docs[m].saleCategory;
                                    console.log(docs[m].saleCategory+"typeeeeeeee")
                                    console.log(docs[m].RoundOffValue+"round")


                                     //console.log(response[0].item[0].name);
                                     //console.log(resLength);
                                     //console.log(response[1].item[1].Price);
                                     // for (let m = itemDataLength ; m >= 0; m--) {
                                     // console.log("m "+m+" docs[m].itemType "+docs[m].itemType+" docs[m].name "+docs[m].name);

                                     for(let v = resLength-1 ;v >= 0; v--){
                                         (function(v) {
                                          //console.log("v "+v+" x "+x );
                                          //console.log(" docs[m].name v "+docs[m].name);
                                         // console.log("itemTotal "+itemTotal);
                                         if(response[v].item != undefined){
                                                //  price += response[v].item[0].Price ;
                                                quantity += response[v].item[0].quantity ;
                                                console.log(response[v].item[0].quantity+"yashwanthhhhh")
                                                itemTotal += response[v].item[0].itemtotal ;
                                                console.log(response[v].item[0].RoundOffValue+"yashwanthhhhh")
                                                //console.log(response[v].item[0].Sessiondate+"yashwanthhhhh")
                                                // console.log(" price undefined v"+ response[v].item);
                                                //  console.log(" price undefined v"+ response[v]);
                                                //   console.log(" price undefined v"+ response[v].item);
                                                if (v== 0) {
                                                    // console.log("m "+m+" docs[m].itemType "+docs[m].itemType+" docs[m].name "+docs[m].name);
                                                   // console.log("xCall "+xCall+" mCall "+ mCall)
                                                    //console.log("category   "+category+"              name "+name+" quantity "+quantity+" itemTotal "+itemTotal);
                                                    // console.log(" x "+x+" m "+m+" v "+v)
                                                     var data ={
                                                         'category':category,
                                                         'name':name,
                                                          //'price': price,
                                                         'quantity':quantity,
                                                         'itemTotal':itemTotal
                                                     }
                                                     finaldata.push(data);
                                                     if ( x == 0  && check == 0) {
                                                        check = 1;
                                                        //console.log("iam idli")
                                                        res.json(finaldata);
                                                        //console.log(finaldata+"ifloppppppppppp")
                                                     }
                                                     // return a = 10;
                                                     //console.log("oii")
                                                     // if (v== 0 && m == 0 && x == 0) {
                                                     //        console.log("iam zero")
                                                             //console.log(finaldata);

                                                     // }
                                                     // res.end(finaldata);
                                                }
                                         }
                                     })(v);
                                     }//v
                                     }//res.len
                                        else{
                                              if ( x == 0  && m== 0 &&check == 0) {
                                                        check = 1;
                                                        //console.log("iam idli")
                                                        res.json(finaldata);
                                                     }
                                            }

                             }) //kamat
                         }
                         // console.log(itemDataLength[m].itemType)
                     })(m);
                     }//m

            });
        })(x);
        }
        //res.json()
    })


})
app.get('/fulldata',function(req,res){
    console.log("fulldata")
    console.log(datafill)
    res.json(datafill);
})

// FOR PREVIEW    WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW//

app.get('/preview/:date',function(req,res){
    console.log("heyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy")
    datafill = [];
    var check = 0;
   // console.log("preview"+"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    var str=req.params.date;

    console.log(str+"srrrrsrsssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss")
   // console.log(str+"strrrrrrrrrrrrrrrrrrrrrr")
    var str_array=str.split(",");
    var fdate=str_array[0];
    console.log(fdate+"fromdateeeeeeeeeeee");
    var tdate=str_array[1];
    console.log(tdate+"todateeeeeeeeeeee");
    var currentsession=str_array[2];
    console.log(currentsession+"sessiondayyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy")
    //console.log(sessionInDay+"dayyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy")
    currentsession = Number(currentsession);
    console.log("currentsession "+currentsession);
    //if(sessionInDay != 0){
        console.log("for currentsession to display ")
        //per day and session calculation
        db.salescategorymaster.find(function(err,doc){
        var salescategorymasterdata = doc;
         console.log(salescategorymasterdata)
        // res.json(doc)
        console.log(salescategorymasterdata.POSName+"salescategoryyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy");
        var salescategorylength = salescategorymasterdata.length;
        //xCall = salescategorylength - 1 ;
         console.log( salescategorylength);
       for (var x = salescategorylength - 1; x >= 0; x--) {
            (function(x) {


              
             //console.log("x "+x+" salescategorymasterdata[x].SaleCategoryName "+salescategorymasterdata[x].SaleCategoryName);
            //console.log(salescategorymasterdata[x].POSName);
            db.itemdata.find({"saleCategory" :salescategorymasterdata[x].SaleCategoryName,"name" : { $exists: true }},function (err, docs) {
                     console.log(docs);
                    // xCall --;
                     var itemDataLength = docs.length-1;
                     console.log(itemDataLength+"babababababababbababbababaababababa")
                     //console.log(docs[0].itemType);
                     // console.log(itemDataLength);
                     //mCall = itemDataLength ;


                     for (let m = itemDataLength ; m >= 0; m--) {
                         (function(m) {
                         //console.log("x "+x+"m "+m+" docs[m].itemType "+docs[m].itemType+" docs[m].name "+docs[m].name);
                         //console.log(docs[m]+"viik")
                        // mCall -- ;
                         if (docs[m]!= undefined) {
                            // console.log("type "+docs[m].itemType+" name"+docs[m].name);
                            //console.log(docs[m].itemType)
                            //console.log(docs[m].name+"nameeeeeeeeeeeeeeeeee")
                            //console.log( "fdate "+fdate+" tdate "+tdate+" docs[m].itemType "+docs[m].itemType+" docs[m].name "+docs[m].name)
                             // db.KamatOrder.find({Sessiondate: { $gt:"2017-10-10T00:00:00.000Z", $lt: "2017-10-10T23:59:59.999Z"}, "item.itemType" : docs[m].itemType,"item.name" : docs[m].name},{item: {$elemMatch: {name: docs[m].name}},_id:0  },function(err,response){

                            // db.KamatOrder.find({Sessiondate: { $gt:(fdate), $lt: (tdate)},RoundOffValue:{$ne: NaN}, session:sessionInDay,"item.itemType" : docs[m].itemType,"item.name" : docs[m].name},{item: {$elemMatch: {name: docs[m].name}},_id:0  },function(err,response){
                           // console.log(fdate+"rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr")
                               db.currentOrder.find({Sessiondate: { $gt:(fdate),$lt:(tdate) },RoundOffValue:{$ne: NaN},"item.itemType" : docs[m].saleCategory,"item.name" : docs[m].name},{item: {$elemMatch: {name: docs[m].name}},_id:0  },function(err,response){
                            // db.KamatOrder.find({Sessiondate: { $gt:(fdate), $lt: (tdate)},"session":sessionInDay,RoundOffValue:{$ne:("RoundOffValue")},"item.itemType" : docs[m].itemType,"item.name" : docs[m].name},{item: {$elemMatch: {name: docs[m].name}},_id:0  },function(err,response){
                            //  console.log(response[0]+"responseeeeeeeeeeee");
                              //console.log(response[m].Subtotal+"responseeeeeeeeeeeeeeeeeeeee")
                            //db.KamatOrder.find({Sessiondate: { $gt:"2017-10-10T00:00:00.000Z", $lt: "2017-10-10T23:59:59.999Z" } , "item.itemType" : " South Indian Meals","item.name" : "Full Meals"},{item: {$elemMatch: {name:"Full Meals"}},_id:0},function(err,response){

                             // db.KamatOrder.find({Sessiondate: { $gt:"2017-10-10T00:00:00.000Z", $lt: "2017-10-10T23:59:59.999Z" } , "item.itemType" : " South Indian Meals","item.name" : "Full Meals"},{item: {$elemMatch: {name:"Full Meals"}},_id:0},function(err,response){

                                    // , "item.itemType" : " Beverages"},{item: {$elemMatch: {name: "Tea"}}
                                    //var a = 100;
                                    //console.log("r "+response[0].item[0].name)

                                    //console.log("r zero "+response.length)
                                     //console.log( "fdate "+fdate+" tdate "+tdate+" response.length "+response.length)
                                    //console.log(" x "+x+" m "+m)
                                    var resLength = response.length ;
                                    //console.log(response.length+"response")
                                    if(resLength != 0){
                                   // console.log("r not zero "+response.length)
                                    //var price = 0;
                                    var quantity = 0;
                                    var itemTotal = 0;
                                    var name = docs[m].name ;
                                    console.log(docs[m].name+"nameeeeeeeeeeeeeee")
                                    var category = docs[m].saleCategory;
                                    console.log(docs[m].saleCategory+"typeeeeeeee")
                                    console.log(docs[m].RoundOffValue+"round")


                                     //console.log(response[0].item[0].name);
                                     //console.log(resLength);
                                     //console.log(response[1].item[1].Price);
                                     // for (let m = itemDataLength ; m >= 0; m--) {
                                     // console.log("m "+m+" docs[m].itemType "+docs[m].itemType+" docs[m].name "+docs[m].name);

                                     for(let v = resLength-1 ;v >= 0; v--){
                                         (function(v) {
                                          //console.log("v "+v+" x "+x );
                                          //console.log(" docs[m].name v "+docs[m].name);
                                         // console.log("itemTotal "+itemTotal);
                                         if(response[v].item != undefined){
                                                //  price += response[v].item[0].Price ;
                                                quantity += response[v].item[0].quantity ;
                                                // console.log(response[v].item[0].quantity+"yashwanthhhhh")
                                                itemTotal += response[v].item[0].itemtotal ;
                                                // console.log(response[v].item[0].RoundOffValue+"yashwanthhhhh")
                                                //console.log(response[v].item[0].Sessiondate+"yashwanthhhhh")
                                                // console.log(" price undefined v"+ response[v].item);
                                                //  console.log(" price undefined v"+ response[v]);
                                                //   console.log(" price undefined v"+ response[v].item);
                                                if (v== 0) {
                                                   // console.log("m "+m+" docs[m].itemType "+docs[m].itemType+" docs[m].name "+docs[m].name);
                                                   // console.log("xCall "+xCall+" mCall "+ mCall)
                                                    //console.log("category   "+category+"              name "+name+" quantity "+quantity+" itemTotal "+itemTotal);
                                                    // console.log(" x "+x+" m "+m+" v "+v)
                                                     var data ={
                                                         'category':category,
                                                         'name':name,

                                                         'quantity':quantity,
                                                         'itemTotal':itemTotal
                                                     }
                                                     datafill.push(data);
                                                     if ( x == 0  && check == 0) {
                                                        check = 1;
                                                        //console.log("iam idli")
                                                        res.json(datafill);
                                                        console.log(datafill+"ifloppppppppppppppppppppppppppppppp")
                                                     }
                                                     // return a = 10;
                                                     //console.log("oii")
                                                     // if (v== 0 && m == 0 && x == 0) {
                                                     //        console.log("iam zero")
                                                             //console.log(finaldata);

                                                     // }
                                                     // res.end(finaldata);
                                                }
                                         }
                                     })(v);
                                     }//v
                                     }//res.len
                                        else{
                                              if ( x == 0  && m== 0 &&check == 0) {
                                                        check = 1;
                                                        //console.log("iam idli")
                                                        res.json(datafill);
                                                     }
                                            }

                             }) //kamat
                         }
                         // console.log(itemDataLength[m].itemType)
                     })(m);
                     }//m

            });
        })(x);
        }
        // res.json()
    })


})

///////////////////////////////
app.get('/DayWiseFind/:date',function(req,res){

    console.log("DayWiseFind")
    var str=req.params.date;
    var str_array=str.split(",");
    var fdate=str_array[0];
    var tdate=str_array[1];
    var sessionInDay=str_array[2];
     console.log(sessionInDay)
    sessionInDay = Number(sessionInDay);
    //if(sessionInDay != 0){
         db.Accountposting.aggregate([
                   //  { $match: { Sessiondate: { $gt:"2017-10-16T00:00:00.000Z", $lt: "2017-10-19T23:59:59.999Z" },"session" : 2 } },
                     { $match: { Sessiondate: { $gt:fdate, $lt: tdate },"session" : sessionInDay } },

                     {$unwind:'$ItemPosting'},
                     { $group: { _id: "$ItemPosting.Accountname", "total": { $sum: "$ItemPosting.amount" } } },

                   ],function(err,response){

                 res.json(response);
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

app.get('/trytoget', function (req, res) {
//var try1 = function (argument) {

    db.KamatOrder.find({Sessiondate: { $gt:"2017-10-10T00:00:00.000Z", $lt: "2017-10-10T23:59:59.999Z" } , "item.itemType" : " South Indian Meals","item.name" : "Full Meals"},{item: {$elemMatch: {name:"Full Meals"}},_id:0},function(err,response){
        console.log("tryry");
        console.log(response);
        res.json(response);
   })
//}
//try1();
})
// var try9 = function(){
//   //var gstfetch1 = Gst1;
//   var Gst1;
//   db.tax.find({"taxname" : "Gst1"},function(err,doc){
//      //res.json(doc);
//      console.log(doc[0].aliasname+"cccccccccccccccccccccccccccccccccccccccccccccccc")
//    })
//  }
//  try9();
      // var fs = require('fs');
      // var mongoXlsx = require('mongo-xlsx');
      // var MongoClient = require('mongodb').MongoClient;
      // var url = "mongodb://localhost:27017/restaurant";
      // MongoClient.connect(url, function(err, db) {
      // if (err) throw err;
      //  db.collection("KamatOrder").find({}).toArray(function(err, result) {
      //  if (err) throw err;
      //  var jsonintext=JSON.stringify(result);
      //  var model = mongoXlsx.buildDynamicModel(result);
      //  mongoXlsx.mongoData2Xlsx(result, model, function(err, data) {
      //  console.log('File saved at:', result.fullPath);
      //  });
      // mongoXlsx.xlsx2MongoData("./file.xlsx", model, function(err, mongoData) {
      // console.log('Mongo data:', mongoData);
      // db.close();
      // });
      // });
      // });
//try9();

var checkCall = function (number) {
    console.log("checkCall")
    console.log("number "+number)
    var dataUpdate = [];
    var lengthCheck = 0;
    var dataUpdateDuplicate = [];
    var queryData = null;
    db.currentOrder.aggregate([{$match:{"_id" : number }}, {$unwind:"$item"}],function(err,response){
        //console.log("tryry");
        queryData = response[0]
         // console.log(response.length);
        // lengthCheck = response.length - 1

        var lenthData = response.length;
        for (var i = response.length - 1; i >= 0; i--) {
            console.log(response[i].item.name);
            //console.log("name is here "+response[i].item[0].name)
             //      }
          //      //res.json(response);
            // })
          db.currentOrder.aggregate([

                {$match:{ "_id" : number }},
                {$unwind:"$item"},
                { "$lookup": {
                            "from": "itemdata",
                            "localField": "name",
                            "foreignField": "item",
                            "as": "itemdata"
                         },
                },
                {$unwind:"$itemdata"},
                        {$match:{"itemdata.name" :  response[i].item.name, "item.name" :  response[i].item.name}},
                        {$group:{_id:{itemgroup:"$itemdata.invGroupName","itemname" : response[i].item.name}}},
                      // itemgroup:"$itemdata.invGroupName","itemname" : "Curd Rice"
                ],function (argument,replay) {
                        console.log(replay[0]._id.itemgroup);
                        console.log(replay[0]._id.itemname)
                        db.currentOrder.aggregate([

                             {$match:{ "_id" : number }},
                             {$unwind:"$item"},
                             { "$lookup": {
                            "from": "itemdata",
                            "localField": "name",
                            "foreignField": "item",
                            "as": "itemdata"
                             },
                             },
                             {$unwind:"$itemdata"},
                             {$match:{"itemdata.name" :  replay[0]._id.itemname, "item.name" : replay[0]._id.itemname}},
                             { "$lookup": {
                            "from": "inventorygroupmaster",
                            "localField": "GroupName",
                            "foreignField": "itemdata.invGroupName",
                            "as": "inventorygroup"
                             },
                             },
                             {$unwind:"$inventorygroup"},
                             {$match:{"inventorygroup.GroupName" : replay[0]._id.itemgroup, "item.name" : replay[0]._id.itemname,"itemdata.name" :  replay[0]._id.itemname}},
                             {$group:{_id:{itemgroup:"$inventorygroup.Sales Account",itemname:"$item.name",Hiddentot:{$sum:"$item.Hiddentot"}}}},


                             ],function (argument,response) {
                                     console.log(response)

                                      lengthCheck ++;
                                      var obj = {}
                                      obj["itemgroup"] = response[0]._id.itemgroup ;
                                      obj["itemname"] = response[0]._id.itemname ;
                                      obj["Price"] = response[0]._id.Hiddentot ;
                                      dataUpdate.push(obj);
                                             // console.log(dataUpdate)
                                     if(lengthCheck == lenthData){
                                            // console.log(lengthCheck+"  lengthCheck");
                                         additionCall()
                                     }
                                    //res.json(response);
                        })
            })

        }//for loop
        //res.json(response);
   })//db close
    var additionCall = function () {
        //for remove dupliucates

        console.log("additionCall");
        //console.log(dataUpdate);
        for (let m = dataUpdate.length - 1; m >= 0; m--) {
           // Things[i]
           if(dataUpdateDuplicate.indexOf(dataUpdate[m].itemgroup) == -1){
                dataUpdateDuplicate.push(dataUpdate[m].itemgroup);
               // console.log(dataUpdateDuplicate)

               if(m == 0){
                  //console.log("m "+m);
                  additionCallTotal ();

               }
           }//if
            else{

                if(m == 0){
                 // console.log("m else "+m);
                  additionCallTotal ();
               }
            }

        }//for m
        // body...
    }//add
    var additionCallTotal = function () {
         console.log("additionCallTotal");
         //console.log(dataUpdateDuplicate);
        // console.log(dataUpdate);
         for (let a = dataUpdateDuplicate.length - 1; a >= 0; a--) {
             //Things[i]
            // console.log(dataUpdateDuplicate[a]);
                var totalPrice = 0;
              //  Hiddentot
             for (let b = dataUpdate.length - 1; b >= 0; b--) {
             //Things[i]
             if (dataUpdateDuplicate[a] == dataUpdate[b].itemgroup ) {
                //console.log(dataUpdateDuplicate[a]);
                // console.log(dataUpdate[b].itemgroup);
                // console.log(dataUpdate[b].Price);
                totalPrice += dataUpdate[b].Price;
                if(b == 0){
                 // console.log("m else "+m);
                 //console.log(b+" b "+ dataUpdateDuplicate[a]+" "+totalPrice);
                 finalAccountMap(dataUpdateDuplicate[a],totalPrice)
                 }

             }else{
                if(b == 0){
                 // console.log("m else "+m);
                 //console.log(b+" else b "+ dataUpdateDuplicate[a]+" "+totalPrice);
                 finalAccountMap(dataUpdateDuplicate[a],totalPrice)
                 }
             }

         }
         }
        // body...
    }//additionCallTotal
    var inital = 0;
    var finalAccountMap = function (Transactiontype,FinalTotal) {
         console.log("finalAccountMap");
         // console.log(queryData._id);
         //  console.log(queryData.Sessiondate)
         //  //{"OrderId" : queryData._id,Sessiondate:queryData.Sessiondate,session:queryData.session,posname:queryData.posname,ItemPosting:[{Accountname :queryData.Transactiontype,amount:queryData.Finaltotal,"cr/dr" : "dr"},{Accountname :"Cgst",amount:queryData.Cgst,"cr/dr" : "dr"},{Accountname :"Sgst",amount:queryData.Sgst,"cr/dr" : "dr"}, {Accountname :"Gst",amount:queryData.TotalGst,"cr/dr" : "dr"} ]})

         if(inital == 0){
             //console.log(Transactiontype+" , "+FinalTotal);
        //    db.Accountposting.insert({"OrderId" : 12,ItemPosting:[{Accountname :doc.Transactiontype,amount:doc.FinalTotal,"cr/dr" : "dr"},{Accountname :"Cgst",amount:doc.Cgst,"cr/dr" : "dr"},{Accountname :"Sgst",amount:doc.Sgst,"cr/dr" : "dr"}, {Accountname :"Gst",amount:doc.TotalGst,"cr/dr" : "dr"}, {Accountname :"Gst",amount:doc.TotalGst,"cr/dr" : "dr"} ]})
            //  db.Accountposting.insert({"OrderId" : 12,ItemPosting:[{Accountname :Transactiontype,amount:FinalTotal,"cr/dr" : "dr"}]} ,function(err,res){   "FinalTotal"                                           "FinalTotal"
             console.log("queryData.FinalTotal "+queryData.FinalTotal)
              db.Accountposting.insert({"OrderId" : queryData._id,Sessiondate:queryData.Sessiondate,session:queryData.session,posname:queryData.posname,ItemPosting:[{Accountname :queryData.Transactiontype,amount:queryData.FinalTotal,"cr/dr" : "dr"},{Accountname :"Cgst",amount:queryData.Cgst,"cr/dr" : "dr"},{Accountname :"Sgst",amount:queryData.Sgst,"cr/dr" : "dr"}, {Accountname :"Gst",amount:queryData.TotalGst,"cr/dr" : "dr"},{Accountname :Transactiontype,amount:FinalTotal,"cr/dr" : "dr"} ]},function(err,res){

               // db.KamatOrder.insert({"mobile" : number,item:[{name : name,Price: section,quantity:count,itemtotal:itemtotal,Comment:comment,itemType:itemtype}],Subtotal:subtotal,TotalNoItems:totalqan,ServiceCharge:serchar,Cgst:sercharc,Sgst:serchars,TotalGst:totGst,FinalTotal:finaltotal,Sessiondate:sdate,session:session,ChangeAmount:Change,orderstatus:"Paid",posname:restaurant,"Transactiontype" : selectpicker},function(err,doc){
  //db.Accountposting.insert({"OrderId" : doc._id,Sessiondate:sdate,session:session,posname:restaurant,ItemPosting:[{Accountname :doc.Transactiontype,amount:finaltotal,"cr/dr" : "dr"},{Accountname :"Cgst",amount:sercharc,"cr/dr" : "dr"},{Accountname :"Sgst",amount:serchars,"cr/dr" : "dr"}, {Accountname :"Gst",amount:totGst,"cr/dr" : "dr"} ]})


                 //console.log("in insert "+inital);
                //console.log(res)
              })

            inital++;
         }else{
            // console.log(Transactiontype+" , "+FinalTotal);
            db.Accountposting.update({"OrderId" :queryData._id},{$push:{ItemPosting:{Accountname :Transactiontype,amount:FinalTotal,"cr/dr" : "dr"}} },function(err,res){

         // db.KamatOrder.update({"mobile" : number},{$push:{item:{name:name,Price:section,quantity:count,itemtotal:itemtotal,Comment:comment,itemType:itemtype}}},function(err,doc){
          //console.log("in update "+inital);
               // console.log(res)
              })
           // )

         }
     //   db.KamatOrder.insert({"mobile" : number,item:[{name : name,Price: section,quantity:count,itemtotal:itemtotal,Comment:comment,itemType:itemtype}],Subtotal:subtotal,TotalNoItems:totalqan,ServiceCharge:serchar,Cgst:sercharc,Sgst:serchars,TotalGst:totGst,FinalTotal:finaltotal,Sessiondate:sdate,session:session,ChangeAmount:Change,orderstatus:"Paid",posname:restaurant,"Transactiontype" : selectpicker},function(err,doc){
     // db.Accountposting.insert({"OrderId" : 12,Sessiondate:doc.Sessiondate,session:doc.session,posname:restaurant,ItemPosting:[{Accountname :doc.Transactiontype,amount:doc.FinalTotal,"cr/dr" : "dr"},{Accountname :"Cgst",amount:doc.Cgst,"cr/dr" : "dr"},{Accountname :"Sgst",amount:doc.Sgst,"cr/dr" : "dr"}, {Accountname :"Gst",amount:doc.TotalGst,"cr/dr" : "dr"} ]})



        // body...
    }
}

//for chargeConfigure
app.get('/chargeConfigure',function(req,res)
{
    db.chargeConfigure.find(function(err,doc){
        res.json(doc);
        console.log(doc[0]+"docccccc");
})
})
//for get charge save item details
app.get('/getchargedata/:voucher',function(req,res)
{
  var voucher1 = req.params.voucher;
  console.log(voucher1);
    db.ChargesMaster.find({"InvVoucherCla":voucher1},function(err,doc){
        res.json(doc);
        console.log(doc[0]+"docccccc");
})
})
//for valuation
app.get('/valuation',function(req,res)
{
    db.valuationIn.find(function(err,doc){
        res.json(doc);
        console.log(doc[0]+"docccccc");
})
})

//ledgerdetails
app.get('/ledgerdetails',function(req,res)
{
    db.ledgerDetails.find(function(err,doc){
        res.json(doc);
        console.log(doc[0]+"docccccc");
})
})

///getaddsub
app.get('/getaddsub',function(req,res)
{
    db.addSub.find(function(err,doc){
        res.json(doc);
        console.log(doc[0]+"docccccc");
})
})

//for edited save
app.put('/putaccountdetails',function(req,res){
  //console.log(req.body._id+"haoiiiii");
  var id = req.body._id
  console.log(id+"haiiiiiiiiiiiiiiid");
     db.ChargesMaster.update({_id:mongojs.ObjectId(id)},{$set:{"ChargeId":req.body.ChargeId,"InvVoucherCla":req.body.InvVoucherCla,"RowNo":req.body.RowNo,"chargeName":req.body.chargeName,"accountName":req.body.accountName,"AcNo":req.body.AcNo,"AddSub":req.body.AddSub,
     "ChargeValue":req.body.ChargeValue,"ChargeMethod":req.body.ChargeMethod,"Editable":req.body.Editable,"Taxable":req.body.Taxable,"SectionID":req.body.SectionID}},function(err,doc)
     {
        res.json(doc);
      })
})

//for chargedelete
app.delete('/chargedelete/:cdelete',function(req,res)
{
   console.log("i got the delete request");
    var id=req.params.cdelete;
    console.log(id);
    db.ChargesMaster.remove({_id: mongojs.ObjectId(id)}, function(err, docs) {
      res.json(docs);
})
})

//for new save
app.post('/chargesave',function(req,res){
     db.ChargesMaster.insert(req.body,function(err,doc){
        res.json(doc);
      })
})

// app.get('/getchargedata/:voucher',function(req,res)
// {
//   var voucher1 = req.params.voucher;
//   console.log(voucher1);
//accoiunt no fetch
app.get('/getaccountNo/:acc',function(req,res)
{
  var acc1 = req.params.acc;
  console.log(acc1+"acccountname");
    db.ledgerDetails.find({"accountName":acc1},function(err,doc){
        res.json(doc);
})
})
// app.post('/saveitempost',function(req,res){
//      db.itemdata.insert(req.body,function(err,doc){
//         res.json(doc);
//       })
// })

// app.put('/editeditem',function(req,res){
//        var id = req.body._id
//      db.itemdata.update({_id:mongojs.ObjectId(id)},{$set:{"name":req.body.name,"desc":req.body.desc ,"hsc":req.body.hsc ,"invGroupName":req.body.invGroupName,
//          "outofstate":req.body.outofstate ,"withinstate":req.body.withinstate,"salesTax":req.body.salesTax,"comboItem":req.body.comboItem,"section":req.body.section,"frequently":req.body.frequently,"marginReport":req.body.marginReport,"itemType":req.body.itemType,"ChargeName":req.body.ChargeName,"ChargeValue":req.body.ChargeValue}},function(err,doc)
//         {
//             res.json(doc);
//
//         });
// })


//checkCall()
// app.post('/accountMapping:poscartt',function(req,res){
//     console.log("accountMapping:poscartt")
//       var catstr = req.params.poscartt;
//     console.log(catstr);
//      var str_array=catstr.split(",");
//     var number=str_array[0];
//     console.log(number);
//     checkCall(number)
// })
//  function trail() {
//     console.log("trail")
//     db.KamatOrder.aggregate([

//             {$match:{ "mobile" : "6713209999" }},
//             {$unwind:"$item"},
//             { "$lookup": {
//                             "from": "itemdata",
//                             "localField": "name",
//                             "foreignField": "item",
//                             "as": "itemdata"
//                          },
//             },
//             {$unwind:"$itemdata"},
//                         {$match:{"itemdata.name" : "Curd Rice", "item.name" : "Curd Rice"}},
//                         {$group:{_id:{itemgroup:"$itemdata.invGroupName",}}},

//             ],function (argument,response) {
//                 console.log(response[0]._id.itemgroup)
//             //      db.KamatOrder.aggregate([

//             // {$match:{ "mobile" : "6713209999" }},
//             // {$unwind:"$item"},
//             // { "$lookup": {
//             //                 "from": "itemdata",
//             //                 "localField": "name",
//             //                 "foreignField": "item",
//             //                 "as": "itemdata"
//             //              },
//             // },
//             // {$unwind:"$itemdata"},
//             //  {$match:{"itemdata.name" : "Curd Rice", "item.name" : "Curd Rice"}},
//             //  { "$lookup": {
//             //                 "from": "inventorygroupmaster",
//             //                 "localField": "GroupName",
//             //                 "foreignField": "itemdata.invGroupName",
//             //                 "as": "inventorygroup"
//             //              },
//             // },
//             //  {$unwind:"$inventorygroup"},
//             //   {$match:{"inventorygroup.GroupName" : response[0]._id.itemgroup, "item.name" : "Curd Rice","itemdata.name" : "Curd Rice"}},
//             //     {$group:{_id:{itemgroup:"$inventorygroup.Sales Account",itemname:"$item.name",Hiddentot:{$sum:"$item.Hiddentot"}}}},


//             // ],function (argument,rep) {
//             //     console.log(rep)
//                 // body...
//             //})
//                 // body...
//             })
//     // body...
// }
//batchfile codeeeeeeeee
// require('child_process').exec(__dirname + "/yashwanth.bat", function (err, stdout, stderr) {
//
//                   if (err) {
//                     return console.log(err);
//                    }
//
//                  //  console.log(stdout);
//             });
//////////////////manage report///////
app.get('/forses',function(req,res){
    // alert("hey")

console.log("ssssssssssssssssssssssssssssssssssss")

  db.sessons.find(({}),function (err, docs) {
 console.log(docs+"dddddddddddddddddddd");

 res.json(docs[0].session);
  });
});

//FOR A MANAGER REPORTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT//

app.get('/kamtbatch/:date',function(req,res){
    console.log("heyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy")
    finaldata = [];
    var check = 0;
   // console.log("kamtbatch"+"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    var str=req.params.date;
    console.log(str+"srrrrsrsssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss")
   // console.log(str+"strrrrrrrrrrrrrrrrrrrrrr")
    var str_array=str.split(",");
    var fdate=str_array[0];
    console.log(fdate+"fromdateeeeeeeeeeee");
    var tdate=str_array[1];
    console.log(tdate+"todateeeeeeeeeeee");
    var sessionInDay=str_array[2];
    console.log(sessionInDay+"sessiondayyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy")
    //console.log(sessionInDay+"dayyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy")
    sessionInDay = Number(sessionInDay);
    console.log("sessionInDay "+sessionInDay);
    //if(sessionInDay != 0){
        console.log("for sessionInDay to display ")
        //per day and session calculation
        db.salescategorymaster.find(function(err,doc){
        var salescategorymasterdata = doc;
        //console.log(salescategorymasterdata.POSName+"salescategoryyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy");
        var salescategorylength = salescategorymasterdata.length;
        //xCall = salescategorylength - 1 ;
         console.log( salescategorylength);
       for (var x = salescategorylength - 1; x >= 0; x--) {
            (function(x) {
             //console.log("x "+x+" salescategorymasterdata[x].SaleCategoryName "+salescategorymasterdata[x].SaleCategoryName);
            //console.log(salescategorymasterdata[x].POSName);
            db.itemdata.find({"saleCategory" :salescategorymasterdata[x].SaleCategoryName,"name" : { $exists: true }},function (err, docs) {
                     //console.log(docs[0].invGroupName);
                    // xCall --;
                     var itemDataLength = docs.length-1;
                     //console.log(docs[0].itemType);
                     // console.log(itemDataLength);
                     //mCall = itemDataLength ;
                     for (let m = itemDataLength ; m >= 0; m--) {
                         (function(m) {
                         //console.log("x "+x+"m "+m+" docs[m].itemType "+docs[m].itemType+" docs[m].name "+docs[m].name);
                         //console.log(docs[m]+"viik")
                        // mCall -- ;
                         if (docs[m]!= undefined) {
                            // console.log("type "+docs[m].itemType+" name"+docs[m].name);
                            //console.log(docs[m].itemType)
                            //console.log(docs[m].name+"nameeeeeeeeeeeeeeeeee")
                            //console.log( "fdate "+fdate+" tdate "+tdate+" docs[m].itemType "+docs[m].itemType+" docs[m].name "+docs[m].name)
                             // db.KamatOrder.find({Sessiondate: { $gt:"2017-10-10T00:00:00.000Z", $lt: "2017-10-10T23:59:59.999Z"}, "item.itemType" : docs[m].itemType,"item.name" : docs[m].name},{item: {$elemMatch: {name: docs[m].name}},_id:0  },function(err,response){

                            // db.KamatOrder.find({Sessiondate: { $gt:(fdate), $lt: (tdate)},RoundOffValue:{$ne: NaN}, session:sessionInDay,"item.itemType" : docs[m].itemType,"item.name" : docs[m].name},{item: {$elemMatch: {name: docs[m].name}},_id:0  },function(err,response){
                           // console.log(fdate+"rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr")
                               db.KamatOrder.find({Sessiondate: { $gt:(fdate),$lt:(tdate) }, RoundOffValue:{$ne: NaN},"item.itemType" : docs[m].saleCategory,"item.name" : docs[m].name},{item: {$elemMatch: {name: docs[m].name}},_id:0  },function(err,response){
                            // db.KamatOrder.find({Sessiondate: { $gt:(fdate), $lt: (tdate)},"session":sessionInDay,RoundOffValue:{$ne:("RoundOffValue")},"item.itemType" : docs[m].itemType,"item.name" : docs[m].name},{item: {$elemMatch: {name: docs[m].name}},_id:0  },function(err,response){
                            //  console.log(response[0]+"responseeeeeeeeeeee");
                              //console.log(response[m].Subtotal+"responseeeeeeeeeeeeeeeeeeeee")
                            //db.KamatOrder.find({Sessiondate: { $gt:"2017-10-10T00:00:00.000Z", $lt: "2017-10-10T23:59:59.999Z" } , "item.itemType" : " South Indian Meals","item.name" : "Full Meals"},{item: {$elemMatch: {name:"Full Meals"}},_id:0},function(err,response){

                             // db.KamatOrder.find({Sessiondate: { $gt:"2017-10-10T00:00:00.000Z", $lt: "2017-10-10T23:59:59.999Z" } , "item.itemType" : " South Indian Meals","item.name" : "Full Meals"},{item: {$elemMatch: {name:"Full Meals"}},_id:0},function(err,response){

                                    // , "item.itemType" : " Beverages"},{item: {$elemMatch: {name: "Tea"}}
                                    //var a = 100;
                                    //console.log("r "+response[0].item[0].name)

                                    //console.log("r zero "+response.length)
                                     //console.log( "fdate "+fdate+" tdate "+tdate+" response.length "+response.length)
                                    //console.log(" x "+x+" m "+m)
                                    var resLength = response.length ;
                                    //console.log(response.length+"response")
                                    if(resLength != 0){
                                   // console.log("r not zero "+response.length)
                                    //var price = 0;
                                    var quantity = 0;
                                    var itemTotal = 0;
                                    var name = docs[m].name ;
                                    console.log(docs[m].name+"nameeeeeeeeeeeeeee")
                                    var category = docs[m].saleCategory;
                                    console.log(docs[m].saleCategory+"typeeeeeeee")
                                    console.log(docs[m].RoundOffValue+"round")


                                     //console.log(response[0].item[0].name);
                                     //console.log(resLength);
                                     //console.log(response[1].item[1].Price);
                                     // for (let m = itemDataLength ; m >= 0; m--) {
                                     // console.log("m "+m+" docs[m].itemType "+docs[m].itemType+" docs[m].name "+docs[m].name);

                                     for(let v = resLength-1 ;v >= 0; v--){
                                         (function(v) {
                                          //console.log("v "+v+" x "+x );
                                          //console.log(" docs[m].name v "+docs[m].name);
                                         // console.log("itemTotal "+itemTotal);
                                         if(response[v].item != undefined){
                                                //  price += response[v].item[0].Price ;
                                                quantity += response[v].item[0].quantity ;
                                                // console.log(response[v].item[0].quantity+"yashwanthhhhh")
                                                itemTotal += response[v].item[0].itemtotal ;
                                                // console.log(response[v].item[0].RoundOffValue+"yashwanthhhhh")
                                                //console.log(response[v].item[0].Sessiondate+"yashwanthhhhh")
                                                // console.log(" price undefined v"+ response[v].item);
                                                //  console.log(" price undefined v"+ response[v]);
                                                //   console.log(" price undefined v"+ response[v].item);
                                                if (v== 0) {
                                                    // console.log("m "+m+" docs[m].itemType "+docs[m].itemType+" docs[m].name "+docs[m].name);
                                                   // console.log("xCall "+xCall+" mCall "+ mCall)
                                                    //console.log("category   "+category+"              name "+name+" quantity "+quantity+" itemTotal "+itemTotal);
                                                    // console.log(" x "+x+" m "+m+" v "+v)
                                                     var data ={
                                                         'category':category,
                                                         'name':name,

                                                         'quantity':quantity,
                                                         'itemTotal':itemTotal
                                                     }
                                                     finaldata.push(data);
                                                     if ( x == 0  && check == 0) {
                                                        check = 1;
                                                        //console.log("iam idli")
                                                        res.json(finaldata);
                                                        console.log(finaldata+"ifloppppppppppppppppppppppppppppppp")
                                                     }
                                                     // return a = 10;
                                                     //console.log("oii")
                                                     // if (v== 0 && m == 0 && x == 0) {
                                                     //        console.log("iam zero")
                                                             //console.log(finaldata);

                                                     // }
                                                     // res.end(finaldata);
                                                }
                                         }
                                     })(v);
                                     }//v
                                     }//res.len
                                        else{
                                              if ( x == 0  && m== 0 &&check == 0) {
                                                        check = 1;
                                                        //console.log("iam idli")
                                                        res.json(finaldata);
                                                     }
                                            }

                             }) //kamat
                         }
                         // console.log(itemDataLength[m].itemType)
                     })(m);
                     }//m

            });
        })(x);
        }
        //res.json()
    })


})
app.get('/Batchfind/:date',function(req,res){
    console.log("heyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy")
    finaldata = [];
    var check = 0;
   // console.log("Batchfind"+"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    var str=req.params.date;
    console.log(str+"srrrrsrsssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss")
   // console.log(str+"strrrrrrrrrrrrrrrrrrrrrr")
    var str_array=str.split(",");
    var fdate=str_array[0];
    console.log(fdate+"fromdateeeeeeeeeeee");
    var tdate=str_array[1];
    console.log(tdate+"todateeeeeeeeeeee");
    var sessionInDay=str_array[2];
    console.log(sessionInDay+"sessiondayyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy")
    //console.log(sessionInDay+"dayyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy")
    sessionInDay = Number(sessionInDay);
    console.log("sessionInDay "+sessionInDay);
    //if(sessionInDay != 0){
        console.log("for sessionInDay to display ")
        //per day and session calculation
        db.salescategorymaster.find(function(err,doc){
        var salescategorymasterdata = doc;
        //console.log(salescategorymasterdata.POSName+"salescategoryyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy");
        var salescategorylength = salescategorymasterdata.length;
        //xCall = salescategorylength - 1 ;
         console.log( salescategorylength);
       for (var x = salescategorylength - 1; x >= 0; x--) {
            (function(x) {
             //console.log("x "+x+" salescategorymasterdata[x].SaleCategoryName "+salescategorymasterdata[x].SaleCategoryName);
            //console.log(salescategorymasterdata[x].POSName);
            db.itemdata.find({"saleCategory" :salescategorymasterdata[x].SaleCategoryName,"name" : { $exists: true }},function (err, docs) {
                     //console.log(docs[0].invGroupName);
                    // xCall --;
                     var itemDataLength = docs.length-1;
                     //console.log(docs[0].itemType);
                     // console.log(itemDataLength);
                     //mCall = itemDataLength ;
                     for (let m = itemDataLength ; m >= 0; m--) {
                         (function(m) {
                         //console.log("x "+x+"m "+m+" docs[m].itemType "+docs[m].itemType+" docs[m].name "+docs[m].name);
                         //console.log(docs[m]+"viik")
                        // mCall -- ;
                         if (docs[m]!= undefined) {
                            // console.log("type "+docs[m].itemType+" name"+docs[m].name);
                            //console.log(docs[m].itemType)
                            //console.log(docs[m].name+"nameeeeeeeeeeeeeeeeee")
                            //console.log( "fdate "+fdate+" tdate "+tdate+" docs[m].itemType "+docs[m].itemType+" docs[m].name "+docs[m].name)
                             // db.KamatOrder.find({Sessiondate: { $gt:"2017-10-10T00:00:00.000Z", $lt: "2017-10-10T23:59:59.999Z"}, "item.itemType" : docs[m].itemType,"item.name" : docs[m].name},{item: {$elemMatch: {name: docs[m].name}},_id:0  },function(err,response){

                            // db.KamatOrder.find({Sessiondate: { $gt:(fdate), $lt: (tdate)},RoundOffValue:{$ne: NaN}, session:sessionInDay,"item.itemType" : docs[m].itemType,"item.name" : docs[m].name},{item: {$elemMatch: {name: docs[m].name}},_id:0  },function(err,response){
                           // console.log(fdate+"rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr")
                               db.KamatOrder.find({Sessiondate: { $gt:(fdate),$lt:(tdate) },session:sessionInDay,RoundOffValue:{$ne: NaN},"item.itemType" : docs[m].saleCategory,"item.name" : docs[m].name},{item: {$elemMatch: {name: docs[m].name}},_id:0  },function(err,response){
                            // db.KamatOrder.find({Sessiondate: { $gt:(fdate), $lt: (tdate)},"session":sessionInDay,RoundOffValue:{$ne:("RoundOffValue")},"item.itemType" : docs[m].itemType,"item.name" : docs[m].name},{item: {$elemMatch: {name: docs[m].name}},_id:0  },function(err,response){
                            //  console.log(response[0]+"responseeeeeeeeeeee");
                              //console.log(response[m].Subtotal+"responseeeeeeeeeeeeeeeeeeeee")
                            //db.KamatOrder.find({Sessiondate: { $gt:"2017-10-10T00:00:00.000Z", $lt: "2017-10-10T23:59:59.999Z" } , "item.itemType" : " South Indian Meals","item.name" : "Full Meals"},{item: {$elemMatch: {name:"Full Meals"}},_id:0},function(err,response){

                             // db.KamatOrder.find({Sessiondate: { $gt:"2017-10-10T00:00:00.000Z", $lt: "2017-10-10T23:59:59.999Z" } , "item.itemType" : " South Indian Meals","item.name" : "Full Meals"},{item: {$elemMatch: {name:"Full Meals"}},_id:0},function(err,response){

                                    // , "item.itemType" : " Beverages"},{item: {$elemMatch: {name: "Tea"}}
                                    //var a = 100;
                                    //console.log("r "+response[0].item[0].name)

                                    //console.log("r zero "+response.length)
                                     //console.log( "fdate "+fdate+" tdate "+tdate+" response.length "+response.length)
                                    //console.log(" x "+x+" m "+m)
                                    var resLength = response.length ;
                                    //console.log(response.length+"response")
                                    if(resLength != 0){
                                   // console.log("r not zero "+response.length)
                                    //var price = 0;
                                    var quantity = 0;
                                    var itemTotal = 0;
                                    var name = docs[m].name ;
                                    console.log(docs[m].name+"nameeeeeeeeeeeeeee")
                                    var category = docs[m].saleCategory;
                                    console.log(docs[m].saleCategory+"typeeeeeeee")
                                    console.log(docs[m].RoundOffValue+"round")


                                     //console.log(response[0].item[0].name);
                                     //console.log(resLength);
                                     //console.log(response[1].item[1].Price);
                                     // for (let m = itemDataLength ; m >= 0; m--) {
                                     // console.log("m "+m+" docs[m].itemType "+docs[m].itemType+" docs[m].name "+docs[m].name);

                                     for(let v = resLength-1 ;v >= 0; v--){
                                         (function(v) {
                                          //console.log("v "+v+" x "+x );
                                          //console.log(" docs[m].name v "+docs[m].name);
                                         // console.log("itemTotal "+itemTotal);
                                         if(response[v].item != undefined){
                                                //  price += response[v].item[0].Price ;
                                                quantity += response[v].item[0].quantity ;
                                                // console.log(response[v].item[0].quantity+"yashwanthhhhh")
                                                itemTotal += response[v].item[0].itemtotal ;
                                                // console.log(response[v].item[0].RoundOffValue+"yashwanthhhhh")
                                                //console.log(response[v].item[0].Sessiondate+"yashwanthhhhh")
                                                // console.log(" price undefined v"+ response[v].item);
                                                //  console.log(" price undefined v"+ response[v]);
                                                //   console.log(" price undefined v"+ response[v].item);
                                                if (v== 0) {
                                                    // console.log("m "+m+" docs[m].itemType "+docs[m].itemType+" docs[m].name "+docs[m].name);
                                                   // console.log("xCall "+xCall+" mCall "+ mCall)
                                                    //console.log("category   "+category+"              name "+name+" quantity "+quantity+" itemTotal "+itemTotal);
                                                    // console.log(" x "+x+" m "+m+" v "+v)
                                                     var data ={
                                                         'category':category,
                                                         'name':name,

                                                         'quantity':quantity,
                                                         'itemTotal':itemTotal
                                                     }
                                                     finaldata.push(data);
                                                     if ( x == 0  && check == 0) {
                                                        check = 1;
                                                        //console.log("iam idli")
                                                        res.json(finaldata);
                                                        console.log(finaldata+"ifloppppppppppppppppppppppppppppppp")
                                                     }
                                                     // return a = 10;
                                                     //console.log("oii")
                                                     // if (v== 0 && m == 0 && x == 0) {
                                                     //        console.log("iam zero")
                                                             //console.log(finaldata);

                                                     // }
                                                     // res.end(finaldata);
                                                }
                                         }
                                     })(v);
                                     }//v
                                     }//res.len
                                        else{
                                              if ( x == 0  && m== 0 &&check == 0) {
                                                        check = 1;
                                                        //console.log("iam idli")
                                                        res.json(finaldata);
                                                     }
                                            }

                             }) //kamat
                         }
                         // console.log(itemDataLength[m].itemType)
                     })(m);
                     }//m

            });
        })(x);
        }
        //res.json()
    })


})

app.post('/kamatdata',function(req,res){
  db.KamatOrder.insert(req.body,function(err,doc){
    res.json(doc);
  })
})

app.delete('/currentdelete/:current',function(req,res){
  var curr = req.params.current;
  console.log(typeof(curr));
  console.log("jjjjjjjjjjjjjjjjjjjjjjjjjj"+curr)
  // ObjectId(
  db.currentOrder.remove({_id: mongojs.ObjectId(curr)},function(err,doc){
    res.json(doc);
  })
  })

  app.get('/kodetails',function(req, res){
   console.log("dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd")
     db.currentOrder.find(function(err,doc){
        res.json(doc);

      })

})

///////////////////////////////purchase transaction////////////////

app.get('/transactionfetch',function(req,res)
{
    db.transactionMaster.find(function(err,doc){
        res.json(doc);
        console.log(doc[0]+"docccccc");
})
})

app.get('/partynamefetch',function(req,res)
{
    db.partyMaster.find(function(err,doc){
        res.json(doc);
})
})

app.get('/sectionnamefetch:sectionname',function(req,res)
{
  var sectionname1 = req.params.sectionname;
  console.log(sectionname1+"sssssssssssssssssssssssssssss")
    db.SectionMaster.find({"POSName":sectionname1},function(err,doc){
        res.json(doc);
        
})
})

app.get('/vouchernumberfetch:posnamee',function(req,res)
{
  var posnamee1 = req.params.posnamee;
  console.log(posnamee1+"sssssssssssssssssssssssssssss")
    db.invoiceDetails.find({"POSName":posnamee1},function(err,doc){
    res.json(doc);
        
})
})

app.get('/umosizefetch',function(req,res)
{
  console.log("stockpoint calllllllllllllllllllllllllllllllll")
    db.UOM.find(function(err,doc){
        res.json(doc);
        
})
})


app.get('/stockpointfetch:posnamefetch',function(req,res)
{
  var posnamefetch1 = req.params.posnamefetch;
  console.log(posnamefetch1)
  console.log("stockpoint calllllllllllllllllllllllllllllllll")
  db.StockPointMaster.find({"POSName":posnamefetch1},function(err,doc){
  res.json(doc);
        
})
})

app.get('/itemdetailsfetch:posnamee',function(req,res)
{
  var barposname = req.params.posnamee;
  db.ItemSKU.find({"POSName":barposname},function(err,doc){
  res.json(doc);  
})
})

app.get('/skuitemnamefetch:purchaserate',function(req,res)
{
    var purchaserate1 = req.params.purchaserate;
    console.log(purchaserate1+"purchaseeeeeeee");
    console.log(typeof(purchaserate1)+"typeeee");
      var newpurchaserate1 =   parseInt(purchaserate1);
      console.log(typeof(newpurchaserate1)+"typeeeenewpurchaserate1");
      db.ItemSKU.find({"ItemCode":newpurchaserate1},function(err,doc){
      console.log(doc[0])
      res.json(doc)
      })
})

    app.get('/purchaseratefetch:newpurchaserate',function(req,res){
      var newpurchaserate1 = req.params.newpurchaserate;
      var str_array=newpurchaserate1.split(",");
      var purchasetran=str_array[0];
      console.log(purchasetran+"purchasetran");
      var purchaseitemcode = str_array[1];
      purchaseitemcode = parseInt(purchaseitemcode);
      console.log(purchaseitemcode)
      var voucherdate = str_array[2];
      //purchaseitemcode = parseInt(purchaseitemcode);
      console.log(voucherdate)
      db.stockBookDetail.find({"ItemCode":purchaseitemcode,"VoucherType":purchasetran,"VocherDate":{$lt:voucherdate}}).sort({_id:-1}).limit(1,function(err,doc1){
      console.log(doc1.length+"purchasedociii");
        if(doc1.length==0)
        {
          var trantype = "Opening Stock";
  db.stockBookDetail.find({"ItemCode":purchaseitemcode,"VoucherType":trantype}).sort({_id:-1}).limit(1,function(err,doc){
         console.log(doc[0]); 
         res.json(doc);
        })
        }//if
        else{
          res.json(doc1)
        }
      })   
    })

app.get('/saleratefetch:saleskuid',function(req,res){
  var saleskuid = parseInt(req.params.saleskuid);
  console.log(typeof(saleskuid+"saleskuidsaleskuidsaleskuid"))
  db.ItemSKURate.find({"ItemSKUID":saleskuid},function(err,doc){
    
      res.json(doc)
  })
})


    
    app.get('/getuommid:getuommvalue',function(req,res){
      var newuomvalue = req.params.getuommvalue;
       db.UOM.find({"UOM":newuomvalue},function(err,doc1){
         res.json(doc1);
      })
    })
    
    app.get('/stockpurchrate:stockpurchrate',function(req,res){
      var stockpurchrate1 = req.params.stockpurchrate;
      var str_array=stockpurchrate1.split(",");
      var stocktran=str_array[0];
      console.log(stocktran+"stocktran");
      var stockitemcode = str_array[1];
      stockitemcode = parseInt(stockitemcode);
      console.log(stockitemcode)
      db.stockBookDetail.find({"ItemCode":stockitemcode,"VoucherType":stocktran}).sort({_id:-1}).limit(1,function(err,doc1){
         console.log(doc1[0]); 
         res.json(doc1);
      })   
    })
//      var merge1 = req.params.merge;
//      var str_array=merge1.split(",");
//    {$and:[{"POSName": itemposname },{"id" : itemiddd}] }
     app.get('/itemquantityfetch:itemcodefind',function(req,res){
       var itemcodefind1 = req.params.itemcodefind;
       var str_array=itemcodefind1.split(",");
       var itemstockcode=str_array[0];
       itemstockcode = parseInt(itemstockcode);
       console.log(typeof(itemstockcode+"itemstockcode"));
       var fromstockid = str_array[1];
       fromstockid = parseInt(fromstockid)
       console.log(fromstockid+"fromstockidfromstockid");
       db.stockBookDetail.find({$and:[{"ItemCode":itemstockcode},{"StockPointId":fromstockid}]},function(err,doc1){
         console.log(doc1[0]); 
         res.json(doc1);
      })   
    })

    
    app.get('/itemuomqtyfetch:uomsize',function(req,res){
      var uomsize1 = parseInt(req.params.uomsize);
        console.log(uomsize1+"skuidfind1skuidfind1skuidfind1");
        console.log(typeof(uomsize1))
        db.UOMSizeMaster.find({"UOMSizeMasterID":uomsize1},function(err,doc1){
        //console.log(doc1[0]); 
         res.json(doc1);
      })   
    })
    
    app.get('/stduomfetch:stduomid',function(req,res){
      var stduomid1 = parseInt(req.params.stduomid);
        console.log(stduomid1+"skuidfind1skuidfind1skuidfind1");
        console.log(typeof(stduomid1))
        db.UOMConversion.find({"UOMSizeMasterID":stduomid1},function(err,doc1){
        //console.log(doc1[0]); 
         res.json(doc1);
      })   
    })
    
     app.get('/StdUOMID:stduomid',function(req,res){
      var stduomid1 = parseInt(req.params.stduomid);
        db.UOMConversion.find({"BaseUOMID":stduomid1},function(err,doc1){
         res.json(doc1);
      })   
    })
     
      app.get('/Displayuomfetch:displayuomid',function(req,res){
      var displayuomid1 = parseInt(req.params.displayuomid);
        db.UOM.find({"UOMID":displayuomid1},function(err,doc1){
         res.json(doc1);
      })   
    })
      
      app.get('/itemidfind:itemid',function(req,res){
      var itemid1 = parseInt(req.params.itemid);
        db.ItemSKU.find({"ItemCode":itemid1},function(err,doc1){
         res.json(doc1);
      })   
    })
      
      app.get('/findcount',function(req,res){
        db.stockBookDetail.count(function(err,doc1){
         res.json(doc1);
      })   
    })
      
      app.get('/itemtaxfind:merge',function(req,res){
      var merge1 = req.params.merge;
      var str_array=merge1.split(",");
      var itemposname=str_array[0];
      console.log(itemposname+"itemposname");
      var itemiddd = str_array[1];
      itemiddd = parseInt(itemiddd);
      console.log(itemiddd)
      db.itemdata.find({$and:[{"POSName": itemposname },{"id" : itemiddd}] },function(err,doc){
        res.json(doc);
      })   
    })
 //check for stockbootdetail exits       
//{$and:[{"POSName": frefetch1 },{"frequently" : "Yes"}] }
app.get('/getstockbookdetail:stockbookdetail',function(req,res){
        console.log("yashwanth")
        var stockbookdetail1 = req.params.stockbookdetail;
        var str_array=stockbookdetail1.split(",");
        var transactiontype=str_array[0];
        console.log(transactiontype+"transactiontype");
        var stockdetailitemcode=str_array[1];
        stockdetailitemcode = parseInt(stockdetailitemcode);
        console.log(stockdetailitemcode+"stockdetailitemcode");
        var stockdetailpoint=str_array[2];
        stockdetailpoint=parseInt(stockdetailpoint);
        //var transactiontype = "Opening Stock";
        console.log(stockdetailpoint+"stockdetailpoint");
         db.stockBookDetail.find({$and:[{"ItemCode":stockdetailitemcode,"StockPointId":stockdetailpoint,"VoucherType":transactiontype}]},function(err,doc1){
         res.json(doc1);
      })   
    })


//exisiting update purchasetranupdate

app.put('/purchasetranupdate:purchasetranupdate',function(req,res){
  var purchasetranupdate1 = req.params.purchasetranupdate;
  var str_array=purchasetranupdate1.split(",");
    var voucherid=str_array[0];
    console.log(voucherid+"voucherid");
    var itemid=str_array[1];
    console.log(itemid+"itemid");
    var posname=str_array[2];
    console.log(posname+"posname");
    var composite=str_array[3];
    console.log(composite+"composite");
    var splittable=str_array[4];
    console.log(splittable+"splittable");
    var stockinward=str_array[5];
    console.log(stockinward+"stockinward");
    var parentstock=str_array[6];
    parentstock = parseInt(parentstock)
    console.log(parentstock+"parentstock");
    var accno=str_array[7];
    accno = parseInt(accno);
    console.log(accno+"accno")
    var posid=str_array[8];
    console.log(posid+"posid");
    var voucherdate=str_array[9];
    console.log(voucherdate+"voucherdate");
    var netpieces = str_array[10];
    netpieces = parseInt(netpieces);
    console.log(netpieces)
    var finalrate= str_array[11];
    finalrate = parseInt(finalrate);
    console.log(finalrate)
    var umosize= str_array[12];
    //purchaserate = parseInt(purchaserate);
    console.log(umosize)
    var allincluvalue= str_array[13];
    allincluvalue = parseInt(allincluvalue);
    console.log(allincluvalue)
    var uomsizemasterid= str_array[14];
    uomsizemasterid = parseInt(uomsizemasterid);
    console.log(uomsizemasterid);
    var referenceno= str_array[15];
    referenceno = parseInt(referenceno);
    console.log(referenceno)
    var stockpointid= str_array[16];
    stockpointid = parseInt(stockpointid);
    console.log(stockpointid)
    var uomid= str_array[17];
    uomid = parseInt(uomid);
    console.log(uomid)
    var invgroupname= str_array[18];
    console.log(invgroupname)
    var stockid= str_array[19];
    stockid = parseInt(stockid);
    console.log(stockid)
    var entryrowno= str_array[20];
    entryrowno = parseInt(entryrowno);
    console.log(entryrowno)
    var salerate= str_array[21];
    salerate = parseInt(salerate);
    console.log(salerate)
    var purchaserate= str_array[22];
    purchaserate = parseInt(purchaserate);
    console.log(purchaserate);
    var taxablevalue= str_array[23];
    taxablevalue =parseFloat(taxablevalue);
    console.log(taxablevalue)
    var cgst= str_array[24];
    cgst = parseFloat(cgst);
    console.log(cgst)
    var sgst= str_array[25];
    sgst = parseFloat(sgst);
    console.log(sgst)
    var finaltax= str_array[26];
    finaltax = parseFloat(finaltax);
    console.log(finaltax)
    var itemcode= str_array[27];
    itemcode = parseInt(itemcode);
    console.log(itemcode);
    var vouchertype= str_array[28];
    console.log(vouchertype);
    var mongoidfind= str_array[29];
    console.log(mongoidfind+"mongoidfindmongoidfindmongoidfindmongoidfind");
    db.stockBookDetail.update({_id: mongojs.ObjectId(mongoidfind)},{ $inc: { "NetPieces":netpieces,"TaxableValue":taxablevalue,"CGST":cgst,"SGST":sgst,"TotTaxAmt":finaltax }},function(err,doc){
    res.json(doc) })
  
    })
// for purchasesave item
   //var entryrowno = 0;
 app.post('/purchasepost:purchasetran',function(req,res){
    //entryrowno++;
    var purchasetran1 = req.params.purchasetran;
    console.log(purchasetran1);
    var str_array=purchasetran1.split(",");
    var voucherid=str_array[0];
    console.log(voucherid+"voucherid");
    var itemid=str_array[1];
    console.log(itemid+"itemid");
    var posname=str_array[2];
    console.log(posname+"posname");
    var composite=str_array[3];
    console.log(composite+"composite");
    var splittable=str_array[4];
    console.log(splittable+"splittable");
    var stockinward=str_array[5];
    console.log(stockinward+"stockinward");
    var parentstock=str_array[6];
    parentstock = parseInt(parentstock)
    console.log(parentstock+"parentstock");
    var accno=str_array[7];
    accno = parseInt(accno);
    console.log(accno+"accno")
    var posid=str_array[8];
    console.log(posid+"posid");
    var voucherdate=str_array[9];
    console.log(voucherdate+"voucherdate");
    var netpieces = str_array[10];
    netpieces = parseInt(netpieces);
    console.log(netpieces)
    var finalrate= str_array[11];
    finalrate = parseInt(finalrate);
    console.log(finalrate)
    var umosize= str_array[12];
    //purchaserate = parseInt(purchaserate);
    console.log(umosize)
    var allincluvalue= str_array[13];
    allincluvalue = parseInt(allincluvalue);
    console.log(allincluvalue)
    var uomsizemasterid= str_array[14];
    uomsizemasterid = parseInt(uomsizemasterid);
    console.log(uomsizemasterid);
    var referenceno= str_array[15];
    referenceno = parseInt(referenceno);
    console.log(referenceno)
    var stockpointid= str_array[16];
    stockpointid = parseInt(stockpointid);
    console.log(stockpointid)
    var uomid= str_array[17];
    uomid = parseInt(uomid);
    console.log(uomid)
    var invgroupname= str_array[18];
    console.log(invgroupname)
    var stockid= str_array[19];
    stockid = parseInt(stockid);
    console.log(stockid)
    var entryrowno= str_array[20];
    entryrowno = parseInt(entryrowno);
    console.log(entryrowno)
    var salerate= str_array[21];
    salerate = parseInt(salerate);
    console.log(salerate)
    var purchaserate= str_array[22];
    purchaserate = parseInt(purchaserate);
    console.log(purchaserate);
    var taxablevalue= str_array[23];
    taxablevalue =parseFloat(taxablevalue);
    console.log(taxablevalue)
    var cgst= str_array[24];
    cgst = parseFloat(cgst);
    console.log(cgst)
    var sgst= str_array[25];
    sgst = parseFloat(sgst);
    console.log(sgst)
    var finaltax= str_array[26];
    finaltax = parseFloat(finaltax);
    console.log(finaltax)
    var itemcode= str_array[27];
    itemcode = parseInt(itemcode);
    console.log(itemcode);
    var vouchertype= str_array[28];
    console.log(vouchertype+"vouchertype");
    var finalentryrow= str_array[29];
    finalentryrow = parseInt(finalentryrow);
    console.log(finalentryrow+"finalentryrow");
    var finalstockbookid= str_array[30];
    finalstockbookid = parseInt(finalstockbookid);
    console.log(finalstockbookid+"finalstockbookid");
    var tostockpointid= str_array[31];
    tostockpointid = parseInt(tostockpointid);
    console.log(tostockpointid+"tostockpointid");
    var tostockinword= str_array[32];
    console.log(tostockinword+"tostockinword");
  

    db.stockBookDetail.insert({"VocherId" : voucherid,"ItemId":itemid,"ItemCode":itemcode,"ParentStock":parentstock,"stockInWord":stockinward,"AccN0":accno,"PosID":posid,"StockBookId":finalstockbookid,"EntryRowNo":finalentryrow,"VocherDate":voucherdate,"NetQty":umosize,"NetPieces":netpieces,"PurchaseRate":purchaserate,"SaleRate":salerate,"TaxableValue":taxablevalue,"CGST":cgst,"SGST":sgst,"TotTaxAmt":finaltax,"Rate":finalrate,"ChargeableUnits":netpieces,"AllIncluValue":allincluvalue,"UOMSizeMasterId":uomsizemasterid,"ReferenceNo":referenceno,"StockPointId":stockpointid,"UOMId":uomid,"InvGroupName":invgroupname,"VoucherType":vouchertype},function(err,doc){
    res.json(doc)
     console.log(doc.VocherId+"voucherrrrrrrr")
     console.log(typeof(doc.VocherId)+"doc.VocherIddoc.VocherId")
     var newvoucher = parseInt(doc.VocherId);
     console.log(typeof(newvoucher)+"doc.VocherIddoc.VocherId")
     
     var voucher1 = newvoucher+1;
     db.invoiceDetails.update({"POSName":posname},{$set:{"invoiceNumber":voucher1}}, function(err,res){
       
      })
      })
   if(vouchertype == "Stock Transfer")
     {
       finalentryrow++;
       finalstockbookid++;
       
       console.log(vouchertype+"vouchertypevouchertypevouchertype");
       db.stockBookDetail.insert({"VocherId" : voucherid,"ItemId":itemid,"ItemCode":itemcode,"ParentStock":parentstock,"stockInWord":tostockinword,"AccN0":accno,"PosID":posid,"StockBookId":finalstockbookid,"EntryRowNo":finalentryrow,"VocherDate":voucherdate,"NetQty":umosize,"NetPieces":netpieces,"PurchaseRate":purchaserate,"SaleRate":salerate,"TaxableValue":taxablevalue,"CGST":cgst,"SGST":sgst,"TotTaxAmt":finaltax,"Rate":finalrate,"ChargeableUnits":netpieces,"AllIncluValue":allincluvalue,"UOMSizeMasterId":uomsizemasterid,"ReferenceNo":referenceno,"StockPointId":tostockpointid,"UOMId":uomid,"InvGroupName":invgroupname,"VoucherType":vouchertype},function(err,doc){
//       res.json(doc)
//     console.log(doc.VocherId+"voucherrrrrrrr")
//     console.log(typeof(doc.VocherId)+"doc.VocherIddoc.VocherId")
//     var newvoucher = parseInt(doc.VocherId);
//     console.log(typeof(newvoucher)+"doc.VocherIddoc.VocherId")
     
//     var voucher1 = newvoucher+1;
//     db.invoiceDetails.update({"POSName":posname},{$set:{"invoiceNumber":voucher1}}, function(err,res){
//       
//      })
      })
     }
 })

app.post('/stockbookheadresave:headresave',function(req,res){
   var headresave1 = req.params.headresave;
   console.log(headresave1);
   var str_array=headresave1.split(",");
    var voucherid=str_array[0];
    console.log(voucherid+"voucherid");
    var voucherdate=str_array[1];
    console.log(voucherdate+"voucherdate");
    var partyid=str_array[2];
    console.log(partyid+"partyid");
    var voucherclass=str_array[3];
    console.log(voucherclass+"voucherclass");
    var vouchertime=str_array[4];
    console.log(vouchertime+"vouchertime");
    var accclosed=str_array[5];
    accclosed = parseInt(accclosed);
    console.log(accclosed+"accclosed");
    var sectionid=str_array[6];
    sectionid = parseInt(sectionid);
    console.log(sectionid+"sectionid")

    db.stockBookHeader.insert({"VoucherId" : voucherid,"AcCloseId":accclosed,"PartyId":partyid,"VoucherDate":voucherdate,"VoucherClass":voucherclass,"VoucherTime":vouchertime,"VoucherType":voucherclass,"SectionId":sectionid},function(err,doc){
    res.json(doc)
//     console.log(doc.VocherId+"voucherrrrrrrr")
//     console.log(typeof(doc.VocherId)+"doc.VocherIddoc.VocherId")
//     var newvoucher = parseInt(doc.VocherId);
//     console.log(typeof(newvoucher)+"doc.VocherIddoc.VocherId")
     

      })
 })

// TRANCTION DETAIL START NOWWWWWWWWWWWWWWWWWWWWWWWWWWW

  app.get('/tranction',function(req,res){
    console.log("vavavavvavavavavavavavaavavvavaavav")
     
    db.transactionMaster.find(function(err,doc){
      // console.log(doc[0].TransctionType);
      res.json(doc);
    })
  })
  
 
app.get('/partyfetch/',function(req,res){
console.log("bababababbabbbababababababbaabbaba")
db.partyMaster.find(function(err,doc){
  res.json(doc);
})

})

app.get('/uomfetch/',function(req,res){
console.log("bababababbabbbababababababbaabbaba")
db.UOM.find(function(err,doc){
  res.json(doc);
})

})

app.get('/sesfetch:posname',function(req,res){
  var poss= req.params.posname;
  console.log(poss+"jajajajajjajjajajajajajajajaj");

 
db.SectionMaster.find({"POSName":poss},function(err,doc){
  res.json(doc);
})

})
    

    app.get('/stocktype:poname',function(req,res){
      
      var pss=req.params.poname;
      console.log(pss+"pllllllllllllllllllllllllllllll")

      db.StockPointMaster.find({"POSName":pss},function(err,doc){
        res.json(doc);
      })
    })



    app.get('/itembar:barname',function(req,res){
      console.log("barrrrrrrrrrrrrrrrrrrrrrr")
      var Barname=req.params.barname;
      
   db.ItemSKU.find({"POSName":Barname},function(err,doc){
        res.json(doc);
      })
    })



     app.get('/getsku:skuuu',function(req,res){
      console.log("barrrrrrrrrrrrrrrrrrrrrrr")
      var sku=parseInt(req.params.skuuu);
      console.log(sku+"iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii")
      
   db.ItemSKU.find({"ItemCode":sku},function(err,doc){
        res.json(doc);
      })
    })


  app.get('/allrate:alskuid',function(req,res){
      console.log("barrrrrrrrrrrrrrrrrrrrrrr")
      var alskuid= parseInt(req.params.alskuid);
      console.log(alskuid+"iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii")
      
   db.ItemSKURate.find({"ItemSKUID":alskuid},function(err,doc){
        res.json(doc);
      })
    }) 

app.get('/getinvoice:barn',function(req,res){
      console.log("barrrrrrrrrrrrrrrrrrrrrrr")
      var barname=  req.params.barn;
 
      
   db.invoiceDetails.find({"POSName":barname},function(err,doc){
        res.json(doc);
      })
    }) 

app.get('/uomid:uoid',function(req,res){
      console.log("777777777777777777777777777777777777")
      var uomid=  req.params.uoid;
      console.log(typeof(uomid))
      var uomid=parseInt(uomid);
 
      
   db.UOMSizeMaster.find({"UOMSizeMasterID":uomid},function(err,doc){
        res.json(doc);
      })
    })



/////////STOCK BOOK DETAIL//////////////////
app.post('/saledetail:salereturn',function(req,res){
   var salereturn1 = req.params.salereturn;
   console.log(salereturn1);
   var str_array=salereturn1.split(",");
    var voucherid=str_array[0];
    console.log(voucherid+"voucherid");
    var itemid=str_array[1];
    console.log(itemid+"itemid");
    var posname=str_array[2];
    console.log(posname+"posname");
    var saledate=str_array[3];
    console.log(saledate+"saledate");
    var posid=str_array[4];
    console.log(posid+"posId");

    var sectionsalerate=str_array[5];
    console.log(sectionsalerate+"sectionsalerate");

    var  netpiece=str_array[6];
    console.log(netpiece+"netpiece");

    var  value=str_array[7];
    console.log(value+"value");

    var  uomsizeid=str_array[8];
    console.log(uomsizeid+"uomsizeid");

    var  uomid=str_array[9];
    console.log(uomid+"uomid");

    var  stocktypeid=str_array[10];
    console.log(stocktypeid+"stocktypeid");
    var  stockinword=str_array[11];
    console.log(stockinword+"stockinword");

  
  db.stockBookDetail.insert({"VocherId":voucherid,"ItemId":itemid,"VocherDate":saledate,"PosID":posid,"SaleRate":sectionsalerate,"NetPieces":netpiece,"Value":value,"UOMSizeMasterId":uomsizeid,"UOMId":uomid,"StockPointId":stocktypeid,"stockInWord":stockinword },function(err,doc){
  res.json(doc)
  console.log(doc.VocherId) 
  var voucherid=parseInt(doc.VocherId)
  console.log(typeof(voucherid))
     // console.log(doc.VocherId+"voucherrrrrrrr")
     var voucher1 = voucherid+1;
     db.invoiceDetails.update({"POSName":posname},{$set:{"invoiceNumber":voucher1}}, function(err,res){
       
   })
      })


 })

///// STOCK BOOK HEADER/////////////////////////////////
app.post('/saleheader:salereturn',function(req,res){
  console.log("bandeeeeeeeeeeeeeeeeeeeeeeeeeeee")
   var salereturn1 = req.params.salereturn;
   console.log(salereturn1);
   var str_array=salereturn1.split(",");
    var voucherid=str_array[0];
    console.log(voucherid+"voucherid");
    var itemid=str_array[1];
    console.log(itemid+"itemid");
    var posname=str_array[2];
    console.log(posname+"posname");
    var saledate=str_array[3];
    console.log(saledate+"saledate");
    var posid=str_array[4];
    console.log(posid+"posId");

    var voucherclass=str_array[5];
    console.log(voucherclass+"voucherclass");

     var section=str_array[6];
    console.log(section+"section");
     var hhmmsstt=str_array[7];
    console.log(hhmmsstt+"hhmmsstt");
       var sectionid=str_array[8];
    console.log(sectionid+"sectionid");
  
  db.stockBookHeader.insert({"VoucherId" : voucherid,"VoucherDate":saledate,"VoucherClass":voucherclass,"VoucherType":section,"VoucherTime":hhmmsstt,"sectionId":sectionid},function(err,doc){
    res.json(doc)
    
 
    
      })


 })

     
app.listen(7000);
console.log("server running on port 7000");
