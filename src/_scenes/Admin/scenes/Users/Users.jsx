import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';

import { userActions } from '../../../../_actions/user.actions'

import { UsersTable } from './UsersTable'

class Users extends Component {
  static propTypes = {
  }

  componentDidMount() {
    this.props.dispatch(userActions.getAll());
  }

  render() {
    const { users } = this.props
    return (
      <div>
        <h2>Users</h2>
        <UsersTable users={users} />
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { users } = state;
  return {
    users
  };
}

const connectedUsers = connect(mapStateToProps)(Users);
export { connectedUsers as Users }; 