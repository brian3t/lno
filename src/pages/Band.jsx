/**
 * Band view. Viewing single band
 */
import React from 'react'
import PropTypes from 'prop-types'
import {Block, Card, CardContent, CardHeader, Link, Navbar, NavLeft, NavRight, NavTitle, Page} from "framework7-react"
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
    path: `http://api.lnoapi/v1/band/${bandid}?expand=events`,
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
        ? <div className={"text_center"}>
          <div id="pic" className="profile_pic">
            <img src={band_m.logo} alt="event" className="profile_pic_banner" />
          </div>
          <div className="row">{band_m.name}</div>
          <div className="row">
            {band_m.website && <a href={band_m.website} className="link external" target="_blank" rel="noreferrer">Home Page</a>}
            {band_m.attr.homepage_url && <a href={band_m.attr.homepage_url} className="link external" target="_blank" rel="noreferrer">Home Page</a>}
            {band_m.facebook && <a href={band_m.facebook} className="link external" target="_blank" rel="noreferrer">Facebook</a>}
          </div>
          <div className="row">
            <span className="col-70">{band_m.short_desc}</span>
            <span className="col-30">{band_m.age_limit} {band_m.cost}</span>
          </div>
          <div className="row location">
            {loc && "Location: "}
            {(loc && loc.city) && (<span>{loc.city}</span>)}
            {(loc && loc.state) && (<span>{loc.state}</span>)}
            {(loc && loc.country) && (<span>{loc.country}</span>)}
          </div>
          {band_m.events ? <h4>Events</h4> : ''}
          {band_m.events ? band_m.events.map(event_m => (
            <div id="band_event" key={event_m.id}>
              <div onClick={() => event_clicked(band_m)}>
                <Card className="clickable card-header-pic">
                  <CardHeader
                    className="no-border profile_pic_banner"
                    valign="bottom"
                    style={{
                      backgroundImage: `url(${event_m.img})`,
                    }}
                  >
                  </CardHeader>
                  <CardContent>
                    <p>{event_m.name} {event_m.when}</p>
                    {event_m.website ? <Link target="_blank" external href={event_m.website}>Home Page</Link> : ''}
                    <p>{Jslib.fm_date_time(event_m.date_utc || event_m.start_datetime_utc, event_m.start_time_utc)}</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          )) : ''
          }
          ) : ''
          }
        </div>
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
