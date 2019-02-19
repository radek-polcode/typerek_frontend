import { teamConstants } from '../_constants'

export function teams(state = {}, action) {
  switch(action.type) {
    case teamConstants.GETALL_REQUEST:
      return {
        loading: true
      }
    case teamConstants.GETALL_SUCCESS:
      return {
        items: action.teams.data
      }
    case teamConstants.GETALL_FAILURE:
      return {
        error: action.error
    };
    case teamConstants.UPDATE_COMPETITION_REQUEST:
      return {
        ...state,
      }
    case teamConstants.UPDATE_COMPETITION_FAILURE:
      return {
        error: action.error
      }
    case teamConstants.UPDATE_COMPETITION_SUCCESS:
      return {
        ...state,
        items: state.items.filter(function(team) {
          if (team.id === action.team.id) {
            return team
          } else {
            return action.team
          }
        })          
    }
    default: 
      return state  
  }
}