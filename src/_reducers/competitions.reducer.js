import { competitionConstants } from '../_constants'

export function competitions(state = {}, action) {
  switch(action.type) {
    case competitionConstants.ADDCOMPETITION_REQUEST:
    return {
      ...state,
    }
    case competitionConstants.ADDCOMPETITION_FAILURE:
      return {
        error: action.error
      }
    case competitionConstants.ADDCOMPETITION_SUCCESS:
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
    case competitionConstants.UPDATECOMPETITION_REQUEST:
      return {
        ...state,
      }
    case competitionConstants.UPDATECOMPETITION_FAILURE:
      return {
        error: action.error
      }
    case competitionConstants.UPDATECOMPETITION_SUCCESS:
      return {
        ...state,
        items: state.items.map(function(competition) {
          if (competition.id === action.competition.data.id) {
            return action.competition.data
          } else {
            return competition
          }
        })          
    }
    default: 
      return state
  }
}