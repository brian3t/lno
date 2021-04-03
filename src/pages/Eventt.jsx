/**
 * Event view. Viewing single event
 */
import React from 'react';
import {Page} from "framework7-react"
import {Dom7} from 'framework7';
//Export DOM7 to local variable to make it easy accessible
const d7 = Dom7
// import './Event.less';

const Eventt = (props) => {
  const {event_m, eventid} = props
  // if (event_m) {
  //   {data: event_m} = useGet({
  //     path: `http://api.lnoapi/v1/event/${event_m_prop.id}`,
  //   })
  // }
  d7('div#view-today').removeClass('active-tab')
  d7('div#view-dynamic').addClass('active-tab')

  return (
    <Page>
      {eventid
        ? <div>
          <div id="pic" className="profile_pic">
            <img src={event_m.img} alt="event" />
            <div className="name">{event_m.name}</div>
          </div>
          <div className="row">
            <span className="col-70">{event_m.short_desc}</span>
            <span className="col-30">{event_m.age_limit} {event_m.cost}</span>
          </div>
          <div className="row">
            {event_m.website && <a href={event_m.website} className="link external" target="_blank" rel="noreferrer">Website</a>}
            {event_m.facebook && <a href={event_m.facebook} className="link external" target="_blank" rel="noreferrer">Facebook</a>}
          </div>
        </div>
        : <div>Loading..</div>}
    </Page>
  )
}
/*
Eventt.propTypes = {
  event_m_prop: PropTypes.object
  // eventid: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};
Eventt.defaultProps = {event_m_prop: {}}
*/


export default Eventt;
