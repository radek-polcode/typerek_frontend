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

  componentDidMount() {
    this.props.dispatch(competitionActions.getAll());
  }

  render() {
    const { competitions } = this.props

    return (
      <div>
        <CompetitionsTable
          competitions={competitions} 
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
