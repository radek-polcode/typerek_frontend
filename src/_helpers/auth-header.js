import config from '../_config/'

export function authHeader() {
  let user = JSON.parse(localStorage.getItem('user'));

  if (user && user.authData) {
    const authData = user.authData
    return Object.assign({
      'access-token': authData['access-token'],
      'client': authData['client'],
      'expiry': authData['expiry'],
      'token-type': authData['token-type'],
      'uid': authData['uid']
    }, config.defaultHeaders); 
  } else {
    return {};
  }
}