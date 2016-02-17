import React, { Component } from 'react'
import styles from './Video.css';
import ReactDOM from 'react-dom'

class Video extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.stats = new Stats();
    this.stats.setMode(0); // 0: fps, 1: ms, 2: mb

    // align top-left
    this.stats.domElement.style.position = 'absolute';
    this.stats.domElement.style.left = '0px';
    this.stats.domElement.style.top = '0px';

    let wrapper = ReactDOM.findDOMNode(this.refs.wrapper);
    wrapper.appendChild(this.stats.domElement);

    this._render();
  }

  _render() {
    this.stats.begin();
    this.stats.end();
    requestAnimationFrame(this._render.bind(this));
  }

  render() {
    return (
      <div ref="wrapper">
        <video src="./dist/video.mp4" autoPlay loop className={styles.video}></video>
      </div>
    );
  }
}

export default class App extends Component {
  render() {
    return (
      <div>
        <Video />
      </div>
    );
  }
}