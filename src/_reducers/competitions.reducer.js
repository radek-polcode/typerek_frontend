import { competitionConstants } from '../_constants'
import { alertActions } from '../_actions';

export function competitions(state = {}, action) {
  switch(action.type) {
    case competitionConstants.GETALL_REQUEST:
      return {
        loading: true
      }
    case competitionConstants.GETALL_SUCCESS:
      return {
        items: action.competitions.data
      }
    case competitionConstants.GETALL_FAILURE:
      return {
        error: action.error
    };
    default: 
      return state
  }
}