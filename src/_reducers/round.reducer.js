import { roundConstants } from '../_constants'

export function rounds(state = {}, action) {
  switch(action.type) {
    case roundConstants.GETALL_REQUEST:
      return {
        loading: true
      }
    case roundConstants.GETALL_SUCCESS:
      return {
        items: action.rounds.data
      }
    case roundConstants.GETALL_FAILURE:
      return {
        error: action.error
    };
    default: 
      return state
  }
}