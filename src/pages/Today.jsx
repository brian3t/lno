/* eslint-disable react/jsx-one-expression-per-line */
/**
 * Today's view. Main view when startup.
 */
import React, {useEffect} from 'react';

import {Link, Navbar, NavLeft, NavRight, NavTitle, Page} from 'framework7-react'
import './Today.less';
import EventCards from '../components/EventCards';
import Tabbar from "../components/Tabbar"
import apis from "../jslib/rest_sc/apis"

apis.setup({url: 'http://api.lnoapi/v1/'})
// import {events} from '../js/data';

const Today = (props) => {
  const {f7route, f7router} = props
  // const { data: randomDogImage } = useGet({
  //   // Inferred from RestfulProvider in index.js
  //   path: "breeds/image/random",
  // });
  useEffect(() => {
    ;(async function () {
      const output = await apis.test('input')
      console.log(`output `, output)
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
          <Link className="f7-icons" panelOpen="right">bars</Link>
        </NavRight>
      </Navbar>
      <EventCards noCollapsedNavbar {...{f7route: f7route, f7router: f7router}}>
      </EventCards>
      <Tabbar></Tabbar>
    </Page>
  );
}

export default Today;
