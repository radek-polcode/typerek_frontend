import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { Button, Card, CardHeader, CardBody, Table } from 'reactstrap';
import { withNamespaces } from 'react-i18next';

import { alertActions } from '../../../../_actions/alert.actions'
import { modalActions } from '../../../../_actions/modal.actions'
import { userActions } from '../../../../_actions/user.actions'

import { TableBody } from '../../../../_components/Tables/TableBody';
import { TableHeadings } from '../../../../_components/Tables'

class Users extends Component {
  static propTypes = {
    clearAlerts: PropTypes.func.isRequired,
    deleteUser: PropTypes.func.isRequired,
    getAllUsers:PropTypes.func.isRequired,
    getAllTeams: PropTypes.func.isRequired,
    hideModal: PropTypes.func.isRequired,
    showModal: PropTypes.func.isRequired,
    users: PropTypes.object,
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

  closeModal = event => {
    this.props.hideModal()
    this.props.clearAlerts()
  }

  render() {
    const { showModal, t, users } = this.props
    const closeModal = this.closeModal
    const handleDeleteUser = this.handleDeleteUser
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
    const tableHeadingNames = [
      '#',
      t('shared.username'),
      t('shared.email'),
      t('shared.role'),
      t('shared.takesPart'),
      t('admin.usersTable.registered'),
      t('shared.action')
    ]

    return (
      <div>
        <Button
          onClick={() =>
            showModal(
              {
                closeModal: closeModal,
                item: newUser, 
                isEditing: false,
                open: true,
                title: 'User form'
              },
              'form'
            )
          }
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
              <TableHeadings 
                tableHeadingNames={tableHeadingNames}
              />
                <TableBody
                  closeModal={closeModal}
                  handleDeleteItem={handleDeleteUser}
                  items={users.items}
                  showModal={showModal}
                  title={'User form'}
                />
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