/**
 * Created by tom on 16/4/17.
 */
var express = require('express');
var http = require('http');
var app = express();

var mongodb = require('mongodb');
var assert = require('assert');
var mongoose = require('mongoose');


// 设定port变量，意为访问端口
app.set('port', process.env.PORT || 3000);

//public views bower_components 公共目录
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/views'));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));

app.get('/', function (req, res){

});

//mongoose
//127.0.0.1 localhost
var url = 'mongodb://localhost:27017/blog';
var db = mongoose.createConnection('127.0.0.1','blog',27017);
db.on('error',console.error.bind(console,'连接错误:'));
db.once('open',function(){
     //一次打开记录
     console.info("open db");
});
var PersonSchema = new mongoose.Schema({
     name:String   //定义一个属性name，类型为String
})
var PersonModel = db.model('Person',PersonSchema,'per');
var personEntity = new PersonModel({
     name: "Jack"
});
personEntity.save(function (err, persons) {
     if (err) {
          return console.error(persons);
     }
     console.info(persons);
});
// var personEntity = new PersonModel({name:'Krouky'});
// personEntity.save();
// PersonModel.find(function(err,persons){
//      //查询到的所有person
//      console.info(persons);
// });






// Connection URL
// Use connect method to connect to the Server
// mongodb.MongoClient.connect(url, function(err, db) {
//      assert.equal(null, err);
//      console.log("Connected correctly to server");
//      insertDocuments(db, function() {
//           updateDocument(db, function() {
//                deleteDocument(db, function() {
//                     findDocuments(db, function() {
//                          db.close();
//                     });
//                });
//           });
//      });
// });

var insertDocuments = function(db, callback) {
     // Get the documents collection
     var collection = db.collection('documents');
     // Insert some documents
     collection.insertMany([
          {a : 1}, {a : 2}, {a : 3}
     ], function(err, result) {
          assert.equal(err, null);
          assert.equal(3, result.result.n);
          assert.equal(3, result.ops.length);
          console.log("Inserted 3 documents into the document collection");
          callback(result);
     });
}

var updateDocument = function(db, callback) {
     // Get the documents collection
     var collection = db.collection('documents');
     // Update document where a is 2, set b equal to 1
     collection.updateOne({ a : 2 }
         , { $set: { b : 1 } }, function(err, result) {
              assert.equal(err, null);
              assert.equal(1, result.result.n);
              console.log("Updated the document with the field a equal to 2");
              callback(result);
         });
}

var deleteDocument = function(db, callback) {
     // Get the documents collection
     var collection = db.collection('documents');
     // Insert some documents
     collection.deleteOne({ a : 3 }, function(err, result) {
          assert.equal(err, null);
          assert.equal(1, result.result.n);
          console.log("Removed the document with the field a equal to 3");
          callback(result);
     });
}

var findDocuments = function(db, callback) {
     // Get the documents collection
     var collection = db.collection('documents');
     // Find some documents
     collection.find({}).toArray(function(err, docs) {
          assert.equal(err, null);
          // assert.equal(2, docs.length);
          console.log("Found the following records");
          console.dir(docs);
          callback(docs);
     });
}



//TODO:接口
app.post('/about', function (req, res){
     res.send({name:123});
});



//listen 3000
http.createServer(app).listen(app.get('port'));

// 终端打印如下信息
console.log('Server running at http://127.0.0.1:%d/',app.get('port'));