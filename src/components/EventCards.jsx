import React from 'react';
import {List, ListItem, Page} from 'framework7-react';
import './EventCards.less';

const EventCards = ({
                      title, navbarHeading, noCollapsedNavbar, children, events
                    }) => {
  return (
    <Page className={`appstore-page ${noCollapsedNavbar ? 'appstore-page-no-collapsed-navbar' : ''}`}>
      <List mediaList inlineLabels noHairlinesMd>
        {events && events.map((event_m, i) => {
            let band = event_m.first_band, price = null
            return <ListItem
              key={i}
              link="#"
              title={event_m.name}
              after={price}
              subtitle={band && band.name}
              text="Sat Mar">
              <img
                slot="media"
                src="https://cdn.framework7.io/placeholder/people-160x160-1.jpg"
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
