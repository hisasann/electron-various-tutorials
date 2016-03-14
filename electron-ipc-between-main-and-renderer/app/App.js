import React from 'react';
import { render } from 'react-dom'

// In renderer process (web page).
const ipcRenderer = window.ipcRenderer;

//console.log(ipcRenderer.sendSync('synchronous-message', 'ping')); // prints "pong"

ipcRenderer.on('asynchronous-reply', function(event, arg) {
  console.log(arg); // prints "pong"
});

ipcRenderer.send('asynchronous-message', 'ping');
