import React, {useRef, useState} from 'react'
import {Block, Link, Navbar, Page} from 'framework7-react'
import SignUp from "@/components/SignUp"

export default () => {
  let [popupOpened, setPopupOpened] = useState(false)
  let popup_instance = useRef(null)

  const sign_up = new SignUp(popupOpened, setPopupOpened, popup_instance)
  return (
    <Page>
      <Navbar title="SDE Settings"></Navbar>
      {/*<BlockTitle>Account</BlockTitle>*/}
      <Block>
        <p>
          <Link panelClose>Close Menu</Link><br/><br/>
          <Link id="log_in_pr" panelClose>Log In</Link><br/><br/>
          <Link id="log_out_pr" panelClose>Log Out</Link><br/><br/>
          <Link id="sign_up_pr" panelClose onClick={() => sign_up.show()}>Sign Up</Link><br/><br/>
          <a className="link external"
             href="mailto:ceo@socalappsolutions.com?subject=Feedback for San Diego Events">Feedback</a>
        </p>
      </Block>
    </Page>
  )
}
