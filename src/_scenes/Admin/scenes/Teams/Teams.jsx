import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withNamespaces } from 'react-i18next';
import { Card, CardHeader, CardBody, Table } from 'reactstrap';
import queryString from 'query-string'

import { ItemsPerPageDropdown, LoadingView, Pagination } from '../../../../_components';
import { teamActions } from '../../../../_actions/team.actions'

import { TeamsTableRow } from  './TeamsTableRow'

export default class Teams extends Component {
  static propTypes = {
  }

  constructor(props) {
    super(props)
    this.state = {
      currentPage: 1,
      path: '/admin/teams',
      perPage: 20,
      totalPages: undefined,
      totalRecords: undefined
    }

    this.handleDeleteTeam = this.handleDeleteTeam.bind(this)
    this.onPageChanged = this.onPageChanged.bind(this)
    this.onPerPageChanged = this.onPerPageChanged.bind(this)
  }

  componentDidMount() {
    const { currentPage, perPage } = this.state
    this.props.dispatch(teamActions.getAll(currentPage, perPage));
  }

  static getDerivedStateFromProps(nextProps, prevState){
    if (nextProps.teams.meta && 
        (nextProps.teams.meta.current_page !== prevState.currentPage ||
         nextProps.teams.meta.per_page !== prevState.perPage ||
         nextProps.teams.meta.total_pages !== prevState.totalPages ||
         nextProps.teams.meta.total_records !== prevState.totalRecords)
        ) {
      return {
        currentPage: nextProps.teams.meta.current_page,
        perPage: nextProps.teams.meta.per_page,
        totalPages: nextProps.teams.meta.total_pages,
        totalRecords: nextProps.teams.meta.total_records
      };
    } else return null;
  }

  componentDidUpdate(nextProps, prevState){
    // REFACTOR
    const parsedUrl = queryString.parse(this.props.location.search)
    const currentPageFromUrl = parseInt(parsedUrl.currentPage)
    const perPageFromUrl = parseInt(parsedUrl.perPage) 
    const scope = this
    if (
      (currentPageFromUrl && prevState.currentPage !== currentPageFromUrl) ||
      (perPageFromUrl && prevState.perPage !== perPageFromUrl)
    ) {
      scope.setState({
        currentPage: currentPageFromUrl,
        perPage: perPageFromUrl
      })
      scope.props.dispatch(teamActions.getAll(currentPageFromUrl, perPageFromUrl));
    } else if (
      scope.props.teams.meta && 
      scope.props.teams.meta.current_page !== currentPageFromUrl
    ) {
      window.onpopstate  = (e) => {
        scope.setState({
          currentPage: currentPageFromUrl,
          perPage: perPageFromUrl
        })
        scope.props.dispatch(teamActions.getAll(currentPageFromUrl, perPageFromUrl));
      }
    } else {
      return null
    }
  
  }

  handleDeleteTeam(id) {
    return this.props.dispatch(teamActions.delete(id));
  }

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
    })
  }

  render() {
    const { teams, t } = this.props
    const { currentPage, path, perPage, totalPages, totalRecords } = this.state
    const handleDeleteTeam = this.handleDeleteTeam
    const isLoading = this.props.teams.loading
    const onPageChanged = this.onPageChanged
    const onPerPageChanged = this.onPerPageChanged

    return (
      <div>
        <Link to='/admin/teams/new'>{t('admin.teamsTable.addNewTeam')}</Link>
        <Card className="card__form">
          <CardHeader 
            className="card__form__header"
          >
            <h2 className="card__form__title">{t('admin.teamsTable.title')}</h2>
            <ItemsPerPageDropdown
              perPage={perPage}
              onPerPageChanged={onPerPageChanged}
            />
          </CardHeader>
          <CardBody>
            {isLoading && perPage
            ? <LoadingView
                perPage={perPage}
             />
            : <Table
                responsive
              >
                <thead>
                  <tr>
                    <th>#</th>
                    <th>{t('admin.teamsTable.teamName')}</th>
                    <th>{t('admin.teamsTable.teamNameEn')}</th>
                    <th>{t('admin.teamsTable.abbreviation')}</th>
                    <th>{t('admin.teamsTable.flag')}</th>
                    <th>{t('shared.action')}</th>
                  </tr>
                </thead>
                <tbody>
                  {teams.items &&
                    teams.items.map((team, index) =>
                    <TeamsTableRow
                      handleDeleteTeam={handleDeleteTeam}
                      index={index}
                      key={team.id}
                      page={currentPage}
                      perPage={perPage}
                      team={team}
                    />
                  )}
                </tbody>
            </Table>
            }           
          </CardBody>
          <Pagination
            currentPage={currentPage}
            onPageChanged={onPageChanged}
            path={path}
            perPage={perPage}
            totalPages={totalPages}
            totalRecords={totalRecords}
          />
        </Card>
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
