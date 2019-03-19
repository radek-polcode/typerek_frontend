import React, { Component } from 'react'
import { connect } from 'react-redux'

import ReactModal from 'react-modal';
import { withNamespaces } from 'react-i18next';

import { AlertModal } from '../../_components/Modals'
import { FormModal } from '../../_components/Modals'

import './ModalContainer.css' 

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

  contentToRender() {
    const modalType =  this.props.modalType
    switch (modalType) {
      case 'form':
        return <FormModal
                  closeModal={this.closeModal}
                  {...this.props.modalProps}
                />
      case 'alert':
        return <AlertModal
                  closeModal={this.closeModal}
                  {...this.props.modalProps}
                />
      default:
        return null
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
          className="modal-dialog modal-dialog-centered"
          closeTimeoutMS={300}
          contentLabel="Modal"
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          style={customStyles}
        >
          {this.contentToRender()}
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
