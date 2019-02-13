import { authenticationHeaders, handlingResponse } from '../_helpers';
import config from '../_config';

export const userService = {
  addUser,
  getAll,
  getById,
  update,
  updateUser,
  delete: _delete
};

const namespace = 'admin/'
const handleResponse = handlingResponse.handleResponse

function getAll() {
  const requestOptions = {
    method: 'GET',
    headers: authenticationHeaders()
  };

  return fetch(`${config.apiUrl}/${namespace}users`, requestOptions)
          .then(handleResponse);
}

function getById(id) {
  const requestOptions = {
    method: 'GET',
    headers: authenticationHeaders()
  };

  return fetch(`${config.apiUrl}/${namespace}users/${id}`, requestOptions).then(handleResponse)
}

function addUser(user) {
  const requestOptions = {
    method: 'POST',
    headers: authenticationHeaders(),
    body: JSON.stringify(user)
  }
  return fetch(`${config.apiUrl}/${namespace}users`, requestOptions)
          .then(handleResponse)
}

function updateUser(user, id) {  
  const requestOptions = {
    method: 'PATCH',
    headers: authenticationHeaders(),
    body: JSON.stringify(user)
  }
  return fetch(`${config.apiUrl}/${namespace}users/${id}`, requestOptions)
          .then(handleResponse)
}

function update(user) {
  const requestOptions = {
      method: 'PUT',
      headers: { 
        ...authenticationHeaders()
      },
      body: JSON.stringify(user)
  };

  return fetch(`${config.apiUrl}/${namespace}users/${user.id}`, requestOptions).then(handleResponse);;
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
  const requestOptions = {
      method: 'DELETE',
      headers: authenticationHeaders()
  };

  return fetch(`${config.apiUrl}/${namespace}users/${id}`, requestOptions).then(handleResponse);
}