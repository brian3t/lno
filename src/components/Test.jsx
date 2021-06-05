import React, {Component} from 'react'
import {App, Button, f7, Link, List, ListItem, Navbar, NavRight, NavTitle, Page} from "framework7-react"

export default class HomePage extends Component {
  state = {
    tasks: [{name: 'a'}, {name: 'task b'}, {name: 'task c'}]
  }
  #_privy = 2

  componentDidMount(){
  }

  onPageBeforeIn = () => {
    alert('aaaa')
    f7.dialog.confirm('before in')
    super.onPageBeforeIn()
  }

  asdf = () => {
    // alert('asdf')
    console.log(`asdf called`)
    /*f7.dialog.prompt('Task Name:', 'Add Task', (name) => {
      }
    )*/
  }

  render = () => (
    <App>
      <Page onPageAfterIn={() => console.log(`page after in`)} onPageMounted={() => console.log(`page mounted`)}
            PageInit={this.asdf}
      >
        <Navbar>
          <NavTitle>To Do List</NavTitle>
          <NavRight>
            <Link iconOnly iconF7="add_round_fill" />
          </NavRight>
        </Navbar>
        <div className="list w-full">
          <ul>
            <li className="item-content item-input">
              <div className="item-inner">
                <div className="item-title item-label">Location:</div>
                <div className="item-input-wrap">
                  <div><input id="center_loc" type="text" placeholder="Enter street address or city, state" className="has_inline_btn" /><input type="hidden" id="center_lat" name="center_lat" />
                    <input type="hidden" id="center_lng" name="center_lng" />
                    <i className="f7-icons btn" onClick={() => console.warn(`icon clicked`)}>location</i>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <input type="text" className="has_inline_btn" placeholder="input here" />
        <List simple-list>
          {this.state.tasks.map((task, i) => (
            <ListItem title={task.name} key={i}>
              <Button onClick={this.asdf}>click me to launch asdf</Button>
            </ListItem>
          ))}
        </List>
      </Page>
    </App>
  );
}
