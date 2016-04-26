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

module.exports = router;
