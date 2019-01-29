import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';

class Dashboard extends Component {
  static propTypes = {
    prop: PropTypes
  }

  render() {
    return (
      <div>
        
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
      'asd': 'asd'
  };
}

const connectedDashboard = connect(mapStateToProps)(Dashboard);
export { connectedDashboard as Dashboard }; 
