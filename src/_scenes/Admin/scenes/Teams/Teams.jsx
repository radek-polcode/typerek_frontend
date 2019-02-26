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

  state = {
    currentPage: this.props.teams.meta.current_page,
    perPage: 20,
    totalPages: this.props.teams.meta.total_pages,
    totalRecords: this.props.teams.meta.total_records
  }

  constructor(props) {
    super(props)

    this.handleDeleteTeam = this.handleDeleteTeam.bind(this)
    this.onPageChanged = this.onPageChanged.bind(this)
    this.onPerPageChanged = this.onPerPageChanged.bind(this)
  }

  componentDidMount() {
    const currentPage = this.state.currentPage
    const perPage = this.state.perPage

    this.props.dispatch(teamActions.getAll(currentPage, perPage));
  }

  static getDerivedStateFromProps(nextProps, prevState){
    if (nextProps.teams.meta && 
        nextProps.teams.meta.total_pages !== prevState.totalPages) {
      return { 
        totalPages: nextProps.teams.meta.total_pages
      };
    }
    else return null;
  }

  handleDeleteTeam(id) {}

  onPageChanged = data => {
    const { currentPage, perPage } = data;
    this.setState({
      currentPage: currentPage,
      perPage: perPage
    })
    this.props.dispatch(teamActions.getAll(currentPage, perPage));
  }

  onPerPageChanged = (perPage) => {
    const currentPage = 1
    this.props.dispatch(teamActions.getAll(currentPage, perPage));

    this.setState({
      currentPage: currentPage,
      perPage: perPage,
      totalPages: 22
    })
  }

  render() {
    const { teams, t } = this.props
    const { currentPage, perPage, totalPages, totalRecords } = this.state
    const handleDeleteTeam = this.handleDeleteTeam
    const onPageChanged = this.onPageChanged
    const onPerPageChanged = this.onPerPageChanged

    return (
      <div>
        <Link to='/admin/teams/new'>{t('admin.teamsTable.addNewTeam')}</Link>
        <TeamsTable
          currentPage={currentPage}
          onPageChanged={onPageChanged}
          onPerPageChanged={onPerPageChanged}
          perPage={perPage}
          teams={teams}
          totalPages={totalPages}
          totalRecords={totalRecords}
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
