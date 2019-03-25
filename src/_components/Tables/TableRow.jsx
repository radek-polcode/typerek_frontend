import React from 'react'
import PropTypes from 'prop-types'
import Flag from "react-flags"
import { withNamespaces } from 'react-i18next';

import { formattingDateTime } from '../../_helpers'
import { listPosition } from '../../_helpers'

import { TableActionButtons } from './TableActionButtons'

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

const teamRow = (item, index, page, perPage) => {
  const { 
    abbreviation,
    name,
    name_en,
  } = item.attributes

  return (
    <>
      <td>
        {listPosition.count(index, page, perPage)}
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
    </>
  )
}

function rowToRender(index, item, page, perPage) {
  const type = item.type
  switch (type) {
    case 'competition':
      return competitionRow(item, index)
    case 'team':
      return teamRow(item, index, page, perPage)
    default:
      return null
  }
}

function TableRow({
  closeModal,
  item, 
  handleDeleteItem, 
  index,
  page,
  perPage,
  showModal,
  title,
  t
}) {
  
  return (
    <tr>
      {
        rowToRender(index, item, page, perPage)
      }
      <TableActionButtons 
        closeModal={closeModal}
        handleDeleteItem={handleDeleteItem}
        isEditing={true}
        item={item}
        open={true}
        showModal={showModal}
        title={title}
        t={t}
      />
    </tr>
  )
}
const translatedComponent = withNamespaces()(TableRow);

export { translatedComponent as TableRow }