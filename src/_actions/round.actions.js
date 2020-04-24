import { roundConstants } from '../_constants'
import { roundService } from '../_services'
import { alertActions } from '.';
import { history } from '../_helpers'
import i18n from '../i18n';

export const roundActions = {
  getAll
};

function getAll() {
  return dispatch => {
    dispatch(request());
    roundService.getAll()
      .then(
        rounds => {
          dispatch(success(rounds));
        },
        error => dispatch(failure(error.toString()))
      );
  };

  function request() { return { type: roundConstants.GETALL_REQUEST } }
  function success(rounds) { return { type: roundConstants.GETALL_SUCCESS, rounds } }
  function failure(error) { return { type: roundConstants.GETALL_FAILURE, error } }
}