/* eslint-disable react/jsx-one-expression-per-line */
/**
 * Today's view. Main view when startup.
 * todob: add Filter
 */
import React from 'react';

import {Page,List,ListItem,Icon} from 'framework7-react'
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
      <EventCards noCollapsedNavbar {...{events: events, f7route: f7route, f7router: f7router}}>
      </EventCards>
    </Page>
  );
}

export default Today;
