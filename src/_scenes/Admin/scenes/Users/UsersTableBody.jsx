import React from 'react'
import PropTypes from 'prop-types'

import { UsersTableRow } from './UsersTableRow'

UsersTableBody.propTypes = {
  users: PropTypes.object.isRequired
}

UsersTableBody.defaultProps = {
  users: {}
}

function UsersTableBody({ users }) {
  return (
    <tbody>
      {users.items &&
        users.items.map((user, index) =>
        <UsersTableRow
          key={user.id}
          index={index} 
          user={user} 
        />
      )}
    </tbody>
  )
}

export { UsersTableBody }