import React, { Component } from 'react'
import { connect } from 'react-redux'

import { UserForm } from './';

class AddUser extends Component {
  render() {
    return (
        <>
          <UserForm />
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
