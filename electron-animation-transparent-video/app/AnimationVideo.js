import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import styles from './AnimationVideo.css';

let angle = 0;
let speed = Math.PI / 10;
let radius = 20;

export default class AnimationVideo extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    console.log('--JuiceCanvas componentWillMount');
  }

  componentDidMount() {
    console.log('--AnimationVideo componentDidMount');
    this.element = ReactDOM.findDOMNode(this.refs.video);

    // this._render();
  }

  componentWillUnmount() {
    console.log('--AnimationVideo componentWillUnmount');
  }

  _render() {
    requestAnimationFrame(this._render.bind(this));

    angle += speed;
    let offset = $(this.element).offset();
    let y = offset.top + radius * Math.sin(angle + Math.PI);
    let x = offset.left + radius * Math.cos(angle + Math.PI);
    $(this.element).css({
      top: y + 'px',
      left: x + 'px'
    });
  }

  render() {
    console.log('--AnimationVideo render');

    return (
      <div>
        <video ref="video" src="dist/transparent.webm" autoPlay loop className={styles.video}></video>
      </div>
    );
  }
}

AnimationVideo.propTypes = {
};
