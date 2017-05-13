import React, { Component } from 'react';
import Active from './Active';
import Backlog from './Backlog';
import $ from "jquery";
import Firebase from '../../Firebase';

const groupRef = Firebase.database().ref('/groups');
const usersRef = Firebase.database().ref('/users');

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
        this.setState({group: group});
      })
    })
  }
  componentDidMount(){
    groupRef.child(this.props.match.params.groupId).on('value', (snap) => {
      this.getNames(snap.val())
    })
  }
  render() {
    return (
      <div className="container">
        <Active tasks={this.state.group.active} user={this.props.user} groupId={this.props.match.params.groupId}/>
        <Backlog tasks={this.state.group.backlog} user={this.props.user} groupId={this.props.match.params.groupId}/>
      </div>
    )
  }
}

export default Dashboard;
