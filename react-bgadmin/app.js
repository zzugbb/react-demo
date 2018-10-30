var express = require('express');
var path = require('path');
var bodyParser = require('body-parser'); //req.body本来为undefined, 引入此 body-parsing middleware
var cookieParser = require('cookie-parser'); //cookie格式化

var app = express();
app.use(bodyParser.json()); //for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cookieParser());

//登录请求的处理
app.post('/api/login/success', function (req, res) {
  res.send(results);
});

//登出
app.get('/api/login/logout', function (req, res) {
  let results = { status: "ok"};
  res.send(results);
});

//获取用户登录状态
app.get('/api/getLoginStatusByCookie', function (req, res) {
  const cookies = req.cookies;
  let results = { code: 1 }; 
  res.send(results);
});


//通用请求
app.use('/api/*', function (req, res) {
  req.baseUrl = req.baseUrl.replace("/api", ""); //get测试正常
  if (req.method === "GET") {

  } else if (req.method === "POST") { //post未测试

  }
});


//设置静态资源目录
app.use(express.static(path.join(__dirname, './build')));

//所有访问，都指定返回 index.html
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, './build', 'index.html'));
});

//设置服务器
var server = app.listen(3001, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('众享后台 listening at http://%s:%s', host, port);
});