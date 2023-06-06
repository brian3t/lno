/**
 * Event view. Viewing single event
 */
import _ from 'lodash'
import {useGet} from "restful-react"
import React, {Fragment, useEffect} from 'react'
import PropTypes from 'prop-types'
import {Block, Card, CardHeader, Link, Navbar, NavLeft, NavRight, NavTitle, Page} from "framework7-react"
import CONF from '../js/conf' //global config values
import Tabbar from "../components/Tabbar"
import {fm_date_time} from "../jslib/helper"
// import './Event.less';


const Eventt = (props) => {
  const {f7router} = props
  let {event_m, eventid} = props
  if (!eventid && !event_m) return (<Block>No data</Block>)
  if (!eventid) eventid = event_m.id
  const {data} = eventid ? useGet({
    path: `${CONF.api}event/${eventid}?expand=bands`,
  }) : () => {
  }
  if (typeof data === 'object') event_m = _.extend(event_m, data)
  const band_clicked = (first_band, bandid) => {
    f7router.navigate('/band/', {props: {band_m: first_band}})
    console.warn(`band clicked ${bandid}`)
  }

  useEffect(() => {
    console.log(`eventt use effect`)
  })

  return (
    <Page>
      <Navbar>
        <NavLeft backLink="Back" backLinkShowText={false}></NavLeft>
        <NavTitle>SD Events - Event</NavTitle>
        <NavRight>
          <Link className="f7-icons" panelOpen="right"><i className="icon"></i></Link>
          {/*<a className="link icon-only" data-panel="right">
            <i className="icon"></i>
          </a>*/}
        </NavRight>
      </Navbar>
      {(eventid && event_m)
        ? <Fragment>
          <div className={"text_center"}>
            {/*<div className="text-lg font-bold">Event</div>*/}
            <div id="pic" className="profile_pic">
              <img src={event_m.img} alt="event"/>
              <div className="name">{event_m.name}</div>
              <div>{fm_date_time(event_m.date_utc || event_m.start_datetime_utc, event_m.start_time_utc)}</div>
            </div>
            <div className="row">
              <span className="col-70">{event_m.short_desc}</span>
              <span className="col-30">{event_m.age_limit} {event_m.cost}</span>
            </div>
            <div className="row">
              {event_m.website &&
                <a href={event_m.website} className="link external" target="_blank" rel="noreferrer">Website</a>}
              {event_m.facebook &&
                <a href={event_m.facebook} className="link external" target="_blank" rel="noreferrer">Facebook</a>}
            </div>
            <hr/>
            {event_m.bands ? <h4>Bands</h4> : ''}
            {
              event_m.bands && (event_m.bands.map(band_m => (
                <div key={band_m.id} onClick={() => band_clicked(band_m)}>
                  <Card className="demo-facebook-card">
                    <CardHeader className="no-border">
                      <div className="demo-facebook-avatar"><img className="band_img"
                                                                 src={band_m.logo ?? '/static/img/no_img_sml.png'}
                                                                 height="58" alt="_" onError={(e) => {
                        // e.target.hidden = true
                      }}/>
                      </div>
                      <div className="card_name">{band_m.name}<br/> {band_m.genre} <br/><br/></div>
                      {band_m.attr.homepage_url ?
                        <Link target="_blank" external href={band_m.attr.homepage_url}>Home Page</Link> : ''}
                    </CardHeader>
                  </Card>
                </div>
              )))
            }
          </div>
          <h4>What people say about this event</h4>
          <div className="message message-first message-received  message-last">
            <div className="message-avatar"
                 style={{backgroundImage: 'url("https://cdn.framework7.io/placeholder/people-100x100-7.jpg")'}}></div>
            <div className="message-content">
              <div className="message-name">Username redacted</div>
              <div className="message-bubble">
                <div className="message-text"><span
                  slot="text">Hi there, I am also fine, thanks! And how are you?</span>
                </div>
              </div>
            </div>
          </div>
          <div className="message message-first message-received  message-last">
            <div className="message-avatar"
                 style={{backgroundImage: 'url("https://cdn.framework7.io/placeholder/people-100x100-7.jpg")'}}></div>
            <div className="message-content">
              <div className="message-name">Username redacted</div>
              <div className="message-bubble">
                <div className="message-text"><span
                  slot="text">Hi there, I am also fine, thanks! And how are you?</span>
                </div>
              </div>
            </div>
          </div>
        </Fragment>
        : <div> Loading..</div>
      }
      <Tabbar></Tabbar>
    </Page>
  )
}

Eventt.propTypes =
  {
    event_m: PropTypes.object
    // eventid: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  }

Eventt.defaultProps =
  {
    event_m: {
      eventid: PropTypes.number
    }
  }

export default Eventt
