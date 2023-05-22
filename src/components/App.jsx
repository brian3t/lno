/* eslint-disable react/jsx-props-no-spreading */
import React, {useEffect, useRef, useState} from 'react';
import $ from 'dom7';

import {App, f7, Panel, View} from 'framework7-react';
import PWA from '../js/pwa';
import routes from '../js/routes';

// if (typeof window.f7 === "undefined") window.f7 = undefined //handy global. will be set in AppComponent below
// window.f7router = undefined //handy global. will be set in AppComponent below

/**
 * bootstrap framework 7 app. Has f7params
 * @returns {JSX.Element}
 * @constructor
 */
const AppComponent = () => {
  const [activeTab, setActiveTab] = useState('today');
  const previousTab = useRef(null);

  useEffect(() => {
    previousTab.current = activeTab;
  }, [activeTab]);

  useEffect(() => {
    // Fix viewport scale on mobiles
    if ((f7.device.ios || f7.device.android) && f7.device.standalone) {
      const viewPortContent = document.querySelector('meta[name="viewport"]').getAttribute('content');
      document.querySelector('meta[name="viewport"]').setAttribute('content', `${viewPortContent}, maximum-scale=1, user-scalable=no`);
    }
  }, []);

  // Framework7 Parameters
  // configure routes here
  const f7params = {
    name: 'auto',
    theme: 'ios',
    routes,
    autoDarkTheme: true,
    animate: false,
    toast: {
      closeTimeout: 4000,
      position: 'top'
    }
  };

  if (process.env.NODE_ENV === 'production') {
    // Register service worker in production mode only
    // PWA.init();
  }

  // eslint-disable-next-line no-unused-vars
  function test_goto(){
    console.log(`goto pressed`)
    const f7r = window.f7router
    f7r.navigate('/games/99')
    /*f7r.navigate({
      name: 'games',
      params: {gameid: 88},
    })*/
  }

  function onTabLinkClick(tab){
    if (previousTab.current !== activeTab) return;
    if (activeTab === tab) {
      f7.dialog.confirm('a')
      $(`#view-${tab}`)[0].f7View.router.back();
    }
  }
  let theme = 'auto';
  if (document.location.search.indexOf('theme=') >= 0) {
    theme = document.location.search.split('theme=')[1].split('&')[0];
  }

  return (
    <App {...f7params}
      id="io.framework7.testapp"
      theme={theme}
      popup={{ closeOnEscape: true }}
      sheet={{ closeOnEscape: true }}
      popover={{ closeOnEscape: true }}
      actions={{ closeOnEscape: true }}
    >
      <Panel left cover resizable>
        <View url="/panel-left/" linksView=".view-main" />
      </Panel>
      <Panel right reveal resizable>
        <View url="/panel-right/" />
      </Panel>
      <View main />
    </App>
  );
}

export default AppComponent;
