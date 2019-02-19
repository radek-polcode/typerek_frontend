import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withNamespaces } from 'react-i18next';

import { Button,
         Card, CardHeader, CardBody,
         Form, FormGroup, 
         Input, InputGroup, 
         Label } from 'reactstrap';

import '../../../../App/App.css'
import { imageConverting } from '../../../../_helpers'
import { teamActions } from '../../../../_actions';

class TeamForm extends Component {
  constructor(props) {
    super(props)
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  static propTypes = {
    isEditing: PropTypes.bool.isRequired,
    team: PropTypes.object.isRequired
  }

  state = {
    abbreviation: this.props.team.abbreviation,
    flag: this.props.team.attributes.flag,
    name: this.props.team.attributes.name,
    nameEn: this.props.team.attributes.name_en,
    photo: this.props.team.attributes.photo,
    teamId: this.props.team.id,
    submitted: false
  }

  handleInputChange(e) {
    const target = e.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
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
      photo
    } = this.state

    const { dispatch } = this.props;

    let team = {
      data: {
        type: 'teams',
        attributes: {
          name: name,
          nameEn: nameEn,
          abbreviation: abbreviation,
          flag: flag,
          photo: imageConverting.imageToBase64String(photo)
        }
      }
    }
    console.log(team)
    if (isEditing) {
      dispatch(teamActions.updateTeam(team, teamId))
    } else {
      if (name && nameEn && abbreviation) {
        dispatch(teamActions.addTeam(team))
      }
    }
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
      name, 
      nameEn, 
      abbreviation, 
      flag, 
      photo,
      submitted
    } = this.state;

    const { t } = this.props
    console.log(photo)
    return (
      <Card className="card__form">
        <CardHeader tag="h2">
          {t('admin.teamForm.title')}
        </CardHeader>
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
            <FormGroup className={(submitted && !photo ? ' has-error' : '')}>
              <Label htmlFor="flag">{t('shared.photo')}</Label>
              <InputGroup>
                <Input type="file" 
                       className="form-control card__form__input"
                       name="photo" 
                       onChange={this.handleInputChange}
                       value={photo.url}
                />
                {submitted && !photo &&
                    <div className="help-block">{t('shared.photo')} {t('shared.isRequired')}</div>
                }
              </InputGroup>
            </FormGroup>
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
  return {};
}

const connectedTeamForm = connect(mapStateToProps)(TeamForm);
const translatedTeamForm = withNamespaces()(connectedTeamForm)

export { translatedTeamForm as TeamForm };