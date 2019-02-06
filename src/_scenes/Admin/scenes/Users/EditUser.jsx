import React, { Component } from 'react'
import { connect } from 'react-redux'

import { UserForm } from './';

class EditUser extends Component {
  render() {
    const id = this.props.match.params.id
    return (
        <>
          <UserForm 
            isEditing={true}
            user={this.props.users.items.filter(user => user.id === id)[0]}
          />
        </>
    )
  }
}
function mapStateToProps(state) {
  return {
    ...state
  };
}
const connectedUserForm = connect(mapStateToProps)(EditUser);
export { connectedUserForm as EditUser };
