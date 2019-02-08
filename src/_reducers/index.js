
import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { users } from './users.reducer';
import { alert } from './alert.reducer';

const appReducer = combineReducers({
  authentication,
  registration,
  users,
  alert
});

const rootReducer = (state, action) => {
  if (action.type === 'USERS_LOGOUT') {
    Object.keys(state).forEach(key => {
      localStorage.removeItem(`persist:${key}`);
    });
    state = undefined
  }
  return appReducer(state, action)
}

export default rootReducer;