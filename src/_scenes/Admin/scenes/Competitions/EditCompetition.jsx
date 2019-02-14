import React, { Component } from 'react'
import { connect } from 'react-redux'

import { CompetitionForm } from './';

class EditCompetition extends Component {
  render() {
    const id = this.props.match.params.id
    return (
        <>
          <CompetitionForm 
            isEditing={true}
            competition={
              this.props.competitions.items.filter(
                competition => competition.id === id
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
const connectedEditCompetition = connect(mapStateToProps)(EditCompetition);
export { connectedEditCompetition as EditCompetition };
