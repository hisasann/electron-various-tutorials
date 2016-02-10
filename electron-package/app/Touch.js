import React, { Component } from 'react';
import styles from './Touch.css';

class TouchArea extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  componentWillUnmount() {
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

    console.log('touchEnd');
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
        <div onTouchStart={this.touchStart} onTouchMove={this.touchMove} onTouchEnd={this.touchEnd} className={styles.touchArea}></div>
      </div>
    );
  }
}

export default class Touch extends Component {
  render() {
    return (
      <div>
        <TouchArea />
      </div>
    );
  }
}