import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { 
  Dropdown, 
  DropdownItem, 
  DropdownMenu, 
  DropdownToggle 
} from 'reactstrap'

class ItemsPerPageDropdown extends Component {
  static propTypes = {
    perPage: PropTypes.string.isRequired,
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
          isOpen={this.state.dropdownOpen}
          size="sm"
          toggle={this.toggle}
          setActiveFromChild
        >
        <DropdownToggle caret>
          Per page: {this.state.perPage}
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem 
            onClick={this.handleOnClick}
          >10</DropdownItem>
          <DropdownItem onClick={this.handleOnClick}>20</DropdownItem>
          <DropdownItem onClick={this.handleOnClick}>50</DropdownItem>
        </DropdownMenu>
        </Dropdown>
      </Fragment>
    )
  }
}

export { ItemsPerPageDropdown }