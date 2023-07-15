import React, {Fragment, useEffect, useRef, useState} from 'react'
import {Block, Button, f7, Link, Navbar, Page} from 'framework7-react'
import EventBus from '../jslib/EventBus'
import {is_logged_in} from "@/jslib/helper";
import {logout} from "./LoginUtil";
import eventBus from "../jslib/EventBus";

export default (props) => {
  const {f7router} = props
  const [is_logged_in_state, set_is_logged_in_state] = useState(false)
  useEffect(() => {
    eventBus.on('login_state_changed', () => set_is_logged_in_state(is_logged_in()))
  })
  return (
    <Page>
      <Navbar title="SDE Settings"></Navbar>
      {/*<BlockTitle>Account</BlockTitle>*/}
      <Block>
        <Link panelClose>Close Menu</Link><br/><br/>

        <div className={is_logged_in_state ? 'asdf' : 'hidden'} >
          <Link id="log_out_pr" onClick={() => logout()} panelClose>Log Out</Link><br/><br/>
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
