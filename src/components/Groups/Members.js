import React, { Component } from 'react';
import $ from "jquery";
import { Button, FormGroup, FormControl, InputGroup } from 'react-bootstrap';
import Firebase from '../../Firebase';

const groupRef = Firebase.database().ref('/groups');



class Members extends Component {
  state = {
    email: ''
  }
  handleChange(e){
    this.setState({email: e.target.value})
  }
  invite(e){
    if(this.state.email){
      groupRef.child(this.props.groupId).child('pending').push(this.state.email);
      this.setState({email:''})
    }
  }
  inviteForm(){
    const owner = this.props.group.members[this.props.user.uid] && this.props.group.members[this.props.user.uid].status === 'owner'
    if(owner){
      return (
        <li key={'invite'}>
          <FormGroup>
            <InputGroup>
              <FormControl type="text" placeholder="Email" value={this.state.email} onChange={(e) => this.handleChange(e)}/>
              <InputGroup.Button>
                <Button onClick={(e) => this.invite(e)}>Invite</Button>
              </InputGroup.Button>
            </InputGroup>
          </FormGroup>
        </li>
      )
    }
    return null;
  }
  render(){
    if(this.props && this.props.group && this.props.group.members && this.props.groupId){
      return (
        <div>
          <h3>Members</h3>
          <ul>
          {$.map(this.props.group.members, (member, memberId) => {
            return (
              <li className="user" key={memberId}>
                <strong>{member.name}</strong>
                <span className="right">{member.status}</span>
              </li>
            )
          })}
          {this.inviteForm()}
          </ul>
        </div>
      )
    }
    return null;
  }
}

export default Members;
