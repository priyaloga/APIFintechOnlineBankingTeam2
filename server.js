var express = require('express');
var MongoClient = require('mongodb').MongoClient;
var bodyParser= require('body-parser');
var ObjectId=require('mongodb').ObjectId;
var bcrypt=require('bcryptjs');
var jwt=require('jwt-simple');
var randomstring = require("randomstring");
var JWT_SECRET='catsmeow';
var app=express();
app.use(bodyParser.json());
//app.use(express.static(__dirname + '../public'));
app.use(express.static('public'));
 app.use(express.static(__dirname + '/bower_components'));
var db=null;
//var ranNum=null;

MongoClient.connect("mongodb://localhost:27017/test", function(err,dbconn) {
 if(!err)
 {
 console.log("Connected successfully to server");
 db=dbconn;
 }
 });



app.get('/users',function(req,res,next)
{
db.collection('users',function(err,userscollection){
userscollection.find().toArray(function(err,users)
{
return res.json(users);
});
});
});




app.put('/remove',function(req,res,next)
{

db.collection('users',function(err,usersCollection)
{

var userId=req.body._id;

console.log(userId);
usersCollection.remove({_id: ObjectId(userId)},{w:1},function(err,result)
{
 return res.send("Success");
});
});

});
/////////////////////////////////////////////////////////
app.put('/edit',function(req,res,next)
{
db.collection('users',function(err,usersCollection)
{
  usersCollection.findOne({_id:ObjectId(req.body._id)},function(err,user)
  {
    console.log(user.password);
    console.log(req.body.password);
    console.log(req.body._id);
  if(user.password==req.body.password){

  console.log("in server");
  var password=req.body.password;
  var accountnum=req.body.accountnum;
  var  username=req.body.username;
  var  email=req.body.email;
  var   mobile=req.body.mobile;
             var    initial_amt=req.body.initial_amt;
                var     balance=req.body.balance;
   var   _id=req.body._id;


console.log(balance+','+accountnum+''+initial_amt);
//console.log(balance);

usersCollection.update(
  {_id:ObjectId(_id)},
  {$set:
    {'balance':balance,'accountnum':accountnum,'username':username,'email':email,'mobile':mobile,'initial_amt':initial_amt,'password':password}},false,true)
{
 return res.send("Success");
 }

}
else{

  bcrypt.genSalt(10, function(err,salt){
    bcrypt.hash(req.body.password, salt, function(err,hash){
      var password=hash;
      var accountnum=req.body.accountnum;
      var  username=req.body.username;
      var  email=req.body.email;
      var   mobile=req.body.mobile;
                 var    initial_amt=req.body.initial_amt;
                    var     balance=req.body.balance;
       var   _id=req.body._id;


    console.log(balance+','+accountnum+''+initial_amt);
    //console.log(balance);

    usersCollection.update(
      {_id:ObjectId(_id)},
      {$set:
        {'balance':balance,'accountnum':accountnum,'username':username,'email':email,'mobile':mobile,'initial_amt':initial_amt,'password':password}},false,true)
    {
     return res.send("Success");
     }
});
});

}
});
});
});






/////////////////////////////////////////////////////////////



app.put('/adddeposit',function(req,res,next)
{
db.collection('users',function(err,usersCollection)
{

var accountnum=req.body.accountnum;
var balance=req.body.balance;
var _id=req.body._id;

console.log(balance+','+_id);
//console.log(balance);

usersCollection.update(
  {_id:ObjectId(_id)},
  {$set:
    {'balance':balance}},false,true)
{
 return res.send();
 }
});
});

//transfer logic
app.put('/addtransfer',function(req,res,next)
{
db.collection('users',function(err,usersCollection)
{

var accountnum=req.body.accountnum;
var balance=req.body.balance;
var _id=req.body._id;

console.log(balance+','+_id);
//console.log(balance);

usersCollection.update(
  {_id:ObjectId(_id)},
  {$set:
    {'balance':balance}},false,true)
{
 return res.send();
 }
});
});

