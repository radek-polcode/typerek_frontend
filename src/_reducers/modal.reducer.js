import { modalConstants } from '../_constants';

const initialState = {
  modalProps: {},
  modalType: null
}

export function modal(state = initialState, action) {
  switch(action.type) {
    case modalConstants.SHOW_MODAL:
      return {
        modalProps: action.modalProps,
        modalType: action.modalType,
        type: action.type
      }
    case modalConstants.HIDE_MODAL:
      return {
        initialState
      }
    default: 
      return state
  }
}