import $ from 'jquery'
import Apis from "@/jslib/rest_sc/apis";
import {f7} from "framework7-react";

export function login() {
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