//////////////////////////////////////////////////////////

app.put('/mydetails',function(req,res,next){
db.collection('users',function(err,usersCollection){
  bcrypt.genSalt(10, function(err,salt){
    bcrypt.hash(req.body.password, salt, function(err,hash){
      var _id=req.body.id;
      var password=hash;
    console.log(_id+','+password);
    //console.log(balance);

    usersCollection.update(
      {_id:ObjectId(_id)},
      {$set:
        {'password':password}},false,true)
    {
     return res.send("Success");
     }
    });
});

});
});



////////////////////////////////////////////////////////////



app.post('/users',function(req,res,next){
db.collection('users',function(err,usersCollection){
  bcrypt.genSalt(10, function(err,salt){
    bcrypt.hash(req.body.password, salt, function(err,hash){
      var IFSC="VIPO3005";
      var ranNum=randomstring.generate({
        length: 12,
        charset: 'numeric'
      });
      ranNum='VIPO'+ranNum;
      console.log(ranNum);
      console.log(req.body.balance);


      var newUser={
        username:req.body.username,
        password:hash,
        email:req.body.email,
        mobile:req.body.mobile,
        accountnum:ranNum,
        initial_amt:req.body.initial_amt,
        balance:req.body.balance,
        //initial_amt:req.body.initial_amt,
        //balance:req.body.balance,
        IFSC:IFSC
    };

usersCollection.insert(newUser,function(err)
{
return res.send("Success");
});
});

});
});
});

app.post('/transfer',function(req,res,next){



db.collection('account',function(err,transferCollection){


     var newTransfer={
       Accountno:req.body.accountno,
        Toaccountno:req.body.Toaccountno,
         acctype:req.body.acctype,
         currency:req.body.currency,
         branch:req.body.branch,
         amount:req.body.amount,
         balance:req.body.balance,
        description:req.body.description,
          status:req.body.status

       };

transferCollection.insert(newTransfer,function(err)
{
console.log(res);
return res.send();
});


});

});

///////////////////

app.post('/beneficiary',function(req,res,next){



db.collection('beneficiary',function(err,beneficiaryCollection){


     var beneficiary={
       Accountno:req.body.accountno,
        Fromaccountno:req.body.Toaccountno,
         acctype:req.body.acctype,
         currency:req.body.currency,
         branch:req.body.branch,
         amount:req.body.amount,
         balance:req.body.balance,
        description:req.body.description,
        status:req.body.status

       };

beneficiaryCollection.insert(beneficiary,function(err)
{
console.log(res);
return res.send();
});


});

});



////////////////////////////////////////////////

app.post('/adduser',function(req,res,next){



db.collection('users',function(err,usersCollection){
  var IFSC="VIPO3005";
  var ranNum=randomstring.generate({
    length: 12,
    charset: 'numeric'
  });
  ranNum='VIPO'+ranNum;

  var adduser={
 username:req.body.username,
  email:req.body.email,
   mobile:req.body.mobile,
  initial_amt:req.body.initial_amt,
  balance:req.body.initial_amt,
   accountnum:ranNum,
 IFSC:IFSC
           };


usersCollection.insert(adduser,function(err)
{
console.log(res);
return res.send();
});


});

});





///////////////////////





app.post('/addpayee',function(req,res,next){
db.collection('payee',function(err,payeeCollection){

     var newPayee={
       accountno:req.body.accountno,
       code:req.body.code,
       acctype:req.body.acctype,
       currency:req.body.currency,
       branch:req.body.branch,
       accountholder:req.body.accountholder


     };

payeeCollection.insert(newPayee,function(err)
{
console.log(res);
return res.send();
});


});

});
/*
app.post('/transfer',function(req,res,next){
db.collection('account',function(err,accountCollection){
  var newTransfer={
  accountno:req.body.accountno,
    acctype:req.body.acctype,
    currency:req.body.currency,
    branch:req.body.branch,
    amount:req.body.amount
  };


account.insert(newTransfer,function(err)
{
return res.send();
});
});

});


*/


