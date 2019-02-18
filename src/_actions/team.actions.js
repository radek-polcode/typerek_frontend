import { teamConstants } from '../_constants'
import { teamService } from '../_services'
import { alertActions } from '.';
import { history } from '../_helpers'
import i18n from '../i18n';

export const teamActions = {
  getAll,
};

function getAll() {
  return dispatch => {
    dispatch(request());
    teamService.getAll()
      .then(
        teams => dispatch(success(teams)),
        error => dispatch(failure(error.toString()))
      );
  };

  function request() { return { type: teamConstants.GETALL_REQUEST } }
  function success(teams) { return { type: teamConstants.GETALL_SUCCESS, teams } }
  function failure(error) { return { type: teamConstants.GETALL_FAILURE, error } }
}