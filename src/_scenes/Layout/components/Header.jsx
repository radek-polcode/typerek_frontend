import React, { Component } from 'react'
import PropTypes from 'prop-types'
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


import { userActions } from '../../../_actions' 


class Header extends Component {
  constructor(props) {
    super(props)
    this.toggle = this.toggle.bind(this);
  }

  state = {
    isOpen: false
  }

  static propTypes = {}

  handleDeleteUser(id) {
    return (e) => this.props.dispatch(userActions.delete(id));
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    console.log(this.props)
    return (
    <header className="app-header">
      <Navbar
        className="navbar navbar-dark fixed-top bg-dark"
        color="dark"
        expand="md"
      >
        <NavbarBrand href="/">Typerek</NavbarBrand>
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
            <NavItem>
              <NavLink href="/admin/dashboard">Dashboard</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/admin/users">Users</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#">Logout</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </header>
    )
  }
}

function mapStateToProps(state) {
  return {};
}
const connectedHeader = connect(mapStateToProps)(Header);

export { connectedHeader as Header };
