import { authenticationHeaders, handlingResponse } from '../_helpers';
import config from '../_config';

const namespace = 'admin/'

export const competitionService = {
  addCompetition,
  delete: _delete,
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

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
  const requestOptions = {
      method: 'DELETE',
      headers: authenticationHeaders()
  };

  return fetch(`${config.apiUrl}/${namespace}competitions/${id}`, requestOptions).then(handleResponse);
}

function getAll( { include } = {} ) {
  let url = `${config.apiUrl}/${namespace}competitions`

  const requestOptions = {
    method: 'GET',
    headers: authenticationHeaders()
  };

  if (include) {
    url = url + `?include=${include}`
  }
  console.log(url)
  return fetch(url, requestOptions)
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