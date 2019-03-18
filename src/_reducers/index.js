
import { combineReducers } from 'redux';

import { alert } from './alert.reducer';
import { authentication } from './authentication.reducer';
import { competitions } from './competitions.reducer';
import { modal } from './modal.reducer';
import { registration } from './registration.reducer';
import { teams } from './teams.reducer';
import { users } from './users.reducer';

const appReducer = combineReducers({
  alert,
  authentication,
  competitions,
  modal,
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