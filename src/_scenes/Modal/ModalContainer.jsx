import React, { Component } from 'react'
import { connect } from 'react-redux'

import ReactModal from 'react-modal';
import { withNamespaces } from 'react-i18next';

import { FormModal } from '../../_components/Modals'

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
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          contentLabel="Example Modal"
          ariaHideApp={false}
          overlayClassName="fade show"
          bodyOpenClassName="modal-open"
          className="modal-dialog modal-dialog-centered"
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
