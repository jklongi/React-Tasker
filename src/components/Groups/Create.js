import React, { Component } from 'react';
import { Button, FormGroup, FormControl, InputGroup } from 'react-bootstrap';
import Firebase from '../../Firebase';

const groupRef = Firebase.database().ref('/groups');

class Create extends Component {
  state = {
    groupName: ''
  }
  handleChange(e){
    this.setState({ groupName: e.target.value });
  }
  handleSubmit(e){
    e.preventDefault();
    const name = this.state.groupName;
    const userId = this.props.user.uid;
    if(name && userId){
      const group = groupRef.push({
        name: this.state.groupName,
      })
      groupRef.child(group.key).child('members').child(userId).set({status: 'owner'});
      this.setState({groupName: ''})
    }
  }
  render() {
    return (
      <div>
        <h1>Create a group</h1>
        <FormGroup>
          <InputGroup>
            <FormControl type="text" value={this.state.groupName} placeholder="Group Name" onChange={(e) => this.handleChange(e)} />
            <InputGroup.Button>
              <Button onClick={(e) => this.handleSubmit(e)}>Create</Button>
            </InputGroup.Button>
          </InputGroup>
        </FormGroup>
      </div>
    )
  }
}

export default Create;
