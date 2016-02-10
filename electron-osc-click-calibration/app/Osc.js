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

    this.click = this.click.bind(this);
    this.touchStart = this.touchStart.bind(this);
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

  sendOSC(x, y) {
    let msg = new osc.OSCMessage();
    msg.address = '/osc/from/electron';
    msg.addArgument('f', x / window.innerWidth);
    msg.addArgument('f', y / window.innerHeight);
    sock.send(msg, 6666, '127.0.0.1');

    //sock.send(new osc.OSCMessage('/osc/from/electron ,is 100 TextValue'), 6666);
  }

  click(event) {
    console.log('click----------------------------');
    console.log(event.pageX, event.pageY);

    this.sendOSC(event.pageX, event.pageY);
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

    this.sendOSC(event.pageX, event.pageY);
  }

  touchMove(event) {
    event.preventDefault();

    //console.log('touchMove');
    //// touch しているすべての座標が取れる
    //console.log('touches:', event.touches);
    //// touch しているすべての座標が取れる（DOM上）
    //console.log('targetTouches: ', event.targetTouches);
    //// touchmove した指だけの情報
    //console.log('changedTouches: ', event.changedTouches);
  }

  touchEnd(event) {
    event.preventDefault();

    console.log('touchEnd----------------------------');
    // touch しているすべての座標が取れる
    console.log('touches:', event.touches);
    // touch しているすべての座標が取れる（DOM上）
    console.log('targetTouches: ', event.targetTouches);
    // touchend した指だけの情報
    console.log('changedTouches: ', event.changedTouches);
  }

  render() {
    return (
      <div>
        <div onClick={this.click} onTouchStart={this.touchStart} onTouchMove={this.touchMove} onTouchEnd={this.touchEnd} className={styles.touchArea}>
        </div>
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