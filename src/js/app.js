import React from 'react';
import ReactDOM from 'react-dom';
import Framework7 from 'framework7/lite-bundle';
import Framework7React from 'framework7-react';
import App from '../components/App';
import 'framework7/framework7-bundle.css';
import '../css/ksink.less';
// import '../css/app.less';

Framework7.use(Framework7React);

// Mount React App
ReactDOM.render(React.createElement(App,{name: "brian3t", toggle: true, tz: 'PST'}), document.getElementById('app'));
