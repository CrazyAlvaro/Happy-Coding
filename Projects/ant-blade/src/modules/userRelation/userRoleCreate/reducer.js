import {
  CREATE_USER_ROLE,
  CREATE_USER_ROLE_SUCCESS,
  CREATE_USER_ROLE_FAIL,
} from './action';

const initialState = {
  isCreating: false,
};

function userRoleCreate(state = initialState, action) {
  switch (action.type) {
    case CREATE_USER_ROLE: {
      return {
        ...state,
        isCreating: true,
      };
    }

    case CREATE_USER_ROLE_SUCCESS: {
      return {
        ...state,
        isCreating: false,
        username: action.username,
        role: action.role,
      };
    }

    case CREATE_USER_ROLE_FAIL: {
      return {
        ...state,
        isCreating: false,
        error: action.error,
      };
    }

    default:
      return state;
  }
}

export default userRoleCreate;
