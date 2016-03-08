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
  var mailFormat = /([a-z])+.(([a-z])+)?201[0-9]{1}@vit.ac.in/i;
  var pwd = 'Hi';
  if(req.body.email.match(mailFormat) && req.body.pass===pwd){
    res.json({message: "Logged In"});
  } else{
    res.json({message: "Invalid Username or Password"})
  }
});

router.post('/register',function(req,res){
  var mailFormat = /([a-z])+.(([a-z])+)?201[0-9]{1}@vit.ac.in/i;
  var regNoFormat = /1[0-9][A-Z]{3}[0-9]{4}/i;
  var uNameFormat = /[a-z_.0-9]{6,}/i;
  if(req.body.email.match(mailFormat) && req.body.reg.match(regNoFormat) && req.body.name.match(uNameFormat)){
    res.json({name: req.body.name,email: req.body.email,regNum: req.body.reg,pass: req.body.pass});
  } else{
    res.json({message: "User Creation Failed"});
  }
});

app.use('/api',router);

app.listen(port);
console.log('Server Running On: '+port);
