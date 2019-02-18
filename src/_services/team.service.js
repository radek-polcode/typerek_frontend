import { authenticationHeaders, handlingResponse } from '../_helpers';
import config from '../_config';

const namespace = 'admin/'

export const teamService = {
  getAll,
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