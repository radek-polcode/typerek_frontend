import { authenticationHeaders, handlingResponse } from '../_helpers';
import config from '../_config';

const namespace = 'admin/'

export const teamService = {
  getAll,
  updatePhoto,
  updateTeam
};

const handleResponse = handlingResponse.handleResponse

function getAll() {
  const requestOptions = {
    method: 'GET',
    headers: authenticationHeaders()
  };

  return fetch(`${config.apiUrl}/${namespace}teams`, requestOptions)
          .then(handleResponse);
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

function updatePhoto(team, id) {
  const requestOptions = {
    method: 'PATCH',
    headers: authenticationHeaders(),
    body: JSON.stringify(team)
  }

  return fetch(`${config.apiUrl}/${namespace}teams/${id}`, requestOptions)
          .then(handleResponse)
}