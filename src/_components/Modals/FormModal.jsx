import React from 'react'
import PropTypes from 'prop-types'

import { CompetitionForm } from '../../_scenes/Admin/scenes/Competitions/CompetitionForm'
import { TeamForm } from '../../_scenes/Admin/scenes/Teams/TeamForm'
import { UserForm } from '../../_scenes/Admin/scenes/Users/UserForm'

import cx from 'classnames';

import styles from './FormModal.module.css'

function contentToRender({ closeModal, entity, isEditing }) {
  console.log(entity.type)
  const entityType = entity.type
  switch (entityType) {
    case 'competition':
      console.log('dupa')
      return <CompetitionForm
                isEditing={isEditing}
                competition={entity}
                closeModal={closeModal}
              />
    case 'user':
      return <UserForm
                isEditing={isEditing}
                user={entity}
                closeModal={closeModal}
              />
    case 'team':
      return <TeamForm
                isEditing={isEditing}
                team={entity}
                closeModal={closeModal}
              />
    default:
      return null
  }
}

const FormModal = ({ closeModal, entity, isEditing, title }) => {
  console.log(entity)
  return (
    <div className={cx(styles.form__modal__content, "modal-content")}>
      <div className={cx(styles.form__modal__header, "modal-header")}>
        <h5 className="modal-title">
          {title}
        </h5>
        <button type="button" className="close" aria-label="Close" onClick={closeModal}>
          <span     
            className={styles.button__modal__close}
            aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className={cx(styles.form__modal__body, "modal-body")}>
        { entity && contentToRender({closeModal, entity, isEditing}) }
      </div>
    </div>
  )
}

FormModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  entity: PropTypes.object.isRequired,
  isEditing: PropTypes.bool.isRequired,
}

export { FormModal };