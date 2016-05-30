import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import styles from './AnimationDom.css';

let angle = 0;
let speed = Math.PI / 40;
let radius = 10;

export default class AnimationDom extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    console.log('--AnimationDom componentWillMount');
  }

  componentDidMount() {
    console.log('--AnimationDom componentDidMount');

    this.element = ReactDOM.findDOMNode(this.refs.dom);

    this._render();
  }

  componentWillUnmount() {
    console.log('--AnimationDom componentWillUnmount');
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
    console.log('--AnimationDom render');

    return (
      <p><img ref="dom" src="dist/02.jpg" className={styles.dom} /></p>
    );
  }
}

AnimationDom.propTypes = {
};
