import { competitionConstants } from '../_constants'
import { competitionService } from '../_services'
import { alertActions } from '.';
import { history } from '../_helpers'
import i18n from '../i18n';

export const competitionActions = {
  getAll
};

function getAll() {
  return dispatch => {
    dispatch(request());
    competitionService.getAll()
      .then(
        competitions => dispatch(success(competitions)),
        error => dispatch(failure(error.toString()))
      );
  };

  function request() { return { type: competitionConstants.GETALL_REQUEST } }
  function success(competitions) { return { type: competitionConstants.GETALL_SUCCESS, competitions } }
  function failure(error) { return { type: competitionConstants.GETALL_FAILURE, error } }
}