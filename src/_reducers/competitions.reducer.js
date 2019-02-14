import { competitionConstants } from '../_constants'

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
    case competitionConstants.UPDATE_COMPETITION_REQUEST:
      return {
        ...state,
      }
    case competitionConstants.UPDATE_COMPETITION_FAILURE:
      return {
        error: action.error
      }
    case competitionConstants.UPDATE_COMPETITION_SUCCESS:
      return {
        ...state,
        items: state.items.filter(function(user) {
          if (user.id === action.user.id) {
            return user
          } else {
            return action.user
          }
        })          
    }
    default: 
      return state
  }
}