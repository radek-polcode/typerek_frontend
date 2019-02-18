import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withNamespaces } from 'react-i18next';


export default class Teams extends Component {
  static propTypes = {
  }

  constructor(props) {
    super(props)
    this.handleDeleteTeam = this.handleDeleteTeam.bind(this)
  }

  componentDidMount() {}

  handleDeleteTeam(id) {}

  render() {
    const { teams, t } = this.props
    const handleDeleteTeam = this.handleDeleteTeam

    return (
      <div>
        <Link to='/admin/teams/new'>{t('admin.teamsTable.addNewTeam')}</Link>
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
