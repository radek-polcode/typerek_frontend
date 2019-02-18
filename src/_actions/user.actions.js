import { userConstants} from '../_constants'
import { userService } from '../_services'
import { alertActions } from '.';
import { history } from '../_helpers'
import i18n from '../i18n';

export const userActions = {
  addUser,
  updateUser,
  getAll,
  delete: _delete
};

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
  let t = i18n.t.bind(i18n);

  return dispatch => {
    dispatch(request());
    userService.addUser(user)
      .then(
        user => {
          dispatch(success(user));
          history.push('/admin/users');
          dispatch(alertActions.success(
            t('alerts.users.addedSuccessfully')
          ));
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
  let t = i18n.t.bind(i18n);

  return dispatch => {
    dispatch(request());
    userService.updateUser(user, id)
      .then(
        user => {
          dispatch(success(user));
          history.push('/admin/users');
          dispatch(alertActions.success(
            t('alerts.users.editedSuccessfully')
          ));
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
  let t = i18n.t.bind(i18n);

  return dispatch => {
    dispatch(request(id));

    userService.delete(id)
      .then(
        user => {
          dispatch(success(id));
          dispatch(alertActions.success(
            t('alerts.users.removedSuccessfully')
          ));
        },
        error => {
          dispatch(failure(id, error.toString()))
        }
      );
  };

  function request(id) { return { type: userConstants.DELETE_REQUEST, id } }
  function success(id) { return { type: userConstants.DELETE_SUCCESS, id } }
  function failure(id, error) { return { type: userConstants.DELETE_FAILURE, id, error } }
}