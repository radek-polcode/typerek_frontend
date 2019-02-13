import { authenticationService } from './'
import { authHeader } from '../_helpers';
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

function getAll() {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  };

  return fetch(`${config.apiUrl}/${namespace}users`, requestOptions)
          .then(handleResponse);
}

function getById(id) {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  };

  return fetch(`${config.apiUrl}/${namespace}users/${id}`, requestOptions).then(handleResponse)
}

function addUser(user) {
  const requestOptions = {
    method: 'POST',
    headers: authHeader(),
    body: JSON.stringify(user)
  }
  return fetch(`${config.apiUrl}/${namespace}users`, requestOptions)
          .then(handleResponse)
}

function updateUser(user, id) {  
  const requestOptions = {
    method: 'PATCH',
    headers: authHeader(),
    body: JSON.stringify(user)
  }
  return fetch(`${config.apiUrl}/${namespace}users/${id}`, requestOptions)
          .then(handleResponse)
}

function update(user) {
  const requestOptions = {
      method: 'PUT',
      headers: { 
        ...authHeader()
      },
      body: JSON.stringify(user)
  };

  return fetch(`${config.apiUrl}/${namespace}users/${user.id}`, requestOptions).then(handleResponse);;
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
  const requestOptions = {
      method: 'DELETE',
      headers: authHeader()
  };

  return fetch(`${config.apiUrl}/${namespace}users/${id}`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
  return response.text().then(text => {
      let data = text && JSON.parse(text);
      let userFromLocalStorage = localStorage.getItem('user')
      // set auth headers if user not exists in localStorage 
      if (data 
          && response.headers.get('access-token') 
          && userFromLocalStorage == undefined) {
        data = assignAuthHeaders(data, response.headers)
      }
      if (!response.ok) {
          if (response.status === 401) {
              // auto logout if 401 response returned from api
              authenticationService.logout();
              // window.location.reload(true);
          }

          const error = (data && data.message) || response.statusText;
          return Promise.reject(error);
      }
      return data;
  });
}

function assignAuthHeaders(data, responseHeaders) {
  return Object.assign(
          { 
            'authData': {
              'access-token': responseHeaders.get('access-token'),
              'client': responseHeaders.get('client'),
              'expiry': responseHeaders.get('expiry'),
              'token-type': responseHeaders.get('token-type'),
              'uid': responseHeaders.get('uid')
            }
          }, data)
}