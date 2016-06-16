var express = require('express');
var router = express.Router();

var mongo = require('mongodb');
var mongoClient = mongo.MongoClient;
var url = "mongodb://Vishwajeet:310toyuma@ds025409.mlab.com:25409/ieeecsforum";

/* GET home page. */
router.get('/', function(req, res, next) {
  mongoClient.connect(url,function(err,db){
    if(err){
      res.json(err);
    } else{
      var collection = db.collection('userCollection');
      collection.find().toArray(function(err,data){
        res.json(data);
      });
    }
  });
});

router.get('/profile',function(req,res){
  //var userId = session.name;
  var userId = "571f7b0308cf8fdc02732ea5";
  mongoClient.connect(url,function(err,db){
    if(err){
      console.log(err);
    } else{
      var collection = db.collection('userCollection');//<--------------Check This Code
      collection.findOne({_id: userId},function(err,data){
        if(err){
          console.log(err);
        } else{
          var sendData = {
            name: data.name,
            username: data.name,
            reg: data.reg,
            email: data.email,
            lastActive: data.lastActive,
            threadsActive: [],
            dOB: data.dOB,
            dOJ: data.dOJ,
            isModerator: data.isModerator,
            moderating: []
          };
          var threads = data.threadsActive;
          for(var x in threads){
            var threadCollection = db.collection('threadCollection');
            threadCollection.findOne({_id: threads[x]},function(err,data1){
              if(err){
                console.log(err);
              } else{
                sendData.threadsActive.push(data1.name);
              }
            });
          }
          var moderating = data.moderating;
          for(var x in moderating){
            var threadCollection = db.collection('threadCollection');
            threadCollection.findOne({_id: moderating[x]},function(err,data2){
              if(err){
                console.log(err);
              } else{
                sendData.moderating.push(data2.name);
              }
            });
          }
          res.render('profile',sendData);
        }
      });
    }
  });
});

router.get('/getThreadData', function(req, res, next) {
  mongoClient.connect(url,function(err,db){
    if(err){
      res.json(err);
    } else{
      var collection = db.collection('threadCollection');
      collection.find().toArray(function(err,data){
        res.json(data);
      });
    }
  });
});

router.get('/getCommentData', function(req, res, next) {
  mongoClient.connect(url,function(err,db){
    if(err){
      res.json(err);
    } else{
      var collection = db.collection('commentCollection');
      collection.find().toArray(function(err,data){
        res.json(data);
      });
    }
  });
});

router.get('/clearThreadData', function(req, res, next) {
  mongoClient.connect(url,function(err,db){
    if(err){
      res.json(err);
    } else{
      var collection = db.collection('threadCollection');
      collection.remove();
    }
  });
});

router.get('/clearCommentData', function(req, res, next) {
  mongoClient.connect(url,function(err,db){
    if(err){
      res.json(err);
    } else{
      var collection = db.collection('commentCollection');
      collection.remove();
    }
  });
});

module.exports = router;
