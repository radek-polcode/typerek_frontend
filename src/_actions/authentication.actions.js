import { authenticationConstants } from '../_constants'
import { authenticationService } from '../_services'
import { alertActions } from '.';
import { history } from '../_helpers'
import i18n from '../i18n';

export const authenticationActions = {
  login,
  logout, 
  register,
};

function login(email, password) {
  return dispatch => {
    dispatch(request({ email }));

    authenticationService.login(email, password)
      .then(
        authentication => {
          dispatch(success(authentication));
          history.push('/admin/dashboard');
        },
        error => {
          dispatch(failure(error.toString()));
        }
      );
  };

  function request(authentication) { return { type: authenticationConstants.LOGIN_REQUEST, authentication } }
  function success(authentication) { return { type: authenticationConstants.LOGIN_SUCCESS, authentication } }
  function failure(error) { return { type: authenticationConstants.LOGIN_FAILURE, error } }
}

function logout() {
  let t = i18n.t.bind(i18n);

  return dispatch => {
    authenticationService.logout();
    dispatch(success());
    dispatch(alertActions.success(
      authenticationConstants.LOGOUT,
      t('alerts.authentication.logout')
    ))
    history.push('/login');
  }

  function success() { return { type: authenticationConstants.LOGOUT } }
}

function register(authentication) {
  let t = i18n.t.bind(i18n);

  return dispatch => {
    dispatch(request(authentication));

    authenticationService.register(authentication)
      .then(
        authentication => {
          dispatch(success());
          history.push('/login');
          dispatch(alertActions.success(
            authenticationConstants.REGISTER_SUCCESS,
            t('alerts.authentications.registeredSuccessfully')
          ));
        },
        error => {
          dispatch(failure(error.toString()));
          dispatch(
            alertActions.error(
              authenticationConstants.REGISTER_SUCCESS,
              error.toString()
            )
          );
        }
      );
  };

  function request(authentication) { return { type: authenticationConstants.REGISTER_REQUEST, authentication } }
  function success(authentication) { return { type: authenticationConstants.REGISTER_SUCCESS, authentication } }
  function failure(error) { return { type: authenticationConstants.REGISTER_FAILURE, error } }
}