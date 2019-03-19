import { teamConstants } from '../_constants'

export function teams(state = {}, action) {
  switch(action.type) {
    case teamConstants.ADDUSER_REQUEST:
    return {
      ...state,
    }
    case teamConstants.ADDUSER_FAILURE:
      return {
        error: action.error
      }
    case teamConstants.ADDUSER_SUCCESS:
      return {
        items: state.items.concat(action.team.data)
      }
    case teamConstants.DELETE_REQUEST:
    return {
      ...state,
      items: state.items.map(team =>
        team.id === action.id
        ? { ...team, deleting: true }
        :team
      )
    };
    case teamConstants.DELETE_SUCCESS:
      return {
        items: state.items.filter(team => team.id !== action.id)
      };
    case teamConstants.DELETE_FAILURE:
      return {
        ...state,
        items: state.items.map(team => {
          if (team.id === action.id) {
            const { deleting, ...teamCopy } = team;
            return { ...teamCopy, deleteError: action.error };
        }
          return team;
      })
    };
    case teamConstants.DELETETEAMPHOTO_REQUEST:
      return {
        ...state,
      }
    case teamConstants.DELETETEAMPHOTO_FAILURE:
      return {
        error: action.error
      }
    case teamConstants.DELETETEAMPHOTO_SUCCESS:
      return {
        ...state,
        items: state.items.map(function(team) {
          if (team.id === action.team.data.id) {
            return action.team.data
          } else {
            return team
          }
        })          
      }
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
    case teamConstants.UPDATETEAM_REQUEST:
      return {
        ...state,
      }
    case teamConstants.UPDATETEAM_FAILURE:
      return {
        error: action.error
      }
    case teamConstants.UPDATETEAM_SUCCESS:
      return {
        ...state,
        items: state.items.map(function(team) {
          if (team.id === action.team.data.id) {
            return action.team.data
          } else {
            return team
          }
        })          
    }
    case teamConstants.UPDATETEAMPHOTO_REQUEST:
      return {
        ...state,
      }
    case teamConstants.UPDATETEAMPHOTO_FAILURE:
      return {
        error: action.error
      }
    case teamConstants.UPDATETEAMPHOTO_SUCCESS:
      return {
        ...state,
        items: state.items.map(function(team) {
          if (team.id === action.team.data.id) {
            return action.team.data
          } else {
            return team
          }
        })          
      }
    default: 
      return state  
  }
}