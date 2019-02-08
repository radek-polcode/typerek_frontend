import React, { Component } from 'react';
import { connect } from 'react-redux'
import propTypes from 'prop-types'
import { Alert } from 'reactstrap'
import { alertActions } from '../../../_actions'

class AppAlert extends Component {
  constructor(props) {
    super(props);

    this.onDismiss = this.onDismiss.bind(this);
  }

  state = {
    visible: true,
    alertType: this.props.alertType.replace(/alert-/, ''),
    message: this.props.message
  };

  static propTypes = {
    message: propTypes.string.isRequired,
    alertType: propTypes.string.isRequired
  }

  onDismiss() {
    const { dispatch } = this.props;
    this.setState({ visible: false });
    dispatch(alertActions.clear());
  }

  render() {
    const { alertType, message, visible } = this.state;
    return (
      <Alert 
        color={alertType} 
        isOpen={visible} 
        toggle={this.onDismiss}
      >
        {message}
      </Alert>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

const connectedApp = connect(mapStateToProps)(AppAlert);
export { connectedApp as AppAlert }; 