/* eslint-disable react/jsx-one-expression-per-line */
/**
 * Today's view. Main view when startup.
 * todob: add Filter
 */
import React from 'react';

import {Link, Navbar, NavLeft, NavRight, NavTitle, Page} from 'framework7-react'
import {useGet} from 'restful-react'
import EventCards from '../components/EventCards';
import './Today.less';
import CONF from '../js/conf' //global config values

// import {events} from '../js/data';

const Today = (props) => {
  const {f7route, f7router} = props
  // const { data: randomDogImage } = useGet({
  //   // Inferred from RestfulProvider in index.js
  //   path: "breeds/image/random",
  // });
  const query_parms = CONF.default_today_parms
  query_parms.expand = 'first_band'
  const {data: events} = useGet(`${CONF.api}event`, {queryParams: query_parms})
  return (
    <Page>
      <Navbar>
        <NavLeft backLink="Back" backLinkShowText={false}></NavLeft>
        <NavTitle>Live 'N' Out</NavTitle>
        <NavRight>
          <Link className="f7-icons" panelOpen="right">bars</Link>
        </NavRight>
      </Navbar>
      <EventCards noCollapsedNavbar {...{events: events, f7route: f7route, f7router: f7router}}>
      </EventCards>
      <div className="toolbar2 toolbar2-bottom">
        <div className="toolbar2-inner">
          <a className="link prevent-router" href="#" onClick={() => {
            f7router.navigate('/')
          }}>
            <i className="icon material-icons">play</i><span className="">Live</span></a>
          <a className="link prevent-router" href="#" onClick={() => {
            f7router.navigate('/chat/')
          }}>
            <i className="icon material-icons">chat_bubble_2</i><span className="">Chat</span></a></div>
      </div>
    </Page>
  );
}

export default Today;
