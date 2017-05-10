import React, { Component } from 'react';
import Firebase from '../Firebase';

class Login extends Component {
  state = {
    email: '',
    password: ''
  }
  handlePasswordChange(e){
    this.setState({password: e.target.value})
  }
  handleEmailChange(e){
    this.setState({email: e.target.value})
  }
  handleSubmit(e){
    e.preventDefault();
  }
  render() {
    return (
      <form onSubmit={(e) => this.handleSubmit(e)}>
        <label>
          Email:
          <input type="text" value={this.state.email} onChange={(e) => this.handleEmailChange(e)} />
        </label>
        <label>
          Password:
          <input type="password" value={this.state.password} onChange={(e) => this.handlePasswordChange(e)} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    )
  }
}

export default Login;
