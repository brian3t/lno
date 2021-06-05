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

        <input type="text" className="has_inline_btn" placeholder="input here" />
        <button type="button" className="inline_btn" />
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
