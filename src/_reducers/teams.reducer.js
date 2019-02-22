import { teamConstants } from '../_constants'

export function teams(state = {}, action) {
  switch(action.type) {
    case teamConstants.GETALL_REQUEST:
      return {
        loading: true
      }
    case teamConstants.GETALL_SUCCESS:
      return {
        items: action.teams.data,
        links: action.teams.links,
        meta: action.teams.meta,
      }
    case teamConstants.GETALL_FAILURE:
      return {
        error: action.error
    };
    case teamConstants.UPDATE_TEAM_REQUEST:
      return {
        ...state,
      }
    case teamConstants.UPDATE_TEAM_FAILURE:
      return {
        error: action.error
      }
    case teamConstants.UPDATE_TEAM_SUCCESS:
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
    case teamConstants.UPDATE_TEAMPHOTO_REQUEST:
      return {
        ...state,
      }
    case teamConstants.UPDATE_TEAMPHOTO_FAILURE:
      return {
        error: action.error
      }
    case teamConstants.UPDATE_TEAMPHOTO_SUCCESS:
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