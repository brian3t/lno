import React, {useEffect} from 'react'
import {List, ListItem, Range, Searchbar} from 'framework7-react';
// import {utils} from 'framework7';
import './EventCards.less';
import _ from 'lodash'
import Jslib from "../jslib/jslib"

const EventCards = ({
                      noCollapsedNavbar, events, f7router
                    }) => {
  window.f7router = f7router

  /**
   * Get current pos and set google autocomplete too
   */
  function geolocate(){
    /* eslint-disable no-undef */
    if (! (navigator && navigator.geolocation)) return
    navigator.geolocation.getCurrentPosition((position) => {
      const geolocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      }
      if (typeof google === 'undefined' || typeof autocomplete === 'undefined') return geolocation
      const circle = new google.maps.Circle(
        {center: geolocation, radius: position.coords.accuracy});
      autocomplete.setBounds && autocomplete.setBounds(circle.getBounds());
      return geolocation
    });
    /* eslint-enable no-undef */
  }


  useEffect(() => {
    console.log(`Event Cards loaded`)
    $('#filters').hide()
  });

  return (
    <>
      <div id="searchbar_backdrop" className="searchbar-backdrop"></div>
      <Searchbar className="searchbar"
                 searchContainer="#list_to_search"
                 backdrop
                 backdropEl="#searchbar_backdrop"
                 searchIn=".searchable"
                 onSearchbarEnable={() => {
                   $('#filters').show();
                   $('#searchbar_backdrop').addClass('searchbar-backdrop-in')
                 }
                 }
                 onSearchbarDisable={() => {
                   $('#filters').hide();
                   $('#searchbar_backdrop').removeClass('searchbar-backdrop-in')
                 }
                 }
                 init
                 placeholder="Search band, event or venue"
      >

      </Searchbar>
      <div id="filters" className="row padded">
        <div className="text_center w-full"><span className="text_bold">Filters</span></div>
        <div className="list w-full">
          <ul>
            {/*<li className="item-content item-input">
              <div className="item-inner">
                <div className="item-title item-label">Genre</div>
                <div className="item-input-wrap">
                  <select id="filter_genres" name="filter_genres" multiple style="display:none"> <option value="Blue">Any</option> <option value="Blue">Blue</option> <option value="Jazz">Jazz</option> <option value="Hiphop">Hiphop</option> <option value="RnB">RnB</option> <option value="Rock">Rock</option> </select>
                </div>
              </div>
            </li>
            <li className="item-content item-input">
              <div className="item-inner">
                <div className="item-title item-label">Price</div>
                <div className="item-input-wrap">
                  <input id="price" name="price" style={{display: 'none'}}>
                  <span className="segmented">
                    <button className="button button-outline">Free</button>
                    <button className="button button-outline">$</button>
                    <button className="button button-outline button-active">$$</button>
                    <button className="button button-outline">$$$</button>
                  </span>
                </div>
              </div>
            </li>*/}
            <li className="item-content item-input">
              <div className="item-inner">
                <div className="item-title item-label">Location:</div>
                <div className="item-input-wrap">
                  <div>
                    <input id="center_loc" type="text" onFocus={geolocate} placeholder="Enter street address or city, state" />
                    <input type="hidden" id="center_lat" name="center_lat" />
                    <input type="hidden" id="center_lng" name="center_lng" />
                  </div>
                </div>
              </div>
            </li>
            <li className="">
              <div className="input_wrapper">
                <div className="item-title item-label">Range:</div>
                <ul className="sml_padding">
                  <li className="flex-shrink-3">
                    <Range min={0} max={100} step={5} value={25} label color="orange"
                    />
                  </li>
                </ul>
              </div>
            </li>
            <li className="item-content item-input">
              <div className="w-1/4">
                <div className="date_block db_filters_start_date row no-gap">
                  <input type="date" defaultValue="2021-04-24" id="filters_start_date" style={{display: 'none'}} />
                  <div className="col-60 db_daynum">10</div>
                  <div className="col-40 db_daymonth"><span className="db_day_of_week">Sat</span><br /><span className="db_month">Jan</span></div>
                </div>
              </div>
              <div className="w-1/4">
                <div className="date_block db_filters_end_date row no-gap">
                  <input type="date" defaultValue="2021-04-31" id="filters_end_date" style={{display: 'none'}} />
                  <div className="col-60 db_daynum">12</div>
                  <div className="col-40 db_daymonth"><span className="db_day_of_week">Sun</span><br /><span className="db_month">Dec</span></div>
                </div>
              </div>
              <div className="w-1/2 quickselects">
                <a href="#" className="w49p inline-block button text-xs quickselects_btn" id="this_weekend">This weekend</a>
                <a href="#" className="w49p inline-block button text-xs quickselects_btn" id="next_weekend">Next weekend</a>
                <a href="#" className="w49p inline-block button text-xs quickselects_btn" id="next_month">Next month</a>
                <a href="#" className="w49p inline-block button text-xs quickselects_btn" id="last_weekend">Last weekend</a>
              </div>
            </li>
            {/*<li className="item-content item-input">
                <div className="item-inner">
                    <div className="item-title item-label">Custom date range</div>
                    <div className="item-input-wrap">
                        <div className="item-input-wrap">
                            <input type="text" placeholder="Select date range" id="event_date_range_custom" name="event_date_range_custom"/>
                        </div>
                    </div>
                </div>
            </li>
            <li className="item-content item-input">
              <div className="item-inner">
                <div className="item-title item-label">Distance</div>
                <div className="item-input-wrap">
                  <div className="list simple-list">
                      <ul>
                        <li>
                          <div className="item-cell width-auto flex-shrink-0">
                            <i className="icon f7-icons ios-only">circle</i>
                            <i className="icon material-icons md-only">brightness_low</i>
                          </div>
                          <div className="item-cell flex-shrink-3">
                            <div id="distance_slider" className="range-slider color-orange" data-label="true">
                              <input type="range" min="0" max="100" step="1" defaultValue="50">
                            </div>
                          </div>
                          <div className="item-cell width-auto flex-shrink-0">
                            <i className="icon f7-icons ios-only">circle_half</i>
                            <i className="icon material-icons md-only">brightness_high</i>
                          </div>
                        </li>
                      </ul>
                  </div>
                </div>
              </div>
            </li>
            end of filters */}
          </ul>
        </div>
        <button className="button col button-round" id="search_exec">Search</button>
      </div>

      <div className={`eventt ${noCollapsedNavbar ? 'eventt-page-no-collapsed-navbar' : ''}`}>
        {/*					FILTERS   */}
        <List mediaList inlineLabels noHairlinesMd id="#list_to_search">
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
              className="searchable"
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
      </div>
    </>
  )
}

export default EventCards;
