import React from 'react'
import PropTypes from 'prop-types'
import { FaPencilAlt, FaTrashAlt } from 'react-icons/fa';

TableActionButtons.propTypes = {
  closeModal: PropTypes.func,
  handleDeleteItem: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
  showModal: PropTypes.func,
  t: PropTypes.func,
  title: PropTypes.string
}

function TableActionButtons(props) {
  const {
    closeModal,
    handleDeleteItem,
    item,
    showModal,
    t,
    title,
  } = props

  return (
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
  )
}

export { TableActionButtons }