app.put('/users/signin',function(req,res,next){
db.collection('users',function(err,usersCollection){
  usersCollection.findOne({username:req.body.username},function(err,user)
  {
bcrypt.compare(req.body.password, user.password, function(err , result){
  if(result){
    var token=jwt.encode(user,JWT_SECRET);

    return res.json({user:user,token:token});
    //return res.json(user);

  }
  else{
 return res.status(400).send();
  }
});
  });

  bcrypt.genSalt(10, function(err,salt){
    bcrypt.hash(req.body.password, salt, function(err,hash){
      var newUser={
        username:req.body.username,
        password:hash
    };

/**usersCollection.insert(newUser,function(err)
{
return res.send();
});**/
});

});
});
});

//admin login

app.put('/users/signin/admin',function(req,res,next){
db.collection('admin',function(err,adminCollection){
  adminCollection.findOne({adminname:req.body.adminname},function(admin)
  {


  //  console.log(req.body.adminname);
    //console.log(admin);
  if(res){
//console.log('inside if');
    return res.json(admin);

  }
  else{
 return res.status(400).send();
  }
});
  });


});


app.put('/users/reset',function(req,res,next){
  console.log(req.body.newemail);
db.collection('users',function(err,usersCollection){
  usersCollection.findOne({email:req.body.newemail},function(err,user)
  {

console.log(res);
  //  console.log(req.body.adminname);
    //console.log(admin);
  if(user){
//console.log('inside if');
console.log('inside if 461');
    return res.json(user);

  }
  else{
 return res.status(400).send();
 console.log('inside else 467');

  }
});
  });


});

app.get('/userdetails',function(req,res,next)
{
//
console.log(req.query.accSearch);
  if(req.query.accSearch){
    console.log("inside if");
    db.collection('users',function(err,userscollection){

    userscollection.findOne({"accountnum":req.query.accSearch},function (err, users) {
      console.log(users);
      return res.json(users);
    });
  });
}
  else{
    db.collection('users',function(err,userscollection){
    userscollection.findOne(function (err, users)
     {
       console.log(users);
       return res.json(users);
      });
  });
}
});






//----------------------------------------------------------------

app.get('/getaccount',function(req,res,next)
{
//
console.log(req.query.Accountno);
  if(req.query.Accountno){
    console.log("inside if");
    db.collection('account',function(err,accountcollection){

    accountcollection.findOne({"Accountno":req.query.Accountno},function (err, account) {
      console.log(account);
      return res.json(account);
    });
  });
}
  else{
    console.log('error in 464');
}
});









//-------------------------------------------------------------------

app.get('/account',function(req,res,next)
{
console.log('inside get account');
db.collection('account',function(err,accountsummarycollection){
accountsummarycollection.find().toArray(function(err,accountsummary)
{
return res.json(accountsummary);

});
});
});

app.get('/beneficiary',function(req,res,next)
{

db.collection('beneficiary',function(err,beneficiarycollection){
beneficiarycollection.find().toArray(function(err,beneficiary)
{
return res.json(beneficiary);

});
});
});


app.get('/addpayee',function(req,res,next)
{

db.collection('payee',function(err,payeecollection){
payeecollection.find().toArray(function(err,payee)
{

return res.json(payee);


});
});
});

app.put('/updateaccount',function(req,res,next)
{
db.collection('account',function(err,accountCollection)
{
  console.log("in server");


var _id=req.body._id;
var status=req.body.status;

console.log(_id);
console.log(status);

accountCollection.update(
  {_id:ObjectId(_id)},
  {$set:
    {'status':status}},false,true)
{
 return res.send();
 }
});
});

app.put('/debitaccount',function(req,res,next)
{
db.collection('account',function(err,accountCollection)
{
  console.log("in server");


var _id=req.body._id;
var status=req.body.status;

console.log(_id);
console.log(status);

accountCollection.update(
  {_id:ObjectId(_id)},
  {$set:
    {'status':status}},false,true)
{
 return res.send();
 }
});
});








app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});
