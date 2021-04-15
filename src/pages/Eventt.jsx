/**
 * Event view. Viewing single event
 */
import React from 'react'
import PropTypes from 'prop-types'
import {Block, Card, CardContent, CardHeader, Link, Navbar, NavLeft, NavRight, NavTitle, Page} from "framework7-react"
import {useGet} from "restful-react"
import _ from 'lodash'
import Tabbar from "../components/Tabbar"
// import './Event.less';

const Eventt = (props) => {
  const {f7router} = props
  let {event_m, eventid} = props
  if (! eventid && ! event_m) return (<Block>No data</Block>)
  if (! eventid) eventid = event_m.id
  const {data} = useGet({
    path: `http://api.lnoapi/v1/event/${eventid}?expand=bands`,
  })
  if (typeof data === 'object') event_m = _.extend(event_m, data)
  const band_clicked = (first_band, bandid) => {
    f7router.navigate('/band/', {props: {band_m: first_band}})
    console.warn(`band clicked`)
  }
  return (
    <Page>
      <Navbar>
        <NavLeft backLink="Back" backLinkShowText={false}></NavLeft>
        <NavTitle>Live 'N' Out - Event</NavTitle>
        <NavRight>
          <Link className="f7-icons" panelOpen="right">bars</Link>
        </NavRight>
      </Navbar>
      {(eventid && event_m)
        ? <div className={"text_center"}>
          {/*<div className="text-lg font-bold">Event</div>*/}
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
          <hr />
          {
            event_m.bands && event_m.bands.map(band_m => (
              <div id="event_band" key={band_m.id}>
                <h4>Bands</h4>
                <div onClick={() => band_clicked(band_m)}>
                  <Card className="clickable card-header-pic">
                    <CardHeader
                      className="no-border"
                      valign="bottom"
                      style={{
                        backgroundImage: `url(${band_m.logo})`,
                      }}
                    >
                    </CardHeader>
                    <CardContent>
                      <p>{band_m.name} {band_m.genre}</p>
                      {band_m.attr.homepage_url ? <Link target="_blank" external href={band_m.attr.homepage_url}>Home Page</Link> : ''}
                    </CardContent>
                  </Card>
                </div>
              </div>)
            )
          }

        </div>
        : <div> Loading..</div>
      }
      <Tabbar></Tabbar>
    </Page>
  )
}

Eventt.propTypes = {
  event_m: PropTypes.object
  // eventid: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
}

Eventt.defaultProps = {
  event_m: {
    eventid: PropTypes.number
  }
}

export default Eventt
