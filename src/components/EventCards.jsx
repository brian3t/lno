import React, {Fragment, useEffect, useRef, useState} from 'react'
import {Icon, Input, List, ListItem, Page, Range, Searchbar} from 'framework7-react';
// import {utils} from 'framework7';
import $ from 'jquery'
import _ from 'lodash'
import moment from 'moment-timezone'
import CONF from '../js/conf' //global config values
import ENV from '../env' //global config values
import './EventCards.less'
// import extract_reverse_geocode from "../jslib/google_maps_extra"
import {fm_date_time} from "@/jslib/helper";
import extract_reverse_geocode from "@/jslib/google_maps_extra";
import store from "store2"
import apis from "@/jslib/rest_sc/apis"

apis.setup(ENV)

const EventCards = ({
                      noCollapsedNavbar,
                      f7router
                    }) => {
  window.f7router = f7router
  const db_filters_start_date_ref = useRef(null)
  const db_filters_end_date_ref = useRef(null)
  const today = moment()
  const last_week = moment()
  last_week.subtract(7, 'days')
  const next_week = moment()
  next_week.add(1, 'week')
  const three_weeks_fr_now = moment()
  three_weeks_fr_now.add(3, 'weeks')
  const [center_loc, setCenter_loc] = useState('')
  const [distance, setDistance] = useState(20)
  let lat, lng
  const [events, set_events] = useState([])

  let query_parms = CONF.default_today_parms
  query_parms.expand = 'first_band'
  const allowInfinite = useRef(true)
  const [showPreloader, setShowPreloader] = useState(true)

  const loadMore = () => {
    if (!allowInfinite.current) return;
    allowInfinite.current = false;

    setTimeout(async () => {
      if (events.length >= 300) {
        setShowPreloader(false);
        return;
      }

      const itemsLength = events.length;
      const min_event_id = _.minBy(events, 'id')
      let query_params_new_event = query_parms
      query_params_new_event.id__lt = min_event_id?.id || 0
      let new_events = await apis.g('event', query_params_new_event)
      new_events.push.apply(new_events, events)
      set_events(new_events)
      // setShowPreloader(false)
      allowInfinite.current = true;
    }, 1000);
  };

  /**
   * Update the pretty date_block
   * Also set input's val
   * @param new_val Date - new value
   * @param el string - selector of the date block, e.g. '.date_block.db_filters_start_date'
   */
  function filters_date_updated(new_val, el) {
    // console.info(`filters date updated`, el)
    if (!new_val[0]) return
    let new_val_mm
    if (new_val[0] instanceof moment) {
      new_val_mm = new_val[0]
    } else {
      new_val_mm = moment(new_val[0])
    }
    if (!new_val_mm.isValid()) return
    if (el === '.date_block.db_filters_start_date') {
      const db_filters_start_date_ref_el = db_filters_start_date_ref?.current?.el
      const db_filters_start_date_ref_el_input = $(db_filters_start_date_ref_el).find('input')
      db_filters_start_date_ref_el_input.val(new_val_mm.format('YYYY-MM-DD'))
    }
    if (el === '.date_block.db_filters_end_date') {
      const db_filters_end_date_ref_el = db_filters_end_date_ref?.current?.el
      const db_filters_end_date_ref_el_input = $(db_filters_end_date_ref_el).find('input')
      db_filters_end_date_ref_el_input.val(new_val_mm.format('YYYY-MM-DD'))
    }
    const date_block = $(el) //element's parent date_block
    if (date_block.length !== 1) return
    date_block.find('.db_daynum')
      .html(new_val_mm.date())
    date_block.find('.db_day_of_week')
      .html(new_val_mm.format('ddd'))
    date_block.find('.db_month')
      .html(new_val_mm.format('MMM'))
  }

  useEffect(() => {
    console.log(`Event Cards loaded`)
    $('#filters')
      .ready(() => {
        $('#filters')
          .hide()
      })
    filters_date_updated([last_week], '.date_block.db_filters_start_date')
    filters_date_updated([three_weeks_fr_now], '.date_block.db_filters_end_date')

    async function fetchData() {
      const new_events = await apis.g(`event`, query_parms)
      set_events(new_events)
    }
    fetchData()
    /*
    //google place autocomplete. disabled for now
    if (typeof google !== 'undefined' && google && google.maps) init_auto_complete('center_loc')
    else {
      window.addEventListener('gmap_ready', () => {
        console.warn(`gmap ready event listened`)
        init_auto_complete('center_loc')
      })
    }
     */
  }, []);

  /**
   * Quick select start and end date
   * @param template Date - new value
   */
  function quick_select(template = 'this_weekend') {
    const friday = today.clone()
      .weekday(5);
    const sunday = friday.clone()
      .weekday(7);

    let startdt_dt, enddt_dt
    switch (template) {
      case 'this_weekend':
        startdt_dt = friday.clone()
        enddt_dt = sunday.clone()
        break
      case 'next_weekend':
        startdt_dt = friday.clone()
        startdt_dt = startdt_dt.add(7, 'days')
        enddt_dt = sunday.clone()
        enddt_dt = enddt_dt.add(7, 'days')
        break
      case 'next_month':
        startdt_dt = friday.clone()
        enddt_dt = friday.clone()
        enddt_dt = enddt_dt.add(1, 'months')
        break
      case 'last_weekend':
        startdt_dt = friday.clone()
        startdt_dt = startdt_dt.subtract(7, 'days')
        enddt_dt = sunday.clone()
        enddt_dt = enddt_dt.subtract(7, 'days')
        break
      default:
        break;
    }
    filters_date_updated([startdt_dt], '.date_block.db_filters_start_date')
    filters_date_updated([enddt_dt], '.date_block.db_filters_end_date')

  }


  /**
   * Get current pos and set google autocomplete too
   */
  function geolocate() {
    /* eslint-disable no-undef */
    if (!(navigator && navigator.geolocation)) return `Please allow geolocation access`
    console.log(`Now calling geo.getcurpos`)
    navigator.geolocation.getCurrentPosition((position) => {
      const geolocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      }
      app_util.set_val('geo', geolocation)
      lat = geolocation.lat
      lng = geolocation.lng

      app_util.toast(`Geolocation collected`)
      const geocoder = new google.maps.Geocoder()
      if (geocoder.geocode) {
        geocoder.geocode({location: geolocation}, (results, status) => {
            if (status === 'OK') {
              const {postal_code} = extract_reverse_geocode(results, _)
              if (postal_code.length > 0) setCenter_loc(postal_code)
            } else {
              app_util.toast("Geocode was not successful for the following reason: " + status);
            }
          }
        )
      }

      if (typeof google === 'undefined' || typeof autocomplete === 'undefined') return geolocation
      const circle = new google.maps.Circle(
        {
          center: geolocation,
          radius: position.coords.accuracy
        });
      autocomplete.setBounds && autocomplete.setBounds(circle.getBounds());
      return geolocation
    }, (err) => alert(`Error getting geolocation ` + JSON.stringify(err)), GEOOPTIONS);
    return false
    /* eslint-enable no-undef */
  }

  /**
   * Grab what we have in filters, then recall useRest
   * filters: center_loc, distance, start_date, end_date
   */
  async function search_exec() {
    const start_date = $(':input[name="filters_start_date"]').val()
    const end_date = $(':input[name="filters_end_date"]').val()
    query_parms = Object.assign(query_parms, {
      cen_lat: lat,
      cen_lng: lng,
      xq_miles_away: distance,
      date__from: start_date,
      date__to: end_date
    })
    const refetch_res = refetch()
    if (!refetch_res) console.warn(`Refetch failed`, refetch_res)
    // const event_res = await apis.g('event', query_parms)
    f7router.app.searchbar.disable()
    $('#filters').hide()
    $('#searchbar_backdrop').removeClass('searchbar-backdrop-in')
  }

  return (
    <>
      <div id="searchbar_backdrop" className="searchbar-backdrop"></div>
      <Searchbar className="searchbar"
                 searchContainer="#list_to_search"
                 backdrop
                 backdropEl="#searchbar_backdrop"
                 searchIn=".searchable"
                 onSearchbarEnable={() => {
                   $('#filters').show()
                   $('.filters').show()
                   $('#searchbar_backdrop')
                     .addClass('searchbar-backdrop-in')
                 }
                 }
                 onSearchbarDisable={() => {
                   $('#filters').hide()
                   $('.filters').hide()
                   $('#searchbar_backdrop')
                     .removeClass('searchbar-backdrop-in')
                 }
                 }
                 init
                 placeholder="Search band, event or venue"
      >

      </Searchbar>
      <div id="filters" className="row padded filters">
        <div className="text_center w-full"><span className="text_bold">Filters</span></div>
        <div className="list w-full mt-0">
          <ul>
            <div className="w-1/2 inline-block">
              <li className="item-content item-input">
                <div className="item-inner">
                  <div className="item-title item-label">Zip Code:</div>
                  <div className="item-input-wrap">
                    <div>
                      <input id="center_loc" value={center_loc} onChange={setCenter_loc} type="text"
                             placeholder="Enter zip code" className="has_inline_btn inline-block"/>
                      <input type="hidden" id="center_lat" name="center_lat"/>
                      <input type="hidden" id="center_lng" name="center_lng"/>
                      <i id="location_btn" className="f7-icons btn inline_btn inline-block"
                         onClick={geolocate}>location</i>
                    </div>
                  </div>
                </div>
              </li>
            </div>
            <div className="w-1/2 inline-block">
              <li className="">
                <div className="input_wrapper">
                  <div className="item-title item-label">Distance: {distance} miles</div>
                  <ul className="sml_padding">
                    <li className="flex-shrink-3 range_wrapper">
                      <Range value={distance} onRangeChange={setDistance} min={0} max={100} step={5} label
                             color="orange"
                      />
                    </li>
                  </ul>
                </div>
              </li>
            </div>
            <li className="item-content item-input no_border">
              <div className="w-1/4">
                <Input
                  name="filters_start_date"
                  ref={db_filters_start_date_ref}
                  type="datepicker"
                  className="hidden"
                  calendarParams={{
                    closeOnSelect: true
                  }}
                  onCalendarChange={(new_val) => {
                    // console.log(`Im changed`, newval)
                    filters_date_updated(new_val, '.date_block.db_filters_start_date')
                  }}
                />
                <div className="date_block db_filters_start_date row no-gap" onClick={() => {
                  const db_filters_start_date_ref_el = db_filters_start_date_ref.current.el
                  $(db_filters_start_date_ref_el)
                    .find('input')
                    .trigger('click')
                }}>
                  <div className="col-60 db_daynum">10</div>
                  <div className="col-40 db_daymonth"><span className="db_day_of_week">Sat</span><br/><span
                    className="db_month">Jan</span></div>
                </div>
              </div>
              <div className="w-1/4">
                <Input
                  name="filters_end_date"
                  ref={db_filters_end_date_ref}
                  type="datepicker"
                  className="hidden"
                  calendarParams={{
                    closeOnSelect: true
                  }}
                  onCalendarChange={(new_val) => {
                    // console.log(`Im changed`, newval)
                    filters_date_updated(new_val, '.date_block.db_filters_end_date')
                  }}
                />
                <div className="date_block db_filters_end_date row no-gap" onClick={() => {
                  const db_filters_end_date_ref_el = db_filters_end_date_ref.current.el
                  $(db_filters_end_date_ref_el)
                    .find('input')
                    .trigger('click')
                }}>
                  <div className="col-60 db_daynum">12</div>
                  <div className="col-40 db_daymonth"><span className="db_day_of_week">Sun</span><br/><span
                    className="db_month">Dec</span></div>
                </div>
              </div>
              <div className="w-1/2 quickselects">
                <a href="#" className="w49p inline-block button text-xs quickselects_btn"
                   onClick={() => quick_select('this_weekend')}>This weekend</a>
                <a href="#" className="w49p inline-block button text-xs quickselects_btn"
                   onClick={() => quick_select('next_weekend')}>Next weekend</a>
                <a href="#" className="w49p inline-block button text-xs quickselects_btn"
                   onClick={() => quick_select('next_month')}>Next month</a>
                <a href="#" className="w49p inline-block button text-xs quickselects_btn"
                   onClick={() => quick_select('last_weekend')}>Last weekend</a>
              </div>
            </li>
          </ul>
        </div>
        <button className="button col button-round" type="button" id="search_exec" onClick={search_exec}>Search</button>
      </div>
      <Page infinite noToolbar={false} infiniteDistance={50} onInfinite={loadMore} infinitePreloader={showPreloader} >
        <div className={`eventt ${noCollapsedNavbar ? 'eventt-page-no-collapsed-navbar' : ''}`}>
          {/*					FILTERS   */}
          <List mediaList inlineLabels noHairlinesMd id="#list_to_search">
            {events && _.isArray(events) && events.map((event_m, i) => {
              const band = event_m.first_band, price = null,
                ev_datetime = fm_date_time(event_m.date_utc || event_m.start_datetime_utc, event_m.start_time_utc)
              let band_img_or_event_img = event_m.img
              if (!band_img_or_event_img && (band && band.logo)) band_img_or_event_img = band.logo
              const is_faved = (store('fav_events') || []).includes(event_m.id)
              return <ListItem
                key={i}
                reloadDetail
                routeProps={{
                  eventid: event_m.id,
                  event_m
                }}
                animate="false"
                link="/eventt/"
                event_m={event_m}
                title={event_m.name}
                className="searchable"
                after={price}
                text={ev_datetime}
                subtitle={band && band.name && `Band: ${band.name}`}
              >
                <span className="hidden span_event_id">{event_m.id}</span>
                <img
                  className="band"
                  slot="media"
                  src={(band_img_or_event_img || '../static/img/band_noimg.png')}
                  at_nologo={(!band_img_or_event_img).toString()}
                  alt={band?.name || 'Band'}
                  width="80"
                />
                {is_faved ? <Icon f7="bookmark_filled" slot="after"></Icon> : ''}
              </ListItem>
            })
            }
          </List>
        </div>
      </Page>
    </>
  )
}
export default EventCards;
