import React from 'react';
import {List, ListItem, Page} from 'framework7-react';
// import {utils} from 'framework7';
import './EventCards.less';
import _ from 'lodash'
import Jslib from "../jslib/jslib"
import Tabbarr from "./Tabbar"

const EventCards = ({
                      title, navbarHeading, noCollapsedNavbar, children, events, f7route, f7router
                    }) => {
  window.f7router = f7router
  return (
    <Page className={`appstore-page ${noCollapsedNavbar ? 'appstore-page-no-collapsed-navbar' : ''}`}>
      <List mediaList inlineLabels noHairlinesMd>
        {events && _.isArray(events) && events.map((event_m, i) => {
          const band = event_m.first_band, price = null, ev_datetime = Jslib.fm_date_time(event_m.date_utc || event_m.start_datetime_utc, event_m.start_time_utc)
          let band_img_or_event_img = event_m.img
          if (! band_img_or_event_img && (band && band.logo)) band_img_or_event_img = band.logo
          return <ListItem
            key={i}
            reloadDetail
            routeProps={{eventid: event_m.id, event_m}}
            animate="false"
            link="/eventt/"
            event_m={event_m}
            title={event_m.name}
            after={price}
            text={ev_datetime}
            subtitle={band && band.name && `Band: ${band.name}`}>
            <img
              className="band"
              slot="media"
              src={(band_img_or_event_img || '../static/img/band_noimg.png')}
              at_nologo={(! band_img_or_event_img).toString()}
              alt="band"
              width="80"
            />
          </ListItem>
        })
        }
      </List>
      <Tabbarr />
    </Page>
  )
}

export default EventCards;
