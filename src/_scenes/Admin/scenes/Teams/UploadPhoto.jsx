import React from 'react'
import PropTypes from 'prop-types'
import { imageHelper } from '../../../../_helpers'
import { withNamespaces } from 'react-i18next';

UploadPhoto.propTypes = {
  handleUpload: PropTypes.func.isRequired,
  handleSelectedFile: PropTypes.func.isRequired,
  imgSrc: PropTypes.string,
  photoUrl: PropTypes.string
}

function UploadPhoto({
  handleUpload,
  handleSelectedFile,
  loaded = 0,
  imgSrc = undefined,
  photo,
  t
}) {

  return (
    <div>
      <img
        id="team__photo__thumb"
        alt="Team"
        src={imgSrc ? imgSrc : imageHelper.createImageLink(photo.medium.url)}
        style={{width: '100px', height: '100px'}}
      />
      <input 
        type="file" 
        name={t('shared.changePhoto')} 
        id="" 
        onChange={handleSelectedFile} 
      />
      <button 
        onClick={handleUpload}
      >
        Upload
      </button>
      <div> 
        {Math.round(loaded,2) } %
      </div>
    </div>
  )
}

const translatedComponent = withNamespaces()(UploadPhoto);

export { translatedComponent as UploadPhoto }
