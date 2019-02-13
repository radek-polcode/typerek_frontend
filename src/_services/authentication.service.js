import { handlingResponse } from '../_helpers';
import config from '../_config';

export const authenticationService = {
  login,
  logout,
  register,
};

const handleResponse = handlingResponse.handleResponse

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

function register(user) {
  const requestOptions = {
    method: 'POST',
    headers: config.defaultHeaders,
    body: JSON.stringify(user)
  }

  return fetch(`${config.apiUrl}/auth`, requestOptions).then(handleResponse)
}