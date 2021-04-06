import React from 'react'
import {Block, BlockTitle, Link, Navbar, Page} from 'framework7-react'

export default () => (
  <Page>
    <Navbar title="Right Panel"></Navbar>
    <BlockTitle>Left Panel</BlockTitle>
    <Block>
      <p>
        -- --
        <Link panelClose>close</Link>. LNO Settings
      </p>
    </Block>
  </Page>
)
