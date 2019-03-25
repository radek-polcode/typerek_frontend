import React from 'react'
import PropTypes from 'prop-types'

import { TableRow } from './'

TableBody.propTypes = {
  closeModal: PropTypes.func,
  handleDeleteItem: PropTypes.func.isRequired,
  items: PropTypes.array.isRequired,
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
    showModal,
    closeModal,
    title
  } = props

  return (
    <tbody>
      {
        items && items.map((item, index) => (
          <TableRow
            closeModal={closeModal}
            handleDeleteItem={handleDeleteItem}
            index={index}
            item={item}
            key={item.id}
            showModal={showModal}
            title={title}
          />
        ))
      }
    </tbody>
  )
}

export { TableBody }

