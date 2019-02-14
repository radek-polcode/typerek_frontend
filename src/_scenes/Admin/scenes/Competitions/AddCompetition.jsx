import React, { Component } from 'react'
import { connect } from 'react-redux'

import { CompetitionForm } from './';

class AddCompetition extends Component {
  render() {
    const competition = {
      attributes: {
        email: '',
        competitionname: '',
        role: 'registered',
        takesPart: true
      }
    }
    return (
        <>
          <CompetitionForm 
            isEditing={false}
            competition={competition}
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
const connectedCompetitionForm = connect(mapStateToProps)(AddCompetition);
export { connectedCompetitionForm as AddCompetition };
