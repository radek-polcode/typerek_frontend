import React, { Component } from 'react'
import { connect } from 'react-redux'

import ReactModal from 'react-modal';
import { withNamespaces } from 'react-i18next';

import { FormModal } from '../../_components/Modals'

const customStyles = {
  overlay: {
    backgroundColor: "rgba(58, 65, 73, 0.75)"
  }
}
class ModalContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false
    };
    this.closeModal = this.closeModal.bind(this)
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.modalProps.open !== prevState.modalIsOpen) {
      return {
        modalIsOpen: nextProps.modalProps.open
      }
    } else {
      return null;
    }
  }

  closeModal() {
    this.setState({ modalIsOpen: false })
  }

  render() {
    if (!this.props.modalType) {
      return null
    }
    return (
      <div>
        <ReactModal
          ariaHideApp={false}
          bodyOpenClassName="modal-open"
          className="modal-dialog modal-dialog-centered"
          contentLabel="Example Modal"
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          style={customStyles}
        >
          <FormModal
            closeModal={this.closeModal}
            {...this.props.modalProps}
          />
        </ReactModal>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { modalProps, modalType } = state.modal;
  return {
    modalProps,
    modalType
  };
}

const connectedModalContainer = connect(mapStateToProps)(ModalContainer);
const translatedModalContainer = withNamespaces()(connectedModalContainer)

export { translatedModalContainer as ModalContainer }; 
