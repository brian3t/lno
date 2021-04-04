/**
 * Event view. Viewing single event
 */
import React from 'react';
import {Link, Navbar, NavLeft, NavRight, NavTitle, Page, Toolbar} from "framework7-react"
import {useGet} from "restful-react"
// import './Event.less';

export default (props) => {
  let {event_m, eventid} = props
  if (!event_m) {
    const {data} = useGet({
      path: `http://api.lnoapi/v1/event/${eventid}`,
    })
    if (data && !event_m) event_m = data
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
      {(eventid && event_m)
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
