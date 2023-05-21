import React from 'react'
import {Block, BlockTitle, Link, Navbar, Page} from 'framework7-react'

export default () => (
  <Page>
    <Navbar title="SDE Settings"></Navbar>
    <BlockTitle>Account</BlockTitle>
    <Block>
      <p>
        <Link panelClose>Close</Link>
        <Link >Login</Link>

      </p>
    </Block>
  </Page>
)
