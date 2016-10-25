import {
  DELETE_ROLE,
  DELETE_ROLE_SUCCESS,
  DELETE_ROLE_FAIL,
} from './action';

const initialState = {
  isDeleting: false,
};

function roleDelete(state = initialState, action) {
  switch (action.type) {
    case DELETE_ROLE: {
      return {
        ...state,
        isDeleting: true,
      };
    }

    case DELETE_ROLE_SUCCESS: {
      return {
        ...state,
        isDeleting: false,
      };
    }

    case DELETE_ROLE_FAIL: {
      return {
        ...state,
        isDeleting: false,
        error: action.error,
      };
    }

    default:
      return state;
  }
}

export default roleDelete;
