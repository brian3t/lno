/**
 * Event view. Viewing single event
 */
import _ from 'lodash'
import {useGet} from "restful-react"
import React, {Fragment, useEffect, useRef, useState} from 'react'
import PropTypes from 'prop-types'
import {
  Block,
  Button,
  Card,
  CardHeader,
  f7,
  Icon,
  Link, List, ListInput,
  Navbar,
  NavLeft,
  NavRight,
  NavTitle,
  Page, PageContent
} from "framework7-react"
import CONF from '../js/conf' //global config values
import ENV from '../env'
import store from 'store2'
import ToolbarBottom from "../components/ToolbarBottom"
import {fm_date_time, logged_in_user_id} from "@/jslib/helper"
import apis from "@/jslib/rest_sc/apis"
import arrowSwap from "framework7-icons/react/esm/ArrowSwap";
// import './Event.less';

apis.setup(ENV)

const Eventt = (props) => {
  const {f7router} = props
  let trigger_reload_flag = false
  let [event_comments, set_event_comments] = useState([])
  let [event_state, set_event_state] = useState({})
  let {event_m, eventid} = props
  if (!eventid && !event_m) return (<Block>No data</Block>)
  if (!eventid) eventid = event_m.id
  const band_clicked = (first_band, bandid) => {
    f7router.navigate('/band/', {props: {band_m: first_band}})
    console.warn(`band clicked ${bandid}`)
  }
  const [comment, set_comment] = useState('')
  const [faved, set_faved] = useState(false)
  const [popupOpened, setPopupOpened] = useState(false);
  const popup = useRef(null)


  useEffect(() => {
    console.log(`eventt use effect`)

    async function fetchData() {
      // You can await here
      const event_comments_res = await apis.g('event-comment', {event_id: event_m.id, get_bot_only: 1})
      const event_comments_mine_res = await apis.g('event-comment', {
        event_id: event_m.id,
        created_by: logged_in_user_id(ENV.auth)
      })
      set_event_comments(event_comments_res.concat(event_comments_mine_res))

      const event_rest = await apis.g1('event', {id: event_m.id, expand: 'bands'})
      event_m = _.extend(event_m, event_rest)
      set_event_state(event_m)
    }

    fetchData()
    //load_fav
    let is_faved = (store('fav_events') || []).includes(event_m.id)
    set_faved(is_faved)
  }, [event_m.id, eventid, trigger_reload_flag])

  const createPopup = (event_comment) => {
    // Create popup
    // if (!popup.current) {
    popup.current = f7.popup.create({
      content: `
          <div class="popup">
            <div class="page">
              <div class="navbar">
                <div class="navbar-inner">
                  <div class="navbar-bg"></div>
                  <div class="title">Username redacted. Please sign up first</div>
                  <div class="right"><a  class="link popup-close">Close</a></div>
                </div>
              </div>
              <div class="page-content">
                <div class="block">
                  <img src="https://socalappsolutions.com/p/${event_comment.created_by.toString().padStart(4, '0')}.jpg" alt="p">
                </div>
              </div>
            </div>
          </div>
        `.trim(),
    })
    // }
    // Open it
    popup.current.open();
  }

  const comment_clicked = async function () {
    const [comment_status, res] = await apis.c('event-comment', {
      event_id: eventid,
      comment: comment || 'I\'m going to this event'
    })
    if (!comment_status) {
      alert(res)
      return false
    }
    f7.toast.create({
      text: 'Comment added',
      position: 'top',
      closeTimeout: 2000,
    }).open()
    trigger_reload_flag = !trigger_reload_flag
  }

  /**
   * Fav an event
   * @param event_id
   */
  const fav = function (event_id) {
    let fav_events = store('fav_events')
    if (!fav_events) fav_events = []
    if (!fav_events.includes(event_id)) fav_events.push(event_id)
    store('fav_events', fav_events)
    set_faved(true)
  }

  /**
   * Un-Fav an event
   * @param event_id
   */
  const un_fav = function (event_id) {
    let fav_events = store('fav_events')
    if (!fav_events || !(fav_events instanceof Array)) {
      set_faved(false)
      return
    }
    if (!fav_events.includes(event_id)) {
      set_faved(false)
      return;
    }
    _.remove(fav_events, (fav_event) => (fav_event == event_id))
    store('fav_events', fav_events)
    set_faved(false)
  }

  return (
    <Page>
      <Navbar>
        <NavLeft backLink="Back" backLinkShowText={false}></NavLeft>
        <NavTitle>SD Events - Event</NavTitle>
        <NavRight>
          <Link className="f7-icons" iconF7="menu" icon="f7-panel" panelOpen="right"><i className="icon"></i></Link>
          {/*<a className="link icon-only" data-panel="right">
            <i className="icon"></i>
          </a>*/}
        </NavRight>
      </Navbar>
      <ToolbarBottom></ToolbarBottom>
      {(eventid && event_m)
        ? <PageContent>
          <div className={"text_center"}>
            {/*<div className="text-lg font-bold">Event</div>*/}
            <div id="pic" className="profile_pic">
              <img src={event_m.img} alt="event"/>
              <div className="name font-bold">{event_m.name}</div>
              {event_m.venue && <span>{event_m.venue.address1} {event_m.venue.address2} {event_m.venue.city} {event_m.venue.state} </span>}
              <div>{fm_date_time(event_m.date_utc || event_m.start_datetime_utc, event_m.start_time_utc)}</div>
              {faved ?
                <Button onClick={() => un_fav(event_m.id)}><Icon f7="bookmark_fill" onClick={() => un_fav(event_m.id)}>
                </Icon></Button>
                : <Button onClick={() => fav(event_m.id)}><Icon f7="bookmark"></Icon></Button>}
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
                                                                 src={band_m.logo ?? '/assets/img/no_img_sml.png'}
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
          {event_comments ? event_comments.map((event_comment, i) =>
            <div key={i} className="message message-first message-received  message-last">
              <div className="message-avatar" onClick={() => createPopup(event_comment)}
                   style={{backgroundImage: `url("https://socalappsolutions.com/p/${event_comment.created_by.toString().padStart(4, '0')}_60x60.jpg")`}}></div>
              <div className="message-content">
                {/*<div className="message-name">Username redacted. Sign up to view username</div>*/}
                <div className="message-bubble">
                  <div className="message-text"><span
                    slot="text">{event_comment.comment}</span>
                  </div>
                </div>
              </div>
            </div>
          ) : ''}
          <List>
            <ListInput label="Comment" type="textarea" rows={2} placeholder="I'm going to this event"
                       value={comment} onChange={(e => set_comment(e.target.value))}>
            </ListInput>
          </List>
          <Button small outline onClick={comment_clicked}>Comment</Button>
          <div className="spacer"></div>
        </PageContent>
        : <div> Loading..</div>
      }
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
