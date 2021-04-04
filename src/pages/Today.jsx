/* eslint-disable react/jsx-one-expression-per-line */
/**
 * Today's view. Main view when startup.
 * todob: add Filter
 */
import React from 'react';

import {Link, Navbar, NavLeft, NavRight, NavTitle, Page, Toolbar} from 'framework7-react'
import EventCards from '../components/EventCards';
import './Today.less';

import {events} from '../js/data';

const Today = (props) => {
  const {f7route, f7router} = props
  const testlaunch = () => {
    // setActiveTab('eventt')
    f7router.navigate('/eventt/', {
      props: {
        foo: "foo", bar: "bar"
      }
    })
  }
  return (
    <Page>
      <Navbar>
        <NavLeft backLink="Back" backLinkShowText={false}></NavLeft>
        <NavTitle>Live 'N' Out</NavTitle>
        <NavRight>
          <Link className="f7-icons" panelOpen="right">bars</Link>
        </NavRight>
      </Navbar>
      <Toolbar position="bottom">
        <Link>Left Link</Link>
        <Link>Right Link</Link>
      </Toolbar>
      <EventCards noCollapsedNavbar {...{events: events, f7route: f7route, f7router: f7router}}>
      </EventCards>
    </Page>
  );
}

export default Today;
