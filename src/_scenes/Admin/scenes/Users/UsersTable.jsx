import React from 'react'
import { Table } from 'reactstrap';
import PropTypes from 'prop-types'

import styles from './Users.module.css'
import { UsersTableHeadings } from './UsersTableHeadings'
import { UsersTableBody } from './UsersTableBody'

UsersTable.propTypes = {
  users: PropTypes.object.isRequired
}

UsersTable.defaultProps = {
  users: {}
}

function UsersTable({ users }) {
  return (
    <Table 
      className={styles.table__users}
      dark
    >
      <UsersTableHeadings />
      <UsersTableBody users={users} />
    </Table>
  )
}

export { UsersTable }