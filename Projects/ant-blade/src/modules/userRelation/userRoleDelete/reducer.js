import {
  DELETE_USER_ROLE,
  DELETE_USER_ROLE_SUCCESS,
  DELETE_USER_ROLE_FAIL,
} from './action';

const initialState = {
  isDeleting: false,
};

function userRoleDelete(state = initialState, action) {
  switch (action.type) {
    case DELETE_USER_ROLE: {
      return {
        ...state,
        isDeleting: true,
        username: action.username,
        role: action.role,
      };
    }

    case DELETE_USER_ROLE_SUCCESS: {
      return {
        ...state,
        isDeleting: false,
      };
    }

    case DELETE_USER_ROLE_FAIL: {
      return {
        ...state,
        isDeleting: false,
      };
    }

    default:
      return state;
  }
}

export default userRoleDelete;
