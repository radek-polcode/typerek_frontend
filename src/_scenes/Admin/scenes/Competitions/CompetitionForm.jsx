import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import DateTime from 'react-datetime';
import { withNamespaces } from 'react-i18next';

import { Button,
         Card, CardBody,
         Form, FormGroup, 
         Input, InputGroup, 
         Label } from 'reactstrap';

import '../../../../App/App.css'
import '../../../../App/react-datetime.css'

import { competitionActions } from '../../../../_actions';
import { formattingDateTime } from '../../../../_helpers'

class CompetitionForm extends Component {
  constructor(props) {
    super(props)
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  static propTypes = {
    closeModal: PropTypes.func.isRequired,
    competition: PropTypes.object.isRequired,
    isEditing: PropTypes.bool.isRequired
  }

  state = {
    competitionId: this.props.competition.id,
    endDate: this.props.competition.attributes.end_date,
    name: this.props.competition.attributes.name,
    place: this.props.competition.attributes.place,
    startDate: this.props.competition.attributes.start_date,
    teams: {},
    winnerId: this.props.competition.attributes.winner_id,
    year: this.props.competition.attributes.year,
    submitted: false
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.alert !== prevState.alert ||
        nextProps.closeModal !== prevState.closeModal ||
        nextProps.isEditing !== prevState.isEditing ||
        nextProps.teams !== prevState.teams
      ) {
        return {
          alert: nextProps.alert,
          closeModal: nextProps.closeModal,
          isEditing: nextProps.isEditing,
          teams: nextProps.teams
        }
      } else {
        return null
      }
  }

  handleInputChange(e) {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleDateTimePicker = (moment, name) => {
    const value = formattingDateTime.toIsoFormat(moment._d);
    this.setState({
      [name]: value
    })
  }

  handleSubmit(e) {
    e.preventDefault()

    const competitionId = this.state.competitionId
    const isEditing = this.props.isEditing
    
    const { endDate, name, place, startDate, winnerId, year } = this.state

    let competition = {
      data: {
        type: 'competition',
        attributes: {
          end_date: endDate,
          name: name,
          place: place,
          start_date: startDate,
          winner_id: winnerId,
          year: year
        }
      }
    }

    if (isEditing) {
      this.props.updateCompetition(competition, competitionId)
    } else {
      this.props.addCompetition(competition)
    }

    this.props.closeModal()
  }

  setButtonName(t) {
    if (this.props.isEditing) {
      return t('admin.competitionForm.updateCompetitionButton')
    } else {
      return t('admin.competitionForm.addCompetitionButton')
    }
  }

  render() {
    const { 
      endDate, 
      name, 
      place, 
      startDate, 
      submitted, 
      winnerId, 
      year 
    } = this.state;

    const { t, teams } = this.props
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
                    <div className="help-block">
                      {t('shared.name')} {t('shared.isRequired')}
                    </div>
                }
              </InputGroup>
            </FormGroup>
            <FormGroup className={(submitted && !place ? ' has-error' : '')}>
              <Label htmlFor="name">{t('shared.place')}</Label>
              <InputGroup>
                <Input type="text" 
                       className="form-control card__form__input" 
                       name="place" 
                       onChange={this.handleInputChange}
                       value={place}
                />
                {submitted && !name &&
                    <div className="help-block">
                      {t('shared.place')} {t('shared.isRequired')}
                    </div>
                }
              </InputGroup>
            </FormGroup>
            <FormGroup className={(submitted && !startDate ? ' has-error' : '')}>
              <Label htmlFor="startDate">{t('shared.startDate')}</Label>
              <InputGroup>
                <DateTime
                  closeOnSelect={true}
                  inputProps={
                    {
                      className: "form-control card__form__input",
                      name: "startDate"
                    }
                  } 
                  onChange={moment => this.handleDateTimePicker(moment, 'startDate')}
                  timeFormat={false}
                  value={formattingDateTime.formatDate(startDate)}
                />
                {submitted && !startDate &&
                  <div className="help-block">
                    {t('shared.name')} {t('shared.isRequired')}
                  </div>
                }
              </InputGroup>
            </FormGroup>
            <FormGroup className={(submitted && !endDate ? ' has-error' : '')}>
              <Label htmlFor="endDate">{t('shared.endDate')}</Label>
              <InputGroup>
                <DateTime
                  closeOnSelect={true}
                  inputProps={
                    { 
                      className: "form-control card__form__input",
                      name: "endDate"
                    }
                  } 
                  onChange={moment => this.handleDateTimePicker(moment, 'endDate')}
                  timeFormat={false}
                  value={formattingDateTime.formatDate(endDate)}
                />
                {submitted && !endDate &&
                  <div className="help-block">
                    {t('shared.name')} {t('shared.isRequired')}
                  </div>
                }
              </InputGroup>
            </FormGroup>
            <FormGroup className={(submitted && !year ? ' has-error' : '')}>
              <Label htmlFor="year">{t('shared.year')}</Label>
              <InputGroup>
                <Input type="text" 
                        className="form-control card__form__input" 
                        name="year" 
                        onChange={this.handleInputChange}
                        value={year}
                />
                {submitted && !year &&
                  <div className="help-block">
                    {t('shared.name')} {t('shared.isRequired')}
                  </div>
                }
              </InputGroup>
            </FormGroup>
            <FormGroup>
                <Label htmlFor="role">{t('shared.winner')}</Label>
                <InputGroup>
                  <Input className="form-control card__form__input"
                         name="winnerId" 
                         onChange={this.handleInputChange}
                         type="select"
                         value={winnerId}
                  >
                    <option value="" disabled>Select team</option>
                    {teams && teams.items.map((el, index) => {
                      return <option
                                key={index + 1}
                                selected={el.id === winnerId}
                                value={el.id}>
                                  { el.attributes.name }
                              </option>
                    })}
                  </Input>
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
  const { alert, teams } = state
  return {
    alert,
    teams
  };
}

const mapDispatchToProps = dispatch => ({
  addCompetition: (competition) => dispatch(competitionActions.addCompetition(competition)),
  updateCompetition: (competition, competitionId) => dispatch(competitionActions.updateCompetition(competition, competitionId)),
})

const connectedForm = connect(mapStateToProps, mapDispatchToProps)(CompetitionForm);
const translatedForm = withNamespaces()(connectedForm)

export { translatedForm as CompetitionForm };