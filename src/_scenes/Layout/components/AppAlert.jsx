import React, { Component } from 'react';
import propTypes from 'prop-types'
import { Alert } from 'reactstrap'

class AppAlert extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: true
    };

    this.onDismiss = this.onDismiss.bind(this);
  }

  static PropTypes = {
    message: propTypes.string.isRequired
  }

  onDismiss() {
    this.setState({ visible: false });
  }

  getAlertType(alertType) {
    alertType.replace(/alert/, '')
  }

  render() {
    const { message, alertType } = this.props;
    return (
      <Alert 
        color={this.getAlertType(alertType)} 
        isOpen={this.state.visible} 
        toggle={this.onDismiss}
      >
        {message}
      </Alert>
    );
  }
}

export { AppAlert };