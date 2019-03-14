import React, { Component } from 'react'
import { connect } from 'react-redux'

import { TeamForm } from './';

class EditTeam extends Component {
  render() {
    const id = this.props.match.params.id
    return (
        <>
          <TeamForm 
            isEditing={true}
            team={
              this.props.teams.items.filter(
                team => team.id === id
              )[0]
            }
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
const connectedEditTeam = connect(mapStateToProps)(EditTeam);
export { connectedEditTeam as EditTeam };
