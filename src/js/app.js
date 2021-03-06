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

window.GEOOPTIONS = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 7776000000 //3 months
}

Framework7.use(Framework7React);

// Mount React App
const app_ele = React.createElement(App, {
  name: "brian3t",
  toggle: true,
  tz: 'PST'
})

ReactDOM.render(app_ele, document.getElementById('app'))
window.app = {
  l: window.localStorage,
  gmap_ready(){
    console.log(`gmap is now ready. event emitted`)
    const gmap_ready_event = new Event('gmap_ready')
    window.dispatchEvent(gmap_ready_event)
  },
  get_val(key){
    const val = this.l.getItem(key)
    let val_to_return
    try {
      val_to_return = JSON.parse(val)
      return val_to_return
    } catch (e){
      return val
    }
  },
  set_val(key, val){
    let val_to_save = val
    if (typeof val === "object") val_to_save = JSON.stringify(val)
    this.l.setItem(key, val_to_save)
  },
  toast(msg){
    if (typeof ff7 !== 'object') return 'need f7 init'
    return ff7.toast.show({text: msg})
  }
}

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
