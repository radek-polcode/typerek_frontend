import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

import { Link } from 'react-router-dom';
import { 
  Dropdown, 
  DropdownItem, 
  DropdownMenu, 
  DropdownToggle 
} from 'reactstrap'

import styles from './ItemsPerPageDropdown.module.css'

class ItemsPerPageDropdown extends Component {
  static propTypes = {
    perPage: PropTypes.number.isRequired,
    onPerPageChanged: PropTypes.func.isRequired
  }

  static defaultProps = {
    perPage: 20
  }

  state = {
    dropdownOpen: false,
    perPage: this.props.perPage
  }

  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.handleOnClick = this.handleOnClick.bind(this);
  }

  handleOnClick(e) {
    const btnContent = e.target.textContent
    const perPage = parseInt(btnContent, 10)
    
    this.setState({perPage: perPage})
    this.props.onPerPageChanged(perPage)
  }

  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }


  render() {
    return (
      <Fragment>
        <Dropdown
          className={styles.dropdown__itemsPerPage}
          isOpen={this.state.dropdownOpen}
          setActiveFromChild
          size="sm"
          toggle={this.toggle}
        >
        <DropdownToggle caret>
          Per page: {this.state.perPage}
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem 
            onClick={this.handleOnClick}
            tag={Link}
            to={`1&perPage=10`}
          >10
          </DropdownItem>
          <DropdownItem
            to={`1&perPage=20`}
            onClick={this.handleOnClick}
            tag={Link}
          >20
          </DropdownItem>
          <DropdownItem
            to={`1&perPage=50`}
            onClick={this.handleOnClick}
            tag={Link}
          >
            50
          </DropdownItem>
        </DropdownMenu>
        </Dropdown>
      </Fragment>
    )
  }
}

export { ItemsPerPageDropdown }