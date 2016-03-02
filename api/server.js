var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var port = 8080;
var router = express.Router();
//Body Parser to Parse POST data
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

router.get('/',function(req,res){
  res.json({message: "Basic GET Stuff here"});
});

router.post('/login',function(req,res){
  var name = "vishwajeet";
  var pwd = "vishwajeet";
  /*if(email.match("\.4[0-9][$@vit.ac.in]")){
    res.json({message: "Email OK"});
  } else{
    res.json({message: "Email Error"});
  }*/
  if(req.body.name===name && req.body.pass===pwd)
    res.json({message: "Successfully Logged in"});
  else {
      res.json({message: "Invalid Username or Password"});
  }
});

router.post('/register',function(req,res){
  
});

app.use('/api',router);

app.listen(port);
console.log('Server Running On: '+port);
