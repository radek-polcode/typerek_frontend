import React from 'react'
import PropTypes from 'prop-types'

import { UsersTableRow } from './UsersTableRow'

UsersTableBody.propTypes = {
  users: PropTypes.object.isRequired,
  handleDeleteUser: PropTypes.func.isRequired
}

UsersTableBody.defaultProps = {
  users: {}
}

function UsersTableBody({ users, handleDeleteUser }) {
  return (
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
  )
}

export { UsersTableBody }