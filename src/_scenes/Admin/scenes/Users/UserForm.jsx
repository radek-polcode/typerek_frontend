import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withNamespaces } from 'react-i18next';

import { Button,
         Card, CardHeader, CardBody,
         CustomInput, Form, FormGroup, 
         Input, InputGroup, InputGroupAddon, InputGroupText, 
         Label } from 'reactstrap';
import { FaAt, FaLock, FaUser } from 'react-icons/fa';

import '../../../../App/App.css'
import { UploadPhoto } from '../../../../_components';
import { userActions } from '../../../../_actions';

class UserForm extends Component {
  constructor(props) {
    super(props)
    this.handleDeleteThumb = this.handleDeleteThumb.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSelectedFile = this.handleSelectedFile.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
  }

  static propTypes = {
    closeModal: PropTypes.func.isRequired,
    isEditing: PropTypes.bool.isRequired,
    user: PropTypes.object.isRequired
  }

  state = {
    email: this.props.user.attributes.email,
    isEditing: undefined,
    newPhoto: null,
    newPhotoLabel: 'Choose new photo',
    photo: this.props.user.attributes.photo,
    role: this.props.user.attributes.role,
    submitted: false,
    takesPart: this.props.user.attributes.take_part,
    type: this.props.user.type,
    userId: this.props.user.id,
    username: this.props.user.attributes.username
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.alert !== prevState.alert ||
        nextProps.closeModal !== prevState.closeModal ||
        nextProps.isEditing !== prevState.isEditing
      ) {
        return {
          alert: nextProps.alert,
          closeModal: nextProps.closeModal,
          isEditing: nextProps.isEditing,
        }
      } else {
        return null
      }
  }

  handleDeleteThumb(e) {
    const userId = this.state.userId
    const { deleteUserPhoto } = this.props;

    let deletePhotoData = {
      data: {
        type: 'users',
        attributes: {
          remove_photo: true,
        }
      }
    }

    deleteUserPhoto(deletePhotoData, userId)

    this.setState({
      newPhoto: null,
      photo: null
    })
  }

  handleInputChange(e) {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  handleSelectedFile = (event) => {
    if (event.target.files.length > 0) {
      const scope = this
      const file = event.target.files[0]
      const fileName = event.target.files[0].name

      let reader = new FileReader()

      reader.onload = function(event) {
        let dataURL = reader.result
        scope.setState({
          newPhoto: dataURL,
          newPhotoLabel: fileName
        })
      }
      reader.readAsDataURL(file);
    } else {
      return undefined
    }
  }

  handleUpload = (e) => {
    e.preventDefault()

    const { updateUserPhoto } = this.props;
    const userId = this.state.userId
    const newPhoto = this.state.newPhoto

    let userWithNewPhoto = {
      data: {
        type: 'users',
        attributes: {
          photo: newPhoto,
        }
      }
    }
    updateUserPhoto(userWithNewPhoto, userId)
  }

  handleSubmit(e) {
    e.preventDefault()

    const userId = this.state.userId
    const isEditing = this.props.isEditing

    const { 
      email,
      newPhoto, 
      password, 
      role,
      takesPart,
      username, 
    } = this.state

    const { addUser, updateUser } = this.props;
    
    let user = {
      data: {
        type: 'users',
        attributes: {
          email: email,
          photo: newPhoto,
          role: role,
          take_part: takesPart,
          username: username,
        }
      }
    }

    if (isEditing) {
      updateUser(user, userId)
    } else {
      if (email && username && password && role) {
        Object.assign(user.data.attributes, {password: password})
        addUser(user)
      }
    }

    this.props.closeModal()
  }

  setButtonName(t) {
    if (this.props.isEditing) {
      return t('admin.userForm.updateUserButton')
    } else {
      return t('admin.userForm.addUserButton')
    }
  }

  render() {
    const {
      alert,
      email,
      isEditing,
      newPhoto,
      password,
      photo, 
      role, 
      submitted,
      takesPart, 
      username, 
    } = this.state;

    const handleDeleteThumb = this.handleDeleteThumb
    const handleSelectedFile = this.handleSelectedFile
    const handleUpload = this.handleUpload

    const ROLES = [
        {value: 'registered'},
        {value: 'admin'}
    ]

    const { t } = this.props

    return (
      <Card className="card__form">
        <CardHeader tag="h2">
          {t('admin.userForm.title')}
        </CardHeader>
        <CardBody>
          <Form name="form" onSubmit={this.handleSubmit}>
            <FormGroup className={(submitted && !email ? ' has-error' : '')}>
                <Label htmlFor="email">{t('shared.email')}</Label>
                <InputGroup>
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText className="card__form__input__prepend">
                      <FaAt />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input type="text" 
                         className="form-control card__form__input" 
                         name="email" 
                         onChange={this.handleInputChange}
                         value={email}
                  />
                  {submitted && !email &&
                      <div className="help-block">{t('shared.email')} {t('shared.isRequired')}</div>
                  }
                </InputGroup>
            </FormGroup>
            <FormGroup className={(submitted && !username ? ' has-error' : '')}>
                <Label htmlFor="username">{t('shared.username')}</Label>
                <InputGroup>
                  <InputGroupAddon addonType="prepend">
                      <InputGroupText className="card__form__input__prepend">
                        <FaUser />
                      </InputGroupText>
                    </InputGroupAddon>
                  <Input type="text" 
                         className="form-control card__form__input"
                         name="username" 
                         onChange={this.handleInputChange}
                         value={username}
                  />
                  {submitted && !username &&
                      <div className="help-block">{t('shared.username')} {t('shared.isRequired')}</div>
                  }
                </InputGroup>
            </FormGroup>
            { !this.props.isEditing && 
              <FormGroup className={(submitted && !password ? ' has-error' : '')}>
                <Label htmlFor="password">{t('shared.password')}</Label>
                <InputGroup>
                  <InputGroupAddon addonType="prepend">
                      <InputGroupText className="card__form__input__prepend">
                        <FaLock />
                      </InputGroupText>
                    </InputGroupAddon>
                  <Input type="password" 
                         className="form-control card__form__input" 
                         name="password" 
                         onChange={this.handleInputChange} 
                  />
                  {submitted && !password &&
                      <div className="help-block">{t('shared.password')} {t('shared.isRequired')}</div>
                  }
                </InputGroup>
              </FormGroup>
            }
            <FormGroup>
                <Label htmlFor="role">{t('shared.role')}</Label>
                <InputGroup>
                  <Input className="form-control card__form__input"
                         name="role" 
                         onChange={this.handleInputChange}
                         type="select" 
                         value={role}
                  >
                    <option value="" disabled>Select role</option>
                    {ROLES.map((el, index) => {
                      return <option
                                key={index + 1}
                                value={el.value}>
                                  { el.value }
                              </option>
                    })}
                  </Input>
                </InputGroup>
            </FormGroup>
            <FormGroup check inline>
              <div>
                <CustomInput
                  checked={takesPart ? true : false}
                  id="takesPart"
                  inline
                  label={t('shared.takesPart')}
                  name="takesPart"
                  onChange={this.handleInputChange}
                  type="checkbox"
                  value={takesPart} 
                />
              </div>
            </FormGroup>
            <UploadPhoto
              alert={alert}
              handleDeleteThumb={handleDeleteThumb}
              handleSelectedFile={handleSelectedFile}
              handleUpload={handleUpload}
              isEditing={isEditing}
              newPhoto={newPhoto}
              photo={photo}
            />
            <FormGroup>
              <Button>
                {this.setButtonName(t)}
              </Button>
            </FormGroup>
        </Form>
      </CardBody>
    </Card>
    )
  }
}

function mapStateToProps(state) {
  const { alert } = state
  return {
    alert
  };
}

const mapDispatchToProps = dispatch => ({
  addUser: (user) => dispatch(userActions.addUser(user)),
  deleteUserPhoto: (id) => dispatch(userActions.deleteUserPhoto(id)),
  updateUser: (user, userId) => dispatch(userActions.updateUser(user, userId)),
  updateUserPhoto: (id, userWithNewPhoto) => dispatch(userActions.updateUserPhoto(id, userWithNewPhoto)),
})


const connectedUserForm = connect(mapStateToProps, mapDispatchToProps)(UserForm);
const translatedUserForm = withNamespaces()(connectedUserForm)

export { translatedUserForm as UserForm };