import React, { Component } from 'react';
import styles from './Touch.css';

import AnimationDom from './AnimationDom';
import AnimationVideo from './AnimationVideo';
import RamenMuseum from './RamenMuseum';

class TouchArea extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let wrapper = $('.wrapper');
    wrapper.width(window.innerWidth);
    wrapper.height(window.innerHeight);

    let ramenMuseum = new RamenMuseum('.ramen__wrapper');
  }

  componentWillUnmount() {
  }

  render() {
    return (
      <div>
        <div className="wrapper">
          <main>
            <div className="ramen__wrapper"></div>
          </main>
        </div>
      </div>
    );
  }
}

export default class Touch extends Component {
  render() {
    return (
      <div>
        <AnimationDom />
        <AnimationVideo />
        <TouchArea />
      </div>
    );
  }
}