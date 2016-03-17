import React, { Component } from 'react';
import uniqueId from 'lodash/uniqueId';

const ipcRenderer = window.ipcRenderer;

class CustomImage extends Component {
  constructor(props) {
    super(props);

    this.returnEvent = uniqueId('asynchronous-reply_');

    this.state = {
      imagePath: ''
    };

    ipcRenderer.once(this.returnEvent, (event, arg) => {
      this.setState({
        imagePath: arg
      });
    });

    this.getImage(this.props.imageSrc);
  }

  getImage(path) {
    ipcRenderer.send('asynchronous-message', this.returnEvent, path);
  }

  renderImage() {
    return (
      <img src={this.state.imagePath} />
    )
  }

  render() {
    return (
      <div>
        {this.renderImage()}
      </div>
    );
  }
}

export default class Touch extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  render() {
    return (
      <div>
        <CustomImage imageSrc="http://nekogazou.com/wp-content/uploads/2015/08/55270573c8c1630b9b2901f4da9989c7.jpg"/>
        <CustomImage imageSrc="http://nekogazou.com/wp-content/uploads/2015/11/ca0613454dc3f818b6ca4ce065d3365b.jpg"/>
      </div>
    );
  }
}