import { alertConstants } from '../_constants';

export const alertActions = {
  success,
  error,
  clear
}

function success(action = '', message, modal = true) {
  return { 
    action: action, 
    message,
    modal,
    type: alertConstants.SUCCESS
  }
}

function error(action = '', message, modal = true) {
  return {
    action: action,
    message,
    modal,
    type: alertConstants.ERROR
  }
}

function clear(action = '', message, modal = true) {
  return {
    action: action,
    message,
    modal,
    type: alertConstants.CLEAR
  }
}