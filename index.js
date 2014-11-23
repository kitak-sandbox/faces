var express = require('express');
var app = express();
var uuid = require('node-uuid');
var cookieParser = require('cookie-parser');
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(cookieParser());
app.use(function (req, res, next) {
  var cookie = req.cookies.uid;
  if (cookie === undefined) {
    var uid = uuid.v4();
    res.cookie('uid', uid);
  }
  next();
});
app.use(express.static('public'));

server.listen(8080);
