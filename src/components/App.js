import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, withRouter, Redirect, Link } from 'react-router-dom'
import Firebase from '../Firebase';
import Dashboard from './Dashboard';
import Home from './Home';
import '../styles/App.css';

class App extends Component {
  componentDidMount(){
    Firebase.auth().onAuthStateChanged(function(user){
      if(user){
        fakeAuth.isAuthenticated = true
      } else {
        fakeAuth.isAuthenticated = false
      }
      this.forceUpdate();
    }.bind(this))
  }
  render(){
    console.log(fakeAuth.isAuthenticated);
    return(
      <BrowserRouter>
        <div>
          <ul className={"nav"}>
            <li><AuthButton/></li>
            <li><Link to="/">Public Page</Link></li>
            <li><Link to="/dashboard">Protected Page</Link></li>
          </ul>
          <Route exact path="/" component={Home}/>
          <Route path="/login" component={Login}/>
          <PrivateRoute path="/dashboard" component={Dashboard}/>
        </div>
      </BrowserRouter>
    )
  }
}

const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    Firebase.auth().onAuthStateChanged(function(user){
      if(user){
        console.log(user);
        this.isAuthenticated = true
      } else {
        this.isAuthenticated = false
      }
      cb();
    }.bind(this))
  },
  signout() {
    this.isAuthenticated = false
  }
}

const AuthButton = withRouter(({ history }) => (
  fakeAuth.isAuthenticated ? (
    <Link to="/" onClick={() => {
      fakeAuth.signout()
    }}>Logout</Link>
  ) : (
    <Link to="/login">Login</Link>
  )
))

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    fakeAuth.isAuthenticated ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }}/>
    )
  )}/>
)

const Public = () => <h3>Public</h3>
const Protected = () => <h3>Protected</h3>

class Login extends React.Component {
  state = {
    redirectToReferrer: false
  }

  login = () => {
    fakeAuth.authenticate(() => {
      this.setState({ redirectToReferrer: true })
    })
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
      <div>
        <p>You must log in to view the page at {from.pathname}</p>
        <button onClick={this.login}>Log in</button>
      </div>
    )
  }
}

export default App
