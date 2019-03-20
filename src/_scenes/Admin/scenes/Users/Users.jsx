import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { Button, Card, CardHeader, CardBody, Table } from 'reactstrap';
import { withNamespaces } from 'react-i18next';

import { alertActions } from '../../../../_actions/alert.actions'
import { modalActions } from '../../../../_actions/modal.actions'
import { userActions } from '../../../../_actions/user.actions'

import { UsersTableRow } from './UsersTableRow'

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

  openFormModal = ({user, isEditing}) => {
    this.props.showModal({
      closeModal: this.closeModal,
      isEditing: isEditing,
      open: true,
      entity: user,
      title: 'User form',
    }, 'form')
  }

  closeModal = event => {
    this.props.hideModal()
    this.props.clearAlerts()
  }

  render() {
    const { users, t } = this.props
    const handleDeleteUser = this.handleDeleteUser
    const openFormModal = this.openFormModal

    const newUser = {
      attributes: {
        email: '',
        username: '',
        password: '',
        role: '',
        takesPart: true
      },
      type: 'user'
    }

    return (
      <div>
        <Button
          onClick={() => openFormModal({user: newUser, isEditing: false})}
        > 
          {t('admin.usersTable.addNewUser')}
        </Button>
        <Card className="card__form">
          <CardHeader tag="h2">
            {t('admin.usersTable.title')}
          </CardHeader>
          <CardBody>
            <Table responsive
              >
                <thead>
                  <tr>
                    <th>#</th>
                    <th>{t('shared.username')}</th>
                    <th>{t('shared.email')}</th>
                    <th>{t('shared.role')}</th>
                    <th>{t('shared.takesPart')}</th>
                    <th>{t('admin.usersTable.registered')}</th>
                    <th>{t('shared.action')}</th>
                  </tr>
                </thead>
                <tbody>
                  {users.items &&
                    users.items.map((user, index) =>
                    <UsersTableRow
                      handleDeleteUser={handleDeleteUser}
                      index={index}
                      key={user.id}
                      openFormModal={openFormModal}
                      user={user}
                    />
                  )}
                </tbody>
            </Table>
          </CardBody>
        </Card>
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