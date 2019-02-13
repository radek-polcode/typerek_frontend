import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { withNamespaces } from 'react-i18next';

class Dashboard extends Component {
  static propTypes = {}

  render() {
    const { t } = this.props;
    return (
      <div>
        <h2>{t('admin.dashboard.title')}</h2>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {};
}

const connectedDashboard = connect(mapStateToProps)(Dashboard);
const translatedDashboard = withNamespaces()(connectedDashboard)

export { translatedDashboard as Dashboard }; 
