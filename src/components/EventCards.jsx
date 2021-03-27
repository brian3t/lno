import React from 'react';
import {List, ListItem, Page} from 'framework7-react';
import './EventCards.less';
import Jslib from "../jslib/jslib"

const EventCards = ({
                      title, navbarHeading, noCollapsedNavbar, children, events
                    }) => {
  return (
    <Page className={`appstore-page ${noCollapsedNavbar ? 'appstore-page-no-collapsed-navbar' : ''}`}>
      <List mediaList inlineLabels noHairlinesMd>
        {events && events.map((event_m, i) => {
            const band = event_m.first_band, price = null, ev_datetime = Jslib.fm_date_time(event_m.date_utc || event_m.start_datetime_utc, event_m.start_time_utc)
            return <ListItem
              key={i}
              tabLink
              link={`/event/` + event_m.id}
              event_m = {event_m}
              title={event_m.name}
              after={price}
              text={ev_datetime}
              subtitle={band && band.name && `Band: ${band.name}`}>
              <img
                className="band"
                slot="media"
                src={band.logo || '../static/img/band_noimg.png'}
                at_nologo={(!band.logo).toString()}
                width="80"
              />
            </ListItem>
          }
        )
        }
      </List>
    </Page>
  )
}

export default EventCards;
