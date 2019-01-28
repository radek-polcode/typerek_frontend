import React, { Component } from 'react'
import { Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { Container } from 'reactstrap'

import { history } from '../_helpers'
import { alertActions } from '../_actions'
import { PrivateRoute } from '../_components'
import { HomePage } from '../HomePage';
import { LoginPage } from '../Sign';
import { RegisterPage } from '../Sign'

import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    const { dispatch } = this.props;
    history.listen((location, action) => {
      // clear alert on location change
      dispatch(alertActions.clear());
    });
  }

  render() {
    const { alert } = this.props;
    return (
        <div className="app">
            <Container>
                {alert.message &&
                    <div className={`alert ${alert.type}`}>{alert.message}</div>
                }
                <Router history={history}>
                    <div>
                        <PrivateRoute exact path="/" component={HomePage} />
                        <Route path="/login" component={LoginPage} />
                        <Route path="/register" component={RegisterPage} />
                    </div>
                </Router>
            </Container>
        </div>
    );
  }
}

function mapStateToProps(state) {
  const { alert } = state;
  return {
      alert
  };
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App }; 