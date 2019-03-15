import React from 'react'
import { TeamForm } from '../../_scenes/Admin/scenes/Teams/TeamForm'

import cx from 'classnames';

import styles from './FormModal.module.css'

const FormModal = ({ closeModal, isEditing, title, team }) => {
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
        { team &&
          <TeamForm
            isEditing={isEditing}
            team={team}
          />
        }
      </div>
    </div>
  )
}

export { FormModal };