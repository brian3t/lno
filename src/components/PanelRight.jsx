import React, {useRef, useState} from 'react'
import {Block, Button, f7, Link, Navbar, Page} from 'framework7-react'
import {is_logged_in} from "@/jslib/helper";
import {logout} from "./LoginUtil";

export default (props) => {
  const {f7router} = props
  return (
    <Page>
      <Navbar title="SDE Settings"></Navbar>
      {/*<BlockTitle>Account</BlockTitle>*/}
      <Block>
        <p>
          <Link panelClose>Close Menu</Link><br/><br/>

          {is_logged_in() ? <><Link id="log_out_pr" onClick={() => logout()} panelClose>Log Out</Link><br/><br/></>:
            <><Link id="log_in_pr" panelClose onClick={()=> f7.views.main.router.navigate('/login/')}>Log In</Link><br/><br/>
            <Link id="sign_up_pr" panelClose popupOpen="#signup_popup">Sign Up</Link><br/><br/></>
          }
          <a className="link external"
             href="mailto:ceo@socalappsolutions.com?subject=Feedback for San Diego Events">Feedback</a>
        </p>
      </Block>
    </Page>
  )
}
