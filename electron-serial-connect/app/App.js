import React from 'react';
import { render } from 'react-dom';

render(<div>
  serial
</div>, document.getElementById('root'));

let serialPortModule = window.serialPortModule;
let serialPort = '';

var firstComPortName;
serialPortModule.list(function(err, ports) {
  ports.forEach(function(port) {
    firstComPortName = port.comName;
  });
  console.log(firstComPortName);
  if (firstComPortName) {
    var SerialPort = serialPortModule.SerialPort;
    serialPort = new SerialPort(firstComPortName, {
      baudrate: 115200
    }, true);

    serialPort.on('open', function () {
      console.log('open');
      serialPort.on('data', function(data) {
        console.log('data received: ' + data);
      });
      //serialPort.write("ls\n", function(err, results) {
      //  console.log('err ' + err);
      //  console.log('results ' + results);
      //});
    });

    //serialPort.open();
  }
});
