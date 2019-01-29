import React, { Component } from 'react'
import PropTypes from 'prop-types'
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

  static propTypes = {
    prop: PropTypes
  }

  handleDeleteUser(id) {
    return (e) => this.props.dispatch(userActions.delete(id));
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return (
    <header className="app-header">
      <Navbar
        className="navbar navbar-dark fixed-top bg-dark"
        color="dark"
        expand="md"
      >
        <NavbarBrand href="#">Typerek</NavbarBrand>
        <NavbarToggler 
          onClick={this.toggle}
        >
          <span class="navbar-toggler-icon"></span>
        </NavbarToggler>
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="mr-auto">
            <NavItem active>
              <NavLink href="#">Rules <span class="sr-only">(current)</span></NavLink>
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
              <NavLink href="#">Admin</NavLink>
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

export { Header as Header }; 

