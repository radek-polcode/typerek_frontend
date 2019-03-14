
import { combineReducers } from 'redux';

import { alert } from './alert.reducer';
import { authentication } from './authentication.reducer';
import { competitions } from './competitions.reducer';
import { registration } from './registration.reducer';
import { teams } from './teams.reducer';
import { users } from './users.reducer';

const appReducer = combineReducers({
  alert,
  competitions,
  authentication,
  registration,
  teams,
  users
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