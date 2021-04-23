/**
 * Band view. Viewing single band
 */

import CONF from '../js/conf' //global config values
import React from 'react'
import PropTypes from 'prop-types'
import {Block, Button, Card, CardHeader, Link, Navbar, NavLeft, NavRight, NavTitle, Page} from "framework7-react"
import {useGet} from "restful-react"
import _ from "lodash"
import Tabbar from "../components/Tabbar"
import Jslib from "../jslib/jslib"
// import './Band.less';

const Band = (props) => {
  const {f7router} = props
  let {band_m, bandid} = props
  if (! bandid && ! band_m) return (<Block>No data</Block>)
  if (! bandid) bandid = band_m.id
  const {data} = useGet({
    path: `${CONF.api}band/${bandid}?expand=events`,//todob
  })
  if (typeof data === 'object') band_m = _.extend(band_m, data)
  let loc = band_m.attr.location
  if (typeof loc === 'string') {
    try {
      loc = JSON.parse(loc)
    } catch (e) {

    }
  }
  const event_clicked = (event_m, event_id) => {
    f7router.navigate('/event/', {props: {event_m, event_id}})
    console.warn(`event clicked`)
  }
  return (
    <Page>
      <Navbar>
        <NavLeft backLink="Back" backLinkShowText={false}></NavLeft>
        <NavTitle>Live 'N' Out - Band</NavTitle>
        <NavRight>
          <Link className="f7-icons" panelOpen="right">bars</Link>
        </NavRight>
      </Navbar>
      {(band_m)
        ? <>
          <div id="profile_pic_banner_wrapper">
            <div className="profile_pic_sml cover_pic"
                 style={{backgroundImage: `url('${band_m.logo}')`}}>
            </div>
          </div>
          <div className="profile_pic_center">
            <a href="">
              <img
                src={band_m.logo}
                alt="band_profile_pic" onError={(e) => {
                e.target.hidden = true
              }} />
            </a>
          </div>
          <div className="text-align-center"><h3>{band_m.name}</h3>
            {band_m.website
            && <Button className="large small external" target="_blank" href={band_m.website}>Website</Button>}
            {band_m.attr.homepage_url
            && <Button className="large small external" target="_blank" href={band_m.attr.homepage_url}>Home Page</Button>}
            {band_m.facebook
            && <Button className="large small external" target="_blank" href={band_m.facebook}>Facebook Page</Button>}

            <span className="col-70"></span><span className="col-30"> </span>
            <div className="row location flex-justify-center">Location: <span>{band_m.hometown_city || band_m.attr?.location?.city || ''}</span><span>{band_m.hometown_state}</span>
              <span>US</span></div>
          </div>
          {band_m.events
            ? <>
              <h3 className="text-align-center">Events</h3>
              <div id="band_event">
                {band_m.events.map((event_m, i) => <div key={i}>
                  <Card className="demo-facebook-card">
                    <CardHeader className="no-border">
                      <div className="demo-facebook-avatar"><img src={event_m.img} width="34" alt="ev_img" />
                      </div>
                      <div className="demo-facebook-name">{event_m.name}</div>
                      <div className="demo-facebook-date">{Jslib.fm_date_time(event_m.date_utc || event_m.start_datetime_utc, event_m.start_time_utc)}</div>
                    </CardHeader>
                  </Card>
                </div>)}
              </div>
            </>
            : ''
          }
        </>
        : <div>Loading..</div>
      }
      <Tabbar></Tabbar>
    </Page>
  )
}

Band.propTypes =
  {
    band_m: PropTypes.object
    // eventid: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  }

Band.defaultProps =
  {
    band_m: {}
  }

export default Band
