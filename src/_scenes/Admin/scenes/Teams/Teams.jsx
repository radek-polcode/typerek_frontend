import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withNamespaces } from 'react-i18next';

import { teamActions } from '../../../../_actions/team.actions'

import { TeamsTable } from  './TeamsTable'

export default class Teams extends Component {
  static propTypes = {
  }

  constructor(props) {
    super(props)
    this.initialPage = props.teams.meta.current_page
    this.initialPerPage = 20

    this.handleDeleteTeam = this.handleDeleteTeam.bind(this)
    this.onPageChanged = this.onPageChanged.bind(this)
  }

  componentDidMount() {
    const page = this.initialPage
    const perPage = this.initialPerPage
    this.props.dispatch(teamActions.getAll(page, perPage));
  }

  handleDeleteTeam(id) {}

  onPageChanged = data => {
    const { currentPage, perPage } = data;
    this.props.dispatch(teamActions.getAll(currentPage, perPage));
   }

  render() {
    const { teams, t } = this.props
    const handleDeleteTeam = this.handleDeleteTeam
    const onPageChanged = this.onPageChanged

    return (
      <div>
        <Link to='/admin/teams/new'>{t('admin.teamsTable.addNewTeam')}</Link>
        <TeamsTable
          teams={teams}
          onPageChanged={onPageChanged}
        />
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { teams } = state;
  return {
    teams
  };
}

const connectedTeams = connect(mapStateToProps)(Teams);
const translatedTeams = withNamespaces()(connectedTeams)

export { translatedTeams as Teams }; 
