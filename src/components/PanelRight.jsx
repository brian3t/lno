import React, {useRef, useState} from 'react'
import {Block, Button, Link, Navbar, Page} from 'framework7-react'

export default (props) => {
  return (
    <Page>
      <Navbar title="SDE Settings"></Navbar>
      {/*<BlockTitle>Account</BlockTitle>*/}
      <Block>
        <p>
          <Link panelClose>Close Menu</Link><br/><br/>
          <Link id="log_in_pr" panelClose>Log In</Link><br/><br/>
          <Link id="log_out_pr" panelClose>Log Out</Link><br/><br/>
          <Link id="sign_up_pr" panelClose popupOpen="#signup_popup">Sign Up</Link><br/><br/>
          <a className="link external"
             href="mailto:ceo@socalappsolutions.com?subject=Feedback for San Diego Events">Feedback</a>
        </p>
      </Block>
    </Page>
  )
}
