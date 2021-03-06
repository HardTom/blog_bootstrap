/**
 * Created by tom on 16/4/17.
 */
var express = require('express');
var http = require('http');
var path = require('path');
var app = express();

var mongodb = require('mongodb');
var assert = require('assert');
var mongoose = require('mongoose');
var fs = require('fs');
var formidable =require('formidable');
// var multer  = require('multer');
// var upload = multer({ dest: 'upload/' });


// 设定port变量，意为访问端口
app.set('port', process.env.PORT || 3000);

//public views bower_components 公共目录
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/views'));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));
app.use('/node_modules',  express.static(__dirname + '/node_modules'));
app.use('/ckeditor',  express.static(__dirname + '/ckeditor'));

app.get('/', function (req, res){

});

//mongoose
//127.0.0.1 localhost
var url = 'mongodb://localhost:27017/blog';
// var db = mongoose.createConnection('127.0.0.1','blog',27017);
// db.on('error',console.error.bind(console,'连接错误:'));
// db.once('open',function(){
//      //一次打开记录
//      console.info("open db");
// });
// var PersonSchema = new mongoose.Schema({
//      name:String   //定义一个属性name，类型为String
// })
// var PersonModel = db.model('Person',PersonSchema,'per');
// var personEntity = new PersonModel({
//      name: "Jack"
// });
// personEntity.save(function (err, persons) {
//      if (err) {
//           return console.error(persons);
//      }
//      console.info(persons);
// });
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

//上传image
app.post('/UploadImage', function(req, res, next){
     var form = new formidable.IncomingForm();
     form.uploadDir = '/tmp';   //文件保存在系统临时目录
     form.maxFieldsSize = 1 * 1024 * 1024;  //上传文件大小限制为最大1M
     form.keepExtensions = true;        //使用文件的原扩展名

     var targetDir = path.join(__dirname, './public/upload');
     // 检查目标目录，不存在则创建
     fs.access(targetDir, function(err){
          if(err){
               fs.mkdirSync(targetDir);
          }
          _fileParse();
     });

     // 文件解析与保存
     function _fileParse() {
          form.parse(req, function (err, fields, files) {
               if (err) throw err;
               var filesUrl = [];
               var errCount = 0;
               var keys = Object.keys(files);
               keys.forEach(function(key){
                    var filePath = files[key].path;
                    var fileExt = filePath.substring(filePath.lastIndexOf('.'));
                    if (('.jpg.jpeg.png.gif').indexOf(fileExt.toLowerCase()) === -1) {
                         errCount += 1;
                    } else {
                         //以当前时间戳对上传文件进行重命名
                         var fileName = new Date().getTime() + fileExt;
                         var targetFile = path.join(targetDir, fileName);
                         //移动文件
                         fs.renameSync(filePath, targetFile);
                         // 文件的Url（相对路径）
                         filesUrl.push('/upload/'+fileName)
                    }
               });

               // 返回上传信息
               res.json({filesUrl:filesUrl, success:keys.length-errCount, error:errCount});
          });
     }
});

//listen 3000
http.createServer(app).listen(app.get('port'));

// 终端打印如下信息
console.log('Server running at http://127.0.0.1:%d/',app.get('port'));