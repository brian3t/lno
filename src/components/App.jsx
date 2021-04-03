/* eslint-disable react/jsx-props-no-spreading */
import React, {useEffect, useRef, useState} from 'react';
import $ from 'dom7';

import {App, Block, f7, Link, Navbar, NavLeft, NavRight, NavTitle, Page, Panel, Tabs, Toolbar, View} from 'framework7-react';

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
  window.activeTab = activeTab
  window.setActiveTab = setActiveTab
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
  };

  if (process.env.NODE_ENV === 'production') {
    // Register service worker in production mode only
    PWA.init();
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

  return (
    <App {...f7params}>
      <Panel resizable right themeDark>
        <View>
          <Page>
            <Block>Right panel content</Block>
          </Page>
        </View>
      </Panel>
      <Navbar>
        <NavLeft backLink="Back" backLinkShowText={false}></NavLeft>
        <NavTitle>Live 'N' Out</NavTitle>
        <NavRight>
          <Link className="f7-icons" panelOpen="right">bars</Link>
        </NavRight>
      </Navbar>
      {<Tabs routable position="bottom">
        <View id="view-today" onTabShow={() => setActiveTab('today')} main tab tabActive url="/today/" onViewInit={() => {
          // window.f7router = f7.views.main.router
        }} />
        <View id="view-arcade" onTabShow={() => setActiveTab('arcade')} tab url="/arcade/" />
        <View id="view-search" onTabShow={() => setActiveTab('search')} tab url="/search/" />
        <View id="view-dynamic" onTabShow={() => setActiveTab('today')} tab url="/dynamic/" />
        <View id="view-eventt" onTabShow={() => setActiveTab('eventt')} tab url="/eventt/" />

      </Tabs>
      }
      <Toolbar tabbar position="bottom">
        <Link
          tabLink="#view-today"
          tabLinkActive
          iconF7="today"
          text="Today"
        />
        <Link
          tabLink="#view-dynamic"
          iconF7="rocket_fill"
          text="Dynamic"
        />
        <Link
          tabLink="#view-arcade"
          iconF7="rocket_fill"
          text="Arcade"
        />
        <Link
          tabLink="#view-eventt"
          iconF7="rocket_fill"
          text="Eventt"
        />
      </Toolbar>
    </App>
  );
}

export default AppComponent;
