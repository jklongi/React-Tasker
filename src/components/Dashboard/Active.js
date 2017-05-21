import React, { Component } from 'react';
import Create from './Create';
import Tasks from './Tasks';

class Active extends Component {
  render() {
    return (
      <div>
        <h3>Active Tasks</h3>
        <Tasks tasks={this.props.group.active} group={this.props.group} groupId={this.props.groupId} section="active"/>
        <Create groupId={this.props.groupId} section="active" user={this.props.user}/>
      </div>
    )
  }
}

export default Active;
