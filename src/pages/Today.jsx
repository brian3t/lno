/* eslint-disable react/jsx-one-expression-per-line */
/**
 * Today's view. Main view when startup.
 * todob: add Filter
 */
import React from 'react';

import EventCards from '../components/EventCards';
import './Today.less';

import {events} from '../js/data';

const Today = (props) => {
  const {f7route, f7router} = props
  return (
    <EventCards noCollapsedNavbar {...{events: events, f7route: f7route, f7router: f7router}}>
    </EventCards>
  );
}

export default Today;
