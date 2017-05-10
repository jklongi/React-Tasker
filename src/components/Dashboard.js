import React, { Component } from 'react';

class Dashboard extends Component {
  state = {
    user: null
  }
  componentDidMount(){
    console.log(this.props);
  }
  render() {
    return (
      <h1>Hello form dashboard</h1>
    )
  }
}

export default Dashboard;
