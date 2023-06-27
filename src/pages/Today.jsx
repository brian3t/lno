/* eslint-disable react/jsx-one-expression-per-line */
/**
 * Today's view. Main view when startup.
 */
import React, {useEffect} from 'react';

import {Link, Navbar, NavLeft, NavRight, NavTitle, Page} from 'framework7-react'
import apis from "../jslib/rest_sc/apis"
import $ from 'jquery'
import EventCards from "@/components/EventCards"
import Tabbar from "@/components/Tabbar"
import {Menu} from "framework7-icons/react"
import ENV from "@/env";

apis.setup({url: ENV.be})
// import {events} from '../js/data';

const Today = (props) => {
  const {f7route, f7router} = props
  // const { data: randomDogImage } = useGet({
  //   // Inferred from RestfulProvider in index.js
  //   path: "breeds/image/random",
  // });
  useEffect(() => {
    ;(async function () {
    }());
    console.log(`today use effect`)
    function handleScroll() {
      console.log("scrolling");
    }
    $('#filters').hide()

    // document.getElementsByClassName('page-content').addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };

  })
  return (
    <Page>
      <Navbar>
        <NavLeft backLink="Back" backLinkShowText={false}></NavLeft>
        <NavTitle>San Diego Events</NavTitle>
        <NavRight>
          <Link className="f7-icons" panelOpen="right"><Menu></Menu></Link>
        </NavRight>
      </Navbar>
      <EventCards noCollapsedNavbar {...{f7route: f7route, f7router: f7router}}>
      </EventCards>
      <Tabbar></Tabbar>
    </Page>
  );
}

export default Today;
