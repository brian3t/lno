import {Block, Button, f7, Link, ListInput, Navbar, NavRight, Page, Popup} from "framework7-react"
import {List} from 'framework7-react'
import {signup} from "@/components/Login";
import {useRef, useState} from "react";

/**
 * SignUp popup as a class
 */
export default () => {
  const [full_name, set_full_name] = useState('')
  const [username, set_username] = useState('')
  const [pw, set_pw] = useState('')
  const [email, set_email] = useState('')
  const [popupOpened, setPopupOpened] = useState(false)
  let popup_instance = useRef(null)

  return (
    <Popup id="signup_popup" className="demo-popup" opened={popupOpened} onPopupClosed={() => setPopupOpened(false)}>
      <Page>
        <Navbar title="Sign Up">
          <NavRight>
            <Link popupClose>Close</Link>
          </NavRight>
        </Navbar>
        <Block>
          <List>
            <ListInput id="full_name_su" label="Full Name" type="text" placeholder="Your full name" clearButton
                       value={full_name} onInput={(e) => set_full_name(e.target.value)}/>
            <ListInput id="username_su" label="Username" type="text" placeholder="Username" clearButton
                       value={username} onInput={(e) => set_username(e.target.value)}/>
            <ListInput id="password_su" label="Password" type="password" placeholder="Password" clearButton value={pw}
                       onInput={(e) => set_pw(e.target.value)}/>
            <ListInput id="email_su" label="Email" type="email" placeholder="Email" clearButton value={email}
                       onInput={(e) => set_email(e.target.value)}/>
            <Button className="button-outline button-small" id="sign_up_btn"
                    onClick={() => signup(full_name, username, pw, email, set_full_name, set_username, set_pw, set_email)}>Sign
              Up</Button>
          </List>
        </Block>
      </Page>
    </Popup>
  )
}
