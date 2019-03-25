import React from 'react'
import PropTypes from 'prop-types'
import { FaPencilAlt, FaTrashAlt } from 'react-icons/fa';
import { withNamespaces } from 'react-i18next';

import { formattingDateTime } from '../../_helpers'

TableRow.propTypes = {
  closeModal: PropTypes.func.isRequired,
  handleDeleteItem: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  item: PropTypes.object.isRequired,
  key: PropTypes.number,
  showModal: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired
}

TableRow.defaultProps = {
  item: {},
  index: 0
}

const competitionRow = (item, index) => {
  const { 
    end_date,
    name,
    place,
    start_date,
    winner_id,
    year
  } = item.attributes
  
  return (
    <>
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
    </>
  )
}

function rowToRender(index, item, title) {
  const type = item.type
  switch (type) {
    case 'competition':
      return competitionRow(item, index)
    default:
      return null
  }
}

function TableRow({
  closeModal,
  item, 
  handleDeleteItem, 
  index,
  showModal,
  title,
  t 
}) {
  
  return (
    <tr>
      {
        rowToRender(index, item, title)
      }
      <td>
        <FaPencilAlt 
          className="table__action__icon icon__edit"
          onClick={() => showModal({
            closeModal: closeModal,
            item,
            isEditing: true,
            open: true,
            title: title
          }, 'form')}
        />
        <FaTrashAlt 
          className="table__action__icon icon__delete"
          onClick={() => { 
            if(window.confirm(t('admin.itemForm.confirmationMessage'))) 
              handleDeleteItem(item.id)
          }}
        /> 
      </td>
    </tr>
  )
}
const translatedComponent = withNamespaces()(TableRow);

export { translatedComponent as TableRow }