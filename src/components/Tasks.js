import React, { Component } from 'react';

class Tasks extends Component {
  componentDidMount(){
    console.log(this.props);
  }
  render() {
    return (
      <h1>Current Tasks</h1>
    )
  }
}

export default Tasks;
