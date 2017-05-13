import React, { Component } from 'react';
import $ from "jquery";
import { Col, Row } from 'react-bootstrap';

const colWidths = {
  'owner': 3,
  'description': 3
}

class Tasks extends Component {
  render() {
    return (
      <div className="bottom">
        {$.map(this.props.tasks, (task, id) => {
          return (
            <Row key={id} className="task">
              <Col xs={4} className="owner">{task.name}</Col>
              <Col xs={4} className="description">{task.description}</Col>
              <Col xs={4} className="stages"></Col>
            </Row>
          )
        })}
      </div>
    )
  }
}

export default Tasks;
