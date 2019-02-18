import React, { Component } from 'react'
import { connect } from 'react-redux'

import { TeamForm } from './';

class AddTeam extends Component {
  render() {
    const team = {
      attributes: {
        name: '',
        nameEn: '',
        abbreviation: '',
        flag: '',
        photo: ''
      }
    }
    return (
        <>
          <TeamForm 
            isEditing={false}
            team={team}
          />
        </>
    )
  }
}
function mapStateToProps(state) {
  return {
    ...state
  };
}
const connectedTeamForm = connect(mapStateToProps)(AddTeam);
export { connectedTeamForm as AddTeam };
