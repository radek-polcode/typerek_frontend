import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';

import { userActions } from '../../../../_actions/user.actions'

class Users extends Component {
  static propTypes = {
  }

  componentDidMount() {
    let users = this.props.dispatch(userActions.getAll());
    console.log(users)
  }

  render() {
    return (
      <div>
        <h2>Users</h2>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {};
}

const connectedUsers = connect(mapStateToProps)(Users);
export { connectedUsers as Users }; 