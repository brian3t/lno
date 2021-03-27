/* eslint-disable react/jsx-one-expression-per-line */
/**
 * Today's view. Main view when startup.
 * todob: add Filter
 */
import React from 'react';

import EventCards from '../components/EventCards';
import './Today.less';

import {events} from '../js/data';

const Today = () => {

  return (
    <EventCards noCollapsedNavbar {...{events: events}}>
    </EventCards>
  );
}

export default Today;
