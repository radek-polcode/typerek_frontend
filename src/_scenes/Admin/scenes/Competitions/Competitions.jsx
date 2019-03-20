import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withNamespaces } from 'react-i18next';
import { Button, Card, CardHeader, CardBody, Table } from 'reactstrap';

import { competitionActions } from '../../../../_actions/competition.actions'

import { CompetitionsTableRow } from './CompetitionsTableRow'

export default class Competitions extends Component {
  static propTypes = {
  }

  constructor(props) {
    super(props)
    this.handleDeleteCompetition = this.handleDeleteCompetition.bind(this)
  }

  componentDidMount() {
    this.props.dispatch(competitionActions.getAll());
  }

  handleDeleteCompetition(id) {
    return this.props.dispatch(competitionActions.delete(id));
  }

  render() {
    const { competitions, t } = this.props
    const handleDeleteCompetition = this.handleDeleteCompetition

    return (
      <div>
        <Link to='/admin/competitions/new'>{t('admin.competitionsTable.addNewCompetition')}</Link>
        <Card className="card__form">
          <CardHeader tag="h2">
            {t('admin.competitionsTable.title')}
          </CardHeader>
          <CardBody>
            <Table
                responsive
              >
                <thead>
                  <tr>
                    <th>#</th>
                    <th>{t('admin.competitionsTable.competitionName')}</th>
                    <th>{t('admin.competitionsTable.place')}</th>
                    <th>{t('admin.competitionsTable.year')}</th>
                    <th>{t('admin.competitionsTable.startDate')}</th>
                    <th>{t('admin.competitionsTable.endDate')}</th>
                    <th>{t('admin.competitionsTable.winner')}</th>
                    <th>{t('shared.action')}</th>
                  </tr>
                </thead>
                <tbody>
                  {competitions.items &&
                    competitions.items.map((competition, index) =>
                    <CompetitionsTableRow
                      competition={competition}
                      handleDeleteCompetition={handleDeleteCompetition}
                      index={index}
                      key={competition.id}
                    />
                  )}
                </tbody>
            </Table>
          </CardBody>
        </Card>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { competitions } = state;
  return {
    competitions
  };
}

const connectedCompetitions = connect(mapStateToProps)(Competitions);
const translatedCompetitions = withNamespaces()(connectedCompetitions)

export { translatedCompetitions as Competitions }; 
