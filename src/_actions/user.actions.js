import { userConstants} from '../_constants'
import { userService } from '../_services'
import { alertActions } from '.';
import { history } from '../_helpers'

export const userActions = {
  addUser,
  updateUser,
  login,
  logout, 
  register,
  getAll,
  delete: _delete
};

function login(email, password) {
  return dispatch => {
    dispatch(request({ email }));

    userService.login(email, password)
      .then(
        user => {
          dispatch(success(user));
          history.push('/admin/dashboard');
        },
        error => {
          dispatch(failure(error.toString()));
        }
      );
  };

  function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
  function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
  function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function logout() {
  return dispatch => {
    userService.logout();
    dispatch(success());
    dispatch(alertActions.success('Wylogowano'))
    history.push('/login');
  }

  function success() { return { type: userConstants.LOGOUT } }
}

function register(user) {
  return dispatch => {
    dispatch(request(user));

    userService.register(user)
      .then(
        user => {
          dispatch(success());
          history.push('/login');
          dispatch(alertActions.success('Registration successful'));
        },
        error => {
          dispatch(failure(error.toString()));
          dispatch(alertActions.error(error.toString()));
        }
      );
  };

  function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
  function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
  function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}

function getAll() {
  return dispatch => {
    dispatch(request());

    userService.getAll()
      .then(
        users => dispatch(success(users)),
        error => dispatch(failure(error.toString()))
      );
  };

  function request() { return { type: userConstants.GETALL_REQUEST } }
  function success(users) { return { type: userConstants.GETALL_SUCCESS, users } }
  function failure(error) { return { type: userConstants.GETALL_FAILURE, error } }
}

function addUser(user) {
  return dispatch => {
    dispatch(request());
    userService.addUser(user)
      .then(
        user => {
          dispatch(success(user));
          history.push('/admin/users');
          dispatch(alertActions.success('User added successfully'));
        },
        error => {
          dispatch(failure(error.toString()));
          dispatch(alertActions.error(error.toString()));
        }
    );
  };

  function request(user) { return { type: userConstants.ADDUSER_REQUEST, user } }
  function success(user) { return { type: userConstants.ADDUSER_SUCCESS, user } }
  function failure(error) { return { type: userConstants.ADDUSER_FAILURE, error } }
}

function updateUser(user, id) {
  return dispatch => {
    dispatch(request());
    userService.updateUser(user, id)
      .then(
        user => {
          dispatch(success(user));
          history.push('/admin/users');
          dispatch(alertActions.success('User edited successfully'));
        },
        error => {
          dispatch(failure(error.toString()));
          dispatch(alertActions.error(error.toString()));
        }
      )
  };

  function request(user) { return { type: userConstants.UPDATEUSER_REQUEST, user } }
  function success(user) { return { type: userConstants.UPDATEUSER_SUCCESS, user } }
  function failure(error) { return { type: userConstants.UPDATEUSER_FAILURE, error } }
}

function _delete(id) {
  return dispatch => {
    dispatch(request(id));

    userService.delete(id)
      .then(
        user => dispatch(success(id)),
        error => dispatch(failure(id, error.toString()))
      );
  };

  function request(id) { return { type: userConstants.DELETE_REQUEST, id } }
  function success(id) { return { type: userConstants.DELETE_SUCCESS, id } }
  function failure(id, error) { return { type: userConstants.DELETE_FAILURE, id, error } }
}