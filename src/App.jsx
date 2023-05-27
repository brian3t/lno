import React from 'react';
// import Framework7 from 'framework7/lite-bundle';
// import Framework7 from './framework7-custom';
import Framework7 from 'framework7/bundle';
import Framework7React from 'framework7-react';
import App from './components/App';
import 'framework7/css';
import {withRouter} from "react-router";

window.GEOOPTIONS = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 7776000000 //3 months
}

Framework7.use(Framework7React);
//setupIonicReact()
// Mount React App
const app_ele = React.createElement(App, {
  name: "brian3t",
  toggle: true,
  tz: 'PST'
})
window.aele = app_ele
console.info(app_ele)
//ReactDOM.render(app_ele, document.getElementById('app'))

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
  $('#filters')
    .hide()
}

const WithRouterApp = withRouter(App)

export default WithRouterApp
