import React, { Component } from 'react';
import Firebase from '../../Firebase';
import Moment from 'moment';
import { FormGroup, InputGroup, FormControl, Button, Glyphicon } from 'react-bootstrap';

const groupRef = Firebase.database().ref('/groups');

class Backlog extends Component {
  state = {
    task: ''
  }
  handleChange(e){
    this.setState({task: e.target.value})
  }
  handleSubmit(e){
    if(this.state.task){
      groupRef.child(this.props.groupId).child(this.props.section).push({
        description: this.state.task,
        creator: this.props.user.uid,
        owner: this.props.user.uid,
        created: Moment().unix(),
        stages: {
          design: '',
          development: '',
          testing: ''
        }
      })
      this.setState({task:''});
    }
  }
  handleKeyUp(e){
    if(e.keyCode === 13){
      this.handleSubmit(e)
    }
  }
  render() {
    return (
      <div>
        <FormGroup>
          <InputGroup>
            <FormControl type="text" onKeyUp={(e) => this.handleKeyUp(e)} value={this.state.task} placeholder="What needs to be done?" onChange={(e) => this.handleChange(e)} />
            <InputGroup.Button>
              <Button onClick={(e) => this.handleSubmit(e)}>
                <Glyphicon glyph="plus"/>
              </Button>
            </InputGroup.Button>
          </InputGroup>
        </FormGroup>
      </div>
    )
  }
}

export default Backlog;
