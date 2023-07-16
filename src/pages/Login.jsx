import {
  Page,
  LoginScreenTitle,
  List,
  ListInput,
  ListButton,
  BlockFooter,
  f7, Navbar, Link,
} from 'framework7-react';
import EventBus from "@/jslib/EventBus";
import React, {useRef, useState} from 'react';
import Blk from "@/jslib/react17/parent_call_child/components/Blk";
import apis from "@/jslib/rest_sc/apis"
import ENV from "@/env";
import _ from "lodash";
import store from "store2";

apis.setup(ENV)

export default ({f7router}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('')
  const toastTop = useRef(null)

  const signIn = async () => {
    const [signin_status, signin_res] = await apis.c('user/signin', {username}, {pw: password})
    if (!signin_status) {
      alert(`Error logging in: ` + signin_res.toString())
      return false
    }
    const {id} = signin_res
    if (!_.isInteger(id)) {
      alert(`Error logging in, missing user id ` + id)
      return false
    }
    store('username', username)
    store('pw', password)
    store('userid', id)
    store('prof_name', signin_res.prof_name)
    f7.toast.create({
      text: 'Logged in successfully',
      position: 'top',
      closeTimeout: 2000,
    }).open()
    EventBus.dispatch('login_state_changed', true)
    f7.views.main.router.navigate('/')
    return true
  };
  return (
    <Page noToolbar loginScreen>
      <Navbar title="Sign In To SDE" backLink>
        {/*<Link back>Back</Link>*/}
      </Navbar>
      {/*<LoginScreenTitle>Sign In to SDE</LoginScreenTitle>*/}
      <List form>
        <ListInput
          label="Username"
          type="text"
          placeholder="Your username"
          value={username}
          onInput={(e) => {
            setUsername(e.target.value);
          }}
        />
        <ListInput
          label="Password"
          type="password"
          placeholder="Your password"
          value={password}
          onInput={(e) => {
            setPassword(e.target.value);
          }}
        />
      </List>
      <List inset>
        <ListButton onClick={signIn}>Sign In</ListButton>
        <BlockFooter>
          If you encounter problems logging in; please <Link external href='mailto:ceo@socalappsolutions.com'>contact
          us</Link>
        </BlockFooter>
      </List>
    </Page>
  );
}
