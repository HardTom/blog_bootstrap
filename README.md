## 个人博客

只算一个demo。
会用到mongoDB、nodejs、aj库

---
#### mongoDB的环境搭建

windows版本

安装 [mongodb-win32-x86_64-2008plus-ssl-3.2.9-signed.msi](https://fastdl.mongodb.org/win32/mongodb-win32-x86_64-2008plus-ssl-3.2.9-signed.msi?_ga=1.254607936.938313312.1474618921)

在项目目录下执行 npm install mongodb --save

建立目录文件夹C:\data\db

执行
```
    mongod --dbpath C:\data\db --port 27017
```

在server app.js 加入以下几句
```js
var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');
  
  // Connection URL
  var url = 'mongodb://localhost:27017/blog';
  // Use connect method to connect to the Server
  mongodb.MongoClient.connect(url, function(err, db) {
       assert.equal(null, err);
       console.log("Connected correctly to server");
       db.close();
  });
  
```

mongodb连接成功

以下是关于mongodb 简单的用法

```js
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

```



---
#### aj库的用法

