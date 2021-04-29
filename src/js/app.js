import React from 'react';
import ReactDOM from 'react-dom';
// import Framework7 from 'framework7/lite-bundle';
// import Framework7 from './framework7-custom';
import Framework7 from 'framework7/bundle';
import Framework7React from 'framework7-react';
import App from '../components/App';
import 'framework7/framework7-bundle.css';
import '../css/usvutil.less';
import '../css/app.less';

Framework7.use(Framework7React);

// Mount React App
const app_ele = React.createElement(App,{name: "brian3t", toggle: true, tz: 'PST'})
ReactDOM.render(app_ele, document.getElementById('app'));

// console.log('sb ready');
// this.searchbar = fapp.searchbar.create({
//   el: '.searchbar',
//   searchContainer: '#list_to_search',
//   backdrop: true,
//   backdropEl: '#searchbar_backdrop',
//   searchIn: '.searchable',
//   on: {
//     search(sb, query, previousQuery){
//     },
//     enable(){
//       $('#filters').show();
//       $('.slider_page').css('margin-top', ($('#filters').height() + $('#leaderboard_period').height()));
//     },
//     disable(){
//       $('#filters').hide();
//       $('.slider_page').css('margin-top', 0);
//     },
//     clear(){
//     }
//   }
// });
//
window.handleScroll = e => {
  // Do something here ...
  console.log(`scroll callback ${e}`)
  $('#filters').hide()
}
