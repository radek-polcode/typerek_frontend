import React from 'react'
import { TeamForm } from '../../_scenes/Admin/scenes/Teams/TeamForm'

const FormModal = ({ closeModal, isEditing, title, team }) => {
  return (
    <div className="modal-content">
      <div className="modal-header">
        <h5
          className="modal-title"
        >{title}</h5>
        <button type="button" className="close" aria-label="Close" onClick={closeModal}>
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
        { team &&
          <TeamForm
            isEditing={isEditing}
            team={team}
          />
        }
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" onClick={closeModal}>Close</button>
      </div>
    </div>
  )
}

export { FormModal };