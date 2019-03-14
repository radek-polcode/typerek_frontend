import { modalConstants } from '../_constants'

export const modalActions = {
  hideModal,
  showModal
}

function showModal(modalProps, modalType) {
  return dispatch => {
    dispatch(
      show()
    )
  }
  function show() { return { type: modalConstants.SHOW_MODAL, modalProps, modalType } }
}

function hideModal() {
  return dispatch => {
    dispatch(
      hide()
    )
  }

  function hide() { return { type: modalConstants.HIDE_MODAL } }
}