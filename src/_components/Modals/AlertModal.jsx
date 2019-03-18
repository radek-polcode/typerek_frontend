import React from 'react'
import cx from 'classnames';

import styles from './AlertModal.module.css'

const AlertModal = ({ closeModal, message, title }) => {
  return (
    <div className={cx(styles.alert__modal__content, "modal-content")}>
      <div className={cx(styles.alert__modal__header, "modal-header")}>
        <h5 className="modal-title">
          {title}
        </h5>
        <button type="button" className="close" aria-label="Close" onClick={closeModal}>
          <span     
            className={styles.button__modal__close}
            aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className={cx(styles.alert__modal__body, "modal-body")}>
        <p>{message}</p>
      </div>
    </div>
  )
}

export { AlertModal };