/**
 * Band view. Viewing single band
 */
import React from 'react'
import PropTypes from 'prop-types'
import {Card, CardContent, CardFooter, CardHeader, Link, Navbar, NavLeft, NavRight, NavTitle, Page} from "framework7-react"
import {useGet} from "restful-react"
import Tabbar from "../components/Tabbar"
// import './Band.less';

const Band = (props) => {
  const {f7router, bandid} = props
  let {band_m} = props
  if (! band_m && typeof bandid === "number") {
    const {data} = useGet({
      path: `http://api.lnoapi/v1/band/${bandid}`,
    })
    if (data && ! band_m) band_m = data
  }
  const event_clicked = (event_m, event_id) => {
    f7router.navigate('/event/', {props: {event_m, event_id}})
    console.warn(`event clicked`)
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
      {(band_m)
        ? <div className={"text_center"}>
          {/*<div className="text-lg font-bold">Event</div>*/}
          <div id="pic" className="profile_pic">
            <img src={band_m.img} alt="event" />
            <div className="name">{band_m.name}</div>
          </div>
          <div className="row">
            <span className="col-70">{band_m.short_desc}</span>
            <span className="col-30">{band_m.age_limit} {band_m.cost}</span>
          </div>
          <div className="row">
            {band_m.website && <a href={band_m.website} className="link external" target="_blank" rel="noreferrer">Website</a>}
            {band_m.facebook && <a href={band_m.facebook} className="link external" target="_blank" rel="noreferrer">Facebook</a>}
          </div>
          <hr />
          <div id="event_band">
            <h4>Bands</h4>
            <div onClick={() => event_clicked(15448)}>
              <Card className="clickable">
                <CardHeader
                  className="no-border"
                  valign="bottom"
                  style={{
                    backgroundImage: 'url(https://cdn.framework7.io/placeholder/nature-1000x600-3.jpg)',
                  }}
                >
                  Journey To Mountains
                </CardHeader>
                <CardContent>
                  <p className="date">Posted on January 21, 2015</p>
                  <p>
                    Quisque eget vestibulum nulla. Quisque quis dui quis ex ultricies efficitur vitae non
                    felis. Phasellus quis nibh hendrerit...
                  </p>
                </CardContent>
                <CardFooter>
                  <Link>Like</Link>
                  <Link>Read more</Link>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
        : <div>Loading..</div>
      }
      <Tabbar></Tabbar>
    </Page>
  )
}

Band.propTypes = {
  band_m_prop: PropTypes.object
  // eventid: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
}

Band.defaultProps = {
  band_m_prop: {}
}

export default Band
