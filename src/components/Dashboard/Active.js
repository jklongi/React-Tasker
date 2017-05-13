import React, { Component } from 'react';
import Firebase from '../../Firebase';
import Create from './Create';
import Tasks from './Tasks';


const groupRef = Firebase.database().ref('/groups');

class Active extends Component {
  render() {
    return (
      <div>
        <h1>Active Tasks</h1>
        <Tasks tasks={this.props.tasks}/>
        <Create groupId={this.props.groupId} section="active" user={this.props.user}/>
      </div>
    )
  }
}

export default Active;
