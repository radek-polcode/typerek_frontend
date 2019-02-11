import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
import cx from 'classnames';

import { FaPencilAlt, FaTrashAlt } from 'react-icons/fa';

import styles from '../../../../App/App.css'

UsersTableRow.propTypes = {
  user: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  handleDeleteUser: PropTypes.func.isRequired
}

UsersTableRow.defaultProps = {
  user: {},
  index: 0
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
        <Link to={`/admin/users/${user.id}/edit`}>
          <FaPencilAlt className={cx(styles.table__action__icon, styles.icon__edit)} />
        </Link>
        <FaTrashAlt 
          className="table__action__icon icon__delete" 
          onClick={() => { if(window.confirm('Are you sure?')) handleDeleteUser(user.id)} }
        /> 
      </td>
    </tr>
  )
}

export { UsersTableRow }