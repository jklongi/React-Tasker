import React, { Component } from 'react';
import Active from './Active';
import Backlog from './Backlog';
import $ from "jquery";
import Firebase from '../../Firebase';

const groupRef = Firebase.database().ref('/groups');
const usersRef = Firebase.database().ref('/users');
//const storageRef = Firebase.storage().ref('/avatars')

class Dashboard extends Component {
  state = {
    group: {}
  }
  getNames (group){
    $.each(group.members, (memberId, member) => {
      usersRef.child(memberId).once('value', (snap) => {
        group.members[memberId].name = snap.val().name;
        this.setState({group: group});
      })
    })
    $.each(group.active, (taskId, task) => {
      usersRef.child(task.owner).once('value', (snap) => {
        group.active[taskId].name = snap.val().name;
        group.active[taskId].avatar = snap.val().avatar;
        this.setState({group: group});
      })
    })
    $.each(group.backlog, (taskId, task) => {
      usersRef.child(task.owner).once('value', (snap) => {
        group.backlog[taskId].name = snap.val().name;
        group.backlog[taskId].avatar = snap.val().avatar;
        this.setState({group: group});
      })
    })
  }
  componentDidMount(){
    groupRef.child(this.props.match.params.groupId).on('value', (snap) => {
      this.getNames(snap.val())
    })
  }
  componentDidUpdate(prevProps){
    if(this.props.match.params.groupId !== prevProps.match.params.groupId){
      groupRef.child(this.props.match.params.groupId).on('value', (snap) => {
        this.getNames(snap.val())
      })
    }
  }
  render() {
    return (
      <div className="container">
        <h1>{this.state.group.name}</h1>
        <Active group={this.state.group} user={this.props.user} groupId={this.props.match.params.groupId}/>
        <Backlog group={this.state.group} user={this.props.user} groupId={this.props.match.params.groupId}/>
      </div>
    )
  }
}

export default Dashboard;
