import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withNamespaces } from 'react-i18next';

import { Button,
         Card, CardBody,
         Form, FormGroup, 
         Input, InputGroup, 
         Label } from 'reactstrap';

import '../../../../App/App.css'
import { alertActions } from '../../../../_actions';
import { modalActions } from '../../../../_actions';
import { teamActions } from '../../../../_actions';
import { UploadPhoto } from '../../../../_components';

class TeamForm extends Component {
  constructor(props) {
    super(props)
    this.handleDeleteThumb = this.handleDeleteThumb.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSelectedFile = this.handleSelectedFile.bind(this);
  }

  static propTypes = {
    isEditing: PropTypes.bool.isRequired,
    team: PropTypes.object.isRequired
  }

  // state should be initialized only, and then fill in getDerivedStateFromProps() i guess
  state = {
    abbreviation: this.props.team.attributes.abbreviation,
    alert: this.props.alert,
    flag: this.props.team.attributes.flag,
    isEditing: undefined,
    name: this.props.team.attributes.name,
    nameEn: this.props.team.attributes.name_en,
    newPhoto: null,
    newPhotoLabel: 'Choose new photo',
    photo: this.props.team.attributes.photo,
    teamId: this.props.team.id,
    submitted: false
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.alert !== prevState.alert ||
        nextProps.isEditing !== prevState.isEditing
      ) {
        return {
          alert: nextProps.alert,
          isEditing: nextProps.isEditing,
        }
      } else {
        return null
      }
  }

  handleDeleteThumb(e) {
    const teamId = this.state.teamId

    let deletePhotoData = {
      data: {
        type: 'teams',
        attributes: {
          remove_photo: true,
        }
      }
    }
    this.props.deleteTeamPhoto(deletePhotoData, teamId)

    this.setState({
      newPhoto: null,
      photo: null
    })
  }

  handleInputChange(e) {
    const target = e.target;
    const value = target.value;
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

    const teamId = this.state.teamId
    const newPhoto = this.state.newPhoto

    let teamWithNewPhoto = {
      data: {
        type: 'teams',
        attributes: {
          photo: newPhoto,
        }
      }
    }
    this.props.updateTeamPhoto(teamWithNewPhoto, teamId)
  }

  handleSubmit(e) {
    e.preventDefault()

    const teamId = this.state.teamId
    const isEditing = this.props.isEditing
    
    const { 
      abbreviation, 
      flag, 
      name, 
      nameEn,
      newPhoto
    } = this.state

    let team = {
      data: {
        type: 'teams',
        attributes: {
          abbreviation: abbreviation,
          flag: flag,
          name: name,
          name_en: nameEn,
          photo: newPhoto,
        }
      }
    }

    if (isEditing) {
      this.props.updateTeam(team, teamId)
    } else {
      if (name && nameEn && abbreviation) {
        this.props.teamActions.addTeam(team)
      }
    }

    this.props.hideModal()
  }

  setButtonName(t) {
    if (this.props.isEditing) {
      return t('admin.teamForm.updateTeamButton')
    } else {
      return t('admin.teamForm.addTeamButton')
    }
  }

  render() {
    const { 
      abbreviation,
      alert,
      flag,
      isEditing,
      name, 
      nameEn, 
      newPhoto,
      newPhotoLabel,
      photo,
      submitted
    } = this.state;

    const handleDeleteThumb = this.handleDeleteThumb
    const handleSelectedFile = this.handleSelectedFile
    const handleUpload = this.handleUpload

    const { t } = this.props
    return (
      <Card className="card__form">
        <CardBody>
          <Form name="form" onSubmit={this.handleSubmit}>
            <FormGroup className={(submitted && !name ? ' has-error' : '')}>
              <Label htmlFor="name">{t('shared.name')}</Label>
              <InputGroup>
                <Input type="text" 
                        className="form-control card__form__input"
                        name="name" 
                        onChange={this.handleInputChange}
                        value={name}
                />
                {submitted && !name &&
                    <div className="help-block">{t('shared.name')} {t('shared.isRequired')}</div>
                }
              </InputGroup>
            </FormGroup>
            <FormGroup className={(submitted && !nameEn ? ' has-error' : '')}>
              <Label htmlFor="nameEn">{t('shared.nameEn')}</Label>
              <InputGroup>
                <Input type="text" 
                        className="form-control card__form__input"
                        name="nameEn" 
                        onChange={this.handleInputChange}
                        value={nameEn}
                />
                {submitted && !nameEn &&
                    <div className="help-block">{t('shared.nameEn')} {t('shared.isRequired')}</div>
                }
              </InputGroup>
            </FormGroup>
            <FormGroup className={(submitted && !abbreviation ? ' has-error' : '')}>
              <Label htmlFor="abbreviation">{t('shared.abbreviation')}</Label>
              <InputGroup>
                <Input type="text" 
                        className="form-control card__form__input"
                        name="abbreviation" 
                        onChange={this.handleInputChange}
                        value={abbreviation}
                />
                {submitted && !abbreviation &&
                    <div className="help-block">{t('shared.abbreviation')} {t('shared.isRequired')}</div>
                }
              </InputGroup>
            </FormGroup>
            <FormGroup className={(submitted && !flag ? ' has-error' : '')}>
              <Label htmlFor="flag">{t('shared.flag')}</Label>
              <InputGroup>
                <Input type="text" 
                        className="form-control card__form__input"
                        name="flag" 
                        onChange={this.handleInputChange}
                        value={flag}
                />
                {submitted && !flag &&
                    <div className="help-block">{t('shared.flag')} {t('shared.isRequired')}</div>
                }
              </InputGroup>
            </FormGroup>
            <UploadPhoto
              alert={alert}
              handleDeleteThumb={handleDeleteThumb}
              handleSelectedFile={handleSelectedFile}
              handleUpload={handleUpload}
              newPhoto={newPhoto}
              isEditing={isEditing}
              newPhotoLabel={newPhotoLabel}
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

const mapDispatchToProps = dispatch => ({
  addTeam: (team) => dispatch(teamActions.addTeam(team)),
  deleteTeamPhoto: (deletePhotoData, teamId) => dispatch(teamActions.deleteTeamPhoto(deletePhotoData, teamId)),
  hideModal: () => dispatch(modalActions.hideModal()),
  updateTeam: (team, teamId) => dispatch(teamActions.updateTeam(team, teamId)),
  updateTeamPhoto: (teamWithNewPhoto, teamId) => dispatch(teamActions.updateTeamPhoto(teamWithNewPhoto, teamId))
})

function mapStateToProps(state) {
  const { alert } = state
  return {
    alert
  };
}

const connectedTeamForm = connect(mapStateToProps, mapDispatchToProps)(TeamForm);
const translatedTeamForm = withNamespaces()(connectedTeamForm)

export { translatedTeamForm as TeamForm };