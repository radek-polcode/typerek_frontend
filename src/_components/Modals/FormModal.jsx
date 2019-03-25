import React from 'react'
import PropTypes from 'prop-types'

import { CompetitionForm } from '../../_scenes/Admin/scenes/Competitions/CompetitionForm'
import { TeamForm } from '../../_scenes/Admin/scenes/Teams/TeamForm'
import { UserForm } from '../../_scenes/Admin/scenes/Users/UserForm'

import cx from 'classnames';

import styles from './FormModal.module.css'

function contentToRender({ closeModal, item, isEditing }) {
  const itemType = item.type
  switch (itemType) {
    case 'competition':
      return <CompetitionForm
                closeModal={closeModal}
                competition={item}
                isEditing={isEditing}
              />
    case 'user':
      return <UserForm
                closeModal={closeModal}
                isEditing={isEditing}
                user={item}
              />
    case 'team':
      return <TeamForm
                closeModal={closeModal}
                isEditing={isEditing}
                team={item}
              />
    default:
      return null
  }
}

const FormModal = ({ closeModal, item, isEditing, title }) => {
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
        { item && contentToRender({closeModal, item, isEditing}) }
      </div>
    </div>
  )
}

FormModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
  isEditing: PropTypes.bool.isRequired,
}

export { FormModal };