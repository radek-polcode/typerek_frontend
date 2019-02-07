import React from 'react'
import { Table } from 'reactstrap';
import PropTypes from 'prop-types'

import styles from './Users.module.css'
import { UsersTableRow } from './UsersTableRow'

UsersTable.propTypes = {
  users: PropTypes.object.isRequired,
  handleDeleteUser: PropTypes.func.isRequired
}

UsersTable.defaultProps = {
  users: {}
}

function UsersTable({ users, handleDeleteUser }) {
  return (
    <Table 
      className={styles.table__users}
      dark
    >
      <thead>
        <tr>
          <th>#</th>
          <th>Username</th>
          <th>Email</th>
          <th>Role</th>
          <th>Takes part</th>
          <th>Registered</th>
          <th>Action</th>
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
  )
}

export { UsersTable }