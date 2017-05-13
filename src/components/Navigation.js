import React, { Component } from 'react';
import Firebase from '../Firebase';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { BrowserRouter, Route, withRouter, Redirect, Link } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap';
import $ from "jquery";

const groupRef = Firebase.database().ref('/groups');

class Navigation extends Component {
  state = {
    groups: {}
  }
  componentDidMount(){
    groupRef.on('value', (snap) => {
      this.setState({groups: snap.val()})
    })
  }
  render() {
    return (
      <Navbar inverse collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">Tasker</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <NavDropdown eventKey={2} title="Dashboard" id="basic-nav-dropdown">
              {$.map(this.state.groups, (group, id) => {
                if(this.props.user && group.members[this.props.user.uid]){
                  return (
                    <LinkContainer to={"/dashboard/"+id} key={id}>
                      <MenuItem eventKey={id} >{group.name}</MenuItem>
                    </LinkContainer>
                  )
                }
              })}
            </NavDropdown>
            <LinkContainer to="/groups">
              <NavItem eventKey={1}>Groups</NavItem>
            </LinkContainer>
          </Nav>
          <Nav pullRight>
            <RegisterButton user={this.props.user}/>
            <LoginButton user={this.props.user}/>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}

const RegisterButton = (props) => {
  return props.user ? null : (
    <LinkContainer to="/register">
      <NavItem eventKey={3}>Register</NavItem>
    </LinkContainer>
  )
}

const LoginButton = (props) => {
  return props.user ? (
    <LinkContainer to="/" onClick={() => {Firebase.auth().signOut()}}>
      <NavItem eventKey={4}>Logout</NavItem>
    </LinkContainer>
  ) : (
    <LinkContainer to="/login">
      <NavItem eventKey={4}>Login</NavItem>
    </LinkContainer>
  )
}

export default Navigation;

/*
div className={"nav"}>
  <ul className={"nav-main"}>
    <li className={"logo"}><Link to="/">Tasker</Link></li>
    <li><Link to="/dashboard">Dashboard</Link></li>
  </ul>
  <ul className={"nav-right"}>
    <li><Link to="/groups">Groups</Link></li>
    <li><RegisterButton/></li>
    <li><AuthButton/></li>
  </ul>
</div>*/
