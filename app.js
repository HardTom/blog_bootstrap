/**
 * Created by tom on 16/4/17.
 */
var express = require('express');
var http = require('http');
var app = express();

// 设定port变量，意为访问端口
app.set('port', process.env.PORT || 3000);

//public views bower_components 公共目录
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/views'));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));

app.get('/', function (req, res){

});

app.post('/about', function (req, res){
     res.send({name:123});
});

//listen 3000
http.createServer(app).listen(app.get('port'));

// 终端打印如下信息
console.log('Server running at http://127.0.0.1:%d/',app.get('port'));