/* eslint-disable react/jsx-props-no-spreading */
import React, {Fragment, useEffect, useRef, useState} from 'react';
import { getDevice }  from 'framework7/lite-bundle';
import {
  f7,
  f7ready,
  App,
  Panel,
  Views,
  View,
  Popup,
  Page,
  Navbar,
  Toolbar,
  NavRight,
  Link,
  Block,
  BlockTitle,
  LoginScreen,
  LoginScreenTitle,
  List,
  ListItem,
  ListInput,
  ListButton,
  BlockFooter
} from 'framework7-react';

//import {App, f7, Panel, View} from 'framework7-react';
import capacitorApp from '../js/capacitor-app';
import routes from '../js/routes';
import {
  // ActionPerformed,
  // PushNotificationSchema,
  PushNotifications,
  // Token,
} from '@capacitor/push-notifications';
import _ from "lodash"
import Signup from './SignUp'
import ToolbarBottom from "@/components/ToolbarBottom";

//window.routes = routes
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

  const setup_push_noti = async function (){
    // Request permission to use push notifications
    // iOS will prompt user and return if they granted permission or not
    // Android will just grant without prompting
    const dev = getDevice()
    if (!dev.ios || !dev.android) {
      const dev_prop_true = _.pickBy(dev, (value, key) => {
        return value == true
      })
      console.log(`Not ios not android, exiting.. `, dev_prop_true)
      return false
    }
    try {
      PushNotifications.requestPermissions().then(result => {
        if (result.receive === 'granted') {
          // Register with Apple / Google to receive push via APNS/FCM
          PushNotifications.register();
        } else {
          // Show some error
        }
      });

      // On success, we should be able to receive notifications
      PushNotifications.addListener('registration',
          (token) => {
            alert('Push registration success, token: ' + token.value);
            console.log('Push registration success, token: ' + token.value);
          }
      );

      // Some issue with our setup and push will not work
      PushNotifications.addListener('registrationError',
          (error) => {
            alert('Error on registration: ' + JSON.stringify(error));
            console.error('Error on registration: ' + JSON.stringify(error));
          }
      );

      // Show us the notification payload if the app is open on our device
      PushNotifications.addListener('pushNotificationReceived',
          (notification) => {
            alert('Push received: ' + JSON.stringify(notification));
            console.log('Push received: ' + JSON.stringify(notification));
          }
      );

      // Method called when tapping on a notification
      PushNotifications.addListener('pushNotificationActionPerformed',
          (notification) => {
            alert('Push action performed: ' + JSON.stringify(notification));
            console.log('Push action performed: ' + JSON.stringify(notification));
          }
      );
    } catch (e){
      console.error(`error registering noti: `, e)
    }
  }

  useEffect(() => {
    console.log(`App.jsx use effect`)
    setup_push_noti()
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
    theme: 'auto',
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
  f7ready(() => {

    // Init capacitor APIs (see capacitor-app.js)
    if (f7.device.capacitor) {
      capacitorApp.init(f7);
    }
    // Call F7 APIs here
  });

  function onTabLinkClick(tab){
    if (previousTab.current !== activeTab) return;
    if (activeTab === tab) {
      f7.dialog.confirm('a')
      $(`#view-${tab}`)[0].f7View.router.back();
    }
  }
  let theme = 'auto';
 /* if (document.location.search.indexOf('theme=') >= 0) {
    theme = document.location.search.split('theme=')[1].split('&')[0];
  }*/

  return (
    <App {...f7params}
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
      {/*<View main />*/}
      <Views tabs className="safe-areas">
        {/* Your main view/tab, should have "view-main" class. It also has "tabActive" prop */}
        <View id="view-home" main tab tabActive url="/" />
        {/* Catalog View */}
        <View id="view-chat" name="chat" tab url="/chat/" />
        {/* Settings View */}
        <View id="view-settings" name="settings" tab url="/settings/" />
      </Views>
      <Signup></Signup>
    </App>
  );
}

export default AppComponent;
