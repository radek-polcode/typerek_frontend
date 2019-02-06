import React, { Component } from 'react'
import { connect } from 'react-redux'

import { UserForm } from './';

class AddUser extends Component {
  render() {
    const user = {
      attributes: {
        email: '',
        username: '',
        role: 'registered',
        takesPart: true
      }
    }
    return (
        <>
          <UserForm 
            isEditing={false}
            user={user}
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
const connectedUserForm = connect(mapStateToProps)(AddUser);
export { connectedUserForm as AddUser };
