import React from 'react'
import { Table } from 'reactstrap';
import PropTypes from 'prop-types'
import { Card, CardHeader, CardBody } from 'reactstrap';
import styles from './Users.module.css'
import { UsersTableRow } from './UsersTableRow'
import { withNamespaces } from 'react-i18next';

UsersTable.propTypes = {
  users: PropTypes.object.isRequired,
  handleDeleteUser: PropTypes.func.isRequired
}

UsersTable.defaultProps = {
  users: {}
}

function UsersTable({ users, handleDeleteUser, t }) {
  return (
    <Card className="card__form">
      <CardHeader tag="h2">
        {t('admin.usersTable.title')}
      </CardHeader>
      <CardBody>
        <Table
            className={styles.table__users}
            responsive
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
                  index={index}
                  handleDeleteUser={handleDeleteUser}
                  user={user}
                />
              )}
            </tbody>
        </Table>
      </CardBody>
    </Card>
  )
}
const translatedComponent = withNamespaces()(UsersTable)
export { translatedComponent as UsersTable }