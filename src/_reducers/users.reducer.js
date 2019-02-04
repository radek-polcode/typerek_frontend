import { userConstants } from '../_constants';

export function users(state = {}, action) {
  switch (action.type) {
    case userConstants.ADDUSER_REQUEST:
    return {
      ...state,
    }
    case userConstants.ADDUSER_FAILURE:
      return {
        error: action.error
      }
    case userConstants.ADDUSER_SUCCESS:
      return {
        items: state.items.concat(action.user.data)
      }
    case userConstants.GETALL_REQUEST:
      return {
        loading: true
    };
    case userConstants.GETALL_SUCCESS:
      return {
        items: action.users.data
    };
    case userConstants.GETALL_FAILURE:
      return {
        error: action.error
    };
    case userConstants.DELETE_REQUEST:
      return {
        ...state,
        items: state.items.map(user =>
          user.id === action.id
          ? { ...user, deleting: true }
          :user
        )
    };
    case userConstants.DELETE_SUCCESS:
      return {
        items: state.items.filter(user => user.id !== action.id)
      };
    case userConstants.DELETE_FAILURE:
      return {
        ...state,
        items: state.items.map(user => {
          if (user.id === action.id) {
            const { deleting, ...userCopy } = user;
            return { ...userCopy, deleteError: action.error };
        }
          return user;
      })
    };
    default: 
      return state
  }
}