import React, { Component } from 'react'

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
  }

  oscSend() {
    let msg = new osc.OSCMessage();
    msg.address = '/osc/from/electron';
    msg.addArgument('i', 100);
    msg.addArgument('s', 'String value.');
    sock.send(msg, 6666, '127.0.0.1');

    //sock.send(new osc.OSCMessage('/osc/from/electron ,is 100 TextValue'), 6666);
  }

  render() {
    return (
      <div>
        <h2>OscSender</h2>
        <button onClick={this.oscSend}>sender</button>
      </div>
    );
  }
}

class OscListening extends Component {
  constructor(props) {
    super(props);
    this.state = { message: undefined };
  }

  componentDidMount() {
    console.log('OscListening');

    this.oscListen()
  }

  oscListen() {
    let socket = new osc.OSCSocket();
    socket.bind({
      port: 5555,
      address: '127.0.0.1'
    });
    socket.on('/osc/from/unity', (message) => {
      console.log('/osc/from/unity');
      console.log(message);

      this.setState({
        message: JSON.stringify(message)
      });
    });

    //let socket2 = new osc.OSCSocket();
    //socket2.bind({
    //  port: 6666,
    //  address: '127.0.0.1'
    //});
    //socket2.on('/osc/from/electron', (message) => {
    //  console.log('/osc/from/electron');
    //  console.log(message);
    //
    //  this.setState({
    //    message: JSON.stringify(message)
    //  });
    //});
  }

  render() {
    return (
      <div>
        <h2>OscListener</h2>
        <p>{this.state.message}</p>
      </div>
    );
  }
}

export default class App extends Component {
  render() {
    return (
      <div>
        <OscSender />
        <OscListening />
      </div>
    );
  }
}