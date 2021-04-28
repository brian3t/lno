import React from "react"
import {Link, Toolbar} from "framework7-react"

export default () => (
  <Toolbar position="bottom">
    <Link href="#" preventRouter onClick={() => {
      // eslint-disable-next-line no-undef
      f7router.navigate('/')
    }} text="Live" iconIos="f7:play"
          iconAurora="f7:play"
          iconMd="material:play"></Link>
    {/*<Link href="#" text="Events" iconIos="f7:envelope_fill"*/}
    {/*      iconAurora="f7:envelope_fill"*/}
    {/*      iconMd="material:email"></Link>*/}
    <Link href="#" preventRouter onClick={() => {
      // eslint-disable-next-line no-undef
      f7router.navigate('/chat/', {reloadCurrent: true})
    }} text="Chat" iconIos="f7:chat_bubble_2"
          iconAurora="f7:chat_bubble_2"
          iconMd="material:chat_bubble_2"></Link>
  </Toolbar>
  /*<div className="toolbar tabbar toolbar-bottom">
    <div className="toolbar-inner">
      <a className="link tab-link tab-link-active" href="#" data-tab="#view-today">
        <i className="icon f7-icons">envelope_fill</i><span className="">Today</span></a>
      <a className="link tab-link" href="#" data-tab="#view-arcade"><i
        className="icon f7-icons">rocket_fill</i><span className="">Arcade</span></a>
      <a className="link tab-link" href="#" data-tab="#view-eventt"><i className="icon f7-icons">rocket_fill</i><span
        className="">Events</span></a>
    </div>
  </div>*/
)
