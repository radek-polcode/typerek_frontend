import React from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import '../../../App/App.css'

ButtonLink.propTypes = {
  link: PropTypes.string.isRequired,
  linkText: PropTypes.string.isRequired
}

ButtonLink.defaultProps = {
  link: '',
  linkText: ''
}

function ButtonLink({link, linkText}) {
  return (
    <>
      <Link to={link} 
            className="btn card__btn__link">
        {linkText}
      </Link>
    </>
  )
}

export { ButtonLink as ButtonLink }
