import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withNamespaces } from 'react-i18next';

import { competitionActions } from '../../../../_actions/competition.actions'

import { CompetitionsTable } from './CompetitionsTable'

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
        <CompetitionsTable
          competitions={competitions}
          handleDeleteCompetition={handleDeleteCompetition}
        />
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
