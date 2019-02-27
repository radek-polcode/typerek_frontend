import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import queryString from 'query-string';
import { withNamespaces } from 'react-i18next';
import { Card, CardHeader, CardBody, Table } from 'reactstrap';

import { Pagination, ItemsPerPageDropdown } from '../../../../_components';
import { teamActions } from '../../../../_actions/team.actions'

import { TeamsTableRow } from  './TeamsTableRow'

export default class Teams extends Component {
  static propTypes = {
  }

  constructor(props) {
    super(props)

    this.state = { 
      perPage: props.teams.meta.per_page,
      totalPages: props.teams.meta.total_pages,
      totalRecords: props.teams.meta.total_records
    }

    this.handleDeleteTeam = this.handleDeleteTeam.bind(this)
    this.onPageChanged = this.onPageChanged.bind(this)
    this.onPerPageChanged = this.onPerPageChanged.bind(this)
  }

  componentDidMount() {
    this.props.dispatch(teamActions.getAll());
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
            <Table
                responsive
              >
                <thead>
                  <tr>
                    <th>#</th>
                    <th>{t('admin.teamsTable.teamName')}</th>
                    <th>{t('admin.teamsTable.teamNameEn')}</th>
                    <th>{t('admin.teamsTable.abbreviation')}</th>
                    <th>{t('admin.teamsTable.flag')}</th>
                    <th>{t('admin.teamsTable.photo')}</th>
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
          </CardBody>
          <Pagination
            currentPage={currentPage}
            onPageChanged={onPageChanged}
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
