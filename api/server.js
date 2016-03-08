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
  
});

router.post('/register',function(req,res){
  if(true){
    res.json({name: req.body.name,pass: req.body.pass,email: req.body.email,reg: req.body.regnum,branch: req.body.branch});
  } else{
    res.json({staus: "failure"});
  }
});

app.use('/api',router);

app.listen(port);
console.log('Server Running On: '+port);
