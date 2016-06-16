var express = require('express');
var router = express.Router();
var app = express();

var mongo = require('mongodb');
var mongoClient = mongo.MongoClient;
var url = "mongodb://Vishwajeet:310toyuma@ds025409.mlab.com:25409/ieeecsforum";

var session = require('express-session');
/* GET home page. */
router.get('/newThreadForm', function(req, res, next) {
  res.render('new');
});

router.get('/',function(req,res){
  var tag = req.query.tag;
  mongoClient.connect(url,function(err,db){
    if(err){
      console.log(err);
    } else{
      var collection = db.collection('threadCollection');
      collection.find({tags: tag}).toArray(function(err,data){
        if(err){
          console.log(err);
        } else{
          var threads = [];
          for(x in data){
            var name = data[x].name;
            var replies = data[x].comments.length;
            var isActive = data[x].isTrending;
            var userColl = db.collection('userCollection');//<-----------------------Check This Code
            var user = userColl.findOne({_id: data[x].startedBy});//<-----------------Check This Code
            var creator = user.name;
            threads[x] = {
              "name": name,
              "creator": creator,
              "replies": replies,
              "isActive": isActive
            }
          }
          res.render('tag',{"threads": threads});
        }
      });
    }
  });
});

router.get('/new',function(req,res){
  var comment = req.query.comment;
  var threadTags = req.query.tags;
  mongoClient.connect(url,function(err,db){
    if(err){
      console.log(err);
    } else{
      /*
        Get User _id based on active session
        var collection = db.collection('userCollection');
      */
      var date = new Date();
      var threadData = {
        name: req.query.name,
        startDate: date,
        startedBy: "571f7b0308cf8fdc02732ea5",
        comments: [],
        tags: threadTags.split(','),
        lastActivity: date,
        users: ['571f7b0308cf8fdc02732ea5'],
        isTrending: true
      };
      collection = db.collection('threadCollection');
      collection.insertOne(threadData,function(err,data){
        if(err){
          console.log(err);
        } else{
          var commentCollection = db.collection('commentCollection');
          var threadId = data.ops[0]._id;
          var commentData = {
            user: "571f7b0308cf8fdc02732ea5",
            text: comment,
            time: date,
            thread: threadId
          };
          commentCollection.insertOne(commentData,function(err,data1){
            if(err){
              console.log(err);
            } else{
              var commentId = data1.ops[0]._id;
              collection.updateOne({_id: threadId},{$push: {comments: commentId}},function(err,data2){
                if(err){
                  console.log(err);
                } else{ //<-------------------------------------Check This Block Out
                  var userCollection = db.collection('userCollection');
                  userCollection.updateOne({_id: "571f7b0308cf8fdc02732ea5"},{$push: {threadsActive: threadId}},function(err,data3){
                    if(err){
                      console.log(err);
                    } else{
                      res.json({message: "New Thread Created"});
                    }
                  });
                }
              });
            }
          });
        }
      });
    }
  });
});

module.exports = router;
