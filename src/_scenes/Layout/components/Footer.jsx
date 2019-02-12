import React from 'react'
import { withNamespaces } from 'react-i18next';

function Footer({ t }) {
  return (
    <div className="app__footer flex__container">
      <p>{(t('footer.copyright'))} 2019</p>
    </div>
  )
}

const translatedFooter = withNamespaces()(Footer)

export { translatedFooter as Footer }