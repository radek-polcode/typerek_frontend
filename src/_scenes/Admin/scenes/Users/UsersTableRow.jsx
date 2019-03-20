import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames';
import { FaPencilAlt, FaTrashAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { withNamespaces } from 'react-i18next';

import styles from '../../../../App/App.css'

UsersTableRow.propTypes = {
  index: PropTypes.number.isRequired,
  handleDeleteUser: PropTypes.func.isRequired,
  openFormModal: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
}

UsersTableRow.defaultProps = {
  user: {},
  index: 0
}

function UsersTableRow({
  user, 
  index, 
  handleDeleteUser, 
  openFormModal,
  t 
}) {
  const { 
    created_at,
    email,
    role,
    take_part,
    username,
  } = user.attributes
  return (
    <tr>
      <td>
        {index + 1}
      </td>
      <td>
        {username}
      </td>
      <td>
        {email}
      </td>
      <td>
        {role}
      </td>
      <td>
        {take_part.toString()}
      </td>
      <td>
        {created_at}
      </td>
      <td>
        <FaPencilAlt 
            className="table__action__icon icon__edit"
            onClick={() => openFormModal({user, isEditing: true})}
          />
          <FaTrashAlt 
            className="table__action__icon icon__delete"
            onClick={() => { if(window.confirm(t('admin.userForm.confirmationMessage'))) handleDeleteUser(user.id)} }
          /> 
      </td>
    </tr>
  )
}
const translatedComponent = withNamespaces()(UsersTableRow);

export { translatedComponent as UsersTableRow }