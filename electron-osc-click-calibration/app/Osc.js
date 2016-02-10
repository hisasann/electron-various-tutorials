import React, { Component } from 'react'
import styles from './Osc.css';

const sock = new osc.OSCSocket();
//sock.setBroadcast(true);
//sock.bind();
//sock.bind({
//  port: 6666,
//  address: '127.0.0.1'
//});

class OscSender extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log('OscSender');

    // OSC Listening
    let socket = new osc.OSCSocket();
    socket.bind({
      port: 5555,
      address: '127.0.0.1'
    });
    socket.on('/osc/from/unity', (message) => {
      console.log('/osc/from/unity');
      console.log(message);
    });
  }

  touchStart(event) {
    event.preventDefault();

    console.log('touchStart----------------------------');
    // touch しているすべての座標が取れる
    console.log('touches:', event.touches);
    // touch しているすべての座標が取れる（DOM上）
    console.log('targetTouches: ', event.targetTouches);
    // touchstart した指だけの情報
    console.log('changedTouches: ', event.changedTouches);

    console.log(event.pageX, event.pageY);

    let msg = new osc.OSCMessage();
    msg.address = '/osc/from/electron';
    msg.addArgument('f', event.pageX / 500);
    msg.addArgument('f', event.pageY / 500);
    sock.send(msg, 6666, '127.0.0.1');

    //sock.send(new osc.OSCMessage('/osc/from/electron ,is 100 TextValue'), 6666);
  }

  render() {
    return (
      <div>
        <div
          onClick={this.touchStart}
          className={styles.touchArea}></div>
      </div>
    );
  }
}

export default class App extends Component {
  render() {
    return (
      <div>
        <OscSender />
      </div>
    );
  }
}