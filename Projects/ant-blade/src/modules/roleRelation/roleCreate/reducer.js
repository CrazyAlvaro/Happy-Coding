import {
  CREATE_ROLE,
  CREATE_ROLE_SUCCESS,
  CREATE_ROLE_FAIL,
} from './action';

const initialState = {
  isCreating: false,
};

function roleCreate(state = initialState, action) {
  switch (action.type) {
    case CREATE_ROLE: {
      return {
        ...state,
        isCreating: true,
      };
    }

    case CREATE_ROLE_SUCCESS: {
      return {
        ...state,
        isCreating: false,
        roleName: action.roleName,
        roleType: action.roleType,
      };
    }

    case CREATE_ROLE_FAIL: {
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

export default roleCreate;
