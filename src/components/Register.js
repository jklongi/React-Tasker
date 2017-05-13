import React, { Component } from 'react';
import Firebase from '../Firebase';
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

const storageRef = Firebase.storage().ref('avatars')
const usersRef = Firebase.database().ref('users')
const defaultAvatar = "https://firebasestorage.googleapis.com/v0/b/reacttasker.appspot.com/o/84c1e40ea0e759e3f1505eb1788ddf3c_default_photo.png?alt=media&token=32166656-3fb2-4a41-be7b-d29765341788"

class Register extends Component {
  state = {
    email: '',
    password: '',
    passwordConfirmation: '',
    name: '',
    file: ''
  }
  handlePasswordChange(e){
    this.setState({password: e.target.value})
  }
  handlePasswordConfirmationChange(e){
    this.setState({passwordConfirmation: e.target.value})
  }
  handleEmailChange(e){
    this.setState({email: e.target.value})
  }
  handleNameChange(e){
    this.setState({name: e.target.value})
  }
  handleFileChange(e){
    if(e.target.files[0]){
      this.setState({file: e.target.files[0]})
    }
  }
  handleSubmit(e){
    e.preventDefault();
    if(this.state.email && this.state.name && this.state.password && this.state.password === this.state.passwordConfirmation){
      Firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then(user => {
        if(this.state.file){
          const fileUpload = storageRef.child(user.uid).put(this.state.file)
          fileUpload.on('state_changed', (snap) => {
            console.log('Progress', snap.bytesTransferred, '/', snap.totalBytes)
          }, (err) => {
            console.log(err)
          }, () => {
            usersRef.child(user.uid).set({name: this.state.name})
            this.setState({file: '', name: '', password: '', passwordConfirmation:'', email:''})
          })
        } else {
          usersRef.child(user.uid).set({name: this.state.name})
          this.setState({file: '', name: '', password: '', passwordConfirmation:'', email:''})
        }
      })

    }
  }
  render() {
    return (
      <form onSubmit={(e) => this.handleSubmit(e)} className={'container'}>

        <FormGroup controlId="email">
          <ControlLabel>Email:</ControlLabel>
          <FormControl type="text" value={this.state.email} onChange={(e) => this.handleEmailChange(e)} />
        </FormGroup>

        <FormGroup controlId="name">
          <ControlLabel>Name:</ControlLabel>
          <FormControl type="text" value={this.state.name} onChange={(e) => this.handleNameChange(e)} />
        </FormGroup>

        <FormGroup controlId="password">
          <ControlLabel>Password:</ControlLabel>
          <FormControl type="password" value={this.state.password} onChange={(e) => this.handlePasswordChange(e)} />
        </FormGroup>

        <FormGroup controlId="passwordConfirmation">
          <ControlLabel>Password confirmation:</ControlLabel>
          <FormControl type="password" value={this.state.passwordConfirmation} onChange={(e) => this.handlePasswordConfirmationChange(e)} />
        </FormGroup>

        <FormGroup controlId="file">
          <ControlLabel>Avatar:</ControlLabel>
          <FormControl type="file" onChange={(e) => this.handleFileChange(e)} />
        </FormGroup>

        <input type="submit" value="Submit" />
      </form>
    )
  }
}

export default Register;
