import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import queryString from 'query-string';
import { withNamespaces } from 'react-i18next';

import { teamActions } from '../../../../_actions/team.actions'

import { TeamsTable } from  './TeamsTable'

export default class Teams extends Component {
  static propTypes = {
  }

  static defaultState = {
    currentPage: 1,
    perPage: 20
  }

  constructor(props) {
    super(props)

    this.handleDeleteTeam = this.handleDeleteTeam.bind(this)
    this.onPageChanged = this.onPageChanged.bind(this)
    this.onPerPageChanged = this.onPerPageChanged.bind(this)
  }

  state = {
    currentPage: 1,
    perPage: 20,
    totalPages: 1,
    totalRecords: 1
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

  componentDidUpdate(){
    console.log('componentDidUpdate')
    const scope = this
    window.onpopstate  = (e) => {
      const queryParams = queryString.parse(this.props.location.search)
      const currentPage = parseInt(queryParams.currentPage)
      const perPage = parseInt(queryParams.perPage)

      this.props.dispatch(teamActions.getAll(currentPage, perPage));
      scope.setState({
        currentPage: currentPage,
        perPage: perPage
      })
    }
  
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
