import React from 'react';
import Firebase from '../Firebase';
import { Form, FormGroup, FormControl, Button, ControlLabel } from 'react-bootstrap';
import { Redirect} from 'react-router-dom'

class Login extends React.Component {
  state = {
    redirectToReferrer: false,
    email: '',
    password: ''
  }
  handlePasswordChange(e){
    this.setState({password: e.target.value})
  }
  handleEmailChange(e){
    this.setState({email: e.target.value})
  }
  login = (e) => {
    e.preventDefault();
    Firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).catch(function(error) {
      console.log(error)
    });
    this.setState({ redirectToReferrer: true })
  }
  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } }
    const { redirectToReferrer } = this.state

    if (redirectToReferrer) {
      return (
        <Redirect to={from}/>
      )
    }
    return (
      <Form onSubmit={(e) => this.login(e)} className={'container'}>
        <FormGroup>
          <ControlLabel>Email:</ControlLabel>
          <FormControl type="email" placeholder="Email" value={this.state.email} onChange={(e) => this.handleEmailChange(e)}  />
        </FormGroup>

        <FormGroup>
          <ControlLabel>Password:</ControlLabel>
          <FormControl type="password" placeholder="Password" value={this.state.password} onChange={(e) => this.handlePasswordChange(e)}/>
        </FormGroup>

        <FormGroup>
          <Button type="submit">
            Sign in
          </Button>
        </FormGroup>
      </Form>
    )
  }
}

export default Login;
