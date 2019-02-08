import React, { Component } from 'react'
import { Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { Container } from 'reactstrap'

import { history } from '../_helpers'
import { alertActions } from '../_actions'
import { PrivateRoute } from '../_components'
import { Header, Footer } from '../_scenes/Layout/components'
import { HomePage } from '../_scenes/HomePage';
import { LoginPage } from '../_scenes/Sign';
import { RegisterPage } from '../_scenes/Sign'
import { Dashboard } from '../_scenes/Admin'
import { Users } from '../_scenes/Admin'
import { AddUser } from '../_scenes/Admin'
import { EditUser } from '../_scenes/Admin'

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
                        {alert.message &&
                            <div className={`alert ${alert.type}`}>{alert.message}</div>
                        }
                            <div className="main__content">
                                <PrivateRoute exact path="/" component={HomePage} />
                                <PrivateRoute exact path="/admin/dashboard" component={Dashboard} />
                                <PrivateRoute exact path="/admin/users" component={Users} />
                                <PrivateRoute exact path="/admin/users/new" component={AddUser} />
                                <PrivateRoute exact path="/admin/users/:id/edit" component={EditUser} />
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