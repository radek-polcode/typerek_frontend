import { authenticationConstants } from '../_constants';

let user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? { loggedIn: true, user } : { loggedIn: false };

export function authentication(state = initialState, action) {
  switch (action.type) {
    case authenticationConstants.LOGIN_REQUEST:
      return {
        loggingIn: true,
      };
    case authenticationConstants.LOGIN_SUCCESS:
      return {
        loggedIn: true,
        user: action.authentication.data
      };
    case authenticationConstants.LOGIN_FAILURE:
      return { 
        error: action.error
      };
    case authenticationConstants.LOGOUT:
      return {};
    default:
      return state
  }
}