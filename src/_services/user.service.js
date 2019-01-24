import config from '../_config';
import { authHeader } from '../_helpers';

export const userService = {
  login,
  logout,
  register,
  getAll,
  getById,
  update,
  delete: _delete
};

const namespace = 'admin/'

function login(email, password) {
  const requestOptions = {
    method: 'POST',
    headers: config.defaultHeaders,
    body: JSON.stringify({email, password})
  };
  return fetch(`${config.apiUrl}/auth/sign_in`, requestOptions)
    .then(handleResponse)
    .then(user => {
      localStorage.setItem('user', JSON.stringify(user));
      return user
    });
}

function logout() {
  localStorage.removeItem('user');
}

function getAll() {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  };

  return fetch(`${config.apiUrl}/${namespace}users`, requestOptions).then(handleResponse);
}

function getById(id) {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  };

  return fetch(`${config.apiUrl}/${namespace}users/${id}`, requestOptions).then(handleResponse)
}

function register(user) {
  const requestOptions = {
    method: 'POST',
    headers: config.defaultHeaders,
    body: JSON.stringify(user)
  }

  return fetch(`${config.apiUrl}/auth/sign_up`, requestOptions).then(handleResponse)
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
      if (data && response.headers.get('access-token')) {
        data = assignAuthHeaders(data, response.headers)
      }
      console.log(data)
      if (!response.ok) {
          if (response.status === 401) {
              // auto logout if 401 response returned from api
              logout();
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