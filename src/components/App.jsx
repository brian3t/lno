import React, {useEffect, useRef, useState} from 'react';
import $ from 'dom7';

import {App, Button, f7, Link, Toolbar, View, Views} from 'framework7-react';
import PWA from '../js/pwa';
import routes from '../js/routes';

window.f7 = undefined //handy global. will be set in AppComponent below
window.f7router = undefined //handy global. will be set in AppComponent below

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

  // Framework7 Parameters
  // configure routes here
  const f7params = {
    name: 'auto',
    theme: 'md',
    routes,
    autoDarkTheme: true,
  };

  if (process.env.NODE_ENV === 'production') {
    // Register service worker in production mode only
    PWA.init();
  }

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
    <App params={f7params}>
      <Button onClick={test_goto}> testgoto</Button>
      {<Views tabs className="safe-areas">
        <Toolbar tabbar labels bottom>
          <Link
            onClick={() => onTabLinkClick('today')}
            tabLink="#view-today"
            tabLinkActive
            iconF7="today"
            text="Today"
          />
          <Link
            onClick={() => onTabLinkClick('games')}
            tabLink="#view-games"
            iconF7="rocket_fill"
            text="Games"
          />
          <Link
            onClick={() => onTabLinkClick('apps')}
            tabLink="#view-apps"
            iconF7="layers_alt_fill"
            text="Apps"
          />
          <Link
            onClick={() => onTabLinkClick('arcade')}
            tabLink="#view-arcade"
            iconF7="gamecontroller_alt_fill"
            text="Arcade"
          />
          <Link
            onClick={() => onTabLinkClick('search')}
            tabLink="#view-search"
            iconF7="search"
            text="Search"
          />
        </Toolbar>

        <View id="view-today" onTabShow={() => setActiveTab('today')} main tab tabActive url="/today/" onViewInit={() => {
          window.f7 = f7
          window.f7router = f7.views.main.router
        }} />
        <View id="view-games" onTabShow={() => setActiveTab('games')} tab url="/games/" />
        <View id="view-apps" onTabShow={() => setActiveTab('apps')} tab url="/apps/" />
        <View id="view-arcade" onTabShow={() => setActiveTab('arcade')} tab url="/arcade/" />
        <View id="view-search" onTabShow={() => setActiveTab('search')} tab url="/search/" />

      </Views>
      }
    </App>
  );
}

export default AppComponent;
