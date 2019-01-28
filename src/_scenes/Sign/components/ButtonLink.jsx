import React from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import cx from 'classnames';
import styles from '../sign_shared.module.css'

ButtonLink.propTypes = {
  link: PropTypes.string.required,
  linkText: PropTypes.string.required
}

ButtonLink.defaultProps = {
  link: '',
  linkText: ''
}

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
