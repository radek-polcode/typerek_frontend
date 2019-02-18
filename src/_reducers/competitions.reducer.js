import { competitionConstants } from '../_constants'

export function competitions(state = {}, action) {
  switch(action.type) {
    case competitionConstants.ADDUSER_REQUEST:
    return {
      ...state,
    }
    case competitionConstants.ADDUSER_FAILURE:
      return {
        error: action.error
      }
    case competitionConstants.ADDUSER_SUCCESS:
      return {
        items: state.items.concat(action.competition.data)
      }
    case competitionConstants.DELETE_REQUEST:
      return {
        ...state,
        items: state.items.map(competition =>
          competition.id === action.id
          ? { ...competition, deleting: true }
          :competition
        )
    };
    case competitionConstants.DELETE_SUCCESS:
      return {
        items: state.items.filter(competition => competition.id !== action.id)
      };
    case competitionConstants.DELETE_FAILURE:
      return {
        ...state,
        items: state.items.map(competition => {
          if (competition.id === action.id) {
            const { deleting, ...competitionCopy } = competition;
            return { ...competitionCopy, deleteError: action.error };
        }
          return competition;
      })
    };
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
        items: state.items.filter(function(competition) {
          if (competition.id === action.competition.id) {
            return competition
          } else {
            return action.competition
          }
        })          
    }
    default: 
      return state
  }
}