import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames';
import { FaPencilAlt, FaTrashAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { withNamespaces } from 'react-i18next';
import Flag from "react-flags"

import styles from '../../../../App/App.css'
import { listPosition } from '../../../../_helpers'

TeamsTableRow.propTypes = {
  team: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  handleDeleteTeam: PropTypes.func.isRequired
}

TeamsTableRow.defaultProps = {
  team: {},
  index: 0
}

function TeamsTableRow({
   handleDeleteTeam, 
   index, 
   page, 
   t, 
   team, 
  }) {
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
        {listPosition.count(index, page)}
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
        <Flag
            name={abbreviation}
            format="png"
            pngSize={24}
            shiny={false}
            alt=""
            basePath='/img/flags'
          />
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