import React from 'react';
import { render } from 'react-dom';
import App from './Touch';

import styles from '../index.css';

render(<App />, document.getElementById('root'));

// websocket
// via http://socket.io/docs/client-api/
var socket = io('http://localhost:3000/');

socket.on('connect', function (data) {
  console.log('connect: client');
});

socket.on('disconnect', function(data) {
});

socket.on('hi', function(msg){
  console.log('hi: ', msg);
});

socket.on('from-server', function(msg){
  console.log('from-server: ', msg);
  socket.emit('from-client', 'success get data');
});
