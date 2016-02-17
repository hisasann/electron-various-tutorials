var path = require('path');
var express = require('express');
var io = require('socket.io');
var http = require('http');

var app = express();

var server = http.createServer(app);

var port = process.env.PORT || '3000';

server.listen(port);

// クライアントの接続を待つ(IPアドレスとポート番号を結びつけます)
var io = io.listen(server);

// クライアントが接続してきたときの処理
io.on('connection', function(socket) {
  io.emit('hi', { message: 'connected ok' });

  console.log('a user connection');

  // メッセージを受けたときの処理
  socket.on('from-server', function(data) {
    // つながっているクライアント全員に送信
    console.log('from-server: ', data);

    io.emit('from-server', { value: data });
  });

  socket.on('from-client', function(data) {
    // つながっているクライアント全員に送信
    console.log('from-client: ', data);
  });

  // クライアントが切断したときの処理
  socket.on('disconnect', function(){
    console.log('a user disconnect');
  });
});
