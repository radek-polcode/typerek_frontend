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
import { competitionActions } from '../../../../_actions';

class CompetitionForm extends Component {
  constructor(props) {
    super(props)
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  static propTypes = {
    competition: PropTypes.object.isRequired,
    isEditing: PropTypes.bool.isRequired
  }

  state = {
    competitionId: this.props.competition.id,
    endDate: this.props.competition.attributes.end_date,
    name: this.props.competition.attributes.name,
    startDate: this.props.competition.attributes.start_date,
    winnerId: this.props.competition.attributes.winner_id,
    year: this.props.competition.attributes.year,
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

    const competitionId = this.state.competitionId
    const isEditing = this.props.isEditing
    
    const { endDate, name, startDate, winnerId, year } = this.state
    const { dispatch } = this.props;

    let competition = {
      data: {
        type: 'competition',
        attributes: {
          endDate: endDate,
          name: name,
          startDate: startDate,
          winnerId: winnerId,
          year: year
        }
      }
    }

    if (isEditing) {
      dispatch(competitionActions.updateCompetition(competition, competitionId))
    } else {
      dispatch(competitionActions.addUser(competition))
    }
  }

  setButtonName(t) {
    if (this.props.isEditing) {
      return t('admin.userForm.updateUserButton')
    } else {
      return t('admin.userForm.addUserButton')
    }
  }

  render() {
    const { endDate, name, startDate, submitted, winnerId, year } = this.state;
    const { t } = this.props
    console.log(this.props)
    return (
      <Card className="card__form">
        <CardHeader tag="h2">
          {t('admin.competitionForm.title')}
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
                    <div className="help-block">
                      {t('shared.name')} {t('shared.isRequired')}
                    </div>
                }
              </InputGroup>
            </FormGroup>
            <FormGroup className={(submitted && !startDate ? ' has-error' : '')}>
              <Label htmlFor="startDate">{t('shared.startDate')}</Label>
              <InputGroup>
                <Input type="text" 
                        className="form-control card__form__input" 
                        name="startDate" 
                        onChange={this.handleInputChange}
                        value={startDate}
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
                <Input type="text" 
                        className="form-control card__form__input" 
                        name="endDate" 
                        onChange={this.handleInputChange}
                        value={endDate}
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
            <FormGroup className={(submitted && !winnerId ? ' has-error' : '')}>
              <Label htmlFor="winnerId">{t('shared.winner')}</Label>
              <InputGroup>
                <Input type="text" 
                        className="form-control card__form__input" 
                        name="winnerId" 
                        onChange={this.handleInputChange}
                        value={winnerId}
                />
                {submitted && !winnerId &&
                  <div className="help-block">
                    {t('shared.name')} {t('shared.isRequired')}
                  </div>
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

const connectedForm = connect(mapStateToProps)(CompetitionForm);
const translatedForm = withNamespaces()(connectedForm)

export { translatedForm as CompetitionForm };