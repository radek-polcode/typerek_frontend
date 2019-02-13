import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames';
import { FaPencilAlt, FaTrashAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { withNamespaces } from 'react-i18next';

import styles from '../../../../App/App.css'

CompetitionsTableRow.propTypes = {
  competition: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  handleDeleteCompetition: PropTypes.func.isRequired
}

CompetitionsTableRow.defaultProps = {
  competition: {},
  index: 0
}

function CompetitionsTableRow({ competition, index, t }) {
  return (
    <tr>
      <td>
        {index + 1}
      </td>
      <td>
        {competition.attributes.name}
      </td>
      <td>
        {competition.attributes.place}
      </td>
      <td>
        {competition.attributes.year}
      </td>
      <td>
        {competition.attributes.startDate}
      </td>
      <td>
        {competition.attributes.endDate}
      </td>
      <td>
        {competition.attributes.winner}
      </td>
      <td>
        <Link to={`/admin/competitions/${competition.id}/edit`}>
          <FaPencilAlt className={cx(styles.table__action__icon, styles.icon__edit)} />
        </Link>
        <FaTrashAlt 
          className="table__action__icon icon__delete" 
        /> 
      </td>
    </tr>
  )
}
const translatedComponent = withNamespaces()(CompetitionsTableRow);

export { translatedComponent as CompetitionsTableRow }