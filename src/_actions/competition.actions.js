import { competitionConstants } from '../_constants'
import { competitionService } from '../_services'
import { alertActions } from '.';
import { history } from '../_helpers'
import i18n from '../i18n';

export const competitionActions = {
  addCompetition,
  delete: _delete,
  getAll,
  updateCompetition
};

function addCompetition(competition) {
  let t = i18n.t.bind(i18n);

  return dispatch => {
    dispatch(request());
    competitionService.addCompetition(competition)
      .then(
        competition => {
          dispatch(success(competition));
          history.push('/admin/competitions');
          dispatch(alertActions.success(
            t('alerts.competitions.addedSuccessfully')
          ));
        },
        error => {
          dispatch(failure(error.toString()));
          dispatch(alertActions.error(error.toString()));
        }
    );
  };

  function request(competition) { return { type: competitionConstants.ADDCOMPETITION_REQUEST, competition } }
  function success(competition) { return { type: competitionConstants.ADDCOMPETITION_SUCCESS, competition } }
  function failure(error) { return { type: competitionConstants.ADDCOMPETITION_FAILURE, error } }
}

function _delete(id) {
  let t = i18n.t.bind(i18n);

  return dispatch => {
    dispatch(request(id));

    competitionService.delete(id)
      .then(
        competition => {
          dispatch(success(id));
          dispatch(alertActions.success(
            t('alerts.competitions.removedSuccessfully')
          ));
        },
        error => {
          dispatch(failure(id, error.toString()))
        }
      );
  };

  function request(id) { return { type: competitionConstants.DELETE_REQUEST, id } }
  function success(id) { return { type: competitionConstants.DELETE_SUCCESS, id } }
  function failure(id, error) { return { type: competitionConstants.DELETE_FAILURE, id, error } }
}

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

function updateCompetition(competition, id) {
  let t = i18n.t.bind(i18n);

  return dispatch => {
    dispatch(request());
    competitionService.updateCompetition(competition, id)
      .then(
        competition => {
          dispatch(success(competition));
          history.push('/admin/competitions');
          dispatch(alertActions.success(
            t('alerts.competitions.editedSuccessfully')
          ));
        },
        error => {
          dispatch(failure(error.toString()));
          dispatch(alertActions.error(error.toString()));
        }
      )
  };

  function request(competition) { return { type: competitionConstants.UPDATECOMPETITION_REQUEST, competition } }
  function success(competition) { return { type: competitionConstants.UPDATECOMPETITION_SUCCESS, competition } }
  function failure(error) { return { type: competitionConstants.UPDATECOMPETITION_FAILURE, error } }
}