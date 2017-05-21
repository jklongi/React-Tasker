import React, { Component } from 'react';
import Create from './Create';
import Tasks from './Tasks';

class Backlog extends Component {
  render() {
    return (
      <div>
        <h3>Backlog</h3>
        <Tasks tasks={this.props.group.backlog} group={this.props.group} groupId={this.props.groupId} section="backlog"/>
        <Create groupId={this.props.groupId} section="backlog" user={this.props.user}/>
      </div>
    )
  }
}

export default Backlog;
