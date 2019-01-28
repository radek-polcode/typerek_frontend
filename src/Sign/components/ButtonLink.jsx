import React from 'react'
import { Link } from 'react-router-dom';

import cx from 'classnames';
import styles from '../sign_shared.module.css'

function ButtonLink({link, linkText}) {  
  return (
    <>
      <Link to={link} 
            className={cx("btn", styles.card__auth__btn__link)}>
        {linkText}
      </Link>
    </>
  )
}

export { ButtonLink as ButtonLink }
