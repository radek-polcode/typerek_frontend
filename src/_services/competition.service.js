import { authenticationHeaders, handlingResponse } from '../_helpers';
import config from '../_config';

const namespace = 'admin/'

export const competitionService = {
  addCompetition,
  getAll,
  updateCompetition
};

const handleResponse = handlingResponse.handleResponse

function addCompetition(competition) {
  const requestOptions = {
    method: 'POST',
    headers: authenticationHeaders(),
    body: JSON.stringify(competition)
  }
  return fetch(`${config.apiUrl}/${namespace}competitions`, requestOptions)
          .then(handleResponse)
}

function getAll() {
  const requestOptions = {
    method: 'GET',
    headers: authenticationHeaders()
  };

  return fetch(`${config.apiUrl}/${namespace}competitions`, requestOptions)
          .then(handleResponse);
}

function updateCompetition(competition, id) {  
  const requestOptions = {
    method: 'PATCH',
    headers: authenticationHeaders(),
    body: JSON.stringify(competition)
  }
  return fetch(`${config.apiUrl}/${namespace}competitions/${id}`, requestOptions)
          .then(handleResponse)
}