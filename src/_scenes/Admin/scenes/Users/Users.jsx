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

  render() {
    const { users, t } = this.props
    const handleDeleteUser = this.handleDeleteUser

    return (
      <div>
        <Button> 
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
                      key={user.id}
                      handleDeleteUser={handleDeleteUser}
                      index={index}
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