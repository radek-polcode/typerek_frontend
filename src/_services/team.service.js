import { authenticationHeaders, handlingResponse } from '../_helpers';
import config from '../_config';

const namespace = 'admin/'

export const teamService = {
  addTeam,
  delete: _delete,
  deleteTeamPhoto,
  getAll,
  updateTeam,
  updateTeamPhoto
};

const handleResponse = handlingResponse.handleResponse

const initialPage = 1
const initialLimitPerPage = 20

function addTeam(team) {
  const requestOptions = {
    method: 'POST',
    headers: authenticationHeaders(),
    body: JSON.stringify(team)
  }
  return fetch(`${config.apiUrl}/${namespace}teams`, requestOptions)
          .then(handleResponse)
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
  const requestOptions = {
      method: 'DELETE',
      headers: authenticationHeaders()
  };

  return fetch(`${config.apiUrl}/${namespace}teams/${id}`, requestOptions).then(handleResponse);
}

function deleteTeamPhoto(data, id) {
  const requestOptions = {
    method: 'PATCH',
    headers: authenticationHeaders(),
    body: JSON.stringify(data)
  }
  return fetch(`${config.apiUrl}/${namespace}teams/${id}`, requestOptions)
          .then(handleResponse)
}

function getAll(page, perPage, getAll = false) {
  const currentPage = page ? page : initialPage
  const limitPerPage = perPage ? perPage : initialLimitPerPage
  const requestOptions = {
    method: 'GET',
    headers: authenticationHeaders()
  };

  if (getAll) {
    return fetch(`${config.apiUrl}/${namespace}teams?all=true`, requestOptions)
            .then(handleResponse);
  } else {
    return fetch(`${config.apiUrl}/${namespace}teams?page=${currentPage}&per_page=${limitPerPage}`, requestOptions)
            .then(handleResponse);
  }

}

function updateTeam(team, id) {  
  const requestOptions = {
    method: 'PATCH',
    headers: authenticationHeaders(),
    body: JSON.stringify(team)
  }
  return fetch(`${config.apiUrl}/${namespace}teams/${id}`, requestOptions)
          .then(handleResponse)
}

function updateTeamPhoto(team, id) {
  const requestOptions = {
    method: 'PATCH',
    headers: authenticationHeaders(),
    body: JSON.stringify(team)
  }
  return fetch(`${config.apiUrl}/${namespace}teams/${id}`, requestOptions)
          .then(handleResponse)
}
