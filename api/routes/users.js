var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var app = express();

var bcrypt = require('bcrypt');

var mongo = require('mongodb');
var mongoClient = mongo.MongoClient;
var url = "mongodb://Vishwajeet:310toyuma@ds025409.mlab.com:25409/ieeecsforum";

var session = require('express-session');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({
  genid: function(req) {
    return genuuid() // use UUIDs for session IDs
  },
  secret: 'keyboard cat',
  resave: true
}));

router.post('/register', function(req, res) {
  var mailFormat = /([a-z])+.(([a-z])+)?201[0-9]{1}@vit.ac.in/i;
  var regNoFormat = /1[0-9][A-Z]{3}[0-9]{4}/i;
  var uNameFormat = /[a-z_.0-9]{6,}/i;
  if(req.body.email.match(mailFormat) && req.body.reg.match(regNoFormat) && req.body.name.match(uNameFormat)){
    mongoClient.connect(url,function(err,db){
      if(err){
        //throw err;
      } else{
        var collection = db.collection('userCollection');
        var data = {
          name: req.body.name,
          reg: req.body.reg,
          email: req.body.email,
          threadsActive: [],
          lastActive: new Date(),
          dOB: req.body.dob,
          dOJ: new Date(),
          bcrypt.hashSync(req.body.pass, bcrypt.genSaltSync(2)),
          isModerator: false,
          moderating: []
        };
        collection.insertOne(data,function(err,d){
          if(err){
            //throw err;
          } else{
            console.log("User Created");
            res.redirect('/login');
          }
        });
      }
    });
  } else{
    res.json({message: "User Creation Failed"});
  }
});

router.post('/login',function(req,res){
  mongoClient.connect(url,function(err,db){
    if(err){
      console.log(err);
    } else{
      var collection = db.collection('userCollection');
      collection.findOne({name: req.body.name},function(err,data){
        if(err){
          console.log(err);
        } else{
          bcrypt.compare(req.body.pass, data.pwd, function(err, res1) {
            if(res1==true){
              //if(req.session.views){
                //req.session.regenerate(function(err){
                  res.json({message: "logged in"});
                //});
              //}
            } else{
              res.json({message: 'Invalid Pass'});
            }
          });
        }
      });
    }
  });
});

router.get('/logout',function(req,res){
  //if(req.session.views){
    //req.session.destroy();
    res.json('logged out');
  //} else{
    //res.json('No Active Session');
  //}
});

module.exports = router;
