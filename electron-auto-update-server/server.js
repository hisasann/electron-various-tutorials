'use strict';
const fs = require('fs');
const https = require('https');
const express = require('express');
const path = require('path');
const app = express();

app.use(require('morgan')('dev'));

app.use('/releases', express.static(path.join(__dirname, 'releases')));

const credentials = {
  key: fs.readFileSync('./cert/server_key.pem'),
  cert: fs.readFileSync('./cert/server_crt.pem')
};

const port = process.env.PORT || 3000;
const server = https.createServer(credentials, app);

server.listen(port, function(){
  console.log('listening on *:' + port);
});
