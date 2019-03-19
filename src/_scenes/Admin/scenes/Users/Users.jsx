import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withNamespaces } from 'react-i18next';

import { alertActions } from '../../../../_actions/alert.actions'
import { modalActions } from '../../../../_actions/modal.actions'
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
    this.props.getAllUsers();
  }

  handleDeleteUser(id) {
    return this.props.deleteUser(id);
  }

  render() {
    const { users, t } = this.props
    const handleDeleteUser = this.handleDeleteUser

    return (
      <div>
          <Link to='/admin/users/new'>{t('admin.usersTable.addNewUser')}</Link>
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
const mapDispatchToProps = dispatch => ({
  clearAlerts: () => dispatch(alertActions.clear()),
  deleteUser: (id) => dispatch(userActions.delete(id)),
  getAllUsers: () => dispatch(userActions.getAll()),
  hideModal: () => dispatch(modalActions.hideModal()),
  showModal: (modalProps, modalType) => {
    dispatch(modalActions.showModal(modalProps, modalType ))
  }
})

const connectedUsers = connect(mapStateToProps, mapDispatchToProps)(Users);
const translatedUsers = withNamespaces()(connectedUsers)

export { translatedUsers as Users }; 