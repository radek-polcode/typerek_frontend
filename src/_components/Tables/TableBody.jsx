import React from 'react'
import PropTypes from 'prop-types'

import { TableRow } from './'

TableBody.propTypes = {
  handleDeleteItem: PropTypes.func.isRequired,
  items: PropTypes.array.isRequired,
  page: PropTypes.number,
  perPage: PropTypes.number,
  showModal: PropTypes.func,
  title: PropTypes.string.isRequired,
}

TableBody.defaultProps = {
  items: []
}

function TableBody(props) {
  const {
    handleDeleteItem,
    items,
    page,
    perPage,
    showModal,
    title
  } = props

  return (
    <tbody>
      {
        items && items.map((item, index) => (
          <TableRow
            handleDeleteItem={handleDeleteItem}
            index={index}
            item={item}
            key={item.id}
            page={page}
            perPage={perPage}
            showModal={showModal}
            title={title}
          />
        ))
      }
    </tbody>
  )
}

export { TableBody }

