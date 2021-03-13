/* eslint-disable no-var */
import React from 'react'

class CustomForm extends React.Component {
  constructor(){
    super();
    this.state = {
      person: {
        firstName: '',
        lastName: ''
      }
    }
  }

  handleChange(event){
    let person = this.state.person;
    person[event.target.name] = event.target.value;
    this.setState({person});
  }

  render(){
    return (
      <form>
        <input
          type="text"
          name="firstName"
          value={this.state.firstName}
          onChange={this.handleChange.bind(this)} />
        <input
          type="text"
          name="lastName"
          value={this.state.lastName}
          onChange={this.handleChange.bind(this)} />
      </form>
    )
  }
}

export default CustomForm
