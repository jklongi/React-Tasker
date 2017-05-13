import React, { Component } from 'react';
import $ from "jquery";
import { Button } from 'react-bootstrap';
import Firebase from '../../Firebase';

const groupRef = Firebase.database().ref('/groups');

class Pending extends Component {
  accept(e, key){
    groupRef.child(this.props.groupId).child('members').child(this.props.user.uid).set({status: 'member'});
    groupRef.child(this.props.groupId).child('pending').child(key).remove();
  }
  decline(e, key){
    groupRef.child(this.props.groupId).child('pending').child(key).remove();
  }
  render(){
    const owner = this.props.group.members[this.props.user.uid] && this.props.group.members[this.props.user.uid].status === 'owner'
    if(this.props.group.pending){
      return(
        <div>
          <h3>Pending</h3>
          <ul>
            {$.map(this.props.group.pending, (email, key) => {
              if(this.props.user.email === email || owner){
                return (
                  <li className="user" key={key}>
                    <strong>{email}</strong>
                    {!owner ?<Button className="right" onClick={(e) => this.accept(e, key)}>Accept</Button>: null}
                    <Button className="right" onClick={(e) => this.decline(e, key)}>{owner ? 'Cancel' : 'Decline' }</Button>
                  </li>
                )
              }
            })}
          </ul>
        </div>
      )
    }
    return null;
  }
}

export default Pending;
