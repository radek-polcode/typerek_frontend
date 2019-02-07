import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link, IndexLink, Router } from 'react-router-dom';
import { connect } from 'react-redux'

import { store } from '../../../_helpers'
import { userActions } from '../../../_actions'

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';
import { AdminLinks } from './AdminLinks';


class Header extends Component {
  constructor(props) {
    super(props)
    this.toggle = this.toggle.bind(this);
  }

  state = {
    isOpen: false,
    loggedIn: false,
    loggedInRole: ''
  }

  static propTypes = {}

  componentDidMount() {
    // it might be done better I suppose, but now don't now how
    let currentState = store.getState()
    this.setState({
      loggedIn: currentState.authentication.loggedIn
    })

    if (currentState.authentication.user) {
      this.setState({
        loggedInRole: currentState.authentication.user.data.role,
      })
    }
  }

  handleDeleteUser(id) {
    return (e) => this.props.dispatch(userActions.delete(id));
  }

  setLinkText() {
    if (this.state.loggedIn) {
      return 'Logout' 
    } else {
      return 'Login'
    }
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    const loggedIn = this.state.loggedIn
    const role = this.state.loggedInRole

    return (
    <header className="app-header">
      <Navbar
        className="navbar navbar-dark fixed-top bg-dark"
        color="dark"
        expand="md"
      >
        <NavbarBrand tag={Link} to="/">Typerek</NavbarBrand>
        <NavbarToggler 
          onClick={this.toggle}
        >
          <span className="navbar-toggler-icon"></span>
        </NavbarToggler>
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="mr-auto">
            <NavItem active>
              <NavLink href="#">Rules <span className="sr-only">(current)</span></NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#">Tournaments</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#">Your groups</NavLink>
            </NavItem>
          </Nav>
          <Nav className="ml-auto">
            { loggedIn && role === 'admin' &&
              <AdminLinks />
            }
            <NavItem>
              <NavLink 
                tag={Link}
                to="/login"
              >
                {this.setLinkText()}
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </header>
    )
  }
}

function mapStateToProps(state) {
  return {
    auth: state.authentication
  };
}
const connectedHeader = connect(mapStateToProps)(Header);

export { connectedHeader as Header };
