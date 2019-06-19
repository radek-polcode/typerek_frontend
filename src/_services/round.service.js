import { authenticationHeaders, handlingResponse } from '../_helpers';
import config from '../_config';

const namespace = 'admin/'

export const roundService = {
  getAll
};

const handleResponse = handlingResponse.handleResponse

function getAll() {
  const requestOptions = {
    method: 'GET',
    headers: authenticationHeaders()
  };
  return fetch(`${config.apiUrl}/${namespace}competitions`, requestOptions)
          .then(handleResponse);

}