import React, { Component } from 'react'
import { Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { Container } from 'reactstrap'

import { alertActions } from '../_actions'
import { history } from '../_helpers'

import { AddCompetition } from '../_scenes/Admin'
import { AddTeam } from '../_scenes/Admin'
import { AddUser } from '../_scenes/Admin'
import { AppAlert } from '../_scenes/Layout/components';
import { Competitions } from '../_scenes/Admin'
import { Dashboard } from '../_scenes/Admin'
import { EditCompetition } from '../_scenes/Admin'
import { EditTeam } from '../_scenes/Admin'
import { EditUser } from '../_scenes/Admin'
import { Header, Footer } from '../_scenes/Layout/components'
import { HomePage } from '../_scenes/HomePage';
import { LoginPage } from '../_scenes/Sign';
import { PrivateRoute } from '../_components'
import { RegisterPage } from '../_scenes/Sign'
import { Teams } from '../_scenes/Admin'
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
      <div className="flex__container">
        <Router history={history}>
          <>
            <Header />
            <Container className="main">
              <div className="main__content">
                {alert.message &&
                  <AppAlert
                    message={alert.message}
                    alertType={alert.type}
                  />
                }
                <PrivateRoute exact path="/" component={HomePage} />
                <PrivateRoute exact path="/admin/competitions" component={Competitions} />
                <PrivateRoute exact path="/admin/competitions/new" component={AddCompetition} />
                <PrivateRoute exact path="/admin/competitions/:id/edit" component={EditCompetition} />
                <PrivateRoute exact path="/admin/dashboard" component={Dashboard} />
                <PrivateRoute exact path="/admin/users" component={Users} />
                <PrivateRoute exact path="/admin/users/new" component={AddUser} />
                <PrivateRoute exact path="/admin/users/:id/edit" component={EditUser} />
                <PrivateRoute exact path="/admin/teams" component={Teams} />
                <PrivateRoute exact path="/admin/teams/:page" component={Teams} />
                <PrivateRoute exact path="/admin/teams/new" component={AddTeam} />
                <PrivateRoute exact path="/admin/teams/:id/edit" component={EditTeam} />
                <Route path="/login" component={LoginPage} />
                <Route path="/register" component={RegisterPage} />
              </div>
            </Container>
            <Footer />
          </>
        </Router>
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