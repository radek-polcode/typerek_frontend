import React from 'react'
import PropTypes from 'prop-types'
import { withNamespaces } from 'react-i18next';
import { Button, Input } from 'reactstrap';
import cx from 'classnames';

import { imageHelper } from '../../../../_helpers'

import '../../../../App/App.css'
import styles from './UploadPhoto.module.css'

UploadPhoto.propTypes = {
  handleUpload: PropTypes.func.isRequired,
  handleSelectedFile: PropTypes.func.isRequired,
  imgSrc: PropTypes.string,
  isEditing: PropTypes.bool.isRequired,
  newPhotoLabel: PropTypes.string,
  photoUrl: PropTypes.string
}

function UploadPhoto({
  handleUpload,
  handleSelectedFile,
  isEditing,
  imgSrc = undefined,
  newPhotoLabel,
  photo,
  t
}) {
  console.log(imgSrc)
  return (
    <div className={styles.uploadBox}>
      { imgSrc &&
          <img
            alt="Team"
            className={cx(styles.team__photo__thumb)}
            id="team__photo__thumb"
            src={imgSrc ? imgSrc : imageHelper.createImageLink(photo.medium.url)}
          />
      }
      <div>
        <Input 
          className=""
          id="photoUpload"
          label={newPhotoLabel}
          name={t('shared.changePhoto')} 
          onChange={handleSelectedFile}
          type="file" 
        />
        { isEditing &&
          <>
            <Button
              className={styles.photo__uploadButton}
              color="secondary"
              onClick={handleUpload}
              size="sm"
            >
              Upload
            </Button>
            <div className="uploadBox__alert">
              <span>Here should be alert hehe</span>
            </div>
          </>
        }
      </div>
    </div>
  )
}

const translatedComponent = withNamespaces()(UploadPhoto);

export { translatedComponent as UploadPhoto }
