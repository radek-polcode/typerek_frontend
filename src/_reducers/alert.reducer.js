import { alertConstants } from '../_constants';

export function alert(state = {}, action) {
  switch(action.type) {
    case alertConstants.SUCCESS:
      return {
        action: action.action,
        message: action.message,
        modal: action.modal,
        type: 'alert-success'
      };
    case alertConstants.ERROR:
      return {
        action: action.action,
        message: action.message,
        modal: action.modal,
        type: 'alert-danger'
      };
    case alertConstants.CLEAR:
      return {};
    default:
      return state
  }
}