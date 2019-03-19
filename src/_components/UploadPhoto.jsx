import React from 'react'
import PropTypes from 'prop-types'
import { withNamespaces } from 'react-i18next';
import { Button, Input } from 'reactstrap';
import cx from 'classnames';
import { FaTimes } from 'react-icons/fa';

import styles from './UploadPhoto.module.css'

UploadPhoto.propTypes = {
  alert: PropTypes.object,
  handleDeleteThumb: PropTypes.func.isRequired,
  handleUpload: PropTypes.func.isRequired,
  handleSelectedFile: PropTypes.func.isRequired,
  isEditing: PropTypes.bool.isRequired,
  newPhoto: PropTypes.string,
  newPhotoLabel: PropTypes.string,
  photo: PropTypes.object
}

function UploadPhoto({
  alert,
  handleDeleteThumb,
  handleUpload,
  handleSelectedFile,
  isEditing,
  newPhoto = undefined,
  newPhotoLabel,
  photo,
  t
}) {
  return (
    <div className={styles.uploadBox}>
      { (newPhoto || (photo && photo.medium.url)) &&
        <div>
          <img
            alt="Team"
            className={cx(styles.team__photo__thumb)}
            id="team__photo__thumb"
            src={newPhoto ? newPhoto : photo.medium.url}
          />
          <FaTimes
            className={cx(styles.team__photo__thumb__remove)}
            onClick={handleDeleteThumb}
          />
        </div>
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
            { alert.message &&
              <div className="uploadBox__alert">
                <span>{alert.message}</span>
              </div>
            }
          </>
        }
      </div>
    </div>
  )
}

const translatedComponent = withNamespaces()(UploadPhoto);

export { translatedComponent as UploadPhoto }
