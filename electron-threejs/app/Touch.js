import React, { Component } from 'react';
import styles from './Touch.css';

import RamenMuseum from './RamenMuseum';

class TouchArea extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const RAMEN_NUM = 50;

    let wrapper = $('.wrapper');
    wrapper.width(window.innerWidth);
    wrapper.height(window.innerHeight);

    let ramenMuseum = new RamenMuseum('.ramen__wrapper', RAMEN_NUM);
    let $ramenNum = $('.ramenNum');

    let $slider = $('.slider');
    $slider.on('input', function() {
      ramenMuseum.setRamenNum($slider.val());
      $ramenNum.text($slider.val());
    });
    $ramenNum.text(RAMEN_NUM);
    $slider.val(RAMEN_NUM);

    $('.ramenTypeButton').click(function() {
      ramenMuseum.toggleRamenType();
      if(ramenMuseum.ramenType === ramenMuseum.RAMEN_TYPE_MESH) {
        $(this).text('>Mesh / Sprite');
      } else {
        $(this).text('Mesh / >Sprite');
      }
    });

    $(window).resize(ramenMuseum.handleResize.bind(ramenMuseum));
  }

  componentWillUnmount() {
  }

  click(event) {
    console.log('click----------------------------');
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
        {/* <div onClick={this.click} onTouchStart={this.touchStart} onTouchMove={this.touchMove} onTouchEnd={this.touchEnd} className={styles.touchArea}></div> */}
        <div className="wrapper">
          <header>
            <div></div>
          </header>
          <main>
            <div className="ramen__wrapper"></div>
            <div className="slider__wrapper">
              <input type="range" max="500" className="slider" />
            </div>
            <div className="ramenNum__wrapper"><span className="ramenNum"></span></div>
          </main>
          <footer>
            <div></div>
          </footer>
        </div>
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