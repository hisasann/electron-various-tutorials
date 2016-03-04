import React from 'react';
import { render } from 'react-dom';

render(<div>
  serial
</div>, document.getElementById('root'));

let serialPort = window.serialPort;

serialPort.on("open", function () {
  console.log('open');
  serialPort.on('data', function(data) {
    console.log('data received: ' + data);
  });
  //serialPort.write("ls\n", function(err, results) {
  //  console.log('err ' + err);
  //  console.log('results ' + results);
  //});
});
