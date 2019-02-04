import React from 'react'
import PropTypes from 'prop-types'

UsersTableRow.propTypes = {
  users: PropTypes.object.isRequired
}

UsersTableRow.defaultProps = {
  users: {}
}

function UsersTableRow({ user, index, handleDeleteUser }) {
  return (
    <tr>
      <td>
        {index + 1}
      </td>
      <td>
        {user.attributes.username}
      </td>
      <td>
        {user.attributes.email}
      </td>
      <td>
        {user.attributes.role}
      </td>
      <td>
        {user.attributes.take_part.toString()}
      </td>
      <td>
        {user.attributes.created_at}
      </td>
      <td>
        <button onClick={handleDeleteUser(user.id)}>
          Delete 
        </button>
      </td>
    </tr>
  )
}

export { UsersTableRow }