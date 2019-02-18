import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames';
import { FaPencilAlt, FaTrashAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { withNamespaces } from 'react-i18next';

import styles from '../../../../App/App.css'

TeamsTableRow.propTypes = {
  team: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  handleDeleteTeam: PropTypes.func.isRequired
}

TeamsTableRow.defaultProps = {
  team: {},
  index: 0
}

function TeamsTableRow({ team, handleDeleteTeam, index, t }) {
  const { 
    abbreviation,
    flag,
    name,
    name_en,
    photo
  } = team.attributes

  return (
    <tr>
      <td>
        {index + 1}
      </td>
      <td>
        {name}
      </td>
      <td>
        {name_en}
      </td>
      <td>
        {abbreviation}
      </td>
      <td>
        {flag}
      </td>
      <td>
        {photo.url}
      </td>
      <td>
        <Link to={`/admin/teams/${team.id}/edit`}>
          <FaPencilAlt className={cx(styles.table__action__icon, styles.icon__edit)} />
        </Link>
        <FaTrashAlt 
          className="table__action__icon icon__delete"
          onClick={() => { if(window.confirm(t('admin.teamForm.confirmationMessage'))) handleDeleteTeam(team.id)} }
        /> 
      </td>
    </tr>
  )
}
const translatedComponent = withNamespaces()(TeamsTableRow);

export { translatedComponent as TeamsTableRow }