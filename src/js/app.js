// Import React and ReactDOM
import React from 'react';
import ReactDOM from 'react-dom';

import Framework7React, {f7ready, theme} from 'framework7-react';
import Framework7 from './framework7-custom';


import '../css/framework7-custom.less';
import 'framework7-icons/css/framework7-icons.css';
import '../css/app.less';

import App from '../components/App';
// import HomePage from '../components/Test';

Framework7.use(Framework7React);
// Mount React App
ReactDOM.render(
  React.createElement(App, {name: "brian3t", toggle: true, tz: 'PST'}),
  // React.createElement(Book,{name: "brian3t", toggle: true}),
  // React.createElement(HomePage),
  document.getElementById('app'),
);
f7ready((f7) => {
  window.gf7 = f7
  let theme_name = 'ios'
  if (theme.aurora) theme_name = 'aurora'
  if (theme.md) theme_name = 'md'
  console.warn(`Theme is: ${theme_name}`)
});
