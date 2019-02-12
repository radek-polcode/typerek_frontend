import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';
import { withNamespaces } from 'react-i18next';

import { AdminLinks } from './AdminLinks';
import { userActions } from '../../../_actions'

class Header extends Component {
  constructor(props) {
    super(props)
    this.toggle = this.toggle.bind(this);
  }

  state = {
    isOpen: false,
  }

  static propTypes = {}

  handleDeleteUser(id) {
    return (e) => this.props.dispatch(userActions.delete(id));
  }

  setLinkText() {
    const { user, t } = this.props
    if (user) {
      return t('navbar.logout')
    } else {
      return t('navbar.login')
    }
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    const { user, t } = this.props;

    return (
      <header className="app-header">
        <Navbar
          className="navbar navbar-dark fixed-top bg-dark"
          color="dark"
          expand="md"
        >
          <NavbarBrand tag={Link} to="/">{t('navbar.brandName')}</NavbarBrand>
          <NavbarToggler 
            onClick={this.toggle}
          >
            <span className="navbar-toggler-icon"></span>
          </NavbarToggler>
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="mr-auto">
              <NavItem active>
                <NavLink href="#">{t('navbar.rules')} <span className="sr-only">(current)</span></NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#">{t('navbar.tournaments')}</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#">{t('navbar.yourGroups')}</NavLink>
              </NavItem>
            </Nav>
            <Nav className="ml-auto">
              { user && user.data && user.data.role === 'admin' &&
                <AdminLinks />
              }
              <NavItem>
                <NavLink 
                  tag={Link}
                  to="/login"
                  onClick={this.handleLogout}
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
  const { users, authentication } = state;
  const { user } = authentication;
  return {
      user,
      users
  };
}

const connectedHeader = connect(mapStateToProps)(Header);
const translatedHeader = withNamespaces()(connectedHeader)

export { translatedHeader as Header };
