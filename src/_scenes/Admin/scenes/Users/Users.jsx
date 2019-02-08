import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { userActions } from '../../../../_actions/user.actions'

import { UsersTable } from './UsersTable'

class Users extends Component {
  static propTypes = {
  }

  constructor(props) {
    super(props)
    this.handleDeleteUser = this.handleDeleteUser.bind(this)
  }

  componentDidMount() {
    this.props.dispatch(userActions.getAll());
  }

  handleDeleteUser(id) {
    return (e) => this.props.dispatch(userActions.delete(id));
  }

  render() {
    const { users } = this.props
    const handleDeleteUser = this.handleDeleteUser

    return (
      <div>
          <Link to='/admin/users/new'>Add new user</Link>
          <UsersTable 
            users={users}
            handleDeleteUser={handleDeleteUser}
          />
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