import React, { Component } from 'react';

class Profile extends Component {
  componentDidMount(){
    console.log(this.props);
  }
  render() {
    return (
      <h1>Hello form dashboard</h1>
    )
  }
}

export default Profile;
