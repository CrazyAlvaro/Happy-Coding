import {
  LOAD_PROFILE,
  LOAD_PROFILE_SUCCESS,
  LOAD_PROFILE_FAIL,
} from './loadProfile/action';

const defaultState = {
  isLoading: false,
  isSignedIn: false,
  profile: {},
};

const localStorageState = JSON.parse(localStorage.user || '{}');

function user(state = {
  ...defaultState,
  ...localStorageState,
}, action) {
  switch (action.type) {
    case LOAD_PROFILE:
      return {
        ...state,
        isLoading: true,
      };
    case LOAD_PROFILE_SUCCESS: {
      const { payload: { profile } } = action;
      return {
        ...state,
        profile,
        isLoading: false,
        isSignedIn: true,
      };
    }
    case LOAD_PROFILE_FAIL:
      return {
        ...state,
        error: action.payload.error,
        isLoading: false,
      };
    default:
      return state;
  }
}

export default user;
