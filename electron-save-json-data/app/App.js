import React from 'react';
import { render } from 'react-dom';
import App from './Touch';

import styles from '../index.css';

render(<App />, document.getElementById('root'));

const storage = window.strage;

const key = 'http://lab.hisasann.com/json/sample.json'
  .replace(/\?/g, '')
  .replace(/#/g, '')
  .replace(/:/g, '')
  .replace(/\//g, '')
  .replace(/\./g, '');
console.log(key);

storage.set(key, { hoge: 'bar' }, function(error) {
  if (error) throw error;
});

storage.get(key, function(error, data) {
  if (error) throw error;

  console.log(data);
});

