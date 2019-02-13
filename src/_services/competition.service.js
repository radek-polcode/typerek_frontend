import { authHeader } from '../_helpers';
import config from '../_config';

const namespace = 'admin/'

export const competitionService = {
  getAll
};


function logout() {
  localStorage.removeItem('user');
}

function getAll() {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  };

  return fetch(`${config.apiUrl}/${namespace}competitions`, requestOptions)
          .then(handleResponse);
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