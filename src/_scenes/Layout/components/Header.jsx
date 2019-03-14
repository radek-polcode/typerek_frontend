import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap'
import { withNamespaces } from 'react-i18next'

import { AdminLinks } from './AdminLinks'
import i18n from '../../../i18n'
import LanguageSwitcher from './LanguageSwitcher'
import { userActions } from '../../../_actions'

class Header extends Component {
  constructor(props) {
    super(props)
    this.toggle = this.toggle.bind(this);
    this.changeLanguage = this.changeLanguage.bind(this);
  }

  state = {
    loggedIn: false,
    isOpen: false,
  }

  static propTypes = {}

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.loggedIn) {
      return {
        loggedIn: true
      }
    }
  }

  changeLanguage(lng){
    i18n.changeLanguage(lng);
  };

  handleDeleteUser(id) {
    return (e) => this.props.dispatch(userActions.delete(id));
  }

  setLinkText() {
    const {  t } = this.props
    if (this.state.loggedIn) {
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
    const changeLanguage = this.changeLanguage
    const countriesWithLanguages = {
      "gb": {
        "language": "en",
        "flagCode": "gb"
      },
      "pl": {
        "language": "pl",
        "flagCode": "pl"
      }
    }
    const size = 32
    
    const { authentication, t } = this.props;

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
              <LanguageSwitcher
                changeLanguage={changeLanguage}
                countries={countriesWithLanguages} 
                size={size}
              />
              { authentication && authentication.user && authentication.user.role === 'admin' &&
                <AdminLinks />
              }
              <NavItem>
                <NavLink 
                  tag={Link}
                  to="/login"
                  onClick={this.handleLogout}
                >
                  {authentication.loggedIn ? 'Logout' : 'Login'}
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
  return {
      authentication,
      users
  };
}

const connectedHeader = connect(mapStateToProps)(Header);
const translatedHeader = withNamespaces()(connectedHeader)

export { translatedHeader as Header };
