import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';

class Dashboard extends Component {
  static propTypes = {}

  render() {
    return (
      <div>
        <h2>Dashboard</h2>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {};
}

const connectedDashboard = connect(mapStateToProps)(Dashboard);
export { connectedDashboard as Dashboard }; 
