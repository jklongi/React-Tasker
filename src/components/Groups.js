import React, { Component } from 'react';
import $ from "jquery";
import { Button, FormGroup, ControlLabel, FormControl, InputGroup } from 'react-bootstrap';
import Firebase from '../Firebase';

const groupRef = Firebase.database().ref('/groups');

class Groups extends Component {
  state = {
    groupName: '',
    groups: {}
  }
  componentDidMount(){
    groupRef.on('value', (snap) => {
      this.setState({groups: snap.val()})
    })
  }
  handleChange(e){
    this.setState({ groupName: e.target.value });
  }
  handleSubmit(e){
    e.preventDefault();
    const name = this.state.groupName;
    const userId = this.props.user.uid;
    const userName = this.props.user.displayName;
    if(name && userId && userName){
      const group = groupRef.push({
        name: this.state.groupName,
      })
      groupRef.child(group.key).child('members').child(userId).set({
        status: 'owner',
        userName: userName
      });
      this.setState({groupName: ''})
    }
  }
  render() {

    return (
      <div className={"container"}>
        <h1>Your groups</h1>
        <div>
          {$.map(this.state.groups, (group, groupId) => {
            const member = group.members[this.props.user.uid];
            const pending = group.pending ? Object.values(group.pending).some((email) => {
              return email === this.props.user.email;
            }) : false;
            console.log(member, pending, group);
            if(member || pending){
              return (
                <div key={groupId}>
                  <h1>{group.name}</h1>
                  <Members members={group.members} group={groupId} user={this.props.user}/>
                  <Pending pending={group.pending} group={groupId} user={this.props.user}/>
                </div>
              )
            }
          })}
        </div>
        <h1>Create a group</h1>
        <form onSubmit={(e) => this.handleSubmit(e)}>
          <FormGroup>
            <FormControl type="text" value={this.state.groupName} placeholder="Group Name" onChange={(e) => this.handleChange(e)} />
          </FormGroup>
          <Button type="submit">
            Create
          </Button>
        </form>
      </div>
    )
  }
}

class Pending extends Component {
  accept(e){
    groupRef.child(this.props.group).child('members').child(this.props.user.uid).set({
      status: 'member',
      userName: this.props.user.displayName
    });
  }
  decline(e, key){
    groupRef.child(this.props.group).child('pending').child(key).remove();
  }
  render(){
    console.log(this.props);
    if(this.props.pending){
      return(
        <div>
          <h3>Pending</h3>
          <ul>
            {$.map(this.props.pending, (email, key) => {
              if(this.props.user.email == email){
                return (
                  <li key={key}>
                    {email}
                    <Button onClick={(e) => this.accept(e)}>Accept</Button>
                    <Button onClick={(e) => this.decline(e, key)}>Decline</Button>
                  </li>
                )
              }
            })}
          </ul>
        </div>
      )
    }
    return null;
  }
}

class Members extends Component {
  state = {
    email: ''
  }
  handleChange(e){
    this.setState({email: e.target.value})
  }
  invite(e){
    groupRef.child(this.props.group).child('pending').push(this.state.email);
    this.setState({email:''})
  }
  inviteForm(){
    const owner = this.props.members[this.props.user.uid] && this.props.members[this.props.user.id].status == 'owner'
    if(owner){
      return (
        <li key={'invite'}>
          <FormGroup>
            <InputGroup>
              <FormControl type="text" placeholder="Email" onChange={(e) => this.handleChange(e)}/>
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
    if(this.props && this.props.members && this.props.group){
      return (
        <div>
          <h3>Members</h3>
          <ul>
          {$.map(this.props.members, (member, memberId) => {
            return <li key={memberId}>{member.userName} {member.status}</li>
          })}
          {this.inviteForm()}
          </ul>
        </div>
      )
    }
    return null;
  }
}

export default Groups;
