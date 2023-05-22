import React from 'react'
import {Block, Link, Navbar, Page} from 'framework7-react'

export default () => (
  <Page>
    <Navbar title="SDE Settings"></Navbar>
    {/*<BlockTitle>Account</BlockTitle>*/}
    <Block>
      <p>
        <Link panelClose>Close Menu</Link><br/><br/>
        <a className="link external" href="mailto:ceo@socalappsolutions.com?subject=Feedback for San Diego Events">Feedback</a>

      </p>
    </Block>
  </Page>
)
