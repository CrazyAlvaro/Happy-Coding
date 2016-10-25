import {
  LOAD_USER,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
} from './action';

const initialState = {
  users: [],
  isLoadingUser: false,
};

function userLoad(state = initialState, action) {
  switch (action.type) {
    case LOAD_USER: {
      return {
        ...state,
        isLoadingUser: true,
      };
    }

    case LOAD_USER_SUCCESS: {
      return {
        ...state,
        isLoadingUser: false,
        users: action.users,
      };
    }

    case LOAD_USER_FAIL: {
      return {
        ...state,
        isLoadingUser: false,
        error: action.error,
      };
    }

    default:
      return state;
  }
}

export default userLoad;
