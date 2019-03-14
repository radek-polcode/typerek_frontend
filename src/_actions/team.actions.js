import { teamConstants } from '../_constants'
import { teamService } from '../_services'
import { alertActions } from '.';
import { history } from '../_helpers'
import i18n from '../i18n';

export const teamActions = {
  addTeam,
  delete: _delete,
  deleteTeamPhoto,
  getAll,
  updateTeam,
  updateTeamPhoto
};

function addTeam(team) {
  let t = i18n.t.bind(i18n);

  return dispatch => {
    dispatch(request());
    teamService.addTeam(team)
      .then(
        team => {
          dispatch(success(team));
          history.push('/admin/teams');
          dispatch(alertActions.success(
            t('alerts.teams.addedSuccessfully')
          ));
        },
        error => {
          dispatch(failure(error.toString()));
          dispatch(alertActions.error(error.toString()));
        }
    );
  };

  function request(team) { return { type: teamConstants.ADDTEAM_REQUEST, team } }
  function success(team) { return { type: teamConstants.ADDTEAM_SUCCESS, team } }
  function failure(error) { return { type: teamConstants.ADDTEAM_FAILURE, error } }
}

function _delete(id) {
  let t = i18n.t.bind(i18n);

  return dispatch => {
    dispatch(request(id));

    teamService.delete(id)
      .then(
        team => {
          dispatch(success(id));
          dispatch(alertActions.success(
            t('alerts.teams.removedSuccessfully')
          ));
        },
        error => {
          dispatch(failure(id, error.toString()))
        }
      );
  };

  function request(id) { return { type: teamConstants.DELETE_REQUEST, id } }
  function success(id) { return { type: teamConstants.DELETE_SUCCESS, id } }
  function failure(id, error) { return { type: teamConstants.DELETE_FAILURE, id, error } }
}

function deleteTeamPhoto(payload, id) {
  let t = i18n.t.bind(i18n);

  return dispatch => {
    dispatch(request());
    teamService.deleteTeamPhoto(payload, id)
      .then(
        team => {
          dispatch(success(team));
          dispatch(alertActions.success(
            t('alerts.teams.photoDeleted')
          ));
        },
        error => {
          dispatch(failure(error.toString()));
          dispatch(alertActions.error(error.toString()));
        }
      )
  };

  function request(team) { return { type: teamConstants.DELETETEAMPHOTO_REQUEST, team } }
  function success(team) { return { type: teamConstants.DELETETEAMPHOTO_SUCCESS, team } }
  function failure(error) { return { type: teamConstants.DELETETEAMPHOTO_FAILURE, error } }
}

function getAll(page, perPage) {
  return dispatch => {
    dispatch(request());
    teamService.getAll(page, perPage)
      .then(
        teams => {
          dispatch(success(teams));
        },
        error => dispatch(failure(error.toString()))
      );
  };

  function request() { return { type: teamConstants.GETALL_REQUEST } }
  function success(teams) { return { type: teamConstants.GETALL_SUCCESS, teams } }
  function failure(error) { return { type: teamConstants.GETALL_FAILURE, error } }
}

function updateTeam(team, id) {
  let t = i18n.t.bind(i18n);

  return dispatch => {
    dispatch(request());
    teamService.updateTeam(team, id)
      .then(
        team => {
          dispatch(success(team));
          history.push('/admin/teams');
          dispatch(alertActions.success(
            t('alerts.teams.editedSuccessfully')
          ));
        },
        error => {
          dispatch(failure(error.toString()));
          dispatch(alertActions.error(error.toString()));
        }
      )
  };

  function request(team) { return { type: teamConstants.UPDATETEAM_REQUEST, team } }
  function success(team) { return { type: teamConstants.UPDATETEAM_SUCCESS, team } }
  function failure(error) { return { type: teamConstants.UPDATETEAM_FAILURE, error } }
}

function updateTeamPhoto(team, id) {
  let t = i18n.t.bind(i18n);

  return dispatch => {
    dispatch(request());
    teamService.updateTeamPhoto(team, id)
      .then(
        team => {
          dispatch(success(team));
          dispatch(alertActions.success(
            t('alerts.teams.photoChanged')
          ));
        },
        error => {
          dispatch(failure(error.toString()));
          dispatch(alertActions.error(error.toString()));
        }
      )
  };

  function request(team) { return { type: teamConstants.UPDATETEAMPHOTO_REQUEST, team } }
  function success(team) { return { type: teamConstants.UPDATETEAMPHOTO_SUCCESS, team } }
  function failure(error) { return { type: teamConstants.UPDATETEAMPHOTO_FAILURE, error } }
}