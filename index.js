var express = require('express');
var http = require('http');
var app = express();
var server = http.createServer(app);
var io = require('socket.io')(server);

app.use(express.static('public'));

app.listen(8080);
