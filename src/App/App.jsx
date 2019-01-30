import React, { Component } from 'react'
import { Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { Container } from 'reactstrap'

import { history } from '../_helpers'
import { alertActions } from '../_actions'
import { PrivateRoute } from '../_components'
import { Header } from '../_scenes/Layout/components'
import { HomePage } from '../_scenes/HomePage';
import { LoginPage } from '../_scenes/Sign';
import { RegisterPage } from '../_scenes/Sign'
import { Dashboard } from '../_scenes/Admin'
import { Users } from '../_scenes/Admin'

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
            <Header />
            <Container className="main__container">
                {alert.message &&
                    <div className={`alert ${alert.type}`}>{alert.message}</div>
                }
                <Router history={history}>
                    <div>
                        <PrivateRoute exact path="/" component={HomePage} />
                        <PrivateRoute exact path="/admin/dashboard" component={Dashboard} />
                        <PrivateRoute exact path="/admin/users" component={Users} />
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