import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect} from 'react-router-dom'
import Firebase from '../Firebase';
import Dashboard from './Dashboard/Dashboard';
import Register from './Register';
import Login from './Login';
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
