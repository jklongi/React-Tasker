import React, { Component } from 'react';
import { BrowserRouter, Route, withRouter, Redirect, Link } from 'react-router-dom'
import Firebase from '../Firebase';
import Dashboard from './Dashboard/Dashboard';
import Register from './Register';
import Navigation from './Navigation';
import Groups from './Groups/Groups';
import Home from './Home';
import '../styles/App.css';

const auth = {
  isAuthenticated: false,
  authenticate(cb) {
    Firebase.auth().onAuthStateChanged(function(user){
      if(user){
        this.isAuthenticated = true
      } else {
        this.isAuthenticated = false
      }
      cb();
    }.bind(this))
  },
  signout() {
    this.isAuthenticated = false
    Firebase.auth().signOut();
  }
}

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
      <form onSubmit={(e) => this.login(e)}>
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


class App extends Component {
  state = {
    user: null
  }
  componentDidMount(){
    Firebase.auth().onAuthStateChanged(function(user){
      if(user){
        auth.isAuthenticated = true
        this.setState({user: user})
      } else {
        auth.isAuthenticated = false
        this.setState({user: null})
      }
      this.forceUpdate();
    }.bind(this))
  }
  render(){
    return(
      <BrowserRouter>
        <div>
          <Navigation user={this.state.user}/>
          <div className={"main-container"}>
            <Route exact path="/" component={Home}/>
            <Route path="/login" component={Login}/>
            <Route path="/register" component={Register}/>
            <PrivateRoute user={this.state.user} path="/dashboard/:groupId" component={Dashboard}/>
            <PrivateRoute user={this.state.user} path="/groups" component={Groups}/>
          </div>
        </div>
      </BrowserRouter>
    )
  }
}

const AuthButton = withRouter(({ history }) => (
  auth.isAuthenticated ? (
    <Link to="/" onClick={() => {
      auth.signout()
    }}>Logout</Link>
  ) : (
    <Link to="/login">Login</Link>
  )
))

const RegisterButton = withRouter(({ history }) => (
  auth.isAuthenticated ? null : <Link to="/register">Register</Link>
))

const PrivateRoute = ({ component: Component, user, ...rest }) => (
  <Route {...rest} render={props => (
    auth.isAuthenticated ? (
      <Component user={user} {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }}/>
    )
  )}/>
)


export default App
