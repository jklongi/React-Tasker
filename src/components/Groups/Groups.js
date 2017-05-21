import React, { Component } from 'react';
import $ from "jquery";
import { Accordion, Panel } from 'react-bootstrap';
import Firebase from '../../Firebase';
import Pending from './Pending';
import Members from './Members';
import Create from './Create';

const groupRef = Firebase.database().ref('/groups');
const usersRef = Firebase.database().ref('/users');

class Groups extends Component {
  state = {
    groupName: '',
    groups: {}
  }
  getNames(groups){
    $.each(groups, (groupId, group) => {
      $.each(group.members, (memberId, member) => {
        usersRef.child(memberId).once('value', (snap) => {
          groups[groupId].members[memberId].name = snap.val().name;
          this.setState({groups: groups});
        })
      })
    })
  }
  componentDidMount(){
    groupRef.on('value', (snap) => {
      const groups = snap.val();
      console.log(groups);
      this.getNames(groups);
    })
  }
  handleChange(e){
    this.setState({ groupName: e.target.value });
  }
  handleSubmit(e){
    e.preventDefault();
    const name = this.state.groupName;
    const userId = this.props.user.uid;
    if(name && userId){
      const group = groupRef.push({
        name: this.state.groupName,
      })
      groupRef.child(group.key).child('members').child(userId).set({
        status: 'owner'
      });
      this.setState({groupName: ''})
    }
  }
  render() {
    return (
      <div className={"container"}>
        <h1>Your groups</h1>
        <Accordion>
          {$.map(this.state.groups, (group, groupId) => {
            const member = group.members[this.props.user.uid];
            const pending = group.pending ? Object.values(group.pending).some((email) => {
              return email === this.props.user.email;
            }) : false;
            if(member || pending){
              return (
                <Panel header={group.name} eventKey={groupId} key={groupId}>
                  <Members group={group} groupId={groupId} user={this.props.user}/>
                  <Pending group={group} groupId={groupId} user={this.props.user}/>
                </Panel>
              )
            }
          })}
        </Accordion>
        <Create user={this.props.user} />
      </div>
    )
  }
}

export default Groups;
