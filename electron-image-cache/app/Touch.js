import React, { Component } from 'react';
const ipcRenderer = window.ipcRenderer;

class TouchArea extends Component {
  constructor(props) {
    super(props);
  }

  componentWillUnmount() {
  }

  render() {
    return (
      <div>
        <img src={this.props.imageSrc} />
      </div>
    );
  }
}

export default class Touch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      imageSrc: ''
    };
  }

  componentDidMount() {
    ipcRenderer.on('asynchronous-reply', (event, arg) => {
      console.log(arg);

      this.setState({
        imageSrc: arg
      });
    });

    ipcRenderer.send('asynchronous-message', 'http://nekogazou.com/wp-content/uploads/2015/08/55270573c8c1630b9b2901f4da9989c7.jpg');
  }

  render() {
    return (
      <div>
        <TouchArea imageSrc={this.state.imageSrc}/>
      </div>
    );
  }
}