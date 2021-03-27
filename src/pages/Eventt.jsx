/**
 * Event view. Viewing single event
 */
import React from 'react';
import {Page} from "framework7-react"
import {Dom7} from 'framework7';
import PropTypes from 'prop-types';
import {useGet} from "restful-react"
//Export DOM7 to local variable to make it easy accessible
window.d7 = Dom7
// import './Event.less';

const Eventt = ({eventid}) => {
  const {data: event_m} = useGet({
    path: `http://api.lnoapi/v1/event/${eventid}`,
  });
  d7('div#view-today').removeClass('active-tab')
  d7('div#view-dynamic').addClass('active-tab')

  return (
    <Page>
      {event_m ?
      <div>
        <div id="pic" className="profile_pic">
          <img src={event_m.img} alt="event" />
          <div className="name">{event_m.name}</div>
        </div>
        <div className="row">
          <span className="col-70">{event_m.short_desc}</span>
          <span className="col-30">{event_m.age_limit} {event_m.cost}</span>
        </div>
        <div className="row">
          {event_m.website && <a href={event_m.website} className="link external" target="_blank">Website</a>}
          {event_m.facebook && <a href={event_m.facebook} className="link external" target="_blank">Facebook</a>}
        </div>
      </div>
      : <div>Loading..</div>}
    </Page>
  )
}
Eventt.propTypes = {
  eventid: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

export default Eventt;
