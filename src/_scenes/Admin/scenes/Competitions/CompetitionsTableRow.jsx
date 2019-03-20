import React from 'react'
import PropTypes from 'prop-types'
import { FaPencilAlt, FaTrashAlt } from 'react-icons/fa';
import { withNamespaces } from 'react-i18next';

import { formattingDateTime } from '../../../../_helpers'

CompetitionsTableRow.propTypes = {
  competition: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  handleDeleteCompetition: PropTypes.func.isRequired
}

CompetitionsTableRow.defaultProps = {
  competition: {},
  index: 0
}

function CompetitionsTableRow({
  competition, 
  handleDeleteCompetition, 
  index,
  openFormModal,
  t 
}) {

  const { 
    end_date,
    name,
    place,
    start_date,
    winner_id,
    year
  } = competition.attributes

  return (
    <tr>
      <td>
        {index + 1}
      </td>
      <td>
        {name}
      </td>
      <td>
        {place}
      </td>
      <td>
        {year}
      </td>
      <td>
        {formattingDateTime.formatDate(start_date)}
      </td>
      <td>
        {formattingDateTime.formatDate(end_date)}
      </td>
      <td>
        {winner_id}
      </td>
      <td>
        <FaPencilAlt 
          className="table__action__icon icon__edit"
          onClick={() => openFormModal({competition, isEditing: true})}
        />
        <FaTrashAlt 
          className="table__action__icon icon__delete"
          onClick={() => { if(window.confirm(t('admin.competitionForm.confirmationMessage'))) handleDeleteCompetition(competition.id)} }
        /> 
      </td>
    </tr>
  )
}
const translatedComponent = withNamespaces()(CompetitionsTableRow);

export { translatedComponent as CompetitionsTableRow }