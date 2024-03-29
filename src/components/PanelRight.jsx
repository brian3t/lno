import React, {Fragment, useEffect, useRef, useState} from 'react'
import {Block, Button, f7, Link, Navbar, Page} from 'framework7-react'
import EventBus from '../jslib/EventBus'
import {get_logged_in_user, is_logged_in} from "@/jslib/helper";
import {close_account, logout} from "./LoginUtil";
import eventBus from "../jslib/EventBus";

export default (props) => {
  const {f7router} = props
  const [is_logged_in_state, set_is_logged_in_state] = useState(false)
  const [logged_in_user_id, set_logged_in_user_id] = useState('guest')
  useEffect(() => {
    eventBus.on('login_state_changed', () => {
      set_is_logged_in_state(is_logged_in())
      set_logged_in_user_id(get_logged_in_user().prof_name)
    })
  })
  return (
    <Page>
      <Navbar title="SDE Settings"></Navbar>
      {/*<BlockTitle>Account</BlockTitle>*/}
      <Block>
        <Link panelClose>Close Menu</Link><br/><br/>
        Welcome, {logged_in_user_id} <br/><br/>

        <div className={is_logged_in_state ? 'shown' : 'hidden'} >
          <Link id="log_out_pr" onClick={() => logout()} panelClose>Log Out</Link><br/><br/>
          <Link id="log_out_pr" onClick={() => close_account()} panelClose>Delete Account</Link><br/><br/>
        </div>
        <div hidden={is_logged_in_state}><Link id="log_in_pr" panelClose
                                               onClick={() => f7.views.main.router.navigate('/login/')}>Log
          In</Link><br/><br/>
          <Link id="sign_up_pr" panelClose popupOpen="#signup_popup">Sign Up</Link><br/><br/>
        </div>
        <a className="link external"
           href="mailto:ceo@socalappsolutions.com?subject=Feedback for San Diego Events">Feedback</a>
      </Block>
    </Page>
  )
}
