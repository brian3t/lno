import $ from 'jquery'
import Apis from "@/jslib/rest_sc/apis";
import {f7} from "framework7-react";
import store from "store2";
import EventBus from "@/jslib/EventBus";
import apis from "@/jslib/rest_sc/apis";

export function loginUtil() {
  console.log(`logging in..`)
}

export async function signup(full_name, username, pw, email, set_full_name, set_username, set_pw, set_email, toast, setPopupOpened) {
  console.log(`signing up..`)
  const [signup_status, signup_res] = await Apis.c('user/signup', {username, password: pw, email})
  if (!signup_status) {
    toast = f7.toast.create({
      text: 'Error signing up ' + signup_res.toString(),
      position: 'center',
      closeTimeout: 2000,
    })
    toast.current?.open()
    alert('Error signing up ' + signup_res.toString())
    return
  }

  alert('Signup successful. Please check your mailbox for confirmation email. Thank you')
  setPopupOpened(false)
}

export async function logout() {
  store.remove('username')
  store.remove('pw')
  store.remove('userid')
  f7.toast.create({
    text: 'Logged out successfully',
    position: 'top',
    closeTimeout: 2000,
  }).open()
  EventBus.dispatch('login_state_changed', false)
  window.location.reload();
}

export async function close_account() {
  const [res, msg] = await apis.c('user/del', {}, {pw: store('pw')})
  if (res == true) {
    f7.toast.create({
      text: 'Your account is now deleted',
      position: 'top',
      closeTimeout: 2000,
    }).open()
    store.remove('username')
    store.remove('pw')
    store.remove('userid')
    EventBus.dispatch('login_state_changed', false)
    setTimeout(() => {
      window.location.reload()
    }, 3000);
  }
}
