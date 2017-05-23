import React, { Component } from 'react';

class Home extends Component {
  render() {
    return (
      <div className="center">
        <h1>Tasker</h1>
        <div className="slogan">
          <div className="label-container">
            <span className="glyphicon glyphicon-briefcase"></span>
            <div>Organized</div>
          </div>
          <div className="label-container">
            <span className="glyphicon glyphicon-fire"></span>
            <div>Fast</div>
          </div>
          <div className="label-container">
            <span className="glyphicon glyphicon-usd"></span>
            <div>Free</div>
          </div>
        </div>
        <h3>Easy task management system</h3>
      </div>
    )
  }
}

export default Home;
