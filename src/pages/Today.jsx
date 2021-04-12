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
  const {data: events} = useGet(`${CONF.api}event`, {queryParams: CONF.default_today_parms})
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
    </Page>
  );
}

export default Today;
