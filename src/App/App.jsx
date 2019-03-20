import React, { Component } from 'react'
import { Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { Container } from 'reactstrap'

import { alertActions } from '../_actions'
import { modalActions } from '../_actions'
import { history } from '../_helpers'

import { AddCompetition } from '../_scenes/Admin'
import { Competitions } from '../_scenes/Admin'
import { Dashboard } from '../_scenes/Admin'
import { EditCompetition } from '../_scenes/Admin'
import { Header, Footer } from '../_scenes/Layout/components'
import { HomePage } from '../_scenes/HomePage';
import { LoginPage } from '../_scenes/Sign';
import { ModalContainer } from '../_scenes/Modal'
import { PrivateRoute } from '../_components'
import { RegisterPage } from '../_scenes/Sign'
import { Teams } from '../_scenes/Admin'
import { Users } from '../_scenes/Admin'

import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.openFormModal = this.openFormModal.bind(this)
    this.closeAlertModal = this.closeAlertModal.bind(this);
    this.closeFormModal = this.closeFormModal.bind(this);

    history.listen((location, action) => {
      // clear alert on location change
      this.props.clearAlerts();
    });
  }

  closeAlertModal() {
    this.props.hideModal()
    this.props.clearAlerts();
  }

  closeFormModal() {
    this.props.hideModal();
  }

  openFormModal() {
    this.props.showModal({
      open: true,
      title: 'Form Modal',
      message: 'MESSAGE',
      closeModal: this.closeFormModal
    }, 'form')
  }

  openAlertModal(alert) {
    if (alert.modal && alert.message) {
      this.props.showModal({
        open: true,
        title: 'Alert Modal',
        message: alert.message,
        closeModal: this.closeAlertModal
      }, 'alert')
    }
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
                { alert.message && this.openAlertModal(alert) }
                <PrivateRoute exact path="/" component={HomePage} />
                <PrivateRoute exact path="/admin/competitions" component={Competitions} />
                <PrivateRoute exact path="/admin/dashboard" component={Dashboard} />
                <PrivateRoute exact path="/admin/users" component={Users} />
                <PrivateRoute exact path="/admin/teams" component={Teams} />
                <Route path="/login" component={LoginPage} />
                <Route path="/register" component={RegisterPage} />
              </div>
            </Container>
            <Footer />
            <ModalContainer />
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

const mapDispatchToProps = dispatch => ({
  clearAlerts: () => dispatch(alertActions.clear()),
  hideModal: () => dispatch(modalActions.hideModal()),
  showModal: (modalProps, modalType) => {
    dispatch(modalActions.showModal(modalProps, modalType ))
  }
})

const connectedApp = connect(mapStateToProps, mapDispatchToProps)(App);
export { connectedApp as App }; 